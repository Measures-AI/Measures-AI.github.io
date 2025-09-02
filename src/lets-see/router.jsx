import React, { useMemo } from 'react';
import { LandingPage } from './template/LandingPage';
import { getLandingConfigFromPath } from './utils/config';

export const LandingRouter = () => {
  const { pathname, search } = window.location;
  const config = useMemo(() => getLandingConfigFromPath(pathname, search), [pathname, search]);
  return <LandingPage config={config} />;
};
