import React from 'react';

interface FooterProps {
  colorScheme: string;
}

const Footer = ({ colorScheme }: FooterProps) => {
  return (
    <footer className={`py-8 px-6 border-t ${
      colorScheme === 'liquidglass' 
        ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
        : colorScheme === 'professional' 
          ? 'border-gray-300 bg-gray-50/50' 
          : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className={`text-sm ${
              colorScheme === 'liquidglass' 
                ? 'text-white/80' 
                : colorScheme === 'professional' 
                  ? 'text-gray-600' 
                  : 'text-gray-600'
            }`}>
              Discovering{' '}
              <a 
                href="https://lovable.dev/invite/7ea3252a-98b9-4671-ba20-2292bced6e46" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-medium hover:underline transition-colors ${
                  colorScheme === 'liquidglass' 
                    ? 'text-blue-200 hover:text-blue-100' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                lovable 
              </a>
            </p>
          </div>
          
          <div className={`flex items-center gap-2 text-xs ${
            colorScheme === 'liquidglass' 
              ? 'text-white/60' 
              : colorScheme === 'professional' 
                ? 'text-gray-500' 
                : 'text-gray-500'
          }`}>
            <span>Powered by React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
