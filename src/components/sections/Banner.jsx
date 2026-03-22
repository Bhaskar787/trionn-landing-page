import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';

const Banner = () => {
  return (
    <>
      {/* Main Banner Section */}
      <section className="tr__banner relative h-screen flex items-center overflow-hidden pt-24">
        <div className="tr__container max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="tr__banner__content max-w-4xl">
            
            {/* Headline - Desktop */}
            <motion.h1 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl lg:text-9xl font-black leading-[0.85] mb-12 hidden lg:block"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                roar in the
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400/50 to-orange-500/30">
                digital wilderness.
              </span>
            </motion.h1>

            {/* Headline - Mobile */}
            <motion.h1 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black leading-tight mb-8 block lg:hidden"
            >
              <span className="block">roar</span>
              <span className="block">in the digital</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                wilderness.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-2xl mb-16 px-2 leading-relaxed opacity-90"
            >
              We roar with success, delivering the <span className="font-bold">TRIONN<sup className="text-2xl text-orange-400">®</sup></span>{' '}
              through versatile design, branding and the latest tech development to companies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 items-center mb-20"
            >
              <Magnetic>
                <Button href="/work" className="tr__cursor__hoverable text-xl py-6 px-12">
                  Explore work
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" className="tr__cursor__hoverable text-xl py-6 px-12 bg-white/10 backdrop-blur-sm">
                  Get in touch
                </Button>
              </Magnetic>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-center"
            >
              <Magnetic>
                <a href="#works" className="tr__cursor__hoverable p-4 hover:scale-110 transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-50 hover:opacity-100">
                    <path d="M12 5L12 19M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Background */}
      <div className="tr__video__wrapper fixed inset-0 w-full h-screen -z-10">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          poster="/assets/images/home/video-poster.jpg"
        >
          <source src="/assets/images/home/intro-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
      </div>
    </>
  );
};

export default Banner;