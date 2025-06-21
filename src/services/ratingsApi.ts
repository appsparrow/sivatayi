// Rating API service for sending ratings to PHP server
interface RatingData {
  rating: number;
  timestamp: string;
  sessionId: string;
}

const API_ENDPOINT = 'https://sivatayi.com/ratings-api.php'; // Add your PHP server endpoint here (e.g., 'https://yourserver.com/ratings-api.php')

export const sendRatingToServer = async (ratingData: RatingData): Promise<boolean> => {
  // If no API endpoint is configured, fall back to localStorage only
  if (!API_ENDPOINT) {
    console.log('📝 No API endpoint configured, using localStorage only');
    return false;
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    });

    if (response.ok) {
      console.log('✅ Rating sent to server successfully');
      return true;
    } else {
      console.error('❌ Failed to send rating to server:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Network error sending rating to server:', error);
    return false;
  }
};

export const isApiConfigured = (): boolean => {
  return API_ENDPOINT.length > 0;
}; 