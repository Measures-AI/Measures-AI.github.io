import React, { useMemo } from 'react';
import { LandingPage } from './template/LandingPage';
import { getLandingConfigFromPath } from './utils/config';

export const LandingRouter = () => {
  const { pathname, search } = window.location;
  
  // Check if we have a preloaded configuration from SSR
  const preloadedConfig = typeof window !== 'undefined' ? window.__PRELOADED_CONFIG__ : null;
  
  const config = useMemo(() => {
    // Use preloaded config if available, otherwise fallback to dynamic loading
    return preloadedConfig || getLandingConfigFromPath(pathname, search);
  }, [pathname, search, preloadedConfig]);
  
  // Handle redirect case (config will be null)
  if (!config) {
    return null;
  }
  
  return <LandingPage config={config} />;
};
