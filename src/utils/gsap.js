import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Cursor from './components/common/Cursor';
import CanvasBackground from './components/CanvasBackground';
import Loader from './components/Loader';
import Header from './components/sections/Header';
import Banner from './components/sections/Banner';
import Works from './components/sections/Works';
import About from './components/sections/About';
import Achieved from './components/sections/Achieved';
import Clients from './components/sections/Clients';
import Marquee from './components/sections/Marquee';
import Dribbble from './components/sections/Dribbble';
import Social from './components/sections/Social';
import Footer from './components/sections/Footer';
import './App.css';
import './styles/globals.css';
import './styles/components.css';
import './styles/animations.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Simulate loading with realistic timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500); // 2.5s loader

    return () => clearTimeout(timer);
  }, []);

  // Show content after loader fade-out
  useEffect(() => {
    if (isLoaded) {
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 800);

      return () => clearTimeout(contentTimer);
    }
  }, [isLoaded]);

  return (
    <div className="app min-h-screen bg-black text-white overflow-hidden relative antialiased">
      
      {/* Canvas Background */}
      <CanvasBackground />
      
      {/* Custom Cursor */}
      {showContent && <Cursor />}
      
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <Loader 
            key="loader" 
            onComplete={() => setIsLoaded(true)}
          />
        ) : (
          <Suspense fallback={null}>
            <motion.div 
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="main-content"
            >
              <Header />
              <Banner />
              <Works />
              <About />
              <Achieved />
              <Clients />
              <Marquee />
              <Dribbble />
              <Social />
              <Footer />
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>

      {/* Preload critical assets */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <img src="/assets/images/works/loftloom/loftloom-main-landscape.webp" alt="" />
        <img src="/_next/static/media/trionn-logo.a737ca31.png" alt="" />
        <video src="/assets/images/home/intro-video.mp4" />
      </div>
    </div>
  );
}

export default App;