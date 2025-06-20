
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  tags: string[];
  problem: string;
  solution: string;
  impact: string;
  process: string[];
  timeline: string;
  role: string;
}

interface ProjectCardDetailedProps {
  project: Project;
}

const ProjectCardDetailed = ({ project }: ProjectCardDetailedProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
        {/* Image Gallery */}
        <div className="relative overflow-hidden h-64">
          <img 
            src={project.images[currentImageIndex]} 
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {project.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <Button 
              size="sm" 
              className="w-full bg-white/90 text-gray-900 hover:bg-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Full Case Study
            </Button>
          </motion.div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="font-semibold text-gray-900">Role:</span>
              <p className="text-gray-600">{project.role}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Timeline:</span>
              <p className="text-gray-600">{project.timeline}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Challenge</h4>
              <p className="text-gray-600 text-sm">{project.problem}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Solution</h4>
              <p className="text-gray-600 text-sm">{project.solution}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Impact</h4>
              <p className="text-blue-600 text-sm font-medium">{project.impact}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCardDetailed;
