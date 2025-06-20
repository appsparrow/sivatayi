// Debug utility for AI service testing
import { aiService } from '@/services/aiService';
import { contentExtractor } from '@/utils/contentExtractor';

export class AIDebugger {
  static async runDiagnostics() {
    console.log('🔍 AI Service Diagnostics');
    console.log('========================');
    
    // Check API key configuration
    const isConfigured = aiService.isConfigured();
    console.log(`✓ API Key Configured: ${isConfigured ? '✅ YES' : '❌ NO'}`);
    
    if (!isConfigured) {
      console.log('⚠️  API key not found. Add VITE_OPENAI_API_KEY to your .env file');
    }
    
    // Check environment variables
    console.log('\n📋 Environment Variables:');
    console.log(`- VITE_OPENAI_API_KEY: ${import.meta.env.VITE_OPENAI_API_KEY ? 'SET' : 'NOT SET'}`);
    console.log(`- VITE_OPENAI_MODEL: ${import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo (default)'}`);
    console.log(`- VITE_OPENAI_MAX_TOKENS: ${import.meta.env.VITE_OPENAI_MAX_TOKENS || '500 (default)'}`);
    console.log(`- VITE_OPENAI_TEMPERATURE: ${import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7 (default)'}`);
    
    // Check content extraction
    console.log('\n📄 Content Extraction:');
    const contentSummary = contentExtractor.getContentSummary();
    console.log(contentSummary);
    
    // Test AI response
    console.log('\n🤖 Testing AI Response:');
    try {
      const testResponse = await aiService.generateResponse('Hello, can you tell me about yourself?');
      console.log('✅ AI Response Test: SUCCESS');
      console.log(`Response length: ${testResponse.length} characters`);
      console.log(`Response preview: ${testResponse.substring(0, 100)}...`);
    } catch (error) {
      console.log('❌ AI Response Test: FAILED');
      console.error('Error:', error);
    }
    
    console.log('\n========================');
    console.log('🔍 Diagnostics Complete');
  }
  
  static logContext() {
    console.log('📝 AI Context Preview:');
    console.log('======================');
    const context = aiService.getContext();
    console.log(context.substring(0, 500) + '...');
  }
  
  static async testSpecificQuestion(question: string) {
    console.log(`🧪 Testing Question: "${question}"`);
    console.log('=====================================');
    
    const startTime = Date.now();
    try {
      const response = await aiService.generateResponse(question);
      const endTime = Date.now();
      
      console.log(`✅ Response received in ${endTime - startTime}ms`);
      console.log(`Response: ${response}`);
    } catch (error) {
      console.log('❌ Test failed');
      console.error('Error:', error);
    }
  }
}

// Make it available globally for easy testing
(window as any).AIDebugger = AIDebugger;

// Auto-run diagnostics in development
if (import.meta.env.DEV) {
  setTimeout(() => {
    AIDebugger.runDiagnostics();
  }, 2000);
} 