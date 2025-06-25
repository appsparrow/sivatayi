import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { sendRatingToServer, isApiConfigured } from '../services/ratingsApi';

interface StarFeedbackProps {
  colorScheme?: string;
  onRatingChange?: (rating: number) => void;
}

// Analytics functions
const saveRating = async (rating: number) => {
  const timestamp = new Date().toISOString();
  const ratingData = {
    rating,
    timestamp,
    sessionId: getSessionId()
  };
  
  // Always save to localStorage as backup
  const existingRatings = JSON.parse(localStorage.getItem('portfolioRatings') || '[]');
  existingRatings.push(ratingData);
  localStorage.setItem('portfolioRatings', JSON.stringify(existingRatings));
  
  console.log('⭐ Rating saved locally:', ratingData);
  
  // Try to send to server if API is configured
  if (isApiConfigured()) {
    const serverSuccess = await sendRatingToServer(ratingData);
    if (serverSuccess) {
      console.log('🌐 Rating also sent to server');
    } else {
      console.log('📱 Rating saved locally only (server unavailable)');
    }
  }
  
  console.log('📊 All local ratings:', existingRatings);
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('portfolioSessionId');
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem('portfolioSessionId', sessionId);
  }
  return sessionId;
};

// Function to get rating analytics (can be called from console)
(window as any).getPortfolioAnalytics = () => {
  const ratings = JSON.parse(localStorage.getItem('portfolioRatings') || '[]');
  const totalRatings = ratings.length;
  const averageRating = totalRatings > 0 ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / totalRatings : 0;
  const distribution = [1,2,3,4,5].map(star => ratings.filter((r: any) => r.rating === star).length);
  
  console.log('📊 Portfolio Rating Analytics:');
  console.log('Total ratings:', totalRatings);
  console.log('Average rating:', averageRating.toFixed(1));
  console.log('Distribution:', {
    '5 stars': distribution[4],
    '4 stars': distribution[3], 
    '3 stars': distribution[2],
    '2 stars': distribution[1],
    '1 star': distribution[0]
  });
  console.log('All ratings:', ratings);
  
  return { totalRatings, averageRating, distribution, ratings };
};

const StarFeedback = ({ colorScheme = 'default', onRatingChange }: StarFeedbackProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // Check if user has already rated in this session
  useEffect(() => {
    const sessionRating = sessionStorage.getItem('currentSessionRating');
    if (sessionRating) {
      setRating(parseInt(sessionRating));
      setHasRated(true);
    }
  }, []);

  const feedbackMessages = {
    0: "Rate this portfolio",
    1: "😞 Not impressed? Let's see what we can improve!",
    2: "🤔 Getting better, but room for improvement!",
    3: "😊 Good work! What could make it great?",
    4: "🎉 Almost perfect! You're loving the experience!",
    5: "🚀 Absolutely amazing! You're blown away!"
  };

  const handleStarClick = async (starRating: number) => {
    if (hasRated) return; // Prevent multiple submissions
    
    setRating(starRating);
    setHasRated(true);
    
    // Save rating
    await saveRating(starRating);
    sessionStorage.setItem('currentSessionRating', starRating.toString());
    
    onRatingChange?.(starRating);
  };

  const handleStarHover = (starRating: number) => {
    if (hasRated) return; // Don't show hover effects after rating
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    if (hasRated) return;
    setHoverRating(0);
  };

  const getStarColor = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    
    if (colorScheme === 'liquidglass' || colorScheme === 'liquidgood') {
      return starIndex <= currentRating 
        ? 'text-yellow-300 drop-shadow-sm' 
        : 'text-white/40';
    } else if (colorScheme === 'professional') {
      return starIndex <= currentRating 
        ? 'text-yellow-500' 
        : 'text-gray-300';
    } else {
      return starIndex <= currentRating 
        ? 'text-yellow-400' 
        : 'text-gray-300';
    }
  };

  const getTextColor = () => {
    if (colorScheme === 'liquidglass' || colorScheme === 'liquidgood') {
      return 'text-white/90';
    } else if (colorScheme === 'professional') {
      return 'text-gray-700';
    } else {
      return 'text-gray-600';
    }
  };

  const getCardStyle = () => {
    if (colorScheme === 'liquidglass') {
      return 'bg-white/5 backdrop-blur-md border border-white/10 shadow-md';
    } else if (colorScheme === 'liquidgood') {
      return 'relative liquidgood-glass-card overflow-hidden';
    } else if (colorScheme === 'professional') {
      return 'bg-white border border-gray-100 shadow-sm';
    } else {
      return 'bg-white/80 border border-gray-100 shadow-sm';
    }
  };

  return (
    <div className={`${getCardStyle()} rounded-xl p-4 max-w-xs mx-auto transition-all duration-300`}>
      {/* Glass layers for liquidgood */}
      {colorScheme === 'liquidgood' && (
        <>
          <div className="liquidgood-glass-filter"></div>
          <div className="liquidgood-glass-overlay"></div>
          <div className="liquidgood-glass-specular"></div>
          
          {/* SVG Filter */}
          <svg style={{ display: 'none' }}>
            <defs>
              <filter id="liquidgood-dist-rating" x="0%" y="0%" width="100%" height="100%">
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
      
      <div className={`text-center ${colorScheme === 'liquidgood' ? 'relative z-10' : ''}`}>
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              disabled={hasRated}
              className={`p-1 transition-all duration-200 focus:outline-none rounded ${
                hasRated ? 'cursor-default' : 'hover:scale-110 focus:ring-2 focus:ring-blue-300'
              }`}
            >
              <Star 
                className={`w-6 h-6 transition-colors duration-200 ${getStarColor(star)} ${
                  star <= (hoverRating || rating) ? 'fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>

        {/* Feedback Text */}
        <div className="min-h-[2rem] flex items-center justify-center">
          <p className={`text-sm text-center transition-all duration-300 ${getTextColor()}`}>
            {hasRated ? "✓ You have submitted" : (feedbackMessages[hoverRating || rating])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StarFeedback; 