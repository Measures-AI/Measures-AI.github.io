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
  '/external-logos/zapier.png'
];

const quantitativeLogos = [
  '/external-logos/excel.png',
  '/external-logos/snowflake.png',
  '/external-logos/tableau.png',
  '/external-logos/powerbi.png',
  '/external-logos/salesforce.png',
  '/external-logos/hubspot.png',
  '/external-logos/pipedrive.png',
  '/external-logos/netsuite.png',
  '/external-logos/zoho.png'
];

const ConveyorBelt = () => {
  const conveyorBeltRef = useRef(null);
  const [logos, setLogos] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Calculate conveyor belt width based on screen size
  const conveyorBeltWidth = useMemo(() => {
    return Math.ceil(windowWidth / 90 * 1.5);
  }, [windowWidth]);

  // Memoized shift animation time calculation
  const shiftAnimationTime = useMemo(() => {
    return (windowWidth * 1.5) / 90;
  }, [conveyorBeltWidth, windowWidth]);

  // LOGO CREATION ================================================
  const createLogo = useCallback((initX = 0, isQualitative = true) => {
    const logo = {
      id: Math.random(),
      src: qualitativeLogos[Math.floor(Math.random() * qualitativeLogos.length)],
      isQualitative: isQualitative,
      isTransforming: false,
      transformProgress: 0, // TODO remove?
      flashIntensity: 0, // TODO remove?
      originalX: initX - .25 * windowWidth,
      originalY: Math.random() * 10 + 2,
      nextSrc: quantitativeLogos[Math.floor(Math.random() * quantitativeLogos.length)],
      enteredMachine: false
    };
    return logo;
  }, []);

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
    for (let i = 0; i < conveyorBeltWidth; i++) {
      initialLogos.push(createLogo((conveyorBeltWidth - i) * 90, i > conveyorBeltWidth / 2));
    }
    setLogos(initialLogos);
  }, [conveyorBeltWidth, createLogo]);

  // LOGO UPDATES ================================================
  const updateLogos = useCallback(() => {
    setLogos(logos => {
      let newLogos = [...logos];
      if (Math.random() < 1) {
        newLogos = [...logos, createLogo()];
      } else {
        newLogos = [...logos];
      }
      const maxLogos = conveyorBeltWidth;
      const filteredLogos = newLogos.slice(-maxLogos);
      return filteredLogos;
    });
  }, [createLogo, conveyorBeltWidth]);

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
              top: `${logo.originalY}vh`,
              zIndex: 3, // All logos consistently below the glass
              animation: `shift ${shiftAnimationTime}s linear forwards`,
              border: logo.isQualitative ? '1px solid white' : 'none',
            }}
          >
            <img 
              src={logo.isQualitative ? logo.src : logo.nextSrc} 
              alt="Logo" 
              style={{
                width: '52px',
                height: '52px',
                objectFit: 'contain',
              }}
            />
            {/* White flash overlay */}
            <div 
              className={styles.flashOverlay}
              style={{
                opacity: logo.isTransforming ? logo.flashIntensity : 0,
              }}
            />
          </div>
        ))}
      </div>
      <FrostedGlass />
    </>
  );
};

export default ConveyorBelt; 