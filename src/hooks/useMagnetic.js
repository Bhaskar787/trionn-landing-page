import { useRef, useEffect, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';

export const useMagnetic = (strength = 0.15 ) => {
  const ref = useRef(null);
  const isHovering = useRef(false);
  const targetPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const currentPos = useRef({ x: 0, y: 0 });

  // Mouse handlers ✅
  const handleMouseMove = useCallback(({ event }) => {
    if (!ref.current || !isHovering.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    targetPos.current = { x: x * strength, y: y * strength };
  }, [strength]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetPos.current = { x: 0, y: 0 };
  }, []);

  // Gesture binding ✅
  useGesture(
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove
    },
    { 
      target: ref,
      eventOptions: { passive: true }
    }
  );

  // ✅ FIXED: Smooth RAF animation with proper cleanup
  useEffect(() => {
    const animate = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      // Spring easing
      currentPos.current.x += dx * 0.12;
      currentPos.current.y += dy * 0.12;
      
      if (ref.current) {
        ref.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      // Continue if still moving
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    if (isHovering.current) {
      animate();
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]); // Stable callback dep

  // ✅ Reset position when not hovering
  useEffect(() => {
    if (!isHovering.current) {
      const reset = () => {
        const dx = 0 - currentPos.current.x;
        const dy = 0 - currentPos.current.y;
        
        currentPos.current.x += dx * 0.2;
        currentPos.current.y += dy * 0.2;
        
        if (ref.current) {
          ref.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          rafId.current = requestAnimationFrame(reset);
        } else {
          currentPos.current = { x: 0, y: 0 };
          if (ref.current) {
            ref.current.style.transform = 'translate3d(0px, 0px, 0px)';
          }
        }
      };
      reset();
    }
  }, [isHovering.current]);

  return ref;
};

// ✅ FIXED HOC wrapper
export const Magnetic = ({ children, strength = 0.15, className = '' }) => {
  const ref = useMagnetic(strength);
  
  return (
    <div 
      ref={ref} 
      className={`tr__magnetic ${className} will-change-transform`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};