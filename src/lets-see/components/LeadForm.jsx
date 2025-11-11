import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { addAttributionToForm, getFormVariant, getLeadType, getLeadValue, pushLeadToDataLayer } from '../utils/dataLayer';
import styles from './LeadForm.module.css';
import { useTracking } from './TrackingProvider';

const EMAILJS_SERVICE_ID = (typeof window !== 'undefined' && (window.EMAILJS_SERVICE_ID || (window.__ENV && window.__ENV.EMAILJS_SERVICE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID);
const EMAILJS_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
const EMAILJS_LANDING_PAGES_TEMPLATE_ID = (typeof window !== 'undefined' && (window.EMAILJS_LANDING_PAGES_TEMPLATE_ID || (window.__ENV && window.__ENV.EMAILJS_LANDING_PAGES_TEMPLATE_ID))) || (import.meta.env && import.meta.env.VITE_EMAILJS_LANDING_PAGES_TEMPLATE_ID);
const EMAILJS_PUBLIC_KEY = (typeof window !== 'undefined' && (window.EMAILJS_PUBLIC_KEY || (window.__ENV && window.__ENV.EMAILJS_PUBLIC_KEY))) || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// AWS API Gateway endpoint - Your API Gateway Invoke URL
// Find this in: AWS Console > API Gateway > Your API > Stages > Invoke URL
const AWS_API_BASE = 'https://rnp1bexup2.execute-api.us-east-1.amazonaws.com';

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
      
      // 1. Send email via EmailJS
      console.log('📧 Sending email notification...');
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_LANDING_PAGES_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      console.log('✅ Email sent successfully');
      
      // 2. Subscribe to Beehiiv newsletter via AWS Lambda
      console.log('🐝 Subscribing to Beehiiv newsletter...');
      try {
        const beehiivResponse = await fetch(`${AWS_API_BASE}/subscribe-beehiiv`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            industry: industry || '',
            role: role || '',
            submissionType: 'initial' // Change to 'email_only' if you want Beehiiv to send welcome email
          })
        });
        
        if (beehiivResponse.ok) {
          const beehiivResult = await beehiivResponse.json();
          console.log('✅ Beehiiv subscription successful:', beehiivResult);
        } else {
          const errorText = await beehiivResponse.text();
          console.error('⚠️ Beehiiv subscription failed (status ' + beehiivResponse.status + '):', errorText);
        }
      } catch (beehiivError) {
        console.error('⚠️ Beehiiv subscription error (continuing anyway):', beehiivError.message);
        // Don't fail the whole form if Beehiiv fails - user experience comes first
      }
      
      // 3. Save to Google Sheets via AWS Lambda
      console.log('📊 Saving to Google Sheets...');
      try {
        const sheetsResponse = await fetch(`${AWS_API_BASE}/add-to-sheets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            industry: industry || '',
            role: role || '',
            timestamp: new Date().toISOString(),
            utm_source: 'measure-twice-landing',
            utm_campaign: 'measure-twice-newsletter'
          })
        });
        
        if (sheetsResponse.ok) {
          const sheetsResult = await sheetsResponse.json();
          console.log('✅ Google Sheets save successful:', sheetsResult);
        } else {
          const errorText = await sheetsResponse.text();
          console.error('⚠️ Google Sheets save failed (status ' + sheetsResponse.status + '):', errorText);
        }
      } catch (sheetsError) {
        console.error('⚠️ Google Sheets save error (continuing anyway):', sheetsError.message);
        // Don't fail the whole form if Sheets fails
      }
      
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
        console.log('🎉 Form submission complete! Redirecting to:', thankYouUrl);
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
      console.error('❌ Form submission failed:', err);
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