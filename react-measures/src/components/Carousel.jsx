import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './Carousel.module.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import GetStartedForm from './ContactForm.jsx';

// Pastel color themes
const pastelThemes = [
  { line: '#7ecbff', bar: '#7ecbff', grid: '#e3f4fd', axis: '#6a8caf' }, // blue
  { line: '#a3e3a1', bar: '#a3e3a1', grid: '#eafbe7', axis: '#6fa86f' }, // green
  { line: '#ffb3b3', bar: '#ffb3b3', grid: '#ffeaea', axis: '#c97a7a' }, // red
  { line: '#cdb3ff', bar: '#cdb3ff', grid: '#f3eaff', axis: '#8a7ac9' }, // purple
  // { line: '#ffe6a3', bar: '#ffe6a3', grid: '#fff8e3', axis: '#c9b47a' }, // yellow
  { line: '#ffd6a3', bar: '#ffd6a3', grid: '#fff3e3', axis: '#c99b7a' }, // orange
  { line: '#b3fff6', bar: '#b3fff6', grid: '#e3fffd', axis: '#7ac9c9' }, // teal
  { line: '#ffb3e6', bar: '#ffb3e6', grid: '#ffe3f7', axis: '#c97aac' }, // pink
];

const ChartPreview = ({ data, theme }) => {
  if (!data) return null;
  if (data.type === 'line') {
    return (
      <div className={styles.chartPreview}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.values} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} isAnimationActive={false}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.grid} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} width={30} />
            <Line type="monotone" dataKey="value" stroke={theme.line} strokeWidth={3} dot={{ r: 4, fill: theme.line }} isAnimationActive={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  if (data.type === 'bar') {
    return (
      <div className={styles.chartPreview}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.values} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} isAnimationActive={false}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.grid} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} width={30} />
            <Bar dataKey="value" fill={theme.bar} radius={[6, 6, 0, 0]} barSize={24} isAnimationActive={false}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  return null;
};

const getCardWidth = () => {
  if (typeof window !== 'undefined' && window.innerWidth < 600) {
    return window.innerWidth * 0.9 + 20;
  }
  return 500 + 30; // 500px + 2*15px margin
};
const CARD_WIDTH = getCardWidth();

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 8, verticalAlign: 'middle', position: 'relative', top: '1px'}}>
    <path d="M7 5l5 5-5 5" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Modal = ({ open, onClose, card }) => {
  if (!open || !card) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflowY: 'auto', // allow scroll on mobile
    }} onClick={onClose}>
      <div
        style={{
          background: '#242424',
          padding: 32,
          borderRadius: 12,
          maxWidth: 600,
          width: '100%',
          margin: '0 20px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          position: 'relative',
          textAlign: 'center',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20, width: '100%' }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 32, letterSpacing: 1, color: 'white', textAlign: 'center' }}>Measures</span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 32, color: 'white' }}>+</span>
          {card.sourceLogo && (
            <img src={card.sourceLogo} alt={card.source + ' logo'} style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8, background: '#fff2' }} />
          )}
        </div>
        <div style={{ marginBottom: 12, color: 'white', fontSize: 20, fontWeight: 600 }}>
          Get insights from {card.source.replace('Extracted from ', '')} automatically!
        </div>
        <div style={{ marginBottom: 24, color: '#ccc', fontSize: 15, fontWeight: 400 }}>
          We connect directly to your {card.source.replace('Extracted from ', '')} data, measure it in real time, and surface actionable insights—no manual work required.
        </div>
        <div style={{ width: '100%', maxWidth: 500, alignSelf: 'center' }}>
          <GetStartedForm />
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ cards }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [cardsInView, setCardsInView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0); // Will be set after bufferCount is known
  const [transition, setTransition] = useState('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(null);

  // Determine how many cards fit in the viewport whenver the window is resized.
  useEffect(() => {
    const handleResize = () => {
      setCardsInView(Math.floor(window.innerWidth / CARD_WIDTH));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prepare the cards for infinite scroll: [buffer][real][buffer]
  const allCards = useMemo(() => {
    if (cardsInView <= cards.length) {
      // Only need one set of each: before, real, after
      const arr = [];
      arr.push(...cards.map((card, index) => ({ ...card, key: `before-${index}` })));
      arr.push(...cards.map((card, index) => ({ ...card, key: `real-${index}` })));
      arr.push(...cards.map((card, index) => ({ ...card, key: `after-${index}` })));
      return arr;
    } else {
      // Need multiple sets to fill the viewport
      const arr = [];
      // Add enough 'before' sets to fill the viewport
      for (let i = 0; i < cardsInView; i++) {
        arr.push(...cards.map((card, index) => ({ ...card, key: `before-${i}-${index}` })));
      }
      // Add one 'real' set
      arr.push(...cards.map((card, index) => ({ ...card, key: `real-${index}` })));
      // Add enough 'after' sets to fill the viewport
      for (let i = 0; i < cardsInView; i++) {
        arr.push(...cards.map((card, index) => ({ ...card, key: `after-${i}-${index}` })));
      }
      return arr;
    }
  }, [cardsInView]);

  // Scroll the carousel to the next card every 3 seconds and then go to one further, at which point (without a smooth transition, so use useTransition) loop back to the start without the user noticing.
  useEffect(() => {
    let interval1, interval2, interval3, interval4, interval5;
    if (currentIndex < cards.length) {
      interval1 = setInterval(() => {
        setTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
      }, 1000);
      if (currentIndex === 0) {
        interval2 = setInterval(() => {
          setCurrentIndex(1);
        }, 1500);
      } else {
        interval2 = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            return prevIndex + 1;
          });
        }, 3000);
      }
    } else if (currentIndex >= cards.length) {
      interval3 = setInterval(() => {
        setTransition('none');
      }, 1000);
      interval4 = setInterval(() => {
        setCurrentIndex(0);
      }, 1500);
    }
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      clearInterval(interval5);
    };
  }, [cards.length, currentIndex]);


  const offset = useMemo(() => {

    return (Math.floor(cardsInView / 2) - currentIndex) * CARD_WIDTH;
  }, [currentIndex, cardsInView]);

  
  const trackStyle = {
    willChange: 'transform',
    transition,
    transform: `translateX(${offset}px)`
  };

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} card={modalCard} />
      <div className={styles.carouselContainer} ref={containerRef}>
        <div className={styles.carouselTrack} ref={trackRef} style={trackStyle}>
          {allCards.map((card) => (
            <div
              className={styles.card}
              key={card.key}
            >
              <div className={styles.img}>
                <ChartPreview
                  data={card.data}
                  theme={pastelThemes[allCards.indexOf(card) % pastelThemes.length]}
                />
              </div>
              <div className={styles.cardContentMinHeight}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                  <ul className={styles.cardBullets}>
                    {card.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className={styles.cardBullet}
                      >
                        <span className={styles.cardBulletText}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.cardSourceRow}>
                <button
                  className={styles.cardSource}
                  style={{ backgroundColor: pastelThemes[allCards.indexOf(card) % pastelThemes.length].axis, display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}
                  onClick={() => { setModalCard(card); setModalOpen(true); }}
                  type="button"
                >
                  {card.source}
                  <ArrowIcon />
                </button>
                {card.sourceLogo && (
                  <img
                    className={styles.cardSourceLogo}
                    src={card.sourceLogo}
                    alt={card.source + ' logo'}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel; 