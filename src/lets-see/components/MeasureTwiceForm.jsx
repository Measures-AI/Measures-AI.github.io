import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { addAttributionToForm, getFormVariant, getLeadType, getLeadValue, pushLeadToDataLayer } from '../utils/dataLayer';
import styles from './MeasureTwiceForm.module.css';
import { useTracking } from './TrackingProvider';

// EmailJS configuration
const EMAILJS_SERVICE_ID = (typeof window !== 'undefined' && (window.EMAILJS_SERVICE_ID || (window.__ENV && window.__ENV.EMAILJS_SERVICE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID);
const EMAILJS_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
const EMAILJS_PUBLIC_KEY = (typeof window !== 'undefined' && (window.EMAILJS_PUBLIC_KEY || (window.__ENV && window.__ENV.EMAILJS_PUBLIC_KEY))) || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// AWS API Gateway endpoint
const AWS_API_BASE = 'https://rnp1bexup2.execute-api.us-east-1.amazonaws.com';

// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const MeasureTwiceForm = ({ config }) => {
  const [form, setForm] = useState({
    email: '',
    industry: '',
    role: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [emailError, setEmailError] = useState('');
  const tracking = useTracking();

  useEffect(() => {
    if (tracking) tracking('lead_form_view', { slug: 'measure-twice' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!showAdditionalFields) {
      // =================================================================
      // FIRST SUBMISSION: EMAIL ONLY - SUBSCRIBE TO BEEHIIV
      // Fallback to Google Sheets if Beehiiv fails
      // =================================================================
      
      // Validate email
      if (!form.email || !validateEmail(form.email)) {
        setEmailError('Please enter a valid work email address');
        return;
      }
      
      setEmailError('');
      setStatus('submitting');
      
      console.log('Subscribing email to Beehiiv via AWS Lambda...');
      
      try {
        const emailOnlyForm = { email: form.email };
        const formWithAttribution = addAttributionToForm(emailOnlyForm);
        
        let beehiivSuccess = false;
        
        // Try Beehiiv first
        try {
          const response = await fetch(`${AWS_API_BASE}/subscribe-beehiiv`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: form.email,
              industry: '',
              role: '',
              submissionType: 'email_only'
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ Successfully subscribed to Beehiiv newsletter:', result);
            beehiivSuccess = true;
          } else {
            const errorText = await response.text();
            console.error('⚠️ Beehiiv subscription failed (HTTP error):', errorText);
            beehiivSuccess = false;
          }
        } catch (beehiivNetworkError) {
          console.error('⚠️ Beehiiv subscription failed (network error):', beehiivNetworkError);
          beehiivSuccess = false;
        }
        
        // If Beehiiv failed, fallback to Google Sheets
        if (!beehiivSuccess) {
          console.log('Beehiiv failed, saving to Google Sheets as fallback...');
          try {
            const sheetsResponse = await fetch(`${AWS_API_BASE}/add-to-sheets`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: form.email,
                industry: '',
                role: '',
                timestamp: new Date().toISOString(),
                utm_source: formWithAttribution.utm_source || 'measure-twice-landing',
                utm_campaign: formWithAttribution.utm_campaign || 'measure-twice-newsletter',
                fallbackReason: 'beehiiv_failed'
              })
            });
            
            if (sheetsResponse.ok) {
              const sheetsResult = await sheetsResponse.json();
              console.log('Fallback to Google Sheets successful:', sheetsResult);
            } else {
              const errorText = await sheetsResponse.text();
              console.error('Google Sheets fallback also failed:', errorText);
            }
          } catch (sheetsError) {
            console.error('Google Sheets fallback error:', sheetsError);
          }
        }
        
        // Track the email-only submission (whether via Beehiiv or Sheets)
        if (tracking) {
          tracking('beehiiv_newsletter_subscribed', { 
            email: form.email,
            submissionType: 'email_only',
            method: beehiivSuccess ? 'beehiiv' : 'sheets_fallback'
          });
        }
        
        setStatus('idle');
        setShowAdditionalFields(true);
        
        // Focus on the first additional field
        setTimeout(() => {
          const industryField = document.getElementById('industry');
          if (industryField) {
            industryField.focus();
          }
        }, 100);
        
      } catch (err) {
        console.error('Unexpected error in first submission:', err);
        setStatus('error');
        setEmailError('There was an issue subscribing. Please try again.');
      }
      
      return;
    }

    // =================================================================
    // FINAL SUBMISSION: UPDATE BEEHIIV + SAVE TO SHEETS + SEND EMAIL
    // =================================================================
    console.log('📊 Processing final submission with industry context...');
    
    setStatus('submitting');
    
    try {
      const formWithAttribution = addAttributionToForm(form);
      let beehiivSuccess = false;
      
      // 1. Update Beehiiv subscriber with industry/role
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
            submissionType: 'complete'
          })
        });
        
        if (beehiivResponse.ok) {
          const beehiivResult = await beehiivResponse.json();
          console.log('Beehiiv profile updated:', beehiivResult);
          beehiivSuccess = true;
        } else {
          const errorText = await beehiivResponse.text();
          console.error('Beehiiv update failed:', errorText);
        }
      } catch (beehiivError) {
        console.error('Beehiiv update error:', beehiivError);
      }
      
      // 2. Save to Google Sheets via AWS Lambda (always, or as fallback if Beehiiv fails)
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
            utm_campaign: formWithAttribution.utm_campaign || 'measure-twice-newsletter',
            fallbackReason: beehiivSuccess ? null : 'beehiiv_failed'
          })
        });
        
        if (sheetsResponse.ok) {
          const sheetsResult = await sheetsResponse.json();
          console.log('Google Sheets save successful:', sheetsResult);
        } else {
          const errorText = await sheetsResponse.text();
          console.error('Google Sheets save failed:', errorText);
        }
      } catch (sheetsError) {
        console.error('Google Sheets save error:', sheetsError);
      }
      
      // 3. Send email notification via EmailJS
      console.log('Sending industry context email via EmailJS...');
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
        console.error('EmailJS error:', emailError);
      }
      
      // Set status to success (this will show the green checkmark)
      setStatus('success');
      
      if (tracking) {
        tracking('industry_context_completed', {
          email: form.email,
          industry: form.industry,
          role: form.role,
          beehiivSuccess: beehiivSuccess
        });
      }
      
      // Push to data layer
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
          callback: () => {
            console.log('Data layer pushed successfully');
          },
          timeout: 1000
        });
      } catch (dataLayerError) {
        console.warn('Data layer push failed (non-blocking):', dataLayerError);
      }
      
    } catch (err) {
      setStatus('error');
      console.error('Failed to complete submission:', err);
      if (tracking) {
        tracking('lead_submit_error', { message: String(err) });
      }
    }
  };

  const isDisabled = status === 'submitting';
  const isSuccess = status === 'success';

  // =================================================================
  // SUCCESS STATE - Show green checkmark
  // =================================================================
  if (isSuccess && showAdditionalFields) {
    return (
      <div className={styles.formCard}>
        <div className={styles.successContainer}>
          <div className={styles.checkmarkCircle}>
            <svg 
              className={styles.checkmark} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className={styles.successTitle}>You're all set!</h2>
          <p className={styles.successMessage}>
            You signed up for Measure Twice! Check your inbox for the welcome letter. Or read it below.
          </p>
          <p className={styles.successSubtext}>
            If you want to talk more, send us an email at info@measuresai.com
          </p>
        </div>
      </div>
    );
  }

  // =================================================================
  // NORMAL FORM STATE
  // =================================================================
  return (
    <form className={styles.formCard} onSubmit={onSubmit} id="measure-twice-form">
      {!showAdditionalFields ? (
        <div className={styles.attractiveLine}>
          Join operators, builders, and analysts who want to measure what actually matters.
        </div>
      ) : (
        <div className={styles.oneMoreThing}>
          You're in! One more thing...
        </div>
      )}

      {/* EMAIL FIELD - Hidden after first submission */}
      <div className={`${styles.row} ${showAdditionalFields ? styles.hiddenRow : styles.visibleRow}`}>
        <label className={styles.label} htmlFor="email">
          Work email
        </label>
        <input 
          className={`${styles.input} ${emailError ? styles.inputError : ''}`} 
          id="email" 
          name="email" 
          type="text"
          inputMode="email"
          required 
          value={form.email} 
          onChange={onChange} 
          placeholder="your@company.com"
          disabled={isDisabled}
        />
        {emailError && (
          <span className={styles.errorText}>{emailError}</span> 
        )}
      </div>

      {/* ADDITIONAL FIELDS - Industry & Role */}
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
              placeholder="e.g., SaaS, Retail, Finance"
              disabled={isDisabled}
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
              placeholder="e.g., Product Lead, Founder, CMO"
              disabled={isDisabled}
            />
          </div>
        </>
      )}

      {/* LOADING STATE */}
      {status === 'submitting' && (
        <div className={styles.loadingState}>
          <span className={styles.spinner}></span>
          <span className={styles.loadingText}>
            {showAdditionalFields ? 'Writing that down...' : 'Signing you up...'}
          </span>
        </div>
      )}

      {/* ERROR STATE */}
      {status === 'error' && (
        <div className={styles.errorMessage}>
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      {/* SUBMIT BUTTON */}
      {status !== 'submitting' && status !== 'error' && (
        <button 
          className={styles.button} 
          type="submit" 
          disabled={isDisabled}
        >
          {showAdditionalFields ? 'Personalize your Insights' : 'Subscribe'}
        </button>
      )}

      {/* HINT TEXT - Different based on step */}
      {status !== 'submitting' && (
        <div className={styles.hint}>
          {showAdditionalFields 
            ? 'This helps us tailor insights to your role and industry.'
            : 'We\'ll only use this to send you our newsletter.'
          }
        </div>
      )}
    </form>
  );
};

export default MeasureTwiceForm;