import React, { createContext, useContext, useEffect, useMemo } from 'react';

const TrackingContext = createContext(null);

function readKey(preferredWindowKeys, envKey) {
  for (const k of preferredWindowKeys) {
    if (typeof window !== 'undefined' && window[k]) return window[k];
    if (typeof window !== 'undefined' && window.__ENV && window.__ENV[k]) return window.__ENV[k];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[envKey]) return import.meta.env[envKey];
  return undefined;
}

const GA_ID = readKey(['GA_MEASUREMENT_ID', 'GA_ID'], 'VITE_GA_MEASUREMENT_ID');
const GADS_ID = readKey(['AW_CONVERSION_ID', 'GADS_ID'], 'VITE_AW_CONVERSION_ID');
const META_PIXEL_ID = readKey(['META_PIXEL_ID', 'FB_PIXEL_ID'], 'VITE_META_PIXEL_ID');
const LINKEDIN_PARTNER_ID = readKey(['LINKEDIN_PARTNER_ID'], 'VITE_LINKEDIN_PARTNER_ID');
// Reb2B is already loaded in index.html; only read a key if one is provided globally or via env
const REB2B_KEY = readKey(['RB2B_KEY', 'REB2B_KEY'], 'VITE_RB2B_KEY');

function injectScript(src, id) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  s.id = id;
  document.head.appendChild(s);
}

export const TrackingProvider = ({ children }) => {
  useEffect(() => {
    // Google Analytics 4
    if (GA_ID) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      // eslint-disable-next-line no-undef
      window.gtag = gtag;
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, 'ga4-script');
      gtag('js', new Date());
      gtag('config', GA_ID);
    }

    // Google Ads conversion (gtag used above)
    if (GADS_ID && window.gtag) {
      window.gtag('config', GADS_ID);
    }

    // Meta Pixel
    if (META_PIXEL_ID) {
      (function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', META_PIXEL_ID);
    }

    // LinkedIn Insight Tag
    if (LINKEDIN_PARTNER_ID) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
      (function(){var s = document.getElementsByTagName('script')[0];
      var b = document.createElement('script'); b.type = 'text/javascript'; b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'; s.parentNode.insertBefore(b, s);})();
    }

    // Reb2b (already in index.html). If needed, you can set key here; prefer already loaded.
    if (REB2B_KEY && window.reb2b && window.reb2b.load) {
      try { window.reb2b.load(REB2B_KEY); } catch (_) {}
    }
  }, []);

  const fire = useMemo(() => {
    return (eventName, payload) => {
      // GA
      if (window.gtag) {
        window.gtag('event', eventName, payload || {});
      }
      // Meta
      if (window.fbq) {
        window.fbq('trackCustom', eventName, payload || {});
      }
      // LinkedIn
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: eventName, ...payload });
      }
      // Reb2b
      if (window.reb2b && window.reb2b.collect) {
        window.reb2b.collect({ event: eventName, ...(payload || {}) });
      }
    };
  }, []);

  return (
    <TrackingContext.Provider value={fire}>
      {children}
    </TrackingContext.Provider>
  );
};

export function useTracking() {
  return useContext(TrackingContext);
}
