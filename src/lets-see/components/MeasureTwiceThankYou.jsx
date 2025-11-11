import React, { useEffect } from 'react';
import styles from './MeasureTwiceThankYou.module.css';
import { TrackingProvider } from './TrackingProvider';
import { Header } from './Header';

// COMMENTED OUT - Google Sheets integration no longer used
// const GOOGLE_SHEETS_ENDPOINT = '/.netlify/functions/add-to-sheets';

export const MeasureTwiceThankYou = () => {
  // COMMENTED OUT - Google Sheets integration replaced with EmailJS in form component
  /*
  // Add subscriber data to Google Sheets on page load
  useEffect(() => {
    const addToGoogleSheets = async () => {
      try {
        // Get form data from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const industry = urlParams.get('industry');
        const role = urlParams.get('role');
        
        if (!email) {
          console.log('No email found in URL parameters, skipping Google Sheets integration');
          return;
        }

        console.log('📊 Adding subscriber data to Google Sheets...');

        const sheetsData = {
          email: email,
          industry: industry || '',
          role: role || '',
          timestamp: new Date().toISOString(),
          utm_source: urlParams.get('utm_source') || 'measure-twice-landing',
          utm_campaign: urlParams.get('utm_campaign') || 'measure-twice-newsletter'
        };

        const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sheetsData)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to add data to Google Sheets');
        }

        console.log('✅ Successfully added subscriber data to Google Sheets:', result);

      } catch (error) {
        console.error('❌ Failed to add data to Google Sheets:', error);
        // Don't show error to user - this is background data collection
      }
    };

    // Add a small delay to ensure the page has fully loaded
    const timer = setTimeout(addToGoogleSheets, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  */

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <Header />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.thankYouSection}>
              <h1 className={styles.thankYouTitle}>Thank You!</h1>
              <p className={styles.thankYouMessage}>
                You've successfully subscribed to the Measure Twice Newsletter. 
                We'll send you our latest insights and good ideas soon.
              </p>
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
