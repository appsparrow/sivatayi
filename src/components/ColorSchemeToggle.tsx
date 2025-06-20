
import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ColorSchemeToggleProps {
  onSchemeChange: (scheme: string) => void;
}

const ColorSchemeToggle = ({ onSchemeChange }: ColorSchemeToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState('default');

  const colorSchemes = [
    {
      id: 'default',
      name: 'Ocean Blue',
      preview: 'bg-gradient-to-r from-blue-500 to-purple-600'
    },
    {
      id: 'sunset',
      name: 'Sunset Orange',
      preview: 'bg-gradient-to-r from-orange-500 to-pink-600'
    },
    {
      id: 'forest',
      name: 'Forest Green',
      preview: 'bg-gradient-to-r from-green-600 to-teal-600'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      preview: 'bg-gradient-to-r from-gray-800 to-slate-900'
    }
  ];

  const handleSchemeChange = (schemeId: string) => {
    setCurrentScheme(schemeId);
    onSchemeChange(schemeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm"
      >
        <Palette className="h-4 w-4 mr-2" />
        Themes
      </Button>
      
      {isOpen && (
        <Card className="absolute top-12 right-0 w-48 bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-3">
            <div className="space-y-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => handleSchemeChange(scheme.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    currentScheme === scheme.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${scheme.preview}`} />
                  <span className="text-sm font-medium">{scheme.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ColorSchemeToggle;
