import { useEffect, useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { QuoteSection } from '../components/QuoteSection';
import { TrackingProvider } from '../components/TrackingProvider';
import { applyUtmOverrides } from '../utils/dataLayer';
import styles from './LandingPage.module.css';

export const LandingPage = ({ config }) => {
  const configWithUtmOverrides = useMemo(() => {
    return config ? applyUtmOverrides(config) : {};
  }, [config]);

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
  } = configWithUtmOverrides;

  const [isMobile, setIsMobile] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  const slug = useMemo(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 1 ? parts[1] : '';
  }, []);

  // Check if this is measure-everything page for sticky footer
  const isMeasureEverything = slug === 'measure-everything';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sticky footer logic
  useEffect(() => {
    if (!isMeasureEverything) return;

    const handleScroll = () => {
      const formElement = document.getElementById('measure-everything-form');
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const isFormOffScreen = formRect.bottom < 0;
        setShowStickyFooter(isFormOffScreen);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMeasureEverything]);

  const scrollToForm = () => {
    const formElement = document.getElementById('measure-everything-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      const firstInput = formElement.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

  const visibleSections = (typedSections || []).filter(section => 
    isMobile ? section.mobile !== false : true
  );

  const renderTypedSection = (section, index) => {
    switch (section.type) {
      // case 'process':
      //   return (
      //     <ProcessSection
      //       key={index}
      //       title={section.title}
      //       subtitle={section.subtitle}
      //       items={section.items}
      //     />
      //   );
      
      // case 'caseStudy':
      //   return (
      //     <CaseStudySection
      //       key={index}
      //       leftImage={section.leftImage}
      //       logoImage={section.logoImage}
      //       logoAlt={section.logoAlt}
      //       headline={section.headline}
      //       story={section.story}
      //       quote={section.quote}
      //       author={section.author}
      //       quoteRole={section.role}
      //       link={section.link}
      //       role={role}
      //       industry={industry}
      //       cta={cta}
      //       themeColor={themeColor}
      //       pageHeadline={headline}
      //       pageStory={story}
      //       slug={slug}
      //       pageConfig={configWithUtmOverrides}
      //     />
      //   );
      
      // case 'featureRows':
      //   return (
      //     <FeatureRowsSection
      //       key={index}
      //       title={section.title}
      //       subtitle={section.subtitle}
      //       rows={section.rows}
      //     />
      //   );
      
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
          pageConfig={configWithUtmOverrides}
        />
        
        {/* Render quote section here, before logos */}
        {visibleSections
          .filter(section => section.type === 'quote')
          .map(renderTypedSection)}
        
        {/* {logos && logos.length > 0 && (
          <LogosBanner logos={logos} />
        )} */}
        
        {/* Render all other sections except quote */}
        {/* {visibleSections
          .filter(section => section.type !== 'quote')
          .map(renderTypedSection)} */}
        
        {/* <BottomCTA
          title={bottomCta?.title}
          copy={bottomCta?.copy}
          role={role}
          industry={industry}
          cta={cta}
          themeColor={themeColor}
          headline={headline}
          story={story}
          slug={slug}
          pageConfig={configWithUtmOverrides}
        /> */}

        {/* Sticky Footer for Measure Everything page */}
        {isMeasureEverything && (
          <div className={`${styles.stickyFooter} ${showStickyFooter ? styles.show : ''}`}>
            <div className={styles.stickyFooterContent}>
              <button className={styles.stickyButton} onClick={scrollToForm}>
                <i className="fas fa-arrow-up"></i> Back to Form
              </button>
            </div>
          </div>
        )}
        
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};