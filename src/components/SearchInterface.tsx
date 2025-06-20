import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Bot, User, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SearchInterfaceProps {
  colorScheme?: string;
}

const SearchInterface = ({ colorScheme = 'default' }: SearchInterfaceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Siva's AI assistant. Ask me anything about his work, projects, or experience!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const getColorClasses = () => {
    switch (colorScheme) {
      case 'forest':
        return {
          background: 'from-green-600 to-green-800',
          card: 'bg-green-900/90',
          text: 'text-green-100',
          border: 'border-green-700'
        };
      case 'ocean':
        return {
          background: 'from-blue-600 to-blue-800',
          card: 'bg-blue-900/90',
          text: 'text-blue-100',
          border: 'border-blue-700'
        };
      case 'sunset':
        return {
          background: 'from-orange-600 to-pink-600',
          card: 'bg-orange-900/90',
          text: 'text-orange-100',
          border: 'border-orange-700'
        };
      case 'dark':
        return {
          background: 'from-gray-700 to-gray-900',
          card: 'bg-gray-800/90',
          text: 'text-gray-100',
          border: 'border-gray-600'
        };
      case 'liquidglass':
        return {
          background: 'from-white/10 to-white/5',
          card: 'bg-white/10 backdrop-blur-lg border border-white/20',
          text: 'text-white',
          border: 'border-white/20'
        };
      default:
        return {
          background: 'from-blue-600 to-purple-600',
          card: 'bg-blue-900/90',
          text: 'text-blue-100',
          border: 'border-blue-700'
        };
    }
  };

  const colors = getColorClasses();

  const getResponse = (question: string): string => {
    const responses = [
      "I specialize in AI/ML engineering, product strategy, and full-stack development. My experience spans from building scalable ML systems to leading cross-functional teams.",
      "I follow a user-centered design approach, starting with research and ideation, then moving through prototyping, testing, and iterative refinement.",
      "My recent projects include AI-powered applications, data visualization tools, and scalable web platforms. Each project focuses on solving real user problems.",
      "I bring ideas to life through systematic product development - from market research and technical feasibility to MVP development and scaling strategies."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(inputValue),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Tell me about your AI expertise",
    "How do you bring ideas to products?",
    "What's your design process?",
    "Show me your recent projects"
  ];

  return (
    <>
      {/* Search Button - Bottom right with padding above footer */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-6 ${
          colorScheme === 'liquidglass' 
            ? 'bg-white/15 backdrop-blur-lg border-2 border-white/30 shadow-xl' 
            : `bg-gradient-to-r ${colors.background}`
        } text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-[10001] flex items-center gap-2`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">Ask Me Anything</span>
        <motion.div
          className="bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-3 w-3" />
        </motion.div>
      </motion.button>

      {/* Search Sidebar - From right side, full height */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10002]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className={`fixed right-0 top-0 h-full w-full sm:w-96 shadow-2xl z-[10003] flex flex-col ${
                colorScheme === 'liquidglass' 
                  ? 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-[20px] mr-3 mt-3 mb-3' 
                  : colors.card
              }`}
            >
              {/* Header */}
              <div className={`${
                colorScheme === 'liquidglass' 
                  ? 'bg-transparent border-b border-white/20 rounded-t-[20px]' 
                  : `bg-gradient-to-r ${colors.background}`
              } text-white p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${
                      colorScheme === 'liquidglass' ? 'glass-icon' : 'bg-white/20'
                    } p-2 rounded-full`}>
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Ask Me Anything</h3>
                      <p className="text-white/80 text-sm">AI-powered insights</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      colorScheme === 'liquidglass' 
                        ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className={colorScheme === 'liquidglass' 
                        ? 'glass-icon p-2 rounded-full flex-shrink-0' 
                        : `bg-gradient-to-r ${colors.background} text-white p-2 rounded-full flex-shrink-0`
                      }>
                        <Bot className="h-3 w-3" />
                      </div>
                    )}
                    <div className={`max-w-xs px-3 py-2 rounded-2xl text-sm break-words ${
                      message.isUser 
                        ? colorScheme === 'liquidglass' 
                          ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white' 
                          : `bg-gradient-to-r ${colors.background} text-white`
                        : colorScheme === 'liquidglass' 
                          ? 'bg-white/5 backdrop-blur-sm border border-white/10 text-white' 
                          : colorScheme === 'dark' 
                            ? 'bg-gray-700 text-gray-100' 
                            : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p>{message.text}</p>
                    </div>
                    {message.isUser && (
                      <div className={colorScheme === 'liquidglass' 
                        ? 'glass-icon p-2 rounded-full flex-shrink-0' 
                        : 'bg-gray-600 text-white p-2 rounded-full flex-shrink-0'
                      }>
                        <User className="h-3 w-3" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-4">
                  <p className={`text-xs mb-2 ${
                    colorScheme === 'liquidglass' || colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Try asking:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => setInputValue(question)}
                        className={`text-xs px-3 py-1 rounded-lg border transition-colors duration-200 ${
                          colorScheme === 'liquidglass' 
                            ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' 
                            : colorScheme === 'dark' 
                              ? 'border-gray-600 hover:bg-gray-700 text-gray-200 bg-gray-800' 
                              : 'border-gray-300 hover:bg-gray-50 text-gray-700 bg-white'
                        }`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className={`p-4 border-t ${
                colorScheme === 'liquidglass' 
                  ? 'border-white/20' 
                  : colorScheme === 'dark' 
                    ? 'border-gray-700' 
                    : 'border-gray-200'
              }`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about my work..."
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      colorScheme === 'liquidglass' 
                        ? 'bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:bg-black/40 focus:border-white/50'
                        : colorScheme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-200'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      colorScheme === 'liquidglass' 
                        ? 'bg-white/10 hover:bg-white/15 border border-white/20 text-white disabled:opacity-50' 
                        : `bg-gradient-to-r ${colors.background} hover:opacity-90 disabled:opacity-50 text-white`
                    }`}
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchInterface;