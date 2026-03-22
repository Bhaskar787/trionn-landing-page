import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Marquee = () => {
  return (
    <section className="tr__section tr__text__marquee py-20 overflow-hidden bg-gradient-to-r from-black via-black/50 to-black">
      
      {/* First Row - Forward */}
      <div className="tr__text__marquee__row overflow-hidden">
        <div className="tr__text__marquee__wrapper flex animate-marquee whitespace-nowrap">
          <motion.div className="tr__marquee__item flex items-center h-32 lg:h-40">
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mr-8">
              wild ideas!
            </h3>
            <h3 className="text-4xl lg:text-6xl font-black text-white/30 px-8">—</h3>
          </motion.div>
          <motion.div className="tr__marquee__item flex items-center h-32 lg:h-40">
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mr-8">
              wild ideas!
            </h3>
            <h3 className="text-4xl lg:text-6xl font-black text-white/30 px-8">—</h3>
          </motion.div>
        </div>
      </div>

      {/* Second Row - Reverse */}
      <div className="tr__text__marquee__row overflow-hidden mt-4 lg:mt-8">
        <div className="tr__text__marquee__wrapper flex animate-marquee-reverse whitespace-nowrap">
          <motion.div className="tr__marquee__item__rev flex items-center h-32 lg:h-40">
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mr-8">
              let's dive in!
            </h3>
            <h3 className="text-4xl lg:text-6xl font-black text-white/30 px-8">—</h3>
          </motion.div>
          <motion.div className="tr__marquee__item__rev flex items-center h-32 lg:h-40">
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mr-8">
              let's dive in!
            </h3>
            <h3 className="text-4xl lg:text-6xl font-black text-white/30 px-8">—</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;