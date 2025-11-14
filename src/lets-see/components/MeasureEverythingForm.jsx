import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { pushLeadToDataLayer } from '../utils/dataLayer';
import styles from './MeasureEverythingForm.module.css';

const CALCOM_USERNAME = import.meta.env.VITE_CALCOM_USERNAME || 'measures-ai';
const CALCOM_EVENT_SLUG = import.meta.env.VITE_CALCOM_EVENT_SLUG || 'demo';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const MeasureEverythingForm = ({ config }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [status, setStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (showCalendar) {
      (async function () {
        const cal = await getCalApi();
        cal("ui", { 
          theme: "dark",
          styles: {
            branding: { brandColor: config?.themeColor || "#7ecbff" }
          }
        });
      })();
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCalendar, config]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Please enter your name';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'Please enter your email address';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setStatus('loading');

    try {
      // Track lead
      try {
        pushLeadToDataLayer({
          leadType: config?.tracking?.leadType || 'Demo Request',
          userData: formData,
          formData: { 
            id: 'measure-everything-form', 
            name: 'measure_everything',
            variant: config?.tracking?.formVariant || 'A'
          },
          value: config?.tracking?.leadValue || 150,
          currency: 'USD',
          pageConfig: {
            slug: 'measure-everything',
            cta: config?.cta || 'Get Started'
          }
        });
      } catch (dataLayerError) {
        console.warn('Data layer push failed:', dataLayerError);
      }

      setShowCalendar(true);
      setStatus('');
    } catch (error) {
      setStatus('error');
      console.error('Form submission failed:', error);
    }
  };

  const closeModal = () => {
    setShowCalendar(false);
    setIsSuccess(true);
  };

  // SUCCESS STATE - Show green checkmark
  if (isSuccess) {
    return (
      <div className={styles.formContainer} id="measure-everything-form">
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
          <h2 className={styles.successTitle}>Thanks, {formData.name}!</h2>
          <p className={styles.successMessage}>
            We received your demo request and will contact you within 24 hours.
          </p>
          <p className={styles.successSubtext}>
            Questions? Email us at <span className={styles.emailAddress}>info@measuresai.com</span>
          </p>
        </div>
      </div>
    );
  }

  // Modal component to be rendered via portal
  const modalContent = showCalendar ? (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={closeModal} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalHeadline}>
            We'll be in touch, {formData.name}!
          </h2>
          <p className={styles.modalSubtext}>
            Want to schedule something now? Pick a time below.
          </p>
        </div>
        
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
            style={{ width: "100%", height: "100%", overflow: "auto" }}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className={styles.formContainer} id="measure-everything-form">
        <h2 className={styles.formHeadline}>Book a Demo</h2>
        <p className={styles.formSubtext}>
          Let us show you how Measures AI can transform your business
        </p>
        
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
            className={styles.submitButton}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Loading...' : config?.cta || 'Never read a transcript again'}
          </button>

          {status === 'error' && (
            <div className={styles.errorMessage}>
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>

      {/* Render modal via Portal to document.body */}
      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};