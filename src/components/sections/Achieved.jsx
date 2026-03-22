import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { statsData } from '../../data/stats';

const Achieved = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  // ✅ FIX 1: include controls
  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [isInView, controls]); // ✅ correct

  // ✅ FIXED Counter
  const Counter = ({ endValue, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime;
      const end = parseInt(endValue);

      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(progress * end));
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animateCount);

      // ❌ REMOVE isInView from deps to avoid warning
    }, [endValue, duration]); // ✅ FIX 2

    return (
      <motion.span className="text-5xl lg:text-7xl font-black">
        {count}
      </motion.span>
    );
  };

  return (
    <section
      ref={ref}
      className="tr__section py-40 lg:py-60 overflow-hidden bg-gradient-to-br from-black via-black/50 to-gray-900 relative"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.id}
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotate: -5,
              },
              animate: {
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  delay: index * 0.15,
                },
              },
            }}
            initial="hidden"
            animate={controls}
            className="relative rounded-3xl p-8 lg:p-12 h-64 lg:h-80 flex items-center group backdrop-blur-xl border border-white/10"
          >
            <div className="w-full flex justify-between items-center">
              
              <div>
                <Counter endValue={stat.number} />
                <span className="text-3xl ml-2 text-orange-400">
                  {stat.suffix}
                </span>
              </div>

              <div className="text-right">
                {stat.label}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achieved;