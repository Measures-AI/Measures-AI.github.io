import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import FrostedGlass from './FrostedGlass';
import styles from './ConveyorBelt.module.css';

// Logo lists - qualitative (text/communication) vs quantitative (data/analytics)
const qualitativeLogos = [
  '/external-logos/gmail.png',
  '/external-logos/outlook.png',
  '/external-logos/slack.png',
  '/external-logos/teams.png',
  '/external-logos/zendesk.png',
  '/external-logos/activecampaign.png',
  '/external-logos/gong.png',
  '/external-logos/chorus.png',
  '/external-logos/twilio.png',
  '/external-logos/zapier.png',
  '/external-logos/salesforce.png',
  '/external-logos/hubspot.png',
  '/external-logos/pipedrive.png',
  '/external-logos/netsuite.png',
  '/external-logos/zoho.png'
];

const quantitativeLogos = [
  '/external-logos/excel.png',
  '/external-logos/snowflake.png',
  '/external-logos/tableau.png',
  '/external-logos/powerbi.png',
];

const ConveyorBelt = () => {
  const conveyorBeltRef = useRef(null);
  const [conveyorBeltHeight, setConveyorBeltHeight] = useState(window.innerHeight * 0.2);
  const [logos, setLogos] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const animationStartRef = useRef({}); // Track start times for each logo
  
  // Calculate conveyor belt width based on screen size
  const conveyorBeltWidth = useMemo(() => {
    setConveyorBeltHeight(windowWidth > 600 ? window.innerHeight * 0.2 : 100);
    return Math.ceil(windowWidth / 90);
  }, [windowWidth]);

  // Memoized shift animation time calculation
  const shiftAnimationTime = useMemo(() => {
    return (windowWidth * 1.5) / 90;
  }, [conveyorBeltWidth, windowWidth]);

  // LOGO CREATION ================================================
  const createLogo = useCallback((initX = 0, isQualitative = true) => {
    console.log('conveyorBeltHeight: ', conveyorBeltHeight);
    const now = performance.now();
    const logo = {
      id: Math.random(),
      src: qualitativeLogos[Math.floor(Math.random() * qualitativeLogos.length)],
      isQualitative: isQualitative,
      originalX: initX !== 0 ? initX : initX - .25 * windowWidth,
      originalY: Math.random() * conveyorBeltHeight * .6 + conveyorBeltHeight * .1,
      nextSrc: quantitativeLogos[Math.floor(Math.random() * quantitativeLogos.length)],
      startTime: now,
    };
    animationStartRef.current[logo.id] = now;
    return logo;
  }, [windowWidth, conveyorBeltHeight]);

  // RENDER CONVEYOR BELT + INITIAL LOGOS =================================================
  const renderConveyorBelt = useCallback(() => {
    const container = conveyorBeltRef.current;
    if (!container) return;
    container.innerHTML = '';
    
    const lineCount = conveyorBeltWidth + 1;
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      line.className = styles.line;
      container.appendChild(line);
    }

    const initialLogos = []
    for (let i = 0; i < conveyorBeltWidth * 1.5; i++) {
      initialLogos.push(createLogo((conveyorBeltWidth * 1.5 - i - .25 * conveyorBeltWidth) * 90, i > conveyorBeltWidth * .75));
    }
    setLogos(initialLogos);
  }, [conveyorBeltWidth, createLogo]);

  // Listen for tab visibility change and refresh conveyor belt when returning
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        renderConveyorBelt();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [renderConveyorBelt]);

  // LOGO UPDATES ================================================
  const updateLogos = useCallback(() => {
    setLogos(logos => {
      let newLogos = [...logos, createLogo()];
      // Remove maxLogos oldest
      const maxLogos = conveyorBeltWidth * 1.5;
      const filteredLogos = newLogos.slice(-maxLogos);
      return filteredLogos;
    });
  }, [createLogo, conveyorBeltWidth]);

  // Track logo positions and update isQualitative when passing halfway
  useEffect(() => {
    let animationFrame;
    const halfway = windowWidth * 0.5 - 100;
    const transitionDuration = 1000; // 1s in ms
    const animate = () => {
      setLogos(prevLogos => {
        const now = performance.now();
        return prevLogos.map(logo => {
          // Calculate progress (0 to 1)
          const startX = logo.originalX;
          const endX = windowWidth * 1.25; // 150vw from -25vw
          const elapsed = (now - (logo.startTime || now)) / (shiftAnimationTime * 1000 * ((endX - startX) / (windowWidth * 1.5)));
          const currentX = startX + (endX - startX) * Math.min(elapsed, 1);

          // If not already transitioning and crosses halfway, start transition
          if (logo.isQualitative && !logo.isTransitioning && currentX > halfway) {
            return {
              ...logo,
              isTransitioning: true,
              transitionStart: now,
              transitionProgress: 0,
            };
          }

          // If in transition, update progress
          if (logo.isTransitioning) {
            const progress = Math.min((now - logo.transitionStart) / transitionDuration, 1);
            if (progress >= 1) {
              // End transition: switch to quantitative
              return {
                ...logo,
                isQualitative: false,
                isTransitioning: false,
                transitionProgress: undefined,
                transitionStart: undefined,
              };
            } else {
              return {
                ...logo,
                transitionProgress: progress,
              };
            }
          }

          return logo;
        });
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [windowWidth, shiftAnimationTime]);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Rendering lines.
    renderConveyorBelt();
    window.addEventListener('resize', handleResize);

    // Logo updates.
    const animationInterval = setInterval(updateLogos, 1000); 
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(animationInterval);
    };
  }, [renderConveyorBelt, updateLogos]);

  return (
    <>
      <style>
        {`
          @keyframes shift {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(150vw);
            }
          }
        `}
      </style>
      <div className={styles.animationContainer}>
        <div className={styles.conveyorBelt} ref={conveyorBeltRef} />
        {logos.map(logo => (
          <div
            key={logo.id}
            className={styles.logo}
            style={{
              left: `${logo.originalX}px`,
              top: `${logo.originalY}px`,
              zIndex: 3, // All logos consistently below the glass
              animation: `shift ${shiftAnimationTime}s linear forwards`,
            }}
          >
            {/* Crossfade between qualitative and quantitative logos */}
            {logo.isTransitioning ? (
              <>
                <img
                  src={logo.src}
                  alt="Logo"
                  style={{
                    width: '52px',
                    height: '52px',
                    objectFit: 'contain',
                    position: 'relative',
                    opacity: 1 - (logo.transitionProgress || 0),
                    transition: 'opacity 0.1s linear',
                  }}
                />
                <img
                  src={logo.nextSrc}
                  alt="Logo"
                  style={{
                    width: '52px',
                    height: '52px',
                    objectFit: 'contain',
                    position: 'absolute',
                    left: '-0%',
                    opacity: logo.transitionProgress || 0,
                    transition: 'opacity 0.1s linear',
                  }}
                />
              </>
            ) : (
              <img
                src={logo.isQualitative ? logo.src : logo.nextSrc}
                alt="Logo"
                style={{
                  width: '52px',
                  height: '52px',
                  objectFit: 'contain',
                }}
              />
            )}
          </div>
        ))}
      </div>
      <FrostedGlass />
    </>
  );
};

export default ConveyorBelt; 