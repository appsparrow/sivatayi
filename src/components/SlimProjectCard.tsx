import React from 'react';
import { motion } from 'framer-motion';

interface SlimProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  colorScheme: string;
}

const SlimProjectCard: React.FC<SlimProjectCardProps> = ({ title, description, tags, colorScheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
        ${colorScheme === 'liquidglass' 
          ? 'bg-white/10 backdrop-blur-lg border-white/20 shadow-lg hover:bg-white/15 hover:border-white/30' 
          : colorScheme === 'professional'
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
            ${colorScheme === 'liquidglass' 
              ? 'text-white' 
              : colorScheme === 'professional'
                ? 'text-gray-900'
                : 'text-gray-900'
            }
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
                ${colorScheme === 'liquidglass' 
                  ? 'bg-white/15 text-cyan-200 border border-white/20' 
                  : colorScheme === 'professional'
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
            ${colorScheme === 'liquidglass' 
              ? 'text-gray-300' 
              : colorScheme === 'professional'
                ? 'text-gray-600'
                : 'text-gray-600'
            }
          `}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SlimProjectCard; 