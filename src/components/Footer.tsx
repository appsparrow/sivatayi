import React from 'react';

interface FooterProps {
  colorScheme: string;
}

const Footer = ({ colorScheme }: FooterProps) => {
  return (
    <footer className={`py-8 px-6 border-t ${
      colorScheme === 'liquidglass' 
        ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
        : colorScheme === 'liquidgood'
          ? 'border-white/20 relative'
          : colorScheme === 'professional' 
            ? 'border-gray-300 bg-gray-50/50' 
            : 'border-gray-200'
    }`}>
      {/* Glass layers for liquidgood */}
      {colorScheme === 'liquidgood' && (
        <>
          <div className="absolute inset-0 liquidgood-glass-filter"></div>
          <div className="absolute inset-0 liquidgood-glass-overlay"></div>
          <div className="absolute inset-0 liquidgood-glass-specular"></div>
          
          {/* SVG Filter */}
          <svg style={{ display: 'none' }}>
            <defs>
              <filter id="liquidgood-dist-footer" x="0%" y="0%" width="100%" height="100%">
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
        </>
      )}
      
      <div className={`max-w-7xl mx-auto ${colorScheme === 'liquidgood' ? 'relative z-10' : ''}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className={`text-sm ${
              colorScheme === 'liquidglass' 
                ? 'text-white/80' 
                : colorScheme === 'liquidgood'
                  ? 'text-white/90'
                  : colorScheme === 'professional' 
                    ? 'text-gray-600' 
                    : 'text-gray-600'
            }`}>
              Discovering{' '}
              <a 
                href="https://lovable.dev/invite/7ea3252a-98b9-4671-ba20-2292bced6e46" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-medium hover:underline transition-colors ${
                  colorScheme === 'liquidglass' 
                    ? 'text-blue-200 hover:text-blue-100' 
                    : colorScheme === 'liquidgood'
                      ? 'text-white hover:text-white/80'
                      : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                lovable 
              </a>
            </p>
          </div>
          
          <div className={`flex items-center gap-2 text-xs ${
            colorScheme === 'liquidglass' 
              ? 'text-white/60' 
              : colorScheme === 'liquidgood'
                ? 'text-white/70'
                : colorScheme === 'professional' 
                  ? 'text-gray-500' 
                  : 'text-gray-500'
          }`}>
            <span>Directed by real human </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
