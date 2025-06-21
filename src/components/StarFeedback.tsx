import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarFeedbackProps {
  colorScheme?: string;
  onRatingChange?: (rating: number) => void;
}

// Analytics functions
const saveRating = (rating: number) => {
  const timestamp = new Date().toISOString();
  const ratingData = {
    rating,
    timestamp,
    sessionId: getSessionId()
  };
  
  // Save to localStorage
  const existingRatings = JSON.parse(localStorage.getItem('portfolioRatings') || '[]');
  existingRatings.push(ratingData);
  localStorage.setItem('portfolioRatings', JSON.stringify(existingRatings));
  
  console.log('⭐ Rating saved:', ratingData);
  console.log('📊 All ratings:', existingRatings);
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
    0: "How would you rate Siva's portfolio?",
    1: "😞 Not impressed? Let's see what we can improve!",
    2: "🤔 Getting better, but room for improvement!",
    3: "😊 Good work! What could make it great?",
    4: "🎉 Almost perfect! You're loving the experience!",
    5: "🚀 Absolutely amazing! You're blown away!"
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
    setHasRated(true);
    
    // Save rating
    saveRating(starRating);
    sessionStorage.setItem('currentSessionRating', starRating.toString());
    
    onRatingChange?.(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const getStarColor = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    
    if (colorScheme === 'liquidglass') {
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
    if (colorScheme === 'liquidglass') {
      return 'text-white';
    } else if (colorScheme === 'professional') {
      return 'text-gray-800';
    } else {
      return 'text-gray-700';
    }
  };

  const getCardStyle = () => {
    if (colorScheme === 'liquidglass') {
      return 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg';
    } else if (colorScheme === 'professional') {
      return 'bg-white border border-gray-200 shadow-sm';
    } else {
      return 'bg-white/90 border border-gray-200 shadow-md';
    }
  };

  return (
    <div className={`${getCardStyle()} rounded-2xl p-6 max-w-md mx-auto transition-all duration-300`}>
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-4 ${getTextColor()}`}>
          Portfolio Feedback
        </h3>
        
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="p-1 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            >
              <Star 
                className={`w-8 h-8 transition-colors duration-200 ${getStarColor(star)} ${
                  star <= (hoverRating || rating) ? 'fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>

        {/* Dynamic Feedback Text */}
        <div className="min-h-[3rem] flex items-center justify-center">
          <p className={`text-center transition-all duration-300 ${getTextColor()} ${
            rating > 0 ? 'animate-pulse' : ''
          }`}>
            {feedbackMessages[hoverRating || rating]}
          </p>
        </div>

        {/* Rating Display */}
        {rating > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200/30">
            <div className={`text-sm ${getTextColor()} opacity-80`}>
              Your Rating: <span className="font-bold text-yellow-500">{rating}/5 stars</span>
            </div>
          </div>
        )}

        {/* Additional Actions */}
        {rating >= 4 && (
          <div className="mt-4 space-y-2">
            <p className={`text-sm ${getTextColor()} opacity-90`}>
              Love the portfolio? 
            </p>
            <div className="flex gap-2 justify-center">
              <button className={`px-4 py-2 text-xs rounded-lg transition-colors ${
                colorScheme === 'liquidglass' 
                  ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              }`}>
                Share
              </button>
              <button className={`px-4 py-2 text-xs rounded-lg transition-colors ${
                colorScheme === 'liquidglass' 
                  ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' 
                  : 'bg-green-100 hover:bg-green-200 text-green-700'
              }`}>
                Contact Siva
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarFeedback; 