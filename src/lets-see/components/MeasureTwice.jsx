import React, { useState, useEffect } from 'react';
import styles from './MeasureTwice.module.css';
import { TrackingProvider } from './TrackingProvider';
import { Header } from './Header';
import { MeasureTwiceForm } from './MeasureTwiceForm';

export const MeasureTwice = ({ config }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('measure-twice-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      // Focus on the first input field
      const firstInput = formElement.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <Header />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.heroSection}>
              {isMobile ? (
                // Mobile layout: content above form
                <>
                  <div className={styles.contentSection}>
                    <div className={styles.topline}>
                      Reviews, social media, <br/> emails, calls, and buyer behavior.
                    </div>
                    <h1 className={styles.heading}>
                      <span className={styles.measureBold}>Measure</span>{' '}
                      <span className={styles.twiceSemibold}>Twice</span>{' '}
                      <span className={styles.newsletterRegular}>Newsletter</span>
                    </h1>
                    <p className={styles.description}>
                      Turning millions of documents<br/>
                      across 10 industries<br/>
                      into a handful of<br/>
                      good ideas.
                    </p>
                  </div>
                  <div className={styles.formSection}>
                    <MeasureTwiceForm config={config} />
                  </div>
                </>
              ) : (
                // Desktop layout: form on left, content on right
                <>
                  <div className={styles.formSection}>
                    <MeasureTwiceForm config={config} />
                  </div>
                  <div className={styles.contentSection}>
                    <div className={styles.topline}>
                      Reviews, social media, <br/> emails, calls, and buyer behavior.
                    </div>
                    <h1 className={styles.heading}>
                      <span className={styles.measureBold}>Measure</span>{' '}
                      <span className={styles.twiceSemibold}>Twice</span>{' '}
                      <span className={styles.newsletterRegular}>Newsletter</span>
                    </h1>
                    <p className={styles.description}>
                      Turning millions of documents<br/>
                      across 10 industries<br/>
                      into a handful of<br/>
                      good ideas.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className={styles.contentBlock}>
              <h2 className={styles.contentTitle}>How we measure everything.</h2>
              <div className={styles.contentText}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                
                <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                
                <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
                
                <p>Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                
                <p>Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio nam libero tempore.</p>
              </div>
              
              <button className={styles.subscribeButton} onClick={scrollToForm}>
                Subscribe
              </button>
            </div>
          </div>
        </main>
        
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};
