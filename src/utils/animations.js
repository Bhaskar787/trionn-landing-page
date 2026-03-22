import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

export const useGSAP = (target, deps = []) => {
  const ref = useRef(null);
  const ctx = useRef(gsap.context());

  useEffect(() => {
    ctx.current = gsap.context(() => {
      // ✅ Stagger animation
      gsap.fromTo(
        target.current?.querySelectorAll('[data-stagger]'),
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out' 
        }
      );

      // ✅ Counter animation
      const counters = target.current?.querySelectorAll('[data-counter]');
      counters?.forEach(counter => {
        const endValue = parseInt(counter.dataset.counter);
        gsap.to({}, {
          duration: 2,
          onUpdate: () => {
            counter.textContent = Math.ceil(endValue * gsap.progress(counter, 1));
          },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });

    return () => ctx.current.revert();
  }, deps);

  return ref;
};

// ✅ Custom Hooks for specific animations
export const useStaggerReveal = (targets) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.12, 
          ease: 'power3.out' 
        }
      );
    });
    return () => ctx.revert();
  }, [targets]);
};

export const useParallax = (element, speed = 0.5) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, [element, speed]);
};

export const useMagnetic = (element, strength = 0.15) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (!element.current) return;
      const rect = element.current.getBoundingClientRect();
      const x = (mouseRef.current.x - rect.left - rect.width / 2) * strength;
      const y = (mouseRef.current.y - rect.top - rect.height / 2) * strength;
      
      gsap.to(element.current, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    element.current?.addEventListener('mousemove', handleMouseMove);
    element.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.current?.removeEventListener('mousemove', handleMouseMove);
      element.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);
};

export const useTiltEffect = (imageRef) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(imageRef.current, {
        rotationX: y * 15,
        rotationY: -x * 15,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    imageRef.current?.addEventListener('mousemove', handleMouseMove);
    imageRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      imageRef.current?.removeEventListener('mousemove', handleMouseMove);
      imageRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

export const useScrollReveal = (target, options = {}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y: 80, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...options
          }
        }
      );
    });
    return () => ctx.revert();
  }, [target, options]);
};

// ✅ Usage in components
/*
const MyComponent = () => {
  const sectionRef = useRef(null);
  
  useScrollReveal(sectionRef);
  useParallax(sectionRef, 0.3);
  
  return <section ref={sectionRef}>Content</section>;
};
*/

export default {
  useGSAP,
  useStaggerReveal,
  useParallax,
  useMagnetic,
  useTiltEffect,
  useScrollReveal
};