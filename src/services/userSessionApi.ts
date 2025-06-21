// User Session API service for logging user interactions
interface Question {
  question: string;
  order: number;
  timestamp: string;
}

interface UserSession {
  sessionId: string;
  name: string;
  timestamp: string;
  questions: Question[];
  totalQuestions: number;
  sessionStatus: 'incomplete' | 'complete';
}

const API_ENDPOINT = 'https://calculatorsplus.com/user-sessions-api.php'; // Will need to create this

// Generate unique session ID
export const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Save user session data to server
export const saveUserSession = async (sessionData: UserSession): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (response.ok) {
      console.log('✅ User session saved to server successfully');
      return true;
    } else {
      console.error('❌ Failed to save user session to server:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Network error saving user session to server:', error);
    return false;
  }
};

// Session storage helper functions
export const getUserSessionData = (): UserSession | null => {
  const sessionData = sessionStorage.getItem('currentUserSession');
  return sessionData ? JSON.parse(sessionData) : null;
};

export const saveUserSessionData = (sessionData: UserSession): void => {
  sessionStorage.setItem('currentUserSession', JSON.stringify(sessionData));
};

export const clearUserSessionData = (): void => {
  sessionStorage.removeItem('currentUserSession');
};

// Initialize new session
export const initializeUserSession = (name: string): UserSession => {
  const sessionData: UserSession = {
    sessionId: generateSessionId(),
    name: name,
    timestamp: new Date().toISOString(),
    questions: [],
    totalQuestions: 0,
    sessionStatus: 'incomplete'
  };
  
  saveUserSessionData(sessionData);
  return sessionData;
};

// Add question to current session
export const addQuestionToSession = (question: string): UserSession | null => {
  const currentSession = getUserSessionData();
  if (!currentSession) return null;

  const newQuestion: Question = {
    question: question,
    order: currentSession.questions.length + 1,
    timestamp: new Date().toISOString()
  };

  currentSession.questions.push(newQuestion);
  currentSession.totalQuestions = currentSession.questions.length;
  
  // Mark as complete if 3 questions reached
  if (currentSession.totalQuestions >= 3) {
    currentSession.sessionStatus = 'complete';
  }

  saveUserSessionData(currentSession);
  return currentSession;
};

// Check if session has reached question limit
export const hasReachedQuestionLimit = (): boolean => {
  const currentSession = getUserSessionData();
  return currentSession ? currentSession.totalQuestions >= 3 : false;
};

// Get remaining questions count
export const getRemainingQuestions = (): number => {
  const currentSession = getUserSessionData();
  return currentSession ? Math.max(0, 3 - currentSession.totalQuestions) : 3;
};

// Save session to server (with multiple triggers)
export const commitUserSession = async (): Promise<boolean> => {
  const currentSession = getUserSessionData();
  if (!currentSession) return false;

  // Don't save empty sessions
  if (currentSession.totalQuestions === 0) return false;

  const success = await saveUserSession(currentSession);
  
  if (success) {
    console.log('📊 User session committed:', currentSession);
    // Keep session data for UI purposes, but mark as saved
    currentSession.sessionStatus = 'complete';
    saveUserSessionData(currentSession);
  }
  
  return success;
};

// Setup auto-save triggers
export const setupAutoSave = (): (() => void) => {
  // Save on page unload
  const handleBeforeUnload = () => {
    const currentSession = getUserSessionData();
    if (currentSession && currentSession.totalQuestions > 0) {
      // Use sendBeacon for reliable saving during page unload
      const data = JSON.stringify(currentSession);
      navigator.sendBeacon(API_ENDPOINT, data);
    }
  };

  // Save on visibility change (tab switching)  
  const handleVisibilityChange = () => {
    if (document.hidden) {
      commitUserSession();
    }
  };

  // Add event listeners
  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}; 