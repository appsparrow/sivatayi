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
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

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
    
    // Constrain to viewport
    const maxX = window.innerWidth - 350; // Modal width
    const maxY = window.innerHeight - 400; // Modal height
    
    setDragPosition({
      x: Math.max(-200, Math.min(maxX, newX)),
      y: Math.max(-100, Math.min(maxY, newY))
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
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
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
        left: `${Math.max(5, Math.min(95, x))}%`, 
        top: `${Math.max(10, Math.min(80, y))}%`, 
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
              : 'bg-white/70 md:bg-white/90 backdrop-blur-sm border border-white/20 hover:shadow-xl'
          } rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer`}>
            <MessageSquare className={`h-5 w-5 ${
              colorScheme === 'liquidglass' ? 'text-white glass-text' : 'text-blue-600'
            }`} />
          </div>
          
          <AnimatePresence>
            {isActive && (
              <div
                ref={modalRef}
                className="floating-popup-modal fixed"
                style={{
                  transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                  zIndex: 99999,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                  touchAction: 'none'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
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
                >
                  <Card className={`${
                    colorScheme === 'liquidglass' 
                      ? 'glass-card' 
                      : 'bg-white/95 backdrop-blur-sm'
                  } shadow-2xl border-0 select-none`}
                  style={{ 
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`font-semibold text-sm leading-tight flex-1 pr-2 ${
                          colorScheme === 'liquidglass' ? 'text-white glass-text' : 'text-gray-900'
                        }`}>
                          {question}
                        </h3>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            onClick();
                          }}
                          className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                            colorScheme === 'liquidglass' 
                              ? 'hover:bg-white/20 text-white/80 hover:text-white' 
                              : 'hover:bg-gray-100 text-gray-500'
                          }`}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        colorScheme === 'liquidglass' ? 'text-white/90 glass-text' : 'text-gray-700'
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
