import { useEffect, useRef, useCallback, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = (options = {}) => {
  const {
    lerp = 0.1,
    infinite = false,
    direction = 'vertical',
    gestureDirection = 'vertical',
    smoothTouch = false,
    touchMultiplier = 2,
    wrapperClass = 'smooth-wrapper',
    contentClass = 'smooth-content'
  } = options;

  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const targetRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // ✅ Fixed Lenis initialization
  const initLenis = useCallback((target) => {
    // Destroy existing instance
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (!target) return;

    try {
      lenisRef.current = new Lenis({
        lerp,
        infinite,
        direction,
        gestureDirection,
        smoothTouch,
        touchMultiplier,
        wrapper: target.querySelector(`.${wrapperClass}`),
        content: target.querySelector(`.${contentClass}`)
      });

      // ✅ Fixed RAF with proper cleanup
      const raf = (time) => {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }
      };

      rafRef.current = requestAnimationFrame(raf);
      setIsReady(true);
    } catch (error) {
      console.warn('Lenis initialization failed:', error);
    }
  }, [lerp, infinite, direction, gestureDirection, smoothTouch, touchMultiplier, wrapperClass, contentClass]);

  // ✅ Fixed main effect with proper cleanup
  useEffect(() => {
    const target = document.querySelector('#smooth-wrapper');
    if (!target) return;

    targetRef.current = target;
    initLenis(target);

    // ✅ Fixed ResizeObserver
    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Small debounce
        setTimeout(() => initLenis(entry.target), 100);
      }
    });

    resizeObserverRef.current.observe(target);

    return () => {
      // Cleanup ResizeObserver
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      // Cleanup RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Destroy Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      setIsReady(false);
    };
  }, [initLenis]);

  // ✅ Fixed scrollTo with fallback
  const scrollTo = useCallback((target, opts = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        lerp: opts.lerp || 0.1,
        offset: opts.offset || 0,
        immediate: opts.immediate || false
      });
    } else {
      // Native fallback
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  // ✅ Fixed progress getter
  const getScrollProgress = useCallback(() => {
    return lenisRef.current?.scroll || 0;
  }, []);

  return {
    scrollTo,
    getScrollProgress,
    lenis: lenisRef.current,
    isReady,
    targetRef: targetRef.current
  };
};

// ✅ FIXED Provider (stateless)
export const SmoothScrollProvider = ({ children, options = {} }) => {
  useSmoothScroll(options);
  
  return (
    <div id="smooth-wrapper" className="smooth-wrapper h-screen overflow-hidden">
      <div id="smooth-content" className="smooth-content h-max">
        {children}
      </div>
    </div>
  );
};