import Cal, { getCalApi } from "@calcom/embed-react";
import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { addAttributionToForm, pushLeadToDataLayer } from '../lets-see/utils/dataLayer';
// import { pushLeadToDataLayer } from '../lets-see/utils/dataLayer';
import styles from './ContactForm.module.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CALCOM_USERNAME = import.meta.env.VITE_CALCOM_USERNAME || 'measures-ai';
const CALCOM_EVENT_SLUG = import.meta.env.VITE_CALCOM_EVENT_SLUG || 'demo';

// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const DemoBooking = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [status, setStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (showCalendar) {
      (async function () {
        const cal = await getCalApi();
        cal("ui", { 
          theme: "dark",
          styles: {
            branding: { brandColor: "#ffffff" }
          }
        });
      })();
    }
  }, [showCalendar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Please enter your name';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'Please enter your email address';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // If there are errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setStatus('loading');

    try {
      // EMAIL SENDING - COMMENTED OUT FOR TESTING
      const formWithAttribution = addAttributionToForm(formData, 'Demo Booking Form');
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formWithAttribution, PUBLIC_KEY);

      // Track lead
      try {
        pushLeadToDataLayer({
          leadType: 'Demo Request',
          userData: formData,
          formData: { 
            id: 'demo-form', 
            name: 'demo_booking',
            variant: 'inline_embed'
          },
          value: parseInt(import.meta.env.VITE_DEFAULT_LEAD_VALUE || '100', 10),
          currency: 'USD',
          pageConfig: {
            slug: 'demo',
            cta: 'Book Demo'
          }
        });
      } catch (dataLayerError) {
        console.warn('Data layer push failed:', dataLayerError);
      }

      // Show calendar
      setShowCalendar(true);
      setStatus('');
    } catch (error) {
      setStatus('error');
      console.error('Form submission failed:', error);
    }
  };

  if (showCalendar) {
    return (
      <div className={styles.container}>
        <div className={styles.calendarSection}>
          <h2 className={styles.headline}>We'll be in touch,<br></br>{formData.name}!</h2>
          <p className={styles.subtext}>
            Want to schedule something now? Pick a time below.
          </p>
          
          <div className={styles.calendarWrapper}>
            <Cal
              calLink={`${CALCOM_USERNAME}/${CALCOM_EVENT_SLUG}`}
              config={{
                layout: 'column_view',
                theme: 'dark',
                prefill: {
                  name: formData.name,
                  email: formData.email,
                  ...(formData.company && { 
                    metadata: { company: formData.company } 
                  })
                }
              }}
              style={{ width: "100%", minHeight: "600px" }}
            />
          </div>

          <div className={styles.alternativeOptions}>
            <p className={styles.alternativeText}>
              We'll reach out within 24 hours if you don't schedule a time.<br></br>
              Or email us directly at <span className={styles.emailAddress}>info@measuresai.com</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.headline}>Book a Demo</h2>
        <p className={styles.subtext}>Let us show you how Measures AI can change your business</p>
        
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${formErrors.name ? styles.inputError : ''}`}
            />
            {formErrors.name && (
              <span className={styles.errorText}>{formErrors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Work email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
            />
            {formErrors.email && (
              <span className={styles.errorText}>{formErrors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="company"
              placeholder="Company name (optional)"
              value={formData.company}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Loading...' : 'Get in Touch'}
          </button>

          {status === 'error' && (
            <div className={styles.errorMessage}>
              <span>Something went wrong. Please try again.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DemoBooking;