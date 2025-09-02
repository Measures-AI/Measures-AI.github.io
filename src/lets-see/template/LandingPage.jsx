import React from 'react';
import styles from './LandingPage.module.css';
import { LeadForm } from '../components/LeadForm';
import { TrackingProvider } from '../components/TrackingProvider';

export const LandingPage = ({ config }) => {
  const {
    role,
    industry,
    headline,
    subheadline,
    story,
    demoData,
    points,
    cta,
    sections,
    problems,
    solutions,
    integrations,
    testimonials,
    useCases,
    faqs,
    bottomCta
  } = config || {};

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brand}>Measures AI</div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.headline}>
              {headline || 'Measure everything that matters.'}
            </div>
            <div className={styles.subheadline}>
              {subheadline || 'Operational intelligence tailored for your team.'}
            </div>
            {story ? (
              <div className={styles.story}>{story}</div>
            ) : null}

            <div className={styles.points}>
              {(points || []).map((p, idx) => (
                <div className={styles.point} key={idx}>{p}</div>
              ))}
            </div>

            <div className={styles.demoSection}>
              <div className={styles.demoCard}>
                <div className={styles.demoTitle}>{(demoData && demoData.title) || 'Demo Data'}</div>
                {demoData && demoData.image ? (
                  <img className={styles.demoImage} src={demoData.image} alt="demo" />
                ) : null}
                <div className={styles.demoBullets}>
                  {(demoData && demoData.bullets ? demoData.bullets : [
                    'Example KPI 1',
                    'Example KPI 2',
                    'Example KPI 3',
                  ]).map((b, i) => (<div key={i}>• {b}</div>))}
                </div>
              </div>
            </div>
          </div>

          <LeadForm role={role} industry={industry} cta={cta} />
        </section>

        {Array.isArray(sections) && sections.length > 0 && (
          sections.map((sec, idx) => (
            <section className={styles.section} key={idx}>
              <div>
                <div className={styles.sectionTitle}>{sec.title}</div>
                <div>{sec.copy}</div>
              </div>
              {Array.isArray(sec.cards) && (
                <div className={styles.cardList}>
                  {sec.cards.map((c, i) => (
                    <div className={styles.card} key={i}>
                      {c.image ? <img className={styles.cardImage} src={c.image} alt="" /> : null}
                      {c.title ? <div style={{fontWeight:600, marginBottom: 6}}>{c.title}</div> : null}
                      {c.text ? <div>{c.text}</div> : null}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))
        )}

        {Array.isArray(problems) && problems.length > 0 && (
          <section className={styles.section}>
            <div>
              <div className={styles.sectionTitle}>The challenge</div>
              <div>What stands in your way today.</div>
            </div>
            <div className={styles.cardList}>
              {problems.map((c, i) => (
                <div className={styles.card} key={i}>
                  {c.title ? <div style={{fontWeight:600, marginBottom: 6}}>{c.title}</div> : null}
                  {c.text ? <div>{c.text}</div> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(solutions) && solutions.length > 0 && (
          <section className={styles.section}>
            <div>
              <div className={styles.sectionTitle}>How we solve it</div>
              <div>What you get on day one.</div>
            </div>
            <div className={styles.cardList}>
              {solutions.map((c, i) => (
                <div className={styles.card} key={i}>
                  {c.image ? <img className={styles.cardImage} src={c.image} alt="" /> : null}
                  {c.title ? <div style={{fontWeight:600, marginBottom: 6}}>{c.title}</div> : null}
                  {c.text ? <div>{c.text}</div> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(integrations) && integrations.length > 0 && (
          <section className={styles.section}>
            <div>
              <div className={styles.sectionTitle}>Works with your stack</div>
              <div>Connect data from the tools you already use.</div>
            </div>
            <div className={styles.cardList}>
              {integrations.map((c, i) => (
                <div className={styles.card} key={i}>
                  {c.image ? <img className={styles.cardImage} src={c.image} alt="" /> : null}
                  {c.title ? <div style={{fontWeight:600, marginBottom: 6}}>{c.title}</div> : null}
                  {c.text ? <div>{c.text}</div> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(testimonials) && testimonials.length > 0 && (
          <section className={styles.section}>
            <div>
              <div className={styles.sectionTitle}>What leaders say</div>
              <div>Proof from teams like yours.</div>
            </div>
            <div className={styles.cardList}>
              {testimonials.map((c, i) => (
                <div className={styles.card} key={i}>
                  {c.text ? <div style={{fontStyle:'italic', marginBottom: 6}}>“{c.text}”</div> : null}
                  {c.author ? <div style={{opacity:0.8}}>— {c.author}, {c.role}</div> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(useCases) && useCases.length > 0 && (
          <section className={styles.section}>
            <div>
              <div className={styles.sectionTitle}>Use cases</div>
              <div>Where Measures AI makes an impact fast.</div>
            </div>
            <div className={styles.cardList}>
              {useCases.map((c, i) => (
                <div className={styles.card} key={i}>
                  {c.title ? <div style={{fontWeight:600, marginBottom: 6}}>{c.title}</div> : null}
                  {c.text ? <div>{c.text}</div> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(faqs) && faqs.length > 0 && (
          <section className={styles.section}>
            <div>
              <div className={styles.sectionTitle}>FAQs</div>
              <div>Answers to common questions.</div>
            </div>
            <div className={styles.cardList}>
              {faqs.map((c, i) => (
                <div className={styles.card} key={i}>
                  {c.q ? <div style={{fontWeight:600, marginBottom: 6}}>{c.q}</div> : null}
                  {c.a ? <div>{c.a}</div> : null}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.bottomCta}>
          <div>
            <div className={styles.sectionTitle}>{(bottomCta && bottomCta.title) || 'Ready to see your data work harder?'}</div>
            <div>{(bottomCta && bottomCta.copy) || 'Get a tailored walkthrough for your role and industry.'}</div>
          </div>
          <LeadForm role={role} industry={industry} cta={cta} />
        </section>

        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};
