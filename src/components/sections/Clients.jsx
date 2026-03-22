import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';
import { clientsData } from '../../data/clients'; // ✅ Import from data file

const Clients = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % clientsData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + clientsData.length) % clientsData.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="tr__section tr__home__clients__says py-40 lg:py-60 relative overflow-hidden">
      <div className="tr__container max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tr__section__title mb-24 lg:mb-32 text-center lg:text-left"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 max-w-6xl mx-auto">
            <motion.h3 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl lg:text-7xl font-black leading-tight"
            >
              partner <br className="lg:block hidden" /> love
            </motion.h3>
            <motion.h4 
                           initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-2xl lg:text-3xl font-light max-w-lg text-right leading-relaxed"
            >
              Take heed, as the <br className="lg:block hidden" />lion's roar in our client <br className="lg:block hidden" />reviews resounds.
            </motion.h4>
          </div>
        </motion.div>

        {/* Clients Slider */}
        <div 
          className="tr__clients__says__container relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="tr__clients__says__slider__wrapper overflow-hidden h-screen lg:h-[80vh] rounded-3xl">
            <div 
              className="flex h-full"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {clientsData.map((client, index) => (
                <motion.div
                  key={client.id} // ✅ Fixed: Use client.id
                  className="tr__clients__says__slide w-full flex-shrink-0 px-4 lg:px-12 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="tr__clients__says__slide__wrapper w-full h-full flex items-center justify-center max-w-6xl mx-auto">
                    <div className="tr__clients__says__slide__inner w-full max-w-5xl">
                      
                      {client.type === 'video' ? (
                        /* Video Testimonial Card */
                        <motion.div 
                          className="tr__clients__thumb__wrapper max-w-lg mx-auto lg:ml-0 text-center lg:text-left"
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Client Avatar */}
                          <div className="tr__clients__thumb relative mx-auto w-48 h-48 lg:w-72 lg:h-72 mb-12 lg:mb-16 inline-block">
                            <motion.img 
                              src={client.image} 
                              alt={client.name}
                              className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-8 border-white/10 hover:border-white/20 transition-all duration-500 absolute inset-0"
                              whileHover={{ scale: 1.05, rotate: 2 }}
                            />
                            {/* Glow ring */}
                            <div className="absolute inset-0 w-full h-full rounded-[3rem] bg-gradient-to-r from-orange-400/30 via-pink-400/20 to-purple-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          
                          {/* Client Name */}
                          <motion.h5 
                            className="text-4xl lg:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                          >
                            {client.name}
                          </motion.h5>
                          
                          {/* Client Title */}
                          <motion.p 
                            className="text-2xl opacity-80 mb-12 lg:mb-16 max-w-md mx-auto lg:mx-0"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {client.title}
                          </motion.p>
                          
                          {/* Watch Button */}
                          <Magnetic>
                            <Button 
                              href={client.videoUrl} 
                              isExternal
                              className="tr__cursor__hoverable !bg-gradient-to-r !from-orange-500 !to-pink-500 !border-orange-400 !text-lg !px-12 !py-5 hover:!from-orange-600 hover:!to-pink-600 shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
                            >
                              <svg className="w-6 h-6 mr-3 inline" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              Watch now!
                            </Button>
                          </Magnetic>
                        </motion.div>

                      ) : (
                        /* Quote Testimonial Layout */
                        <motion.div 
                          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center h-full"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                        >
                          
                          {/* Quote Section */}
                          <motion.div 
                            className="tr__clients__quote order-2 lg:order-1"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                          >
                            <div className="tr__clients__quote__wrapper relative p-12 lg:p-20 bg-gradient-to-br from-white/5 via-white/2 to-black/50 backdrop-blur-xl rounded-[3rem] border border-white/15 shadow-2xl hover:shadow-white/20 transition-all duration-500">
                              
                              {/* Quote Icon */}
                              <motion.svg 
                                className="w-24 h-20 mb-12 opacity-10 lg:opacity-20 mx-auto lg:mx-0"
                                viewBox="0 0 80 59" 
                                fill="currentColor"
                                whileHover={{ scale: 1.1 }}
                              >
                                                                <path d="M13.5 24.2c-1.2 0-2.3.4-3.2 1.1-1 1-1.6 2.3-1.8 3.8-.2 1.5-.1 3.1.3 4.6.4 1.5 1.1 2.9 2 4 .9 1.1 2 2 3.3 2.6 1.3.6 2.7.9 4.1.9 1.4 0 2.8-.3 4-.9 1.2-.6 2.3-1.5 3.2-2.6.9-1.1 1.6-2.4 2.1-3.8.5-1.5.8-3.1.8-4.7 0-1.9-.4-3.7-1.2-5.3-1.6-3.2-4.5-5.3-8.7-6.2-2-.4-4.1-.6-6.2-.6-1.7 0-3.4.2-5 .6zM66.5 24.2c-1.2 0-2.3.4-3.2 1.1-1 1-1.6 2.3-1.8 3.8-.2 1.5-.1 3.1.3 4.6.4 1.5 1.1 2.9 2 4 .9 1.1 2 2 3.3 2.6 1.3.6 2.7.9 4.1.9 1.4 0 2.8-.3 4-.9 1.2-.6 2.3-1.5 3.2-2.6.9-1.1 1.6-2.4 2.1-3.8.5-1.5.8-3.1.8-4.7 0-1.9-.4-3.7-1.2-5.3-1.6-3.2-4.5-5.3-8.7-6.2-2-.4-4.1-.6-6.2-.6-1.7 0-3.4.2-5 .6z"/>
                              </motion.svg>
                              
                              {/* Quote Text */}
                              <motion.p 
                                className="text-xl lg:text-2xl xl:text-3xl leading-relaxed opacity-90 mb-0 font-light max-w-2xl"
                                initial={{ y: 30 }}
                                whileInView={{ y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                {client.quote}
                              </motion.p>
                            </div>
                          </motion.div>

                          {/* Client Info */}
                          <motion.div 
                            className="tr__clients__details order-1 lg:order-2 text-center lg:text-right"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {/* Client Avatar */}
                            <div className="tr__clients__avatar relative mx-auto lg:mx-0 mb-8 lg:mb-12 inline-block">
                              <motion.img 
                                src={client.image}
                                alt={client.name}
                                className="w-32 h-32 lg:w-44 lg:h-44 object-cover rounded-[2.5rem] shadow-2xl border-6 border-white/10 hover:border-white/25 transition-all duration-500 mx-auto lg:ml-auto"
                                whileHover={{ scale: 1.1, rotate: -3 }}
                              />
                            </div>
                            
                            {/* Client Name */}
                            <motion.h5 
                              className="text-4xl lg:text-5xl font-black mb-4 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text"
                              whileHover={{ y: -5 }}
                            >
                              {client.name}
                            </motion.h5>
                            
                            {/* Client Title */}
                            <motion.p 
                              className="text-xl lg:text-2xl opacity-80 tracking-wide"
                              whileHover={{ scale: 1.02 }}
                            >
                              {client.title}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="tr__clients__says__slider__nav hidden xl:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between pointer-events-none z-20">
            <motion.button
              onClick={prevSlide}
              className="tr__clients__says__slider__prev w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center hover:bg-white/25 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-400 cursor-none border border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.15, rotate: -180 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="tr__clients__says__slider__next w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center hover:bg-white/25 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-400 cursor-none border border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.15, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Slide Indicators */}
          <motion.div 
            className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black/80 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
          >
            {clientsData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-3 rounded-full transition-all duration-500 cursor-pointer overflow-hidden group ${
                  currentSlide === index 
                    ? 'w-12 bg-gradient-to-r from-orange-400 to-pink-400 shadow-lg shadow-orange-500/50' 
                    : 'w-3 bg-white/40 hover:bg-white/70 hover:w-6'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentSlide === index && (
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <motion.div 
        className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 bg-gradient-to-r from-black/95 via-black/80 to-black/95 backdrop-blur-2xl px-8 py-5 rounded-3xl border border-white/30 shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <motion.button
          onClick={prevSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-white/25 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-400"
          whileHover={{ scale: 1.15, rotate: -180 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.div 
          className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 min-w-[120px] justify-center"
        >
          <span className="text-sm opacity-75 uppercase tracking-wider font-medium">
            {clientsData[currentSlide]?.name || ''}
          </span>
        </motion.div>
        
        <motion.button
          onClick={nextSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-white/25 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-400"
          whileHover={{ scale: 1.15, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/2 via-transparent to-purple-500/2 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-radial from-orange-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 lg:w-72 lg:h-72 bg-gradient-radial from-purple-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};

export default Clients;