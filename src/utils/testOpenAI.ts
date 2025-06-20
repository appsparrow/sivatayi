// Simple OpenAI API test
import OpenAI from 'openai';

export async function testOpenAIConnection() {
  console.log('🧪 Testing OpenAI Connection');
  console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY ? 'SET' : 'NOT SET');
  
  if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your-openai-api-key-here') {
    console.error('❌ API Key not configured');
    return 'API Key not configured';
  }

  try {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    console.log('🤖 Making test API call...');
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are Siva Tayi, a Design Director. Respond briefly in 1-2 sentences.'
        },
        {
          role: 'user',
          content: 'Hello, who are you?'
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'No response';
    console.log('✅ OpenAI API Test Success:', response);
    return response;
  } catch (error) {
    console.error('❌ OpenAI API Test Failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type
    });
    return `Error: ${error.message}`;
  }
}

// Make it available globally for easy testing
(window as any).testOpenAI = testOpenAIConnection; 