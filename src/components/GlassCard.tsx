import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'standard' | 'enhanced' | 'container' | 'liquidgood';
  size?: 'sm' | 'md' | 'lg';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hover = false,
  variant = 'standard',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  // Enhanced glass card with layered structure
  if (variant === 'enhanced') {
    return (
      <div 
        className={`glass-card-enhanced ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>
        <div className={`glass-content ${sizeClasses[size]}`}>
          {children}
        </div>
        
        {/* SVG Filter for distortion effects */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="lg-dist-card" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.003 0.003" 
                numOctaves="1" 
                seed="42" 
                result="noise" 
              />
              <feGaussianBlur in="noise" stdDeviation="0.8" result="blurred" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="blurred" 
                scale="10" 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }

  // Liquidgood glass card with layered structure
  if (variant === 'liquidgood') {
    return (
      <div 
        className={`liquidgood-glass-card ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <div className="liquidgood-glass-filter"></div>
        <div className="liquidgood-glass-overlay"></div>
        <div className="liquidgood-glass-specular"></div>
        <div className={`liquidgood-glass-content ${sizeClasses[size]}`}>
          {children}
        </div>
        
        {/* SVG Filter for distortion effects */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="liquidgood-dist-card" x="0%" y="0%" width="100%" height="100%">
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
      </div>
    );
  }

  // Glass container variant (for larger content areas)
  if (variant === 'container') {
    return (
      <div 
        className={`glass-container glass-container--rounded ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>
        <div className={`glass-content glass-content--inline ${sizeClasses[size]}`}>
          {children}
        </div>
        
        {/* SVG Filter for distortion effects */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="lg-dist-container" x="0%" y="0%" width="100%" height="100%">
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
      </div>
    );
  }

  // Standard glass card
  return (
    <div 
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};

export default GlassCard; 