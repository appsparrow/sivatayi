import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState, useRef } from 'react';

interface FloatingQuestionProps {
  question: string;
  answer: string;
  x: number;
  y: number;
  isActive: boolean;
  onClick: () => void;
  colorScheme?: string;
}

const FloatingQuestion = ({ question, answer, x, y, isActive, onClick, colorScheme = 'default' }: FloatingQuestionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Track mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Native touch/mouse event handlers for better mobile support
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - dragPosition.x,
      y: clientY - dragPosition.y
    });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    // Constrain to viewport - make responsive based on screen size
    const modalWidth = isMobile ? Math.min(350, window.innerWidth - 40) : 400;
    const modalHeight = isMobile ? 300 : 400;
    
    const maxX = window.innerWidth - modalWidth;
    const maxY = window.innerHeight - modalHeight;
    
    setDragPosition({
      x: Math.max(-50, Math.min(maxX, newX)),
      y: Math.max(-50, Math.min(maxY, newY))
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragEnd();
  };

  // Add/remove global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  // Reset position to center on mobile when modal opens
  useEffect(() => {
    if (isActive) {
      if (isMobile) {
        // Force center the modal on mobile - override any previous drag position
        setDragPosition({
          x: 0,
          y: 0
        });
      } else {
        // Reset to default position on desktop
        setDragPosition({ x: 0, y: 0 });
      }
    }
  }, [isActive, isMobile]);

  const handleClick = (e: any) => {
    // Only trigger click if not dragging
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{ 
        left: `${Math.max(10, Math.min(95, isMobile ? Math.max(20, Math.min(80, x + (50 - x) * 0.3)) : x))}%`, 
        top: `${Math.max(10, Math.min(80, isMobile ? Math.max(5, y - 15) : y))}%`, 
        zIndex: isActive ? 9999 : 100 
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.random() * 2, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: isActive ? 0 : [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="relative">
          {/* Simple circular floating question bubble */}
          <div className={`${
            colorScheme === 'liquidglass' 
              ? 'glass-floating-question' 
              : colorScheme === 'liquidgood'
                ? 'relative liquidgood-glass-button'
                : 'bg-white/70 md:bg-white/90 backdrop-blur-sm border border-white/20 hover:shadow-xl'
          } rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer`}>
            {colorScheme === 'liquidgood' && (
              <>
                <div className="liquidgood-glass-filter"></div>
                <div className="liquidgood-glass-overlay"></div>
                <div className="liquidgood-glass-specular"></div>
                <div className="liquidgood-glass-content" style={{ position: 'absolute', inset: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare className="h-5 w-5 text-white glass-text" />
                </div>
                
                {/* SVG Filter */}
                <svg style={{ display: 'none' }}>
                  <defs>
                    <filter id="liquidgood-dist-floating" x="0%" y="0%" width="100%" height="100%">
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
            {colorScheme !== 'liquidgood' && (
              <MessageSquare className={`h-5 w-5 ${
                colorScheme === 'liquidglass' ? 'text-white glass-text' : 'text-blue-600'
              }`} />
            )}
          </div>
          
          <AnimatePresence>
            {isActive && (
              <div
                ref={modalRef}
                className="floating-popup-modal"
                style={{
                  left: window.innerWidth <= 768 ? undefined : `calc(50% + ${dragPosition.x}px)`,
                  top: window.innerWidth <= 768 ? undefined : `calc(50% + ${dragPosition.y}px)`,
                  transform: window.innerWidth <= 768 ? undefined : 'translate(-50%, -50%)',
                  userSelect: 'none',
                  touchAction: 'none'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isDragging ? 1.05 : 1, 
                    y: 0 
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg"
                >
                  <Card className={`${
                    colorScheme === 'liquidglass' 
                      ? 'glass-card' 
                      : colorScheme === 'liquidgood'
                        ? 'glass-card'
                        : 'bg-white/95 backdrop-blur-sm'
                  } shadow-2xl border-0 select-none w-full min-w-[320px] max-w-[400px]`}
                  style={{ 
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}>
                    {colorScheme === 'liquidgood' && (
                      <>
                        {/* Use same glass styling as liquidglass theme */}
                      </>
                    )}
                    <CardContent className={`p-5 md:p-6 ${colorScheme === 'liquidgood' ? 'relative z-10' : ''}`}>
                      <div 
                        className="flex items-start justify-between mb-4 cursor-move"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        style={{ 
                          touchAction: 'none', 
                          userSelect: 'none',
                          cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                      >
                        <div className="flex items-start flex-1 pr-3">
                          <div className={`mr-2 mt-1 flex flex-col gap-0.5 ${
                            colorScheme === 'liquidglass' || colorScheme === 'liquidgood' ? 'opacity-50' : 'opacity-40'
                          }`}>
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                          </div>
                          <h3 className={`font-semibold text-base md:text-lg leading-tight ${
                            colorScheme === 'liquidglass' || colorScheme === 'liquidgood' ? 'text-white glass-text' : 'text-gray-900'
                          }`}>
                            {question}
                          </h3>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            onClick();
                          }}
                          className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                            colorScheme === 'liquidglass' || colorScheme === 'liquidgood'
                              ? 'hover:bg-white/20 text-white/80 hover:text-white' 
                              : 'hover:bg-gray-100 text-gray-500'
                          }`}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className={`text-sm md:text-base leading-relaxed ${
                        colorScheme === 'liquidglass' || colorScheme === 'liquidgood' ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        {answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingQuestion;
