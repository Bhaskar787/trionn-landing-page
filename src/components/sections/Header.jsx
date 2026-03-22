import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`tr__header fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      isScrolled ? 'w-[90vw] max-w-4xl backdrop-blur-xl bg-black/80 border border-white/10 rounded-2xl py-4 px-8' : 'w-full'
    }`}>
      <div className="tr__container max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo - Left */}
        <div className="tr__header__left">
          <Magnetic>
            <a href="/" className="tr__cursor__hoverable block w-32 h-10 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-bold text-2xl">
              TRIONN<sup className="text-sm">®</sup>
            </a>
          </Magnetic>
        </div>

        {/* Navigation - Right */}
        <div className="tr__header__right flex items-center gap-6">
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Magnetic>
              <a href="/work" className="tr__cursor__hoverable text-lg font-medium hover:text-white/80 transition-colors">
                Work
              </a>
            </Magnetic>
            <Magnetic>
              <a href="/services" className="tr__cursor__hoverable text-lg font-medium hover:text-white/80 transition-colors">
                Services
              </a>
            </Magnetic>
            <Magnetic>
              <a href="/about" className="tr__cursor__hoverable text-lg font-medium hover:text-white/80 transition-colors">
                About
              </a>
            </Magnetic>
          </nav>

          {/* CTA Button */}
          <Magnetic>
            <Button href="/contact" className="tr__cursor__hoverable hidden lg:block">
              Let's Talk
            </Button>
          </Magnetic>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 pt-8 pb-6 px-4 space-y-4"
        >
          <Magnetic>
            <a href="/work" className="tr__cursor__hoverable block py-3 text-xl font-medium hover:text-white/80">
              Work
            </a>
          </Magnetic>
          <Magnetic>
            <a href="/services" className="tr__cursor__hoverable block py-3 text-xl font-medium hover:text-white/80">
              Services
            </a>
          </Magnetic>
          <Magnetic>
            <a href="/about" className="tr__cursor__hoverable block py-3 text-xl font-medium hover:text-white/80">
              About
            </a>
          </Magnetic>
          <div className="pt-4">
            <Button href="/contact" className="tr__cursor__hoverable w-full">
              Let's Talk
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;