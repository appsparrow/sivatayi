import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'enhanced' | 'liquidgood';
  disabled?: boolean;
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  size = 'md',
  variant = 'primary',
  disabled = false
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'glass-button-primary',
    secondary: 'glass-button-secondary',
    enhanced: 'glass-button-enhanced',
    liquidgood: 'liquidgood-glass-button'
  };

  // Liquidgood glass button with exact layered structure
  if (variant === 'liquidgood') {
    return (
      <button 
        className={`liquidgood-glass-button ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="liquidgood-glass-filter"></div>
        <div className="liquidgood-glass-overlay"></div>
        <div className="liquidgood-glass-specular"></div>
        <div className="liquidgood-glass-content">
          {children}
        </div>
        
        {/* SVG Filter for distortion effects */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="liquidgood-dist" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.008 0.008" 
                numOctaves="2" 
                seed="92" 
                result="noise" 
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="blurred" 
                scale="70" 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>
      </button>
    );
  }

  // Enhanced glass button with layered structure
  if (variant === 'enhanced') {
    return (
      <button 
        className={`glass-button-enhanced ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>
        <div className="glass-content" style={{ position: 'relative', zIndex: 3 }}>
          {children}
        </div>
        
        {/* SVG Filter for distortion effects */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.008 0.008" 
                numOctaves="2" 
                seed="92" 
                result="noise" 
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="blurred" 
                scale="70" 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>
      </button>
    );
  }

  // Standard glass button
  return (
    <button 
      className={`glass-button ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GlassButton; 