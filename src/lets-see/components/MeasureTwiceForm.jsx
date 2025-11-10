import React, { useEffect, useState } from 'react';
import styles from './MeasureTwiceForm.module.css';
import emailjs from '@emailjs/browser';
import { useTracking } from './TrackingProvider';
import { pushLeadToDataLayer, addAttributionToForm, getLeadType, getLeadValue, getFormVariant } from '../utils/dataLayer';

const EMAILJS_SERVICE_ID = (typeof window !== 'undefined' && (window.EMAILJS_SERVICE_ID || (window.__ENV && window.__ENV.EMAILJS_SERVICE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID);
const EMAILJS_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
const EMAILJS_LANDING_PAGES_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_LANDING_PAGES_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_LANDING_PAGES_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_LANDING_PAGES_TEMPLATE_ID);
const EMAILJS_PUBLIC_KEY = (typeof window !== 'undefined' && (window.EMAILJS_PUBLIC_KEY || (window.__ENV && window.__ENV.EMAILJS_PUBLIC_KEY))) || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

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
      // First submission - show additional fields
      setShowAdditionalFields(true);
      // Focus on the first additional field
      setTimeout(() => {
        const industryField = document.getElementById('industry');
        if (industryField) {
          industryField.focus();
        }
      }, 100);
      return;
    }

    // Final submission
    setStatus('submitting');
    try {
      // Add attribution data to form
      const formWithAttribution = addAttributionToForm(form);
      
      const templateParams = {
        ...formWithAttribution,
        slug: 'measure-twice',
        cta: 'Subscribe to Newsletter',
        headline: 'Measure Twice Newsletter',
        story: 'Newsletter subscription'
      };
      
      // Send email first
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_LANDING_PAGES_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus('success');
      if (tracking) tracking('lead_submit', templateParams);
      
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
          📧 Get the insights that matter – straight to your inbox
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
