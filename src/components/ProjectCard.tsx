import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import GlassCard from './GlassCard';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
  };
  onClick: () => void;
  colorScheme?: string;
}

const ProjectCard = ({ project, onClick, colorScheme = 'default' }: ProjectCardProps) => {
  if (colorScheme === 'liquidglass') {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <GlassCard className="overflow-hidden cursor-pointer group h-full" onClick={onClick}>
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-black/50 text-white hover:bg-black/70 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Case Study
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="glass-badge text-xs">
                {project.category}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">
              {project.title}
            </h3>
            <p className="text-sm mb-4 line-clamp-2 text-gray-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="glass-badge text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className={`overflow-hidden cursor-pointer group h-full ${
        colorScheme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white'
      }`} onClick={onClick}>
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Case Study
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <Badge variant="secondary" className={`text-xs ${
              colorScheme === 'dark' ? 'bg-gray-700 text-gray-200' : ''
            }`}>
              {project.category}
            </Badge>
          </div>
          <h3 className={`text-lg font-bold mb-2 ${
            colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h3>
          <p className={`text-sm mb-4 line-clamp-2 ${
            colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className={`text-xs ${
                colorScheme === 'dark' ? 'border-gray-600 text-gray-300' : ''
              }`}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
