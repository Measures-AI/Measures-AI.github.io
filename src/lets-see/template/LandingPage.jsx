import React from 'react';
import styles from './LandingPage.module.css';
import { LeadForm } from '../components/LeadForm';
import { TrackingProvider } from '../components/TrackingProvider';
import { Benefits3 } from '../sections/Benefits3';
import { Quote } from '../sections/Quote';
import { CenteredForm } from '../sections/CenteredForm';
import { FeatureRows } from '../sections/FeatureRows';
import { LogoCloud } from '../sections/LogoCloud';

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
    bottomCta,
    typedSections
  } = config || {};

  const topHeadline = headline || story || 'Measure everything that matters.';
  const topSub = subheadline || story || 'Operational intelligence tailored for your team.';

  const renderTypedSection = (s, idx) => {
    switch (s.type) {
      case 'benefits3':
        return <Benefits3 key={idx} title={s.title} subtitle={s.subtitle} items={s.items} />;
      case 'quote':
        return <Quote key={idx} text={s.text} author={s.author} role={s.role} />;
      case 'centeredForm':
        return <CenteredForm key={idx} title={s.title} subtitle={s.subtitle} role={role} industry={industry} cta={s.cta || cta} />;
      case 'featureRows':
        return <FeatureRows key={idx} title={s.title} subtitle={s.subtitle} rows={s.rows} />;
      case 'logoCloud':
        return <LogoCloud key={idx} title={s.title} subtitle={s.subtitle} logos={s.logos} />;
      default:
        return null;
    }
  };

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brand}>Measures AI</div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.headline}>{topHeadline}</div>
            <div className={styles.subheadline}>{topSub}</div>

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

        {Array.isArray(typedSections) && typedSections.map(renderTypedSection)}

        {Array.isArray(sections) && sections.length > 0 && (
          sections.map((sec, idx) => (
            <section className={styles.sectionWrap} key={idx}>
              <div className={styles.sectionTitle}>{sec.title}</div>
              <div className={styles.sectionSubtitle}>{sec.copy}</div>
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
          <section className={styles.sectionWrap}>
            <div className={styles.sectionTitle}>The challenge</div>
            <div className={styles.sectionSubtitle}>What stands in your way today.</div>
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
          <section className={styles.sectionWrap}>
            <div className={styles.sectionTitle}>How we solve it</div>
            <div className={styles.sectionSubtitle}>What you get on day one.</div>
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
          <section className={styles.sectionWrap}>
            <div className={styles.sectionTitle}>Works with your stack</div>
            <div className={styles.sectionSubtitle}>Connect data from the tools you already use.</div>
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
          <section className={styles.sectionWrap}>
            <div className={styles.sectionTitle}>What leaders say</div>
            <div className={styles.sectionSubtitle}>Proof from teams like yours.</div>
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
          <section className={styles.sectionWrap}>
            <div className={styles.sectionTitle}>Use cases</div>
            <div className={styles.sectionSubtitle}>Where Measures AI makes an impact fast.</div>
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
          <section className={styles.sectionWrap + ' ' + styles.faq}>
            {faqs.map((c, i) => (
              <div className={styles.faqItem} key={i}>
                {c.q ? <div className={styles.faqQ}>{c.q}</div> : null}
                {c.a ? <div>{c.a}</div> : null}
              </div>
            ))}
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
