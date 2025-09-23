import React, { useEffect, useState } from 'react';
import styles from './LeadForm.module.css';
import emailjs from '@emailjs/browser';
import { useTracking } from './TrackingProvider';
import { pushLeadToDataLayer, addAttributionToForm, getLeadType, getLeadValue, getFormVariant } from '../utils/dataLayer';

const EMAILJS_SERVICE_ID = (typeof window !== 'undefined' && (window.EMAILJS_SERVICE_ID || (window.__ENV && window.__ENV.EMAILJS_SERVICE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID);
const EMAILJS_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
const EMAILJS_LANDING_PAGES_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_LANDING_PAGES_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_LANDING_PAGES_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_LANDING_PAGES_TEMPLATE_ID);
const EMAILJS_PUBLIC_KEY = (typeof window !== 'undefined' && (window.EMAILJS_PUBLIC_KEY || (window.__ENV && window.__ENV.EMAILJS_PUBLIC_KEY))) || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const LeadForm = ({ role, industry, cta, fields, themeColor, headline, story, slug, onSuccess, pageConfig = {} }) => {
  // Initialize form state based on provided fields or defaults
  const defaultFields = [
    { title: 'name', type: 'text', placeholder: 'Your name' },
    { title: 'company', type: 'text', placeholder: 'Your company' },
    { title: 'email', type: 'email', placeholder: 'Your email' }
  ];
  
  const formFields = fields && fields.length > 0 ? fields : defaultFields;
  
  const initialFormState = formFields.reduce((acc, field) => {
    acc[field.title] = '';
    return acc;
  }, {});
  
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState('idle');
  const tracking = useTracking();

  useEffect(() => {
    if (tracking) tracking('lead_form_view', { role, industry });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Add attribution data to form
      const formWithAttribution = addAttributionToForm(form);
      
      const templateParams = {
        ...formWithAttribution,
        role: role || '',
        industry: industry || '',
        headline: headline || '',
        story: Array.isArray(story) ? story.join(' ') : (story || ''),
        slug: slug || '',
        cta: cta || '',
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
        
        const thankYouUrl = `/lets-see/${slug}/thank-you?${params.toString()}`;
        window.location.href = thankYouUrl;
      };
      
      // Push to data layer with callback for redirect
      const currentPageConfig = {
        ...pageConfig,
        role: role || pageConfig.role,
        industry: industry || pageConfig.industry,
        slug: slug || pageConfig.slug,
        cta: cta || pageConfig.cta
      };
      
      try {
        pushLeadToDataLayer({
          leadType: getLeadType(currentPageConfig),
          userData: form,
          formData: {
            id: `lead-form-${slug}`,
            name: `${slug}_demo`,
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
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus('error');
      if (tracking) tracking('lead_submit_error', { message: String(err) });
      alert('Submission failed. Please try again.');
    }
  };

  const isDisabled = status === 'submitting';

  return (
    <form className={styles.formCard} onSubmit={onSubmit}>
      {formFields.map((field) => (
        <div key={field.title} className={styles.row}>
          <label className={styles.label} htmlFor={field.title}>
            {field.title === 'name' ? 'Full name' :
             field.title === 'company' ? 'Company name' :
             field.title === 'email' ? 'Work email' :
             field.title.charAt(0).toUpperCase() + field.title.slice(1)}
          </label>
          <input 
            className={styles.input} 
            id={field.title} 
            name={field.title} 
            type={field.type} 
            required 
            value={form[field.title] || ''} 
            onChange={onChange} 
            placeholder={field.placeholder}
          />
        </div>
      ))}
      <button 
        className={styles.button} 
        type="submit" 
        disabled={isDisabled}
        style={{ backgroundColor: themeColor || '#4f46e5' }}
      >
        {status === 'submitting' ? 'Submitting…' : (cta || 'Request demo')}
      </button>
      <div className={styles.hint}>We'll only use this to contact you about your demo.</div>
    </form>
  );
};

export default LeadForm;
