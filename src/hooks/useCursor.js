import { useEffect, useRef, useState, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { motion, AnimatePresence } from 'framer-motion';

export const useCursor = (options = {}) => {
  const {
    primarySize = 12,
    secondarySize = 48,
    hoverScale = 3,
    trail = true,
    textOnHover = false
  } = options;

  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);
  const hoverablesRef = useRef(new Set());
  const rafRef = useRef(null);
  const tickingRef = useRef(false);
  
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    isHovering: false,
    hoverText: ''
  });

  // ✅ FIXED: Proper mouse tracking
  useGesture(
    {
      onMouseMove: ({ event }) => {
        const { clientX: x, clientY: y } = event;
        setCursorState(prev => ({ ...prev, x, y }));
      },
      onMouseDown: () => setCursorState(prev => ({ ...prev, isHovering: true })),
      onMouseUp: () => setCursorState(prev => ({ ...prev, isHovering: false }))
    },
    { target: window, eventOptions: { passive: true } }
  );

  // ✅ FIXED: Event delegation
  const handleMouseOver = useCallback((e) => {
    const target = e.target.closest('.tr__cursor__hoverable');
    if (target && !target.classList.contains('cursor-hovered')) {
      setCursorState(prev => ({ 
        ...prev, 
        isHovering: true, 
        hoverText: target.dataset.cursorText || '' 
      }));
      target.classList.add('cursor-hovered');
      hoverablesRef.current.add(target);
    }
  }, []);

  const handleMouseOut = useCallback((e) => {
    const target = e.target.closest('.tr__cursor__hoverable');
    if (target && target.classList.contains('cursor-hovered')) {
      setCursorState(prev => ({ 
        ...prev, 
        isHovering: false, 
        hoverText: '' 
      }));
      target.classList.remove('cursor-hovered');
      hoverablesRef.current.delete(target);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      hoverablesRef.current.forEach(el => el.classList.remove('cursor-hovered'));
      hoverablesRef.current.clear();
    };
  }, [handleMouseOver, handleMouseOut]);

  // ✅ FIXED: Throttled RAF (runs ONCE per frame)
  useEffect(() => {
    const animate = () => {
      const primary = primaryRef.current;
      const secondary = secondaryRef.current;

      if (!primary) {
        tickingRef.current = false;
        return;
      }

      // Direct positioning (no offsets needed)
      primary.style.transform = `translate(${cursorState.x}px, ${cursorState.y}px) scale(${cursorState.isHovering ? hoverScale : 1})`;
      
      if (secondary && trail) {
        secondary.style.transform = `translate(${cursorState.x * 0.85}px, ${cursorState.y * 0.85}px) scale(${cursorState.isHovering ? hoverScale * 0.7 : 1})`;
        secondary.style.opacity = cursorState.isHovering ? '1' : '0.5';
      }

      tickingRef.current = false;
    };

    if (!tickingRef.current) {
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cursorState.x, cursorState.y, cursorState.isHovering, primarySize, secondarySize, hoverScale, trail]);

  // ✅ FIXED: Proper React component (NO HOOKS)
  const CursorElements = React.memo(() => (
    <>
      {/* Primary Cursor */}
      <div 
        ref={primaryRef}
        className="fixed pointer-events-none z-[99999] mix-blend-difference rounded-full shadow-lg cursor--primary bg-white/95 backdrop-blur-sm border border-white/50"
        style={{
          width: `${primarySize}px`,
          height: `${primarySize}px`,
          left: `${-primarySize/2}px`,
          top: `${-primarySize/2}px`
        }}
      />
      
      {/* Secondary Cursor */}
      {trail && (
        <div 
          ref={secondaryRef}
          className="fixed pointer-events-none z-[99998] rounded-full backdrop-blur-2xl border-2 border-white/40 cursor--secondary shadow-xl"
          style={{
            width: `${secondarySize}px`,
            height: `${secondarySize}px`,
            left: `${-secondarySize/2}px`,
            top: `${-secondarySize/2}px`
          }}
        />
      )}
      
      {/* Hover Text */}
      <AnimatePresence>
        {textOnHover && cursorState.hoverText && cursorState.isHovering && (
          <motion.div 
            className="fixed pointer-events-none z-[99997] whitespace-nowrap px-4 py-2 
                     bg-black/98 backdrop-blur-3xl rounded-full text-xs font-bold uppercase 
                     tracking-widest border border-white/60 shadow-2xl select-none
                     bg-gradient-to-r from-orange-500/40 to-pink-500/40"
            style={{
              left: `${cursorState.x + 25}px`,
              top: `${cursorState.y - 35}px`,
              transform: 'translateZ(0)'
            }}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ duration: 0.25, type: 'spring', bounce: 0.3 }}
          >
            {cursorState.hoverText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ));

  CursorElements.displayName = 'CursorElements';

  return {
    CursorElements,
    cursorState,
    setCursorState,
    primaryRef,
    secondaryRef
  };
};