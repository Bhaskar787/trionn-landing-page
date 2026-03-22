import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';
import { PauseIcon, XIcon } from '../common/Icons';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isAudioPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);

  return (
    <>
      <header 
        className={`tr__header fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'w-[90vw] max-w-4xl backdrop-blur-xl bg-black/80 dark:bg-white/10 border border-white/10 dark:border-black/20 rounded-2xl py-4 px-8' 
            : 'w-full'
        }`}
      >
        <div className="tr__container max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          
          {/* Logo - Left */}
          <div className="tr__header__left">
            <Magnetic>
              <a 
                href="/" 
                className="tr__cursor__hoverable block w-32 h-10 
                  bg-gradient-to-r from-white via-white to-gray-100 
                  dark:from-white dark:via-gray-100 dark:to-white 
                  bg-clip-text text-transparent font-bold text-2xl 
                  drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              >
                TRIONN<sup className="text-sm font-normal">®</sup>
              </a>
            </Magnetic>
          </div>

          {/* Navigation - Right */}
          <div className="tr__header__right flex items-center">
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center mr-8">
              <Magnetic>
                <a href="/work" className="tr__cursor__hoverable text-lg font-medium hover:text-white/80 dark:hover:text-black/80 transition-colors mr-8">
                  Work
                </a>
              </Magnetic>
              <Magnetic>
                <a href="/services" className="tr__cursor__hoverable text-lg font-medium hover:text-white/80 dark:hover:text-black/80 transition-colors mr-8">
                  Services
                </a>
              </Magnetic>
              <Magnetic>
                <a href="/about" className="tr__cursor__hoverable text-lg font-medium hover:text-white/80 dark:hover:text-black/80 transition-colors">
                  About
                </a>
              </Magnetic>
            </nav>

            {/* Controls */}
            <div className="flex items-center">
              <Magnetic className="mr-4">
                <Button.Secondary 
                  size="sm"
                  icon={isAudioPlaying ? <PauseIcon className="w-4 h-4" /> : <XIcon className="w-4 h-4" />}
                  onClick={toggleAudio}
                  className="tr__cursor__hoverable !p-1.5 !h-9 !w-9 !min-w-0"
                />
              </Magnetic>
              <Magnetic>
                <Button href="/contact" className="tr__cursor__hoverable hidden lg:block">
                  Let's Talk
                </Button>
              </Magnetic>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden ml-4 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
        className="lg:hidden absolute top-full left-0 w-full bg-black/95 dark:bg-white/10 backdrop-blur-xl border-t border-white/10 dark:border-black/20 pt-8 pb-6 px-4 space-y-4"
      >
        <Magnetic>
          <a href="/work" className="tr__cursor__hoverable block py-3 text-xl font-medium hover:text-white/80 dark:hover:text-black/80">
            Work
          </a>
        </Magnetic>
        <Magnetic>
          <a href="/services" className="tr__cursor__hoverable block py-3 text-xl font-medium hover:text-white/80 dark:hover:text-black/80">
            Services
          </a>
        </Magnetic>
        <Magnetic>
          <a href="/about" className="tr__cursor__hoverable block py-3 text-xl font-medium hover:text-white/80 dark:hover:text-black/80">
            About
          </a>
        </Magnetic>
        <div className="pt-4 space-y-3">
          <div className="flex space-x-3 px-2">
            <Button.Secondary 
              size="sm" 
              icon={isAudioPlaying ? <PauseIcon className="w-4 h-4" /> : <XIcon className="w-4 h-4" />} 
              onClick={toggleAudio} 
              className="!p-2 !h-11 !w-11 !min-w-0" 
            />
          </div>
          <Button href="/contact" className="tr__cursor__hoverable w-full">
            Let's Talk
          </Button>
        </div>
      </motion.div>

      {/* Background Audio */}
      <audio ref={audioRef} loop preload="auto" className="hidden">
        <source src="/assets/audio/roar.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default Header;