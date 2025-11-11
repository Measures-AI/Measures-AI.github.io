import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { addAttributionToForm, getFormVariant, getLeadType, getLeadValue, pushLeadToDataLayer } from '../utils/dataLayer';
import styles from './MeasureTwiceForm.module.css';
import { useTracking } from './TrackingProvider';

// EmailJS configuration
const EMAILJS_SERVICE_ID = (typeof window !== 'undefined' && (window.EMAILJS_SERVICE_ID || (window.__ENV && window.__ENV.EMAILJS_SERVICE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID);
const EMAILJS_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
const EMAILJS_PUBLIC_KEY = (typeof window !== 'undefined' && (window.EMAILJS_PUBLIC_KEY || (window.__ENV && window.__ENV.EMAILJS_PUBLIC_KEY))) || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// AWS API Gateway endpoint - same as LeadForm
const AWS_API_BASE = 'https://rnp1bexup2.execute-api.us-east-1.amazonaws.com';

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
      // FIRST SUBMISSION: EMAIL ONLY - SUBSCRIBE VIA AWS LAMBDA
      // =================================================================
      console.log('🐝 Subscribing email to Beehiiv via AWS Lambda...');
      
      try {
        // Add attribution data to the email-only form submission
        const emailOnlyForm = { email: form.email };
        const formWithAttribution = addAttributionToForm(emailOnlyForm);
        
        // Call AWS Lambda function to subscribe to Beehiiv
        const response = await fetch(`${AWS_API_BASE}/subscribe-beehiiv`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            industry: '', // Empty on first submission
            role: '', // Empty on first submission
            submissionType: 'email_only' // This will trigger welcome email
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ Successfully subscribed to Beehiiv newsletter:', result);
        } else {
          const errorText = await response.text();
          console.error('⚠️ Beehiiv subscription failed:', errorText);
          // Continue anyway - show additional fields
        }
        
        // Track the email-only submission
        if (tracking) tracking('beehiiv_newsletter_subscribed', { 
          email: form.email,
          submissionType: 'email_only'
        });
        
      } catch (beehiivError) {
        console.error('❌ Failed to subscribe to Beehiiv newsletter:', beehiivError);
        alert(`There was an issue subscribing to our newsletter: ${beehiivError.message}. You can still continue with the form.`);
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
    // FINAL SUBMISSION: UPDATE BEEHIIV + SAVE TO SHEETS + SEND EMAIL
    // =================================================================
    console.log('📊 Processing final submission with industry context...');
    
    setStatus('submitting');
    try {
      // Add attribution data to complete form
      const formWithAttribution = addAttributionToForm(form);
      
      // 1. Update Beehiiv subscriber with industry/role via AWS Lambda
      console.log('🐝 Updating Beehiiv subscriber profile...');
      try {
        const beehiivResponse = await fetch(`${AWS_API_BASE}/subscribe-beehiiv`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            industry: form.industry,
            role: form.role,
            submissionType: 'complete' // Don't send welcome email again
          })
        });
        
        if (beehiivResponse.ok) {
          const beehiivResult = await beehiivResponse.json();
          console.log('✅ Beehiiv profile updated:', beehiivResult);
        } else {
          const errorText = await beehiivResponse.text();
          console.error('⚠️ Beehiiv update failed:', errorText);
        }
      } catch (beehiivError) {
        console.error('⚠️ Beehiiv update error:', beehiivError);
      }
      
      // 2. Save to Google Sheets via AWS Lambda
      console.log('📊 Saving to Google Sheets...');
      try {
        const sheetsResponse = await fetch(`${AWS_API_BASE}/add-to-sheets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            industry: form.industry,
            role: form.role,
            timestamp: new Date().toISOString(),
            utm_source: formWithAttribution.utm_source || 'measure-twice-landing',
            utm_campaign: formWithAttribution.utm_campaign || 'measure-twice-newsletter'
          })
        });
        
        if (sheetsResponse.ok) {
          const sheetsResult = await sheetsResponse.json();
          console.log('✅ Google Sheets save successful:', sheetsResult);
        } else {
          const errorText = await sheetsResponse.text();
          console.error('⚠️ Google Sheets save failed:', errorText);
        }
      } catch (sheetsError) {
        console.error('⚠️ Google Sheets save error:', sheetsError);
      }
      
      // 3. Send email notification via EmailJS
      console.log('📧 Sending industry context email via EmailJS...');
      try {
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
        
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailTemplateParams,
          EMAILJS_PUBLIC_KEY
        );
        
        console.log('✅ Successfully sent industry context email');
      } catch (emailError) {
        console.error('⚠️ EmailJS error:', emailError);
      }
      
      setStatus('success');
      
      if (tracking) tracking('industry_context_completed', {
        email: form.email,
        industry: form.industry,
        role: form.role
      });
      
      // Prepare redirect function
      const performRedirect = () => {
        const params = new URLSearchParams();
        Object.keys(form).forEach(key => {
          if (form[key]) {
            params.append(key, form[key]);
          }
        });
        
        const thankYouUrl = `/measure-twice/thank-you?${params.toString()}`;
        console.log('🎉 Form submission complete! Redirecting to:', thankYouUrl);
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
        setTimeout(performRedirect, 100);
      }
      
    } catch (err) {
      setStatus('error');
      console.error('❌ Failed to complete submission:', err);
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