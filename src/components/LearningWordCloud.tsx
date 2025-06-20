
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LearningItem {
  name: string;
  category: string;
  platform: string;
  size: number; // 1-5 for font size
  x: number; // percentage
  y: number; // percentage
  color: string;
}

const LearningWordCloud = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const learningItems: LearningItem[] = [
    // AI/AR/VR
    { name: "Neural Networks", category: "AI/AR/VR", platform: "LinkedIn Learning", size: 5, x: 20, y: 15, color: "text-purple-600" },
    { name: "VR Design", category: "AI/AR/VR", platform: "Adobe", size: 3, x: 75, y: 25, color: "text-purple-500" },
    { name: "Machine Learning", category: "AI/AR/VR", platform: "Microsoft Learn", size: 4, x: 45, y: 35, color: "text-purple-700" },
    
    // Design Thinking
    { name: "Design Thinking", category: "Design", platform: "LinkedIn Learning", size: 5, x: 60, y: 10, color: "text-blue-600" },
    { name: "UX Design", category: "Design", platform: "LinkedIn Learning", size: 4, x: 30, y: 50, color: "text-blue-500" },
    { name: "Design Systems", category: "Design", platform: "LinkedIn Learning", size: 3, x: 80, y: 45, color: "text-blue-700" },
    { name: "Visual Design", category: "Design", platform: "Udemy", size: 3, x: 15, y: 70, color: "text-blue-500" },
    
    // Leadership
    { name: "Leadership", category: "Leadership", platform: "LinkedIn Learning", size: 4, x: 70, y: 60, color: "text-green-600" },
    { name: "Emotional Intelligence", category: "Leadership", platform: "LinkedIn Learning", size: 3, x: 25, y: 80, color: "text-green-500" },
    { name: "Team Management", category: "Leadership", platform: "LinkedIn Learning", size: 3, x: 85, y: 75, color: "text-green-700" },
    
    // Product Management
    { name: "Product Strategy", category: "Product", platform: "LinkedIn Learning", size: 4, x: 50, y: 70, color: "text-orange-600" },
    { name: "AI-First Products", category: "Product", platform: "LinkedIn Learning", size: 5, x: 10, y: 40, color: "text-orange-700" },
    { name: "Roadmapping", category: "Product", platform: "LinkedIn Learning", size: 3, x: 90, y: 30, color: "text-orange-500" },
    
    // Technical
    { name: "Salesforce", category: "Technical", platform: "Salesforce", size: 4, x: 40, y: 20, color: "text-indigo-600" },
    { name: "Azure", category: "Technical", platform: "Microsoft Learn", size: 3, x: 55, y: 85, color: "text-indigo-500" },
    { name: "SAP Fiori", category: "Technical", platform: "SAP", size: 3, x: 75, y: 85, color: "text-indigo-700" },
    { name: "Blockchain", category: "Technical", platform: "LinkedIn Learning", size: 3, x: 35, y: 90, color: "text-indigo-500" },
    
    // Business
    { name: "Business Intelligence", category: "Business", platform: "LinkedIn Learning", size: 3, x: 65, y: 40, color: "text-red-600" },
    { name: "Data Visualization", category: "Business", platform: "Tableau", size: 4, x: 20, y: 30, color: "text-red-500" },
    { name: "Systems Thinking", category: "Business", platform: "LinkedIn Learning", size: 3, x: 85, y: 15, color: "text-red-700" },
  ];

  const platforms = [
    { name: "Salesforce", count: 255, type: "Badges" },
    { name: "LinkedIn Learning", count: 99, type: "Courses" },
    { name: "OpenSAP", count: 14, type: "Courses" },
    { name: "Microsoft Learn", count: 8, type: "Paths" },
    { name: "Udemy", count: 19, type: "Courses" },
  ];

  const getSizeClass = (size: number) => {
    switch (size) {
      case 1: return "text-sm";
      case 2: return "text-base";
      case 3: return "text-lg";
      case 4: return "text-xl";
      case 5: return "text-2xl";
      default: return "text-base";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {platforms.map((platform) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{platform.count}</h3>
                <p className="text-xs text-gray-600 mb-1">{platform.type}</p>
                <p className="text-xs font-medium text-gray-800">{platform.name}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Learning Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="text-4xl font-bold text-gray-900 mb-2">350+ Hours</h3>
        <p className="text-gray-600 italic">
          "Learning is inevitable - Let it happen with intention to apply"
        </p>
      </motion.div>

      {/* Interactive Word Cloud */}
      <Card className="relative h-96 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <CardContent className="p-0 h-full relative">
          {learningItems.map((item) => (
            <motion.div
              key={item.name}
              className="absolute cursor-pointer select-none"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.random() * 2, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className={`font-semibold ${getSizeClass(item.size)} ${item.color} hover:opacity-80 transition-opacity`}>
                {item.name}
              </span>
              
              {/* Tooltip */}
              {hoveredItem === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10"
                >
                  <div className="bg-black text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                    <div className="font-medium">{item.category}</div>
                    <div className="text-gray-300">{item.platform}</div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {/* Floating particles for visual appeal */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningWordCloud;
