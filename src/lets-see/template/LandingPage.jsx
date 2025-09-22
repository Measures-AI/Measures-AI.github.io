import React, { useState, useEffect, useMemo } from 'react';
import styles from './LandingPage.module.css';
import { TrackingProvider } from '../components/TrackingProvider';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { LogosBanner } from '../components/LogosBanner';
import { ProcessSection } from '../components/ProcessSection';
import { CaseStudySection } from '../components/CaseStudySection';
import { FeatureRowsSection } from '../components/FeatureRowsSection';
import { QuoteSection } from '../components/QuoteSection';
import { BottomCTA } from '../components/BottomCTA';

export const LandingPage = ({ config }) => {
  const {
    role,
    industry,
    headline,
    story,
    points,
    belowPoints,
    fields,
    cta,
    demoData,
    logos,
    typedSections,
    bottomCta,
    themeColor
  } = config || {};

  const [isMobile, setIsMobile] = useState(false);

  // Extract slug from current URL
  const slug = useMemo(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 1 ? parts[1] : '';
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter sections for mobile
  const visibleSections = (typedSections || []).filter(section => 
    isMobile ? section.mobile !== false : true
  );

  const renderTypedSection = (section, index) => {
    switch (section.type) {
      case 'process':
        return (
          <ProcessSection
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
          />
        );
      
      case 'caseStudy':
        return (
          <CaseStudySection
            key={index}
            leftImage={section.leftImage}
            logoImage={section.logoImage}
            logoAlt={section.logoAlt}
            headline={section.headline}
            story={section.story}
            quote={section.quote}
            author={section.author}
            quoteRole={section.role}
            link={section.link}
            role={role}
            industry={industry}
            cta={cta}
            themeColor={themeColor}
            pageHeadline={headline}
            pageStory={story}
            slug={slug}
            pageConfig={config}
          />
        );
      
      case 'featureRows':
        return (
          <FeatureRowsSection
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            rows={section.rows}
          />
        );
      
      case 'quote':
        return (
          <QuoteSection
            key={index}
            text={section.text}
            author={section.author}
            role={section.role}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <Header />
        
        <HeroSection
          headline={headline}
          story={story}
          points={points}
          belowPoints={belowPoints}
          fields={fields}
          demoData={demoData}
          role={role}
          industry={industry}
          cta={cta}
          themeColor={themeColor}
          slug={slug}
          pageConfig={config}
        />
        
        {logos && logos.length > 0 && (
          <LogosBanner logos={logos} />
        )}
        
        {visibleSections.map(renderTypedSection)}
        
        <BottomCTA
          title={bottomCta?.title}
          copy={bottomCta?.copy}
          role={role}
          industry={industry}
          cta={cta}
          themeColor={themeColor}
          headline={headline}
          story={story}
          slug={slug}
          pageConfig={config}
        />
        
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};