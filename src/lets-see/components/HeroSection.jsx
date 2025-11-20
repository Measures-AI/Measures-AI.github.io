import { DemoCard } from './DemoCard';
import styles from './HeroSection.module.css';
import { LeadForm } from './LeadForm';
import { MeasureEverythingForm } from './MeasureEverythingForm';

export const HeroSection = ({ 
  headline, 
  story, 
  points,
  belowPoints,
  fields, 
  demoData,
  role,
  industry,
  cta,
  themeColor,
  slug,
  pageConfig
}) => {
  // Check if this is the measure-everything page
  const isMeasureEverything = true;

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.heroGrid}>
          <div className={styles.leftContent}>
            <h1 className={styles.headline}>{headline}</h1>
            <p className={styles.story}>{story}</p>
            
            {points && points.length > 0 && (
              <div className={styles.points}>
                {points.map((point, index) => (
                  <div key={index} className={styles.point}>
                    {point.icon && (
                      <i className={`fas fa-${point.icon} ${styles.pointIcon}`} 
                         style={{ color: themeColor }}></i>
                    )}
                    <span className={styles.pointText}>{point.text}</span>
                  </div>
                ))}
              </div>
            )}

            {belowPoints && (
              <p className={styles.belowPoints}>{belowPoints}</p>
            )}
          </div>

          <div className={styles.rightContent}>
            {isMeasureEverything ? (
              // Show the new calendar-switching form
              <div className={styles.formContainer}>
                <MeasureEverythingForm config={pageConfig} />
              </div>
            ) : demoData ? (
              // Show demo card for other pages
              <DemoCard {...demoData} themeColor={themeColor} />
            ) : (
              // Show regular lead form as fallback
              <div className={styles.formContainer}>
                <LeadForm 
                  fields={fields}
                  cta={cta}
                  role={role}
                  industry={industry}
                  themeColor={themeColor}
                  slug={slug}
                  pageConfig={pageConfig}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};