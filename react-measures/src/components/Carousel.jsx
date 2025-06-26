import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './Carousel.module.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

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

const CARD_WIDTH = 500 + 30; // 500px + 2*15px margin

const Carousel = ({ cards }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [cardsInView, setCardsInView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0); // Will be set after bufferCount is known
  const [transition, setTransition] = useState('transform 0.5s cubic-bezier(0.4,0,0.2,1)');

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
    console.log('offsetChange: ', (currentIndex - Math.floor(cardsInView / 2)) * CARD_WIDTH);

    return (Math.floor(cardsInView / 2) - currentIndex) * CARD_WIDTH;
  }, [currentIndex, cardsInView]);

  
  const trackStyle = {
    willChange: 'transform',
    transition,
    transform: `translateX(${offset}px)`
  };

  return (
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
              <p
                className={styles.cardSource}
                style={{ backgroundColor: pastelThemes[allCards.indexOf(card) % pastelThemes.length].axis }}
              >
                {card.source}
              </p>
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
  );
};

export default Carousel; 