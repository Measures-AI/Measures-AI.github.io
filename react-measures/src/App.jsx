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

function App() {
  return (
    <>
      <Header />
      <Jumbotron />
      <Opportunity />
      <BouncingLines />
      <Insights />
      <ProcessTimeline />
      <MovingSquares />
      <MissionVision />
      <GetStarted />
      <Footer />
    </>
  );
}

export default App; 