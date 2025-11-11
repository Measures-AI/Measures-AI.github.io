import React, { useState, useEffect } from 'react';
import styles from './MeasureTwice.module.css';
import { TrackingProvider } from './TrackingProvider';
import { Header } from './Header';
import { MeasureTwiceForm } from './MeasureTwiceForm';

export const MeasureTwice = ({ config }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('measure-twice-form');
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const isFormOffScreen = formRect.bottom < 0;
        setShowStickyFooter(isFormOffScreen);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
              <h2 className={styles.contentTitle}>
                What is <span className={styles.measureBoldTitle}>Measure</span>{' '}
                <span className={styles.twiceSemiboldTitle}>Twice</span>?
              </h2>
              <div className={styles.contentText}>
                <p>Measure Twice is a newsletter that turns messy text from the internet into clean, usable insight.</p>
                
                <p>Every issue starts with a massive dataset: Google reviews from all hotels, reddit posts about major cities, BBB reports, and more: millions of words that nobody on your team will ever realistically read.</p>
                
                <p>We run that text through Measures AI engine and come back with something simple:</p>
                
                <ul>
                  <li>One main deep dive on a single industry</li>
                  <li>A few short insights from other industries, each with a sharp takeaway</li>
                  <li>All backed by hard numbers pulled from the language itself</li>
                </ul>
                
                <p>No fluffy summaries. Just the data hiding inside conversations.</p>
                
                <h3>Measures: How we get data from text</h3>
                
                <img 
                  src="/img/measures-process.png" 
                  alt="Measures AI process for extracting data from text" 
                  className={styles.processImage}
                />
                
                <p>Most of your customer reality lives in text: complaints in reviews, objections in emails, praise in chats, confusion in support tickets. Very little gets put in a single place.</p>
                
                <p>We:</p>
                
                <ul>
                  <li><strong>Ingest the text:</strong> emails, chats, calls, reviews, whatever.</li>
                  <li><strong>Measure the hard ideas:</strong> price points, objections, requests, compliments, features, churn signals.</li>
                  <li><strong>Normalize it:</strong> clean categories and fields that can actually be counted and plotted.</li>
                  <li><strong>Aggregate and compare:</strong> across companies, products, time, and segments.</li>
                </ul>
                
                <p>So instead of "a million reviews say 3.5/5," you get answers to questions like:</p>
                
                <ul>
                  <li>What complaints show up most for each segment of the industry?</li>
                  <li>Which customer traits correlate with higher deal size?</li>
                  <li>What do high-LTV customers consistently praise that everyone else ignores?</li>
                </ul>
                
                <p>We do this using <strong>measures</strong>: AI models built to answer a precise question the same way, every time.</p>
                
                <p>Examples:</p>
                
                <ul>
                  <li><strong>"Was price mentioned as a blocker in this conversation?"</strong>: Yes/No</li>
                  <li><strong>"What was the proposed price?"</strong>: $ value</li>
                  <li><strong>"Which category does this complaint belong to?"</strong>: Price / Quality / Service / Timing / Competition / A new category the model develops.</li>
                  <li><strong>"Did this interaction include a serious churn risk?"</strong>: Risk score</li>
                </ul>
                
                <p>Each newsletter issue is powered by dozens to hundreds of these AI measures running across huge datasets. You see the results as charts, tables, and short narratives.</p>
                
                <h3>What you'll get in each issue</h3>
                
                <p>Every edition of Measure Twice is tight and focused:</p>
                
                <ul>
                  <li><strong>One main industry deep dive.</strong> Example: "50,000 breakfast complaints in hotel reviews: what actually ruins a stay?" We show how the complaints cluster, what predicts bad ratings, and what changes would move the needle.</li>
                  <li><strong>Short cross-industry snapshots.</strong> Brief, punchy stories from other sectors that surfaced in our current runs, like:
                    <ul>
                      <li>"Where car rental customers really lose their minds"</li>
                      <li>"The single most common complaint in real estate reviews above $1M listings"</li>
                      <li>"What B2B buyers praise in renewal conversations—across 5 software categories"</li>
                    </ul>
                  </li>
                  <li><strong>A few clear charts and tables.</strong> Built from extracted measures, not from hand-picked anecdotes.</li>
                  <li><strong>Method notes (for nerds).</strong> A paragraph or two explaining how we measured it, so you can trust the numbers.</li>
                </ul>
                
                <p>You can read an issue in under 10 minutes and walk away with 2–3 ideas you could actually act on if this were your industry.</p>
                
                <h3>Who this is for</h3>
                
                <p>Measure Twice is for people who need signal from sources that others ignore:</p>
                
                <ul>
                  <li>Product and strategy leaders who want to see what customers actually say, at scale</li>
                  <li>Revenue, CX, and operations teams who are sick of "NPS and vibes"</li>
                  <li>Founders, investors, and analysts who want a sharper sense of how markets behave</li>
                  <li>Anyone who likes to see real data attached to real language</li>
                </ul>
                
                <p>You don't need to be technical. All our methods will be explained.</p>
              </div>
            </div>
          </div>
        </main>
        
        {/* Sticky Footer */}
        <div className={`${styles.stickyFooter} ${showStickyFooter ? styles.show : ''}`}>
          <div className={styles.stickyFooterContent}>
            <button className={styles.stickySubscribeButton} onClick={scrollToForm}>
              Subscribe to Measure Twice
            </button>
          </div>
        </div>
        
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};
