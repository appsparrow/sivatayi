import { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorSchemeToggleProps {
  onSchemeChange: (scheme: string) => void;
}

const ColorSchemeToggle = ({ onSchemeChange }: ColorSchemeToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState('liquidgood');

  const colorSchemes = [
    {
      id: 'liquidglass',
      name: 'Liquid Glass',
      preview: 'bg-gradient-to-r from-blue-300 to-purple-100'
    },
    {
      id: 'liquidgood',
      name: 'Liquid Good',
      preview: 'bg-gradient-to-r from-pink-300 to-orange-200'
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
        className="glass-floating-question rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
      >
        <Palette className="h-5 w-5 text-white/90" />
      </button>
      
      {isOpen && (
        <div className="absolute top-0 right-14 glass-card shadow-xl rounded-xl p-3">
          <div className="flex flex-col gap-2">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => handleSchemeChange(scheme.id)}
                className={`w-8 h-8 rounded-full ${scheme.preview} transition-all hover:scale-110 shadow-md hover:shadow-lg border-2 ${
                  currentScheme === scheme.id ? 'border-white ring-2 ring-white/50' : 'border-white/30 hover:border-white/50'
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
