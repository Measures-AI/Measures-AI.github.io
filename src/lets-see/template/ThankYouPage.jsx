import React, { useState, useEffect, useMemo } from 'react';
import styles from './ThankYouPage.module.css';
import { TrackingProvider } from '../components/TrackingProvider';
import { Header } from '../components/Header';
import { useTracking } from '../components/TrackingProvider';

// Cal.com configuration from environment variables
const CALCOM_USERNAME = (typeof window !== 'undefined' && (window.CALCOM_USERNAME || (window.__ENV && window.__ENV.CALCOM_USERNAME))) || (import.meta.env && import.meta.env.VITE_CALCOM_USERNAME) || 'measures-ai';
const CALCOM_EVENT_SLUG = (typeof window !== 'undefined' && (window.CALCOM_EVENT_SLUG || (window.__ENV && window.__ENV.CALCOM_EVENT_SLUG))) || (import.meta.env && import.meta.env.VITE_CALCOM_EVENT_SLUG) || 'demo';

export const ThankYouPage = ({ config }) => {
  const {
    role,
    industry,
    headline,
    story,
    themeColor
  } = config || {};

  const [formData, setFormData] = useState({});
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

  // Build Cal.com iframe URL with prefilled data
  const calIframeUrl = useMemo(() => {
    const baseUrl = `https://cal.com/${CALCOM_USERNAME}/${CALCOM_EVENT_SLUG}`;
    const params = new URLSearchParams();
    
    // Add embed parameters
    params.set('embed', 'true');
    params.set('theme', 'light');
    params.set('hideEventTypeDetails', 'false');
    params.set('layout', 'month_view');
    
    // Add user data
    if (formData.name) params.set('name', formData.name);
    if (formData.email) params.set('email', formData.email);
    if (formData.company) params.set('metadata[company]', formData.company);
    
    return `${baseUrl}?${params.toString()}`;
  }, [formData]);

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
                <p className={styles.callToAction}>
                  Let's book something now to see if we're a fit.
                </p>
              </div>
            </div>

            <div className={styles.bookingSection}>
              <div className={styles.bookingContainer}>
                {/* Cal.com Iframe Widget */}
                <div className={styles.calContainer}>
                  <iframe
                    src={calIframeUrl}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Schedule a meeting"
                    className={styles.calIframe}
                    referrerPolicy="no-referrer-when-downgrade"
                    allow="payment *; clipboard-read *; clipboard-write *; microphone *; camera *;"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Alternative booking options */}
            <div className={styles.alternativeOptions}>
              <p className={styles.alternativeText}>
                Having trouble with the calendar?
              </p>
              <a 
                href={`mailto:info@measuresai.com?subject=Demo Request - ${formData.company || 'Company'}&body=Hi, I'd like to schedule a demo.%0D%0A%0D%0AName: ${formData.name || ''}%0D%0ACompany: ${formData.company || ''}%0D%0AEmail: ${formData.email || ''}`}
                className={styles.emailButton}
                style={{ backgroundColor: themeColor || '#4f46e5' }}
              >
                Send us an email instead
              </a>
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
