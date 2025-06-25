import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, User, Bot, Sparkles, AlertCircle, Loader2, X, ExternalLink, Linkedin, Twitter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiService, ChatMessage } from '@/services/aiService';
import UserGreeting from './UserGreeting';
import { 
  initializeUserSession, 
  addQuestionToSession, 
  hasReachedQuestionLimit, 
  getRemainingQuestions,
  commitUserSession,
  setupAutoSave,
  getUserSessionData
} from '@/services/userSessionApi';

interface AskMeAnythingProps {
  colorScheme?: string;
}

const AskMeAnything = ({ colorScheme = 'default' }: AskMeAnythingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [sessionExhausted, setSessionExhausted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showNote, setShowNote] = useState(true);
  const [showPrompts, setShowPrompts] = useState(false);
  const [promptsExpanded, setPromptsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm here to share some of my experience, projects, or approach to bring ideas to products. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initialize session data and auto-save
  useEffect(() => {
    const currentSession = getUserSessionData();
    if (currentSession) {
      setUserName(currentSession.name);
      setQuestionCount(currentSession.totalQuestions);
      setSessionExhausted(hasReachedQuestionLimit());
    }

    // Setup auto-save triggers
    const cleanup = setupAutoSave();
    return cleanup;
  }, []);

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChat = () => {
      const currentSession = getUserSessionData();
      
      if (!currentSession) {
        // First time user - show greeting popup
        setShowGreeting(true);
      } else {
        // Returning user - open chat directly
        setIsOpen(true);
        if (currentSession.totalQuestions === 0) {
          setShowSuggestions(true);
        }
      }
    };

    window.addEventListener('openAskMeAnything', handleOpenChat);
    return () => window.removeEventListener('openAskMeAnything', handleOpenChat);
  }, []);

  const getColorClasses = () => {
    switch (colorScheme) {
      case 'sunset':
        return {
          background: 'from-orange-600 to-pink-600',
          sidebar: 'bg-gradient-to-br from-orange-100/95 to-pink-100/95 backdrop-blur-sm border border-orange-200/50 shadow-2xl',
          header: 'border-orange-200/50',
          iconBg: 'bg-orange-200/50 border-orange-300/50',
          iconColor: 'text-orange-600',
          textPrimary: 'text-orange-900',
          textSecondary: 'text-orange-700/80',
          button: 'bg-orange-200/50 hover:bg-orange-300/50 border-orange-300/50 text-orange-800',
          closeButton: 'bg-orange-200/50 hover:bg-orange-300/50 border-orange-300/50 text-orange-800',
          messageBg: 'bg-orange-200/40 border-orange-300/50 text-orange-900',
          userMessageBg: 'bg-pink-200/50 border-pink-300/50 text-pink-900',
          input: 'bg-orange-100/50 border-orange-300/50 text-orange-900 placeholder-orange-600/60',
          disclaimer: 'bg-orange-200/40 border-orange-300/50'
        };
      case 'liquidglass':
        return {
          background: 'from-blue-400 to-purple-400',
          sidebar: 'bg-white/10 backdrop-blur-lg border border-white/20',
          header: 'border-white/20',
          iconBg: 'bg-white/10 border-white/20',
          iconColor: 'text-white',
          textPrimary: 'text-white',
          textSecondary: 'text-white/80',
          button: 'bg-white/10 hover:bg-white/20 border-white/20 text-white',
          closeButton: 'bg-white/10 hover:bg-white/20 border-white/20 text-white',
          messageBg: 'bg-white/10 border-white/20 text-white',
          userMessageBg: 'bg-white/15 border-white/25 text-white',
          input: 'bg-white/10 border-white/20 text-white placeholder-white/60',
          disclaimer: 'bg-white/10 border-white/20'
        };
      case 'liquidgood':
        return {
          background: 'from-pink-400 to-orange-400',
          sidebar: 'bg-white/10 backdrop-blur-lg border border-white/20',
          header: 'border-white/20',
          iconBg: 'bg-white/10 border-white/20',
          iconColor: 'text-white',
          textPrimary: 'text-white',
          textSecondary: 'text-white/80',
          button: 'liquidgood-glass-button text-white',
          closeButton: 'bg-white/10 hover:bg-white/20 border-white/20 text-white',
          messageBg: 'bg-white/10 border-white/20 text-white',
          userMessageBg: 'bg-white/15 border-white/25 text-white',
          input: 'bg-white/10 border-white/20 text-white placeholder-white/60',
          disclaimer: 'bg-white/10 border-white/20'
        };
      case 'professional':
        return {
          background: 'from-gray-700 to-gray-900',
          sidebar: 'bg-white/98 backdrop-blur-sm border border-gray-200 shadow-2xl',
          header: 'border-gray-200',
          iconBg: 'bg-gray-100 border-gray-200',
          iconColor: 'text-gray-700',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          button: 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700',
          closeButton: 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700',
          messageBg: 'bg-gray-100 border-gray-200 text-gray-900',
          userMessageBg: 'bg-blue-50 border-blue-200 text-gray-900',
          input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500',
          disclaimer: 'bg-blue-50 border-blue-200'
        };
      default:
        return {
          background: 'from-blue-600 to-purple-600',
          sidebar: 'bg-white border border-gray-200 shadow-2xl',
          header: 'border-gray-200',
          iconBg: 'bg-black border border-gray-300',
          iconColor: 'text-white',
          textPrimary: 'text-black',
          textSecondary: 'text-gray-600',
          button: 'bg-black hover:bg-gray-800 border border-gray-300 text-white',
          closeButton: 'bg-black hover:bg-gray-800 border border-gray-300 text-white',
          messageBg: 'bg-black border border-gray-300 text-white',
          userMessageBg: 'bg-gray-100 border border-gray-300 text-black',
          input: 'bg-gray-50 border border-gray-300 text-black placeholder-gray-500',
          disclaimer: 'bg-gray-100 border border-gray-300'
        };
    }
  };

  const colors = getColorClasses();

  // Handle greeting completion
  const handleGreetingComplete = (name: string) => {
    setUserName(name);
    setShowGreeting(false);
    setIsOpen(true);
    initializeUserSession(name);
    
    // Update welcome message with user's name
    setMessages([{
      id: '1',
      text: `Hi ${name}! I'm here to answer any questions about Siva's experience, projects, or approach to bring ideas to products. What would you like to know?`,
      isUser: false,
      timestamp: new Date()
    }]);
  };

  // Handle chat close with session saving
  const handleCloseChat = async () => {
    setIsOpen(false);
    // Save session when closing chat
    await commitUserSession();
  };

  const handleSendMessage = async () => {
    console.log('🚀 handleSendMessage called with:', inputValue);
    
    if (!inputValue.trim() || isLoading || sessionExhausted) {
      console.log('❌ Early return - empty input, loading, or session exhausted');
      return;
    }

    const messageText = inputValue.trim();
    console.log('📝 Message text:', messageText);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    console.log('👤 Adding user message to chat');
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setApiError(null);
    
    // Add question to session tracking
    const updatedSession = addQuestionToSession(messageText);
    if (updatedSession) {
      setQuestionCount(updatedSession.totalQuestions);
      
      // Check if this is the last question
      if (updatedSession.totalQuestions >= 3) {
        setSessionExhausted(true);
      }
    }

    try {
      console.log('🔍 Checking AI service configuration...');
      const isConfigured = aiService.isConfigured();
      console.log('🔑 AI Service configured:', isConfigured);
      
      if (!isConfigured) {
        console.log('❌ AI service not configured');
        setApiError('AI service is not configured. Please set up your OpenAI API key.');
        setIsLoading(false);
        return;
      }

      console.log('🤖 Calling aiService.generateResponse...');
      console.log('📋 Current messages count:', messages.length);
      
      const startTime = Date.now();
      const response = await aiService.generateResponse(messageText, messages);
      const endTime = Date.now();
      
      console.log('✅ AI Response received in', endTime - startTime, 'ms');
      console.log('📄 Response length:', response.length);
      console.log('📝 Response preview:', response.substring(0, 200) + '...');
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      console.log('🤖 Adding bot response to chat');
      setMessages(prev => [...prev, botResponse]);
      
      // Hide suggestions after first response, show prompts after first question (collapsed)
      if (questionCount === 1) {
        setShowSuggestions(false);
        setShowPrompts(true);
        setPromptsExpanded(false); // Keep prompts collapsed after first question
      }
      
      // Auto-save session after 3rd question
      if (questionCount >= 3) {
        await commitUserSession();
      }
      
    } catch (error) {
      console.error('💥 Error in handleSendMessage:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      
      setApiError('Failed to get response. Please try again.');
      
      // Add fallback response
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or feel free to browse my portfolio to learn more about my work!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      console.log('🏁 Setting loading to false');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Tell me about your AI expertise",
    "How do you bring ideas to products?",
    "What's your design process?",
    "What else can you do besides work?",
    "What technologies do you understand?",
    "Tell me about your learning journey"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    // Reset suggestions if no questions asked yet
    if (questionCount === 0) {
      setShowSuggestions(true);
    }
    // Don't reset session - maintain 3-question limit across open/close
  };

  return (
    <>
      {/* Hidden floating button - replaced with simple text */}
      <div style={{ display: 'none' }}>
        <motion.button
          onClick={handleOpenChat}
          className={`fixed bottom-20 right-6 ${
            colorScheme === 'liquidglass' 
              ? 'bg-white/15 backdrop-blur-lg border-2 border-white/30 shadow-xl' 
              : colorScheme === 'liquidgood'
                ? 'liquidgood-glass-button'
                : `bg-gradient-to-r ${colors.background}`
          } text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-[10001] flex items-center gap-2`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="h-6 w-6" />
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-3 w-3" />
          </motion.div>
        </motion.button>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10002]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed right-0 top-0 h-full w-full sm:w-96 shadow-2xl z-[10003] flex flex-col ${colors.sidebar} rounded-[20px] sm:mr-3 sm:mt-3 mb-3 sm:mb-3`}
            >
              {/* Header */}
              <div className={`sticky top-0 z-20 flex items-center justify-between p-6 border-b backdrop-blur-sm bg-transparent ${colors.header} rounded-t-[20px]`}>
                <div className="flex items-center gap-3">
                  <div className={`${colors.iconBg} p-2 rounded-full`}>
                    <Bot className={`h-5 w-5 ${colors.iconColor}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${colors.textPrimary}`}>Ask Me Anything</h3>
                    <p className={`text-xs ${colors.textSecondary}`}>
                      Human and OpenAI powered
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseChat}
                  className={`p-2 rounded-lg transition-colors ${colors.closeButton}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* AI Disclaimer */}
              {showNote && (
                <div className={`mx-4 mt-4 p-3 rounded-lg border ${colors.disclaimer}`}>
                  <div className="flex justify-between items-start gap-2">
                    <p className={`text-xs ${colors.textSecondary}`}>
                      <strong>Note:</strong> This AI is trained on GPT models and responses might be inaccurate.  
                      This personal assistant is a beginning of my vision of how to seamlessly bring agents into human-s interactions and some interesting conversational skills.
                    </p>
                    <button
                      onClick={() => setShowNote(false)}
                      className={`flex-shrink-0 p-1 rounded transition-colors ${colors.textSecondary} hover:${colors.textPrimary} hover:bg-black/10`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* API Error Alert */}
              {apiError && (
                <div className="mx-4 mt-4 p-3 rounded-lg flex items-center gap-2 bg-red-500/20 border border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-red-300">{apiError}</p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className={`${colors.messageBg} backdrop-blur-sm p-2 rounded-full flex-shrink-0`}>
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.isUser 
                        ? `${colors.userMessageBg} backdrop-blur-sm`
                        : `${colors.messageBg} backdrop-blur-sm`
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.isUser && (
                      <div className={`${colors.messageBg} backdrop-blur-sm p-2 rounded-full flex-shrink-0`}>
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className={`${colors.messageBg} backdrop-blur-sm p-2 rounded-full flex-shrink-0`}>
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${colors.messageBg} backdrop-blur-sm`}>
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {!sessionExhausted && messages.length === 0 && (
                <div className="px-4 pb-4">
                  <p className={`text-sm mb-3 ${colors.textSecondary}`}>Try asking:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuestion(question)}
                        className={`text-xs text-left justify-start h-auto py-2 px-3 whitespace-normal ${colors.button}`}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* View Prompts Section - Show after first question */}
              {showPrompts && questionCount >= 1 && questionCount < 3 && !sessionExhausted && (
                <div className="px-4 pb-4">
                  <button
                    onClick={() => setPromptsExpanded(!promptsExpanded)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      colorScheme === 'liquidgood' ? 'relative overflow-hidden' : ''
                    } ${colors.button}`}
                  >
                    {/* Glass layers for liquidgood */}
                    {colorScheme === 'liquidgood' && (
                      <>
                        <div className="liquidgood-glass-filter"></div>
                        <div className="liquidgood-glass-overlay"></div>
                        <div className="liquidgood-glass-specular"></div>
                        
                        {/* SVG Filter */}
                        <svg style={{ display: 'none' }}>
                          <defs>
                            <filter id="liquidgood-dist-prompts" x="0%" y="0%" width="100%" height="100%">
                              <feTurbulence 
                                type="fractalNoise" 
                                baseFrequency="0.008 0.008" 
                                numOctaves="2" 
                                seed="92" 
                                result="noise" 
                              />
                              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                              <feDisplacementMap 
                                in="SourceGraphic" 
                                in2="blurred" 
                                scale="70" 
                                xChannelSelector="R" 
                                yChannelSelector="G" 
                              />
                            </filter>
                          </defs>
                        </svg>
                      </>
                    )}
                    
                    <span className={`text-sm font-medium ${colorScheme === 'liquidgood' ? 'relative z-10' : ''}`}>View Prompts</span>
                    {promptsExpanded ? (
                      <ChevronUp className={`h-4 w-4 ${colorScheme === 'liquidgood' ? 'relative z-10' : ''}`} />
                    ) : (
                      <ChevronDown className={`h-4 w-4 ${colorScheme === 'liquidgood' ? 'relative z-10' : ''}`} />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {promptsExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2"
                      >
                        {suggestedQuestions.map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestedQuestion(question)}
                            className={`text-xs text-left justify-start h-auto py-2 px-3 whitespace-normal w-full ${
                              colorScheme === 'liquidgood' ? 'relative overflow-hidden' : ''
                            } ${colors.button}`}
                          >
                            {/* Glass layers for liquidgood */}
                            {colorScheme === 'liquidgood' && (
                              <>
                                <div className="liquidgood-glass-filter"></div>
                                <div className="liquidgood-glass-overlay"></div>
                                <div className="liquidgood-glass-specular"></div>
                              </>
                            )}
                            
                            <span className={colorScheme === 'liquidgood' ? 'relative z-10' : ''}>
                              {question}
                            </span>
                          </Button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Input */}
              <div className={`p-4 pb-6 border-t ${colors.header} rounded-b-[20px]`}>
                {/* Question counter or contact message */}
                <div className="mb-3 text-center">
                  {sessionExhausted ? (
                    <div className="space-y-3">
                      <p className={`text-sm ${colors.textSecondary}`}>
                        Looks like you want to know more about me - or just connect to bounce off thoughts and ideas
                      </p>
                      <div className="flex justify-center gap-3">
                        <a
                          href="https://www.linkedin.com/in/siva-tayi/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${colors.button}`}
                        >
                          <Linkedin className="h-4 w-4" />
                          <span className="text-sm font-medium">LinkedIn</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <a
                          href="https://x.com/siva_tayi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${colors.button}`}
                        >
                          <Twitter className="h-4 w-4" />
                          <span className="text-sm font-medium">X</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-xs ${colors.textSecondary}`}>
                      {3 - questionCount} questions remaining
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={sessionExhausted 
                      ? "Connect with me on LinkedIn or X!" 
                      : "Ask me about my experience, projects, or process..."
                    }
                    className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 backdrop-blur-sm ${colors.input}`}
                    disabled={isLoading || sessionExhausted}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading || sessionExhausted}
                    className={`px-4 py-3 disabled:opacity-50 ${colors.button}`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Greeting Popup */}
      <UserGreeting 
        isOpen={showGreeting}
        onComplete={handleGreetingComplete}
        colorScheme={colorScheme}
      />
    </>
  );
};

export default AskMeAnything;