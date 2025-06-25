import React from 'react';
import { motion } from 'framer-motion';

interface SlimProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  colorScheme: string;
}

const SlimProjectCard: React.FC<SlimProjectCardProps> = ({ title, description, tags, colorScheme }) => {
  // Enhanced glass card for liquidglass and liquidgood themes
  if (colorScheme === 'liquidglass' || colorScheme === 'liquidgood') {
    const isLiquidGood = colorScheme === 'liquidgood';
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={isLiquidGood ? "liquidgood-glass-card" : "glass-card-enhanced"}
        style={{ position: 'relative' }}
      >
        {isLiquidGood ? (
          <>
            <div className="liquidgood-glass-filter"></div>
            <div className="liquidgood-glass-overlay"></div>
            <div className="liquidgood-glass-specular"></div>
            <div className="liquidgood-glass-content p-4">
              <div className="space-y-2">
                {/* Title - Single Line */}
                <div>
                  <h3 className="font-semibold text-base leading-tight truncate text-white">
                    {title}
                  </h3>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="liquidgood-glass-pill text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description - Two lines */}
                <div>
                  <p className="text-sm leading-relaxed line-clamp-2 text-gray-300">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* SVG Filter for distortion effects */}
            <svg style={{ display: 'none' }}>
              <defs>
                <filter id="liquidgood-dist-slim" x="0%" y="0%" width="100%" height="100%">
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
        ) : (
          <>
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="glass-content p-4">
              <div className="space-y-2">
                {/* Title - Single Line */}
                <div>
                  <h3 className="font-semibold text-base leading-tight truncate text-white">
                    {title}
                  </h3>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="liquid-glass-pill text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description - Two lines */}
                <div>
                  <p className="text-sm leading-relaxed line-clamp-2 text-gray-300">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* SVG Filter for distortion effects */}
            <svg style={{ display: 'none' }}>
              <defs>
                <filter id="lg-dist-slim" x="0%" y="0%" width="100%" height="100%">
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
          </>
        )}
      </motion.div>
    );
  }

  // Standard card for other themes
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
        ${colorScheme === 'professional'
          ? 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
          : 'bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-md'
        }
      `}
    >
      <div className="space-y-2">
        {/* Title - Single Line */}
        <div>
          <h3 className={`
            font-semibold text-base leading-tight truncate
            ${colorScheme === 'professional' ? 'text-gray-900' : 'text-gray-900'}
          `}>
            {title}
          </h3>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`
                px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
                ${colorScheme === 'professional'
                  ? 'bg-gray-100 text-gray-700 border border-gray-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description - Two lines */}
        <div>
          <p className={`
            text-sm leading-relaxed line-clamp-2
            ${colorScheme === 'professional' ? 'text-gray-600' : 'text-gray-600'}
          `}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SlimProjectCard; 