import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface UserGreetingProps {
  isOpen: boolean;
  onComplete: (name: string) => void;
  colorScheme?: string;
}

const UserGreeting = ({ isOpen, onComplete, colorScheme = 'default' }: UserGreetingProps) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState<'greeting' | 'ready'>('greeting');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep('ready');
      setTimeout(() => {
        onComplete(name.trim());
      }, 1500);
    }
  };

  const getCardStyle = () => {
    if (colorScheme === 'liquidglass') {
      return 'bg-white/15 backdrop-blur-2xl border-0 shadow-2xl';
    } else if (colorScheme === 'liquidgood') {
      return 'relative liquidgood-glass-card overflow-hidden';
    } else if (colorScheme === 'professional') {
      return 'bg-white border border-gray-200 shadow-xl';
    } else {
      return 'bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl';
    }
  };

  const getTextColor = () => {
    if (colorScheme === 'liquidglass' || colorScheme === 'liquidgood') {
      return 'text-white';
    } else {
      return 'text-gray-800';
    }
  };

  const getSecondaryTextColor = () => {
    if (colorScheme === 'liquidglass' || colorScheme === 'liquidgood') {
      return 'text-white/80';
    } else {
      return 'text-gray-600';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.5
              }
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`${getCardStyle()} rounded-3xl p-8 max-w-md w-full mx-4`}
          >
            {/* Glass layers for liquidgood */}
            {colorScheme === 'liquidgood' && (
              <>
                <div className="liquidgood-glass-filter"></div>
                <div className="liquidgood-glass-overlay"></div>
                <div className="liquidgood-glass-specular"></div>
                
                {/* SVG Filter */}
                <svg style={{ display: 'none' }}>
                  <defs>
                    <filter id="liquidgood-dist-greeting" x="0%" y="0%" width="100%" height="100%">
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
            
            <div className={colorScheme === 'liquidgood' ? 'relative z-10' : ''}>
            {step === 'greeting' ? (
              <div className="text-center flex flex-col items-center justify-center">
                {/* Bot Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    colorScheme === 'liquidglass' || colorScheme === 'liquidgood'
                      ? 'bg-white/20 border border-white/30' 
                      : 'bg-blue-100 border border-blue-200'
                  }`}
                >
                  <MessageSquare className={`w-8 h-8 ${
                    colorScheme === 'liquidglass' || colorScheme === 'liquidgood' ? 'text-white' : 'text-blue-600'
                  }`} />
                </motion.div>

                {/* Greeting Text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className={`text-2xl font-bold mb-2 text-center ${getTextColor()}`}>
                    Hey! I'm Skebot 🤖
                  </h3>
                  <p className={`text-lg mb-6 text-center ${getSecondaryTextColor()}`}>
                    And you are?
                  </p>
                </motion.div>

                {/* Name Input Form */}
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onSubmit={handleNameSubmit}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className={`w-full px-4 py-3 rounded-2xl text-center text-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      colorScheme === 'liquidglass' || colorScheme === 'liquidgood'
                        ? 'bg-white/10 border border-white/30 text-white placeholder-white/60 focus:ring-white/50 focus:bg-white/15'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    autoFocus
                  />
                  
                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className={`w-full py-3 px-6 rounded-2xl font-medium text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      colorScheme === 'liquidglass' || colorScheme === 'liquidgood'
                        ? 'bg-white/20 hover:bg-white/30 border border-white/40 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
                    } ${name.trim() ? 'hover:scale-105' : ''}`}
                  >
                    Nice to meet you!
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.form>
              </div>
            ) : (
              /* Ready Step */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className=""
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.6,
                    repeat: 1
                  }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    colorScheme === 'liquidglass' || colorScheme === 'liquidgood'
                      ? 'bg-white/20 border border-white/30' 
                      : 'bg-green-100 border border-green-200'
                  }`}
                >
                  <MessageSquare className={`w-8 h-8 ${
                    colorScheme === 'liquidglass' || colorScheme === 'liquidgood' ? 'text-white' : 'text-green-600'
                  }`} />
                </motion.div>

                <h3 className={`text-2xl font-bold mb-2 text-center ${getTextColor()}`}>
                  Alright {name}! 🎉
                </h3>
                <p className={`text-lg text-center ${getSecondaryTextColor()}`}>
                  Let's chat about Siva 😉
                </p>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                  className={`h-1 mx-auto mt-4 rounded-full ${
                    colorScheme === 'liquidglass' || colorScheme === 'liquidgood'
                      ? 'bg-white/30' 
                      : 'bg-blue-200'
                  }`}
                />
              </motion.div>
            )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserGreeting; 