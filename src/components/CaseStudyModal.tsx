import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassCard from './GlassCard';

interface CaseStudyModalProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    images: string[];
    tags: string[];
    problem: string;
    solution: string;
    impact: string;
  };
  onClose: () => void;
  colorScheme?: string;
}

const CaseStudyModal = ({ project, onClose, colorScheme = 'default' }: CaseStudyModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl ${
            colorScheme === 'liquidglass' 
              ? 'bg-black/20 backdrop-blur-lg border border-white/20 rounded-[20px] m-4' 
              : colorScheme === 'dark' 
                ? 'bg-gray-900 rounded-2xl' 
                : 'bg-white rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-sm ${
            colorScheme === 'liquidglass' 
              ? 'bg-white/10 border-white/20 rounded-t-[20px]' 
              : 'bg-white/95 dark:bg-gray-900/95 rounded-t-2xl'
          }`}>
            <div>
              <h2 className={`text-2xl font-bold ${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {project.title}
              </h2>
              {colorScheme === 'liquidglass' ? (
                <span className="glass-badge mt-2 inline-block">
                  {project.category}
                </span>
              ) : (
                <Badge variant="secondary" className="mt-2">
                  {project.category}
                </Badge>
              )}
            </div>
            {colorScheme === 'liquidglass' ? (
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                <X className="h-6 w-6" />
              </button>
            ) : (
              <Button
                variant="ghost"
                onClick={onClose}
                className={`${colorScheme === 'dark' ? 'text-gray-300 hover:text-white' : ''}`}
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                colorScheme === 'liquidglass' ? (
                  <span key={tag} className="glass-badge">
                    {tag}
                  </span>
                ) : (
                  <Badge key={tag} variant="outline" className={`${
                    colorScheme === 'dark' ? 'border-gray-600 text-gray-300' : ''
                  }`}>
                    {tag}
                  </Badge>
                )
              ))}
            </div>

            {/* Description */}
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Overview
              </h3>
              <p className={`${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Problem */}
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Problem
              </h3>
              <p className={`${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Solution
              </h3>
              <p className={`${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.solution}
              </p>
            </div>

            {/* Impact */}
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Impact
              </h3>
              <p className={`${
                colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.impact}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudyModal;
