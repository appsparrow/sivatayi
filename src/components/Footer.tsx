import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  colorScheme: string;
  onSchemeChange: (scheme: string) => void;
}

const Footer = ({ colorScheme, onSchemeChange }: FooterProps) => {
  const [showThemes, setShowThemes] = useState(false);

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
      id: 'liquidglass',
      name: 'Liquid Glass',
      preview: 'bg-gradient-to-r from-blue-400 to-purple-400'
    },
    {
      id: 'professional',
      name: 'Professional',
      preview: 'bg-gradient-to-r from-gray-600 to-gray-800'
    }
  ];

  return (
    <footer className={`py-8 px-6 border-t ${
      colorScheme === 'liquidglass' 
        ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
        : colorScheme === 'professional' 
          ? 'border-gray-300 bg-gray-50/50' 
          : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className={`text-xs flex items-center gap-2 ${
          colorScheme === 'liquidglass' 
            ? 'text-white/60' 
            : colorScheme === 'professional' 
              ? 'text-gray-500' 
              : 'text-gray-500'
        }`}>
          Made by real human using 
          <a 
            href="https://lovable.dev/invite/7ea3252a-98b9-4671-ba20-2292bced6e46" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <img src="/lovable.png" alt="Lovable" className="h-4 w-4" />
            lovable, Claude
          </a>
          and more.
        </p>
        
        <div className="relative">
          <Button
            onClick={() => setShowThemes(!showThemes)}
            variant="ghost"
            size="sm"
            className={`opacity-30 hover:opacity-100 transition-opacity ${
              colorScheme === 'liquidglass' 
                ? 'text-white/60 hover:text-black' 
                : colorScheme === 'professional' 
                  ? 'text-gray-600 hover:text-gray-800' 
                  : ''
            }`}
          >
            <Palette className="h-4 w-4" />
          </Button>
          
          {showThemes && (
            <div className={`absolute top-1/2 right-full transform -translate-y-1/2 mr-2 p-2 rounded-lg shadow-lg border ${
              colorScheme === 'liquidglass' 
                ? 'bg-white/10 backdrop-blur-lg border-white/20' 
                : colorScheme === 'professional' 
                  ? 'bg-white border-gray-300' 
                  : 'bg-white border-gray-200'
            }`}>
              <div className="flex gap-2">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => {
                      onSchemeChange(scheme.id);
                      setShowThemes(false);
                    }}
                    className={`w-6 h-6 rounded-full ${scheme.preview} ${
                      colorScheme === scheme.id ? 'ring-2 ring-gray-400' : ''
                    }`}
                    title={scheme.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
