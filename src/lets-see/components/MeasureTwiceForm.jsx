import React, { useEffect, useState } from 'react';
import styles from './MeasureTwiceForm.module.css';
import { useTracking } from './TrackingProvider';
import { pushLeadToDataLayer, addAttributionToForm, getLeadType, getLeadValue, getFormVariant } from '../utils/dataLayer';
import emailjs from '@emailjs/browser';

// EmailJS configuration - using existing templates from other forms
const EMAILJS_SERVICE_ID = (typeof window !== 'undefined' && (window.EMAILJS_SERVICE_ID || (window.__ENV && window.__ENV.EMAILJS_SERVICE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID);
const EMAILJS_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
const EMAILJS_PUBLIC_KEY = (typeof window !== 'undefined' && (window.EMAILJS_PUBLIC_KEY || (window.__ENV && window.__ENV.EMAILJS_PUBLIC_KEY))) || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Beehiiv API configuration - direct client-side integration
const BEEHIIV_API_KEY = (typeof window !== 'undefined' && (window.BEEHIIV_API_KEY || (window.__ENV && window.__ENV.BEEHIIV_API_KEY))) || (import.meta.env && import.meta.env.VITE_BEEHIIV_API_KEY);
const BEEHIIV_PUBLICATION_ID = (typeof window !== 'undefined' && (window.BEEHIIV_PUBLICATION_ID || (window.__ENV && window.__ENV.BEEHIIV_PUBLICATION_ID))) || (import.meta.env && import.meta.env.VITE_BEEHIIV_PUBLICATION_ID);
const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';

// Commented out Netlify function endpoints - now using direct API
// const BEEHIIV_SUBSCRIBE_ENDPOINT = '/.netlify/functions/subscribe-beehiiv';
// const GOOGLE_SHEETS_ENDPOINT = '/.netlify/functions/add-to-sheets';

export const MeasureTwiceForm = ({ config }) => {
  const [form, setForm] = useState({
    email: '',
    industry: '',
    role: ''
  });
  const [status, setStatus] = useState('idle');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const tracking = useTracking();

  useEffect(() => {
    if (tracking) tracking('lead_form_view', { slug: 'measure-twice' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!showAdditionalFields) {
      // =================================================================
      // FIRST SUBMISSION: EMAIL ONLY - DIRECT BEEHIIV API SUBSCRIPTION
      // =================================================================
      // Direct client-side call to Beehiiv API. API key will be exposed
      // but this is acceptable for newsletter subscriptions.
      
      console.log('🐝 Subscribing email to Beehiiv via direct API...');
      
      try {
        // Validate API credentials
        if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
          throw new Error('Beehiiv API credentials not configured. Please set VITE_BEEHIIV_API_KEY and VITE_BEEHIIV_PUBLICATION_ID environment variables.');
        }

        // Add attribution data to the email-only form submission
        const emailOnlyForm = { email: form.email };
        const formWithAttribution = addAttributionToForm(emailOnlyForm);
        
        const subscriptionData = {
          email: form.email,
          send_welcome_email: true, // Send welcome email on first submission
          utm_source: formWithAttribution.utm_source || 'measure-twice-landing',
          utm_medium: 'newsletter-form',
          utm_campaign: formWithAttribution.utm_campaign || 'measure-twice-newsletter'
        };
        
        // Make direct API call to Beehiiv
        const response = await fetch(`${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscriptionData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 409) {
            console.log('✅ Email already subscribed to Beehiiv newsletter');
            // Continue with flow - user is already subscribed
          } else {
            throw new Error(result.error || `API error: ${response.status}`);
          }
        } else {
          console.log('✅ Successfully subscribed to Beehiiv newsletter:', result);
        }
        
        // Track the email-only submission
        if (tracking) tracking('beehiiv_newsletter_subscribed', { 
          email: form.email,
          submissionType: 'email_only'
        });
        
      } catch (beehiivError) {
        console.error('❌ Failed to subscribe to Beehiiv newsletter:', beehiivError);
        
        // Check if it's a CORS error
        if (beehiivError.message.includes('CORS') || beehiivError.message.includes('fetch')) {
          alert('Unable to subscribe directly due to browser security restrictions. Please visit our newsletter signup page to subscribe manually.');
        } else {
          alert(`There was an issue subscribing to our newsletter: ${beehiivError.message}. You can still continue with the form.`);
        }
        
        // Continue with the flow even if subscription fails
      }
      
      // Show additional fields for demographic data collection
      setShowAdditionalFields(true);
      
      // Focus on the first additional field
      setTimeout(() => {
        const industryField = document.getElementById('industry');
        if (industryField) {
          industryField.focus();
        }
      }, 100);
      
      return; // Exit here - don't continue to final submission logic
    }

    // =================================================================
    // FINAL SUBMISSION: SEND INDUSTRY CONTEXT VIA EMAILJS
    // =================================================================
    // Instead of updating Beehiiv (which requires server-side), we'll email
    // the industry context information directly using EmailJS
    
    console.log('📧 Sending industry context email via EmailJS...');
    
    setStatus('submitting');
    try {
      // Add attribution data to complete form
      const formWithAttribution = addAttributionToForm(form);
      
      // Prepare email template parameters
      const emailTemplateParams = {
        ...formWithAttribution,
        email: form.email,
        industry: form.industry,
        role: form.role,
        subject: 'New Measure Twice Newsletter Subscriber - Industry Context',
        message: `New subscriber details:

Email: ${form.email}
Industry: ${form.industry}
Role: ${form.role}

UTM Source: ${formWithAttribution.utm_source || 'measure-twice-landing'}
UTM Campaign: ${formWithAttribution.utm_campaign || 'measure-twice-newsletter'}`,
        from_name: form.email,
        to_name: 'Measures Team'
      };
      
      // Send email with industry context via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailTemplateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('✅ Successfully sent industry context email');
      
      setStatus('success');
      
      if (tracking) tracking('industry_context_email_sent', {
        email: form.email,
        industry: form.industry,
        role: form.role
      });
      
      // Comment out Google Sheets integration
      /*
      // OLD GOOGLE SHEETS INTEGRATION - COMMENTED OUT
      try {
        await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(completeProfileData)
        });
      } catch (sheetsError) {
        console.warn('Google Sheets integration failed:', sheetsError);
      }
      */
      
      // Prepare redirect function
      const performRedirect = () => {
        const params = new URLSearchParams();
        Object.keys(form).forEach(key => {
          if (form[key]) {
            params.append(key, form[key]);
          }
        });
        
        const thankYouUrl = `/measure-twice/thank-you?${params.toString()}`;
        window.location.href = thankYouUrl;
      };
      
      // Push to data layer with callback for redirect
      const currentPageConfig = {
        ...config,
        slug: 'measure-twice'
      };
      
      try {
        pushLeadToDataLayer({
          leadType: getLeadType(currentPageConfig),
          userData: form,
          formData: {
            id: 'lead-form-measure-twice',
            name: 'measure-twice_newsletter',
            variant: getFormVariant(currentPageConfig)
          },
          value: getLeadValue(currentPageConfig),
          currency: 'USD',
          pageConfig: currentPageConfig,
          callback: performRedirect,
          timeout: 2000 // 2 second timeout fallback
        });
      } catch (dataLayerError) {
        console.warn('Data layer push failed, redirecting anyway:', dataLayerError);
        // If dataLayer push fails completely, still redirect after a brief delay
        setTimeout(performRedirect, 100);
      }
      
    } catch (err) {
      setStatus('error');
      console.error('❌ Failed to send industry context email:', err);
      if (tracking) tracking('lead_submit_error', { message: String(err) });
      alert('There was an issue sending your information. Please try again or contact us directly.');
    }
  };

  const isDisabled = status === 'submitting';

  return (
    <form className={styles.formCard} onSubmit={onSubmit} id="measure-twice-form">
      {!showAdditionalFields ? (
        <div className={styles.attractiveLine}>
           Join operators, builders, and analysts who want to measure what actually matters.
        </div>
      ) : (
        <div className={styles.oneMoreThing}>
          One more thing...
        </div>
      )}

      <div className={`${styles.row} ${showAdditionalFields ? styles.hiddenRow : styles.visibleRow}`}>
        <label className={styles.label} htmlFor="email">
          Work email
        </label>
        <input 
          className={styles.input} 
          id="email" 
          name="email" 
          type="email" 
          required 
          value={form.email} 
          onChange={onChange} 
          placeholder="Your email address"
        />
      </div>

      {showAdditionalFields && (
        <>
          <div className={styles.visibleRow}>
            <label className={styles.label} htmlFor="industry">
              Industry
            </label>
            <input 
              className={styles.input} 
              id="industry" 
              name="industry" 
              type="text" 
              required 
              value={form.industry} 
              onChange={onChange} 
              placeholder="Your industry"
            />
          </div>

          <div className={styles.visibleRow}>
            <label className={styles.label} htmlFor="role">
              Role
            </label>
            <input 
              className={styles.input} 
              id="role" 
              name="role" 
              type="text" 
              required 
              value={form.role} 
              onChange={onChange} 
              placeholder="Your role"
            />
          </div>
        </>
      )}

      <button 
        className={styles.button} 
        type="submit" 
        disabled={isDisabled}
      >
        {status === 'submitting' ? 'Submitting…' : (showAdditionalFields ? 'Finish Subscribing' : 'Subscribe')}
      </button>
      <div className={styles.hint}>We'll only use this to send you our newsletter.</div>
    </form>
  );
};

export default MeasureTwiceForm;
