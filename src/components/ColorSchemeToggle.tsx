import { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorSchemeToggleProps {
  onSchemeChange: (scheme: string) => void;
}

const ColorSchemeToggle = ({ onSchemeChange }: ColorSchemeToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState('liquidglass');

  const colorSchemes = [
    {
      id: 'liquidglass',
      name: 'Liquid Glass',
      preview: 'bg-gradient-to-r from-blue-400 to-purple-400'
    },
    {
      id: 'professional',
      name: 'Professional',
      preview: 'bg-gradient-to-r from-gray-600 to-gray-800'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      preview: 'bg-gradient-to-r from-orange-500 to-pink-600'
    }
  ];

  const handleSchemeChange = (schemeId: string) => {
    setCurrentScheme(schemeId);
    onSchemeChange(schemeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 p-0 bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 hover:bg-gray-800/90 hover:border-gray-600 transition-all duration-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl"
      >
        <Palette className="h-5 w-5 text-white drop-shadow-sm" />
      </button>
      
      {isOpen && (
        <div className="absolute top-14 right-0 bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 shadow-xl rounded-xl p-3">
          <div className="flex gap-2">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => handleSchemeChange(scheme.id)}
                className={`w-8 h-8 rounded-full ${scheme.preview} transition-all hover:scale-110 shadow-md hover:shadow-lg border-2 ${
                  currentScheme === scheme.id ? 'border-white ring-2 ring-white/50' : 'border-gray-600/50 hover:border-white/30'
                }`}
                title={scheme.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSchemeToggle;
