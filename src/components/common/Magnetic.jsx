import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useGesture } from '@use-gesture/react';

// ✅ FIXED: Proper custom hook (moved outside component)
const useMagnetic = (strength = 0.15, springConfig = { stiffness: 400, damping: 30 }, disabled = false) => {
  const ref = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const isAnimating = useRef(false);

  const animateSpring = useCallback(() => {
    if (!ref.current || disabled || !isAnimating.current) return;

    const dx = targetPos.current.x - currentPos.current.x;
    const dy = targetPos.current.y - currentPos.current.y;
    
    // Spring physics ✅
    const accelX = dx * springConfig.stiffness * 0.001;
    const accelY = dy * springConfig.stiffness * 0.001;
    
    currentPos.current.x += accelX - (currentPos.current.x * springConfig.damping * 0.01);
    currentPos.current.y += accelY - (currentPos.current.y * springConfig.damping * 0.01);

    if (ref.current) {
      ref.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
    }

    // Continue animation if still moving
    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      rafRef.current = requestAnimationFrame(animateSpring);
    } else {
      isAnimating.current = false;
    }
  }, [springConfig.stiffness, springConfig.damping, disabled]);

  const handleMouseMove = useCallback(({ event }) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    
    targetPos.current = { x, y };
    
    // Start animation
    if (!isAnimating.current) {
      isAnimating.current = true;
      rafRef.current = requestAnimationFrame(animateSpring);
    }
  }, [strength, animateSpring, disabled]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    
    targetPos.current = { x: 0, y: 0 };
    
    // Reset animation
    if (!isAnimating.current) {
      isAnimating.current = true;
      rafRef.current = requestAnimationFrame(animateSpring);
    }
  }, [animateSpring, disabled]);

  useGesture(
    { 
      onMouseMove: handleMouseMove, 
      onMouseLeave: handleMouseLeave 
    },
    { 
      target: ref, 
      eventOptions: { passive: true } 
    }
  );

  // ✅ Proper cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isAnimating.current = false;
    };
  }, []);

  return ref;
};

// ✅ FIXED: Proper forwardRef component
const MagneticComponent = forwardRef(({
  children,
  strength = 0.15,
  springConfig = { stiffness: 400, damping: 30 },
  className = '',
  disabled = false,
  style = {}
}, forwardedRef) => {
  const elementRef = useMagnetic(strength, springConfig, disabled);
  
  // ✅ Proper ref merging
  useImperativeHandle(forwardedRef, () => elementRef.current, [elementRef]);

  return (
    <div 
      ref={elementRef}
      className={`
        tr__magnetic ${className}
        will-change-transform transition-colors duration-200
        ${disabled ? 'pointer-events-none' : ''}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        ...style
      }}
    >
      {children}
    </div>
  );
});

MagneticComponent.displayName = 'Magnetic';

export default MagneticComponent;