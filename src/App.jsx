import React from 'react';
import './App.css';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Opportunity from './components/Opportunity';
import BouncingLines from './components/BouncingLines';
import Insights from './components/Insights';
import ProcessTimeline from './components/ProcessTimeline';
import MovingSquares from './components/MovingSquares';
import MissionVision from './components/MissionVision';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import LandingRouter from './lets-see';
import { getLandingConfigFromPath } from './lets-see/utils/config';

function App() {
  const isClient = typeof window !== 'undefined';
  
  if (!isClient) {
    // Server-side rendering fallback
    return (
      <>
        <Header />
        <Jumbotron />
        <Opportunity />
        <BouncingLines />
        <Insights />
        <ProcessTimeline />
        <MovingSquares />
        <GetStarted />
        <Footer />
      </>
    );
  }

  let { pathname, search } = window.location;
  
  // Check if we have an intended path from GitHub Pages 404 redirect
  const intendedPath = sessionStorage.getItem('intended_path');
  if (intendedPath && pathname === '/') {
    sessionStorage.removeItem('intended_path');
    // Parse the intended path
    const url = new URL(intendedPath, window.location.origin);
    pathname = url.pathname;
    search = url.search;
    
    // Update the URL without causing a page reload
    window.history.replaceState({}, '', intendedPath);
  }
  
  const pathStartsWithLetsSee = pathname.startsWith('/lets-see');
  
  if (pathStartsWithLetsSee) {
    return <LandingRouter />;
  }
  
  // Check if this is a valid root path
  const isHomePage = pathname === '/' || pathname === '';
  
  if (!isHomePage) {
    // For any other path that's not lets-see and not home, show 404
    return <NotFound />;
  }
  
  return (
    <>
      <Header />
      <Jumbotron />
      <Opportunity />
      <BouncingLines />
      <Insights />
      <ProcessTimeline />
      <MovingSquares />
      {/* <MissionVision /> */}
      <GetStarted />
      <Footer />
    </>
  );
}

export default App; 