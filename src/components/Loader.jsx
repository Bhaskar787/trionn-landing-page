import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const svgRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Animate SVG path
    const path = svgRef.current?.querySelector('.overlay__path');
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      path.style.animation = 'dash 2s ease-in-out forwards';
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loader fixed inset-0 w-full h-screen overflow-hidden z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          {/* SVG Overlay */}
          <svg
            ref={svgRef}
            className="overlay w-full h-full absolute"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              className="overlay__path"
              fill="#17181A"
              vectorEffect="non-scaling-stroke"
              d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>

          {/* Centered Loader */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Spinning Ring */}
            <motion.div
              className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-white/20 border-t-white/80 rounded-full relative mb-8"
              animate={{ 
                rotate: 360 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
            >
              <motion.div
                className="absolute inset-0 w-24 h-24 lg:w-32 lg:h-32 m-auto border-4 border-white/10 border-t-orange-400 rounded-full"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 lg:w-80 h-2 bg-white/10 rounded-full overflow-hidden mb-8">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* Progress Text */}
            <motion.div
              className="text-2xl lg:text-3xl font-mono tracking-wider opacity-75"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Audio placeholder (hidden) */}
          <div className="hidden">
            <audio autoPlay>
              <source src="/assets/audio/roar.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;