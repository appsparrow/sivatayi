import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Category {
  name: string;
  description: string;
  courses: number;
  color: string;
}

interface Course {
  title: string;
  category: string;
}

interface ExplorativeLearningJourneyProps {
  colorScheme?: string;
}

const ExplorativeLearningJourney = ({ colorScheme = 'default' }: ExplorativeLearningJourneyProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const getPastelGlassColor = (categoryName: string) => {
    const baseGlass = 'liquid-glass-pill';
    
    switch (categoryName) {
      case 'AI & Machine Learning':
        return `${baseGlass} bg-gradient-to-r from-pink-500/25 via-rose-400/20 to-pink-500/25`;
      case 'Web Development':
        return `${baseGlass} bg-gradient-to-r from-blue-500/25 via-indigo-400/20 to-blue-500/25`;
      case 'Design & UX':
        return `${baseGlass} bg-gradient-to-r from-green-500/25 via-emerald-400/20 to-green-500/25`;
      case 'Cloud Computing':
        return `${baseGlass} bg-gradient-to-r from-purple-500/25 via-violet-400/20 to-purple-500/25`;
      case 'Data Science':
        return `${baseGlass} bg-gradient-to-r from-orange-500/25 via-amber-400/20 to-orange-500/25`;
      case 'Salesforce':
        return `${baseGlass} bg-gradient-to-r from-cyan-500/25 via-sky-400/20 to-cyan-500/25`;
      default:
        return `${baseGlass} bg-gradient-to-r from-gray-500/25 via-slate-400/20 to-gray-500/25`;
    }
  };

  const categories: Category[] = [
    {
      name: 'AI & Machine Learning',
      description: 'Foundational and advanced courses in artificial intelligence, machine learning, and neural networks.',
      courses: 28,
      color: 'bg-red-500'
    },
    {
      name: 'Web Development',
      description: 'Full-stack web development courses covering front-end and back-end technologies.',
      courses: 32,
      color: 'bg-blue-500'
    },
    {
      name: 'Design & UX',
      description: 'User experience and design courses focused on creating intuitive and engaging digital interfaces.',
      courses: 18,
      color: 'bg-green-500'
    },
    {
      name: 'Cloud Computing',
      description: 'Courses on cloud platforms like AWS, Azure, and Google Cloud, covering deployment and scaling.',
      courses: 22,
      color: 'bg-purple-500'
    },
    {
      name: 'Data Science',
      description: 'Data science courses covering statistical analysis, data visualization, and big data technologies.',
      courses: 25,
      color: 'bg-orange-500'
    },
    {
      name: 'Salesforce',
      description: 'Salesforce certifications and courses covering development, administration, and architecture.',
      courses: 45,
      color: 'bg-sky-500'
    }
  ];

  const allCourses: Course[] = [
    { title: 'Machine Learning A-Z™: AI, Python & R', category: 'AI & Machine Learning' },
    { title: 'The Complete Web Developer Course 2.0', category: 'Web Development' },
    { title: 'User Experience Design Essentials', category: 'Design & UX' },
    { title: 'AWS Certified Solutions Architect', category: 'Cloud Computing' },
    { title: 'Data Science A-Z™: Real-Life Exercises', category: 'Data Science' },
    { title: 'Salesforce Certified Developer', category: 'Salesforce' },
    { title: 'Deep Learning Specialization', category: 'AI & Machine Learning' },
    { title: 'React - The Complete Guide (incl Hooks, React Router, Redux)', category: 'Web Development' },
    { title: 'UI/UX Design Specialization', category: 'Design & UX' },
    { title: 'Microsoft Azure Fundamentals AZ-900', category: 'Cloud Computing' },
    { title: 'Python for Data Science and Machine Learning Bootcamp', category: 'Data Science' },
    { title: 'Salesforce Certified Administrator', category: 'Salesforce' },
    { title: 'Natural Language Processing Specialization', category: 'AI & Machine Learning' },
    { title: 'Angular - The Complete Guide', category: 'Web Development' },
    { title: 'Google UX Design Professional Certificate', category: 'Design & UX' },
    { title: 'Google Cloud Certified Professional Cloud Architect', category: 'Cloud Computing' },
    { title: 'Tableau A-Z: Hands-On Tableau Training', category: 'Data Science' },
    { title: 'Salesforce Certified Sales Cloud Consultant', category: 'Salesforce' },
    { title: 'AI For Everyone', category: 'AI & Machine Learning' },
    { title: 'Node.js, Express, MongoDB & More', category: 'Web Development' },
    { title: 'Mobile UX Design', category: 'Design & UX' },
    { title: 'Certified Kubernetes Administrator (CKA)', category: 'Cloud Computing' },
    { title: 'R Programming A-Z™: R For Data Science', category: 'Data Science' },
    { title: 'Salesforce Certified Marketing Cloud Consultant', category: 'Salesforce' },
    { title: 'GANs Specialization', category: 'AI & Machine Learning' },
    { title: 'Vue - The Complete Guide', category: 'Web Development' },
    { title: 'Interaction Design Specialization', category: 'Design & UX' },
    { title: 'Terraform Associate Certification', category: 'Cloud Computing' },
    { title: 'Statistics with R - Beginner Level', category: 'Data Science' },
     { title: 'Salesforce Certified Service Cloud Consultant', category: 'Salesforce' },
    { title: 'TensorFlow Developer Professional Certificate', category: 'AI & Machine Learning' },
    { title: 'Django Full Stack Web Developer', category: 'Web Development' },
    { title: 'Information Architecture Specialization', category: 'Design & UX' },
  ];

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant="secondary"
              className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                colorScheme === 'liquidglass' 
                  ? getPastelGlassColor(category.name) + ' hover:bg-white/20 hover:border-white/40'
                  : category.color
              } ${
                colorScheme === 'liquidglass' ? 'text-white font-medium' : 'text-white'
              } hover:shadow-lg ${
                selectedCategory === category.name ? 'ring-2 ring-white shadow-lg' : ''
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            >
              {category.name} ({category.courses})
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Category Details */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4
              }
            }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="text-center"
          >
            <Card className={`max-w-2xl mx-auto ${
              colorScheme === 'liquidglass' 
                ? 'bg-white/10 backdrop-blur-xl border-0 shadow-2xl' 
                : colorScheme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-700' 
                  : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg'
            } rounded-3xl`}>
              <CardContent className="p-8">
                <h3 className={`text-xl font-bold mb-4 ${
                  colorScheme === 'liquidglass' ? 'text-white' : colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedCategory}
                </h3>
                <p className={`text-base leading-relaxed ${
                  colorScheme === 'liquidglass' ? 'text-white/80' : colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {categories.find(c => c.name === selectedCategory)?.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Button */}
      <div className="text-center">
        {colorScheme === 'liquidglass' ? (
          <button
            onClick={() => setShowAllCourses(true)}
            className="bg-white/10 hover:bg-white/15 border border-white/30 hover:border-white/40 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center gap-2 mx-auto hover:shadow-lg"
          >
            <ExternalLink className="h-4 w-4" />
            Learning Updates
          </button>
        ) : (
          <Button
            onClick={() => setShowAllCourses(true)}
            variant="outline"
            className={`${
              colorScheme === 'dark' 
                ? 'border-gray-600 text-gray-200 hover:bg-gray-700 bg-gray-800/50' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View All Courses & Certifications
          </Button>
        )}
      </div>

      {/* All Courses Modal */}
      <AnimatePresence>
        {showAllCourses && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowAllCourses(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-2xl ${
                colorScheme === 'liquidglass' 
                  ? 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-[20px] m-4' 
                  : colorScheme === 'dark' ? 'bg-gray-900 rounded-2xl' : 'bg-white rounded-2xl'
              }`}
            >
              {/* Header */}
              <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-sm ${
                colorScheme === 'liquidglass' 
                  ? 'bg-transparent border-white/20 rounded-t-[20px]' 
                  : colorScheme === 'dark' ? 'border-gray-700 bg-gray-900/95 rounded-t-2xl' : 'bg-white/95 rounded-t-2xl'
              }`}>
                <h2 className={`text-2xl font-bold ${
                  colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Learning Portfolio ({allCourses.length} Courses)
                </h2>
                {colorScheme === 'liquidglass' ? (
                  <button
                    onClick={() => setShowAllCourses(false)}
                    className="p-2 rounded-lg transition-colors bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setShowAllCourses(false)}
                    className={`${
                      colorScheme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                )}
              </div>

              {/* Courses Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allCourses.map((course, index) => (
                    <Card key={index} className={`${
                      colorScheme === 'liquidglass' 
                        ? 'bg-white/5 border-white/20 backdrop-blur-sm' 
                        : colorScheme === 'dark' ? 'bg-gray-800/50 border-gray-700' : ''
                    }`}>
                      <CardContent className="p-4">
                        {colorScheme === 'liquidglass' ? (
                          <span className="inline-block mb-2 text-xs px-2 py-1 rounded-md bg-white/10 border border-white/20 text-white">
                            {course.category}
                          </span>
                        ) : (
                          <Badge variant="outline" className={`mb-2 text-xs ${
                            colorScheme === 'dark' ? 'border-gray-600 text-gray-300' : ''
                          }`}>
                            {course.category}
                          </Badge>
                        )}
                        <h4 className={`font-medium text-sm ${
                          colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {course.title}
                        </h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorativeLearningJourney;
