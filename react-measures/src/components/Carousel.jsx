import React, { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

const TriangleSVG = () => (
  <div className={styles.triangle} style={{ transform: 'scale(0.3)' }}>
    <div className={styles.node}></div>
    <div className={styles.node}></div>
    <div className={styles.node}></div>
  </div>
);

const Carousel = ({ cards }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(530); // 500px + 2*15px margin
  const [visibleCards, setVisibleCards] = useState(3);

  // Duplicate cards for infinite scroll
  const allCards = [...cards, ...cards];
  const totalCards = allCards.length;
  const halfTotalCards = totalCards / 2;

  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector(`.${styles.card}`);
      if (card) {
        setCardWidth(card.offsetWidth + 30);
        setVisibleCards(Math.floor(window.innerWidth / (card.offsetWidth + 30)));
      }
    }
  }, []);

  useEffect(() => {
    const moveCarousel = () => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % halfTotalCards;
        if (next === halfTotalCards - visibleCards) {
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'none';
              setCurrentIndex(0);
              carouselRef.current.style.transform = `translateX(0)`;
              setTimeout(() => {
                if (carouselRef.current) {
                  carouselRef.current.style.transition = 'transform 0.5s ease';
                }
              }, 50);
            }
          }, 500);
        }
        return next;
      });
    };
    const interval = setInterval(moveCarousel, 3000);
    return () => clearInterval(interval);
  }, [halfTotalCards, visibleCards]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex, cardWidth]);

  return (
    <div className={styles.carousel} ref={carouselRef}>
      {allCards.map((data, idx) => (
        <div className={styles.card} key={idx}>
          <div className={styles.img}><TriangleSVG /></div>
          <h3>{data.title}</h3>
          <p>{data.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel; 