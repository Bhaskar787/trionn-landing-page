import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  // ✅ Optimized loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, Math.random() * 1000 + 1500); // 1.5-2.5s realistic

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const contentTimer = setTimeout(() => {
        setShowContent(true);
        // ✅ Optional: Remove loader from DOM completely
        document.body.classList.remove('loading');
      }, 600);

      return () => clearTimeout(contentTimer);
    }
  }, [isLoaded]);

  return (
    <div className="app min-h-screen bg-black text-white overflow-hidden relative antialiased">
      
      {/* Background (always visible) */}
      <CanvasBackground />
      
      {/* Cursor (content only) */}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
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

      {/* ✅ Optimized preloader */}
      <div aria-hidden style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0, 
        overflow: 'hidden',
        opacity: 0
      }}>
        <img src="/assets/images/works/loftloom/loftloom-main-landscape.webp" alt="" />
        <img src="/_next/static/media/trionn-logo.a737ca31.png" alt="" />
        <video preload="metadata" src="/assets/images/home/intro-video.mp4" />
      </div>
    </div>
  );
}

export default App;