import { useEffect, useRef, useState, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    type: 'default',
    text: '',
    size: 1
  });

  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);
  const hoverablesRef = useRef(new Set());
  const rafRef = useRef(null);

  // Mouse move
  const updateCursorPos = useCallback((state) => {
    const { clientX: x, clientY: y } = state.event;
    setCursorState(prev => ({ ...prev, x, y }));
  }, []);

  const handleHoverEnter = useCallback((e) => {
    const target = e.currentTarget;

    const customText = target.dataset.cursorText || '';
    const customSize = target.dataset.cursorSize || '1';

    setCursorState(prev => ({
      ...prev,
      type: 'hover',
      text: customText,
      size: parseFloat(customSize)
    }));

    target.classList.add('cursor-hovered');
    hoverablesRef.current.add(target);
  }, []);

  const handleHoverLeave = useCallback((e) => {
    const target = e.currentTarget;

    setCursorState(prev => ({
      ...prev,
      type: 'default',
      text: '',
      size: 1
    }));

    target.classList.remove('cursor-hovered');
    hoverablesRef.current.delete(target);
  }, []);

  // Gesture
  useGesture(
    {
      onMouseMove: updateCursorPos,
      onDragStart: () => setCursorState(prev => ({ ...prev, type: 'drag' })),
      onDragEnd: () => setCursorState(prev => ({ ...prev, type: 'default' })),
      onMouseDown: () => setCursorState(prev => ({ ...prev, type: 'click' })),
      onMouseUp: () => setCursorState(prev => ({ ...prev, type: 'default' }))
    },
    {
      target: window,
      drag: { delay: 100 },
      eventOptions: { passive: true }
    }
  );

  // RAF animation
  useEffect(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;

    if (!primary || !secondary) return;

    const updatePosition = () => {
      primary.style.transform = `translate(${cursorState.x}px, ${cursorState.y}px) scale(${cursorState.size * (cursorState.type === 'hover' ? 2.5 : 1)})`;

      secondary.style.transform = `translate(${cursorState.x * 0.8}px, ${cursorState.y * 0.8}px) scale(${cursorState.size * (cursorState.type === 'hover' ? 1.8 : 1)})`;

      secondary.style.opacity = cursorState.type === 'hover' ? '1' : '0.4';

      rafRef.current = requestAnimationFrame(updatePosition);
    };

    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorState]);

  // Hover detection
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('.tr__cursor__hoverable');
      if (target && !target.classList.contains('cursor-hovered')) {
        handleHoverEnter({ currentTarget: target });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('.tr__cursor__hoverable');
      if (target && target.classList.contains('cursor-hovered')) {
        handleHoverLeave({ currentTarget: target });
      }
    };

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, [handleHoverEnter, handleHoverLeave]);

  // ✅ FIXED CLEANUP (IMPORTANT)
  useEffect(() => {
    const hoverables = hoverablesRef.current; // ✅ store snapshot

    return () => {
      hoverables.forEach(el => el.classList.remove('cursor-hovered'));
      hoverables.clear();
    };
  }, []);

  return (
    <>
      {/* Primary Cursor */}
      <div
        ref={primaryRef}
        className={`
          fixed pointer-events-none z-[99999] mix-blend-difference rounded-full shadow-lg
          transition-all duration-75 ease-out
          ${cursorState.type === 'hover'
            ? 'w-[20px] h-[20px] border-2 border-white/70 bg-gradient-to-r from-orange-400/90 to-pink-400/90 shadow-orange-500/60'
            : 'w-[12px] h-[12px] bg-white shadow-white/70'
          }
          ${cursorState.type === 'click' ? 'shadow-red-500/70 scale-125' : ''}
          ${cursorState.type === 'drag' ? 'bg-blue-400/90 shadow-blue-500/60' : ''}
        `}
        style={{ left: '-6px', top: '-6px' }}
      />

      {/* Secondary Cursor */}
      <div
        ref={secondaryRef}
        className={`
          fixed pointer-events-none z-[99998] rounded-full backdrop-blur-xl border-2
          transition-all duration-200 ease-out
          ${cursorState.type === 'hover'
            ? 'w-[48px] h-[48px] border-white/60 shadow-2xl shadow-orange-500/40 scale-125 opacity-100'
            : 'w-[40px] h-[40px] border-white/30 shadow-lg shadow-white/20 opacity-50 scale-100'
          }
        `}
        style={{ left: '-20px', top: '-20px' }}
      />

      {/* Hover Text */}
      <AnimatePresence>
        {cursorState.text && cursorState.type === 'hover' && (
          <motion.div
            className="fixed pointer-events-none z-[99997] whitespace-nowrap px-4 py-2.5 
                     bg-black/95 backdrop-blur-2xl rounded-full text-xs font-bold uppercase 
                     tracking-widest border border-white/50 shadow-2xl select-none
                     bg-gradient-to-r from-orange-500/30 to-pink-500/30"
            style={{
              left: `${cursorState.x + 30}px`,
              top: `${cursorState.y - 40}px`
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25, type: 'spring', bounce: 0.25 }}
          >
            {cursorState.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Ripple */}
      <AnimatePresence>
        {cursorState.type === 'click' && (
          <motion.div
            className="fixed pointer-events-none z-[99996] rounded-full bg-white/40 backdrop-blur-xl mix-blend-difference shadow-2xl"
            style={{
              left: `${cursorState.x - 60}px`,
              top: `${cursorState.y - 60}px`,
              width: 120,
              height: 120
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 12, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Cursor;