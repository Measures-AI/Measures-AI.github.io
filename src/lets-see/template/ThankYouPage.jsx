import React, { useState, useEffect, useMemo } from 'react';
import styles from './ThankYouPage.module.css';
import { TrackingProvider } from '../components/TrackingProvider';
import { Header } from '../components/Header';
import { useTracking } from '../components/TrackingProvider';

export const ThankYouPage = ({ config }) => {
  const {
    role,
    industry,
    headline,
    story,
    themeColor
  } = config || {};

  const [formData, setFormData] = useState({});
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const tracking = useTracking();

  // Extract slug from current URL
  const slug = useMemo(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 1 ? parts[1] : '';
  }, []);

  // Extract form data from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of urlParams.entries()) {
      data[key] = decodeURIComponent(value);
    }
    setFormData(data);

    // Track thank you page view
    if (tracking) {
      tracking('thank_you_page_view', { 
        role, 
        industry, 
        slug,
        formData: data
      });
    }
  }, [tracking, role, industry, slug]);

  // Load Calendly widget
  useEffect(() => {
    let script = null;
    let link = null;

    // Only load if we haven't already and Calendly isn't already loaded
    if (!isCalendlyLoaded && !window.Calendly) {
      script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        setIsCalendlyLoaded(true);
        // Initialize after script loads
        setTimeout(initializeCalendly, 100);
      };
      document.head.appendChild(script);

      // Load Calendly CSS
      link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    } else if (window.Calendly) {
      setIsCalendlyLoaded(true);
      setTimeout(initializeCalendly, 100);
    }

    return () => {
      // Cleanup scripts if component unmounts
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (link && document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [formData]);

  const initializeCalendly = () => {
    if (window.Calendly) {
      const calendlyElement = document.querySelector('.calendly-inline-widget');
      if (calendlyElement) {
        // Initialize Calendly inline widget
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: calendlyElement,
          prefill: {
            email: formData.email || '',
            name: formData.name || '',
            customAnswers: {
              a1: formData.company || ''
            }
          }
        });
      }
    }
  };

  // Calendly URL - you can customize this or make it configurable per page
  const calendlyUrl = 'https://calendly.com/measures-ai/demo';

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <Header />
        
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.heroSection}>
              <div className={styles.textContent}>
                <h1 className={styles.headline}>
                  Thanks, {formData.name || 'there'}!
                </h1>
                <p className={styles.story}>
                  {headline}
                </p>
                <p className={styles.subtext}>
                  Let's schedule a quick demo to show you exactly how we can help {formData.company || 'your company'} {story?.toLowerCase() || 'achieve your goals'}.
                </p>
                
                {formData.email && (
                  <div className={styles.formDataSummary}>
                    <h3>Your information:</h3>
                    <ul>
                      {formData.name && <li><strong>Name:</strong> {formData.name}</li>}
                      {formData.company && <li><strong>Company:</strong> {formData.company}</li>}
                      {formData.email && <li><strong>Email:</strong> {formData.email}</li>}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.bookingSection}>
              <div className={styles.bookingContainer}>
                <h2 className={styles.bookingTitle}>Schedule Your Demo</h2>
                <p className={styles.bookingSubtext}>
                  Pick a time that works for you - we'll send a calendar invite to {formData.email || 'your email'}.
                </p>
                
                {/* Calendly Inline Widget */}
                <div className={styles.calendlyContainer}>
                  {!isCalendlyLoaded && (
                    <div className={styles.loadingState}>
                      <div className={styles.spinner}></div>
                      <p>Loading calendar...</p>
                    </div>
                  )}
                  <div 
                    className="calendly-inline-widget"
                    data-url={calendlyUrl}
                    style={{ 
                      minWidth: '320px', 
                      height: '700px',
                      display: isCalendlyLoaded ? 'block' : 'none'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Alternative booking options */}
            <div className={styles.alternativeOptions}>
              <p className={styles.alternativeText}>
                Having trouble with the calendar? 
                <a 
                  href={`mailto:hello@measuresai.com?subject=Demo Request - ${formData.company || 'Company'}&body=Hi, I'd like to schedule a demo.%0D%0A%0D%0AName: ${formData.name || ''}%0D%0ACompany: ${formData.company || ''}%0D%0AEmail: ${formData.email || ''}`}
                  className={styles.emailLink}
                  style={{ color: themeColor || '#4f46e5' }}
                >
                  Send us an email instead
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};
