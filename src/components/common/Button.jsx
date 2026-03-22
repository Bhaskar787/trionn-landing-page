import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({
  children,
  className = '',
  href,
  isExternal = false,
  variant = 'primary',
  size = 'md',
  icon = null,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  ...props
}, ref) => {
  // ✅ Proper Component determination
  const isLink = href && !disabled && !loading;
  const Component = isLink ? (isExternal ? 'a' : 'button') : 'button';
  
  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center gap-2 
    font-semibold uppercase tracking-wider select-none
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.98]
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:shadow-orange-500/50 border border-transparent',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/20',
    ghost: 'text-white/90 hover:text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm border border-transparent'
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm h-10',
    md: 'px-8 py-3.5 text-base h-12',
    lg: 'px-10 py-4.5 text-lg h-14'
  };

  const getShimmerAnimation = {
    shimmer: {
      backgroundPosition: ['200% 0%', '-200% 0%', '200% 0%'],
      transition: { duration: 2, repeat: Infinity, ease: 'linear' }
    }
  };

  const isInteractive = !disabled && !loading;

  return (
    <motion.div
      className={`
        button group ${baseClasses} ${variants[variant]} ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} ${className}
        ${isInteractive ? 'hover:scale-105 hover:-translate-y-1 cursor-pointer shadow-lg' : ''}
        rounded-xl
      `}
      initial={false}
      whileHover={isInteractive ? { scale: 1.05, y: -2 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      ref={ref}
    >
      {/* Shimmer Background */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-[0.4] transition-opacity duration-500 rounded-[inherit]"
        initial={false}
        animate={isInteractive ? "shimmer" : "initial"}
        variants={getShimmerAnimation}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          backgroundSize: '200% 100%'
        }}
      />

      {/* Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-orange-400/30 via-transparent to-pink-400/30 opacity-0 group-hover:opacity-100 blur-xl -z-10"
        initial={{ scale: 1 }}
        whileHover={isInteractive ? { scale: 1.5 } : {}}
        transition={{ duration: 0.4 }}
      />

      {/* Pulse Ring */}
      {isInteractive && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] bg-white/20 -z-10"
          initial={{ scale: 0.8, opacity: 0.5 }}
          whileHover={{ 
            scale: 1.8,
            opacity: [0.4, 0.2, 0.1, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      )}

      {/* Main Button */}
      <Component
        href={href}
        disabled={disabled || loading}
        onClick={onClick}
        aria-disabled={disabled || loading}
        aria-label={typeof children === 'string' ? children : 'Button'}
        role={isLink ? 'link' : 'button'}
        tabIndex={disabled || loading ? -1 : 0}
        className="relative z-10 flex items-center justify-center w-full h-full px-1 py-1"
        target={isExternal ? '_blank' : undefined}  // ✅ FIXED: Added 'undefined'
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon */}
        {!loading && icon && (
          <motion.span 
            className="flex-shrink-0"
            initial={{ rotate: 0 }}
            whileHover={isInteractive ? { rotate: 12, scale: 1.1 } : {}}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
        
        {/* Text */}
        {!loading && (
          <span className="leading-none">{children}</span>
        )}
      </Component>
    </motion.div>
  );
});

Button.displayName = 'Button';

// Pre-styled variants
Button.Primary = (props) => <Button variant="primary" {...props} />;
Button.Secondary = (props) => <Button variant="secondary" {...props} />;
Button.Ghost = (props) => <Button variant="ghost" {...props} />;

export default Button;