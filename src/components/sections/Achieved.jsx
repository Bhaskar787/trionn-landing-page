import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { statsData } from '../../data/stats'; // ✅ Import from data file

const Achieved = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [isInView, controls]);

  // Counter animation component
  const Counter = ({ endValue, duration = 2 }) => {
    const countRef = useRef(0);
    
    useEffect(() => {
      if (!isInView) return;
      
      const start = countRef.current;
      const end = parseInt(endValue);
      const increment = end / (duration * 60); // 60 FPS
      const timer = setInterval(() => {
        countRef.current += increment;
        if (countRef.current >= end) {
          countRef.current = end;
          clearInterval(timer);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [isInView, endValue, duration]);

    return (
      <motion.span className="text-5xl lg:text-7xl font-black">
        {Math.floor(countRef.current)}
      </motion.span>
    );
  };

  return (
    <section className="tr__section tr__home__achieved py-40 lg:py-60 overflow-hidden bg-gradient-to-br from-black via-black/50 to-gray-900">
      <div className="tr__home__achieved__container grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.id} // ✅ Use stat.id instead of index
            variants={{
              hidden: { 
                opacity: 0, 
                scale: 0.8, 
                y: 50,
                rotate: -5
              },
              animate: { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
            initial="hidden"
            animate={controls}
            whileHover={{ 
              scale: 1.05, 
              rotate: 1,
              y: -10
            }}
            className={`tr__home__achieved__block relative overflow-hidden rounded-3xl p-8 lg:p-12 h-64 lg:h-80 flex items-center group cursor-pointer backdrop-blur-xl border border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 bg-white/5 hover:bg-white/10`}
          >
            
            {/* Background gradient based on stat.color */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl`}
            />
            
            {/* Content wrapper */}
            <div className="tr__home__achieved__block__wrapper w-full h-full flex items-center justify-between relative z-10">
              
              {/* Number */}
              <div className="tr__home__achieved__number flex flex-col">
                <motion.div className="flex items-baseline">
                  <Counter endValue={stat.number} duration={stat.animationDuration || 2.5} />
                  <span className="text-3xl lg:text-4xl font-black ml-2 text-orange-400">
                    {stat.suffix}
                  </span>
                </motion.div>
              </div>

              {/* Label */}
              <div className="tr__home__achieved__category text-right leading-tight">
                <motion.p 
                  className="text-lg lg:text-xl xl:text-2xl font-light opacity-90 group-hover:opacity-100 transition-all duration-300 tracking-tight"
                  initial={{ x: 20, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                >
                  {stat.label.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br className="lg:block hidden" />}
                    </span>
                  ))}
                </motion.p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent transform group-hover:translate-x-2 transition-transform" />
            <div className="absolute bottom-4 left-4 w-20 h-px bg-gradient-to-l from-white/40 via-white/20 to-transparent transform group-hover:translate-x-[-2px] transition-transform" />
            
            {/* Floating particles */}
            <div className="absolute top-6 left-6 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
            <div className="absolute bottom-8 right-8 w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300" />
          </motion.div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default Achieved;