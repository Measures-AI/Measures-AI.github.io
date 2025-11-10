import React, { useEffect, useState } from 'react';
import styles from './MeasureTwiceForm.module.css';
import { useTracking } from './TrackingProvider';
import { pushLeadToDataLayer, addAttributionToForm, getLeadType, getLeadValue, getFormVariant } from '../utils/dataLayer';

// Netlify function endpoints for Beehiiv integration
const BEEHIIV_SUBSCRIBE_ENDPOINT = '/.netlify/functions/subscribe-beehiiv';
const GOOGLE_SHEETS_ENDPOINT = '/.netlify/functions/add-to-sheets';

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
      // FIRST SUBMISSION: EMAIL ONLY - SEND SUBSCRIPTION EMAIL IMMEDIATELY
      // =================================================================
      // This sends the newsletter subscription email as soon as the user
      // enters their email and clicks "Subscribe" for the first time.
      // We don't wait for the additional fields to be filled out.
      
      console.log('🐝 Subscribing email to Beehiiv newsletter...');
      
      try {
        // Add attribution data to the email-only form submission
        const emailOnlyForm = { email: form.email };
        const formWithAttribution = addAttributionToForm(emailOnlyForm);
        
        const subscriptionData = {
          email: form.email,
          submissionType: 'email_only',
          utm_source: formWithAttribution.utm_source || 'measure-twice-landing',
          utm_campaign: formWithAttribution.utm_campaign || 'measure-twice-newsletter'
        };
        
        // Subscribe to Beehiiv newsletter immediately
        const response = await fetch(BEEHIIV_SUBSCRIBE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscriptionData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to subscribe to newsletter');
        }
        
        console.log('✅ Successfully subscribed to Beehiiv newsletter:', result);
        
        // Track the email-only submission
        if (tracking) tracking('beehiiv_newsletter_subscribed', { 
          email: form.email,
          submissionType: 'email_only'
        });
        
      } catch (beehiivError) {
        console.error('❌ Failed to subscribe to Beehiiv newsletter:', beehiivError);
        // Continue with the flow even if subscription fails - user experience shouldn't be blocked
        alert('There was an issue subscribing to our newsletter, but you can still continue. We\'ll try again shortly.');
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
    // FINAL SUBMISSION: COMPLETE DEMOGRAPHIC DATA COLLECTION
    // =================================================================
    // This sends a follow-up email with the complete user information
    // including industry and role for better personalization and segmentation.
    // The user is already subscribed from the first submission above.
    
    console.log('📊 Updating Beehiiv subscriber with demographic information...');
    
    setStatus('submitting');
    try {
      // Add attribution data to complete form
      const formWithAttribution = addAttributionToForm(form);
      
      const completeProfileData = {
        email: form.email,
        industry: form.industry,
        role: form.role,
        submissionType: 'complete_profile',
        utm_source: formWithAttribution.utm_source || 'measure-twice-landing',
        utm_campaign: formWithAttribution.utm_campaign || 'measure-twice-newsletter'
      };
      
      // Update Beehiiv subscriber with complete demographic information
      const beehiivResponse = await fetch(BEEHIIV_SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(completeProfileData)
      });
      
      const beehiivResult = await beehiivResponse.json();
      
      if (!beehiivResponse.ok) {
        console.warn('Failed to update Beehiiv profile:', beehiivResult);
        // Don't fail the whole process if this fails
      } else {
        console.log('✅ Successfully updated Beehiiv subscriber profile:', beehiivResult);
      }
      
      setStatus('success');
      
      if (tracking) tracking('beehiiv_profile_completed', {
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
      if (tracking) tracking('lead_submit_error', { message: String(err) });
      alert('Submission failed. Please try again.');
    }
  };

  const isDisabled = status === 'submitting';

  return (
    <form className={styles.formCard} onSubmit={onSubmit} id="measure-twice-form">
      {!showAdditionalFields ? (
        <div className={styles.attractiveLine}>
          Make sense of it all... once a month.
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
