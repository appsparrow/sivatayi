# AI-Powered "Ask Me Anything" Setup Guide

This guide will help you set up the AI-powered chat feature for your portfolio website that can answer questions about your experience and projects.

## 🚀 Quick Start

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### Step 2: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `your-openai-api-key-here` with your actual API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Step 3: Start the Development Server

```bash
npm run dev
```

That's it! Your AI chat feature is now active. Click the floating chat button to test it.

## 📋 Features

### Core Functionality
- ✅ **Smart Chat Interface**: Beautiful, responsive chat UI
- ✅ **AI-Powered Responses**: GPT-powered answers about your experience
- ✅ **Context Awareness**: Maintains conversation history
- ✅ **Fallback Responses**: Works even without API key
- ✅ **Dynamic Content**: Extracts information from your website
- ✅ **Loading States**: Shows thinking indicators
- ✅ **Error Handling**: Graceful error management

### AI Capabilities
- Answers questions about your professional background
- Discusses your projects and technical expertise
- Explains your design process and methodology
- Talks about your continuous learning journey
- Provides insights into your AI/ML experience
- Maintains conversational context

## 🔧 Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_OPENAI_API_KEY` | - | Your OpenAI API key (required) |
| `VITE_OPENAI_MODEL` | `gpt-3.5-turbo` | OpenAI model to use |
| `VITE_OPENAI_MAX_TOKENS` | `500` | Maximum response length |
| `VITE_OPENAI_TEMPERATURE` | `0.7` | Response creativity (0-1) |

### Model Options
- `gpt-3.5-turbo` - Fast and cost-effective
- `gpt-4` - More accurate but slower/expensive
- `gpt-4-turbo` - Balance of speed and accuracy

## 🎯 Customization

### Adding Your Own Content

The AI system automatically extracts content from your website, but you can also add specific information:

```typescript
import { aiService } from '@/services/aiService';

// Add custom content sections
aiService.addContentSections([
  {
    type: 'project',
    title: 'My Latest Project',
    content: 'Description of your latest work...'
  },
  {
    type: 'experience',
    title: 'Recent Achievement',
    content: 'Details about your recent achievement...'
  }
]);
```

### Updating the AI Context

You can update the AI's knowledge base dynamically:

```typescript
import { aiService } from '@/services/aiService';

// Add additional context
aiService.updateContext(`
NEW INFORMATION:
- Recently completed certification in Advanced AI/ML
- Led a new project in sustainable technology
- Expanded expertise in blockchain development
`);
```

### Content Extraction

The system automatically extracts content from HTML elements with these attributes:
- `data-project` - Project information
- `data-experience` - Professional experience
- `data-skills` - Technical skills
- `data-learning` - Learning achievements

Example:
```html
<div data-project>
  <h3>AI-Powered Analytics Platform</h3>
  <p>Built a machine learning platform that processes...</p>
</div>
```

## 🔒 Security & Production

### Important Security Notes

⚠️ **WARNING**: Currently, the API key is exposed in the frontend for development purposes. For production, you should:

1. **Use a Backend API**: Create a backend service to handle OpenAI requests
2. **Implement Rate Limiting**: Prevent abuse of your API
3. **Add Authentication**: Secure your endpoints
4. **Use Environment Variables**: Store secrets server-side

### Production Setup

For production deployment:

1. Create a backend API endpoint:
   ```javascript
   // backend/api/chat.js
   app.post('/api/chat', async (req, res) => {
     const { message, history } = req.body;
     // Process with OpenAI securely
   });
   ```

2. Update the frontend to use your API:
   ```typescript
   // Instead of calling OpenAI directly
   const response = await fetch('/api/chat', {
     method: 'POST',
     body: JSON.stringify({ message, history })
   });
   ```

## 🧪 Testing

### Testing the Chat Feature

1. Click the floating chat button
2. Try these sample questions:
   - "Tell me about your AI expertise"
   - "What's your design process?"
   - "Show me your recent projects"
   - "What technologies do you work with?"

### Debugging

Enable debugging by checking the browser console for:
- Content extraction logs
- API response details
- Error messages

## 📊 Cost Management

### OpenAI API Costs

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens
- **Average conversation**: 200-500 tokens

### Cost Optimization Tips

1. **Set Token Limits**: Use `VITE_OPENAI_MAX_TOKENS` to control response length
2. **Monitor Usage**: Check OpenAI dashboard regularly
3. **Implement Caching**: Cache common responses
4. **Use Fallbacks**: Provide non-AI responses for basic questions

## 🎨 UI Customization

### Styling the Chat Interface

The chat component uses Tailwind CSS. Key customization points:

```typescript
// Chat button colors
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Message bubbles
className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"

// Modal styling
className="w-full max-w-2xl h-[600px] bg-white rounded-2xl"
```

### Adding Custom Animations

The component uses Framer Motion for animations. Customize transitions:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

## 🛠️ Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct and active
   - Check if you have credits in your OpenAI account
   - Ensure the key has the right permissions

2. **Chat Not Responding**
   - Check browser console for errors
   - Verify environment variables are loaded
   - Test with fallback responses first

3. **Content Not Extracted**
   - Add `data-*` attributes to your HTML
   - Check console for extraction logs
   - Manually add content using `addContentSections()`

### Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your OpenAI API key and billing status
3. Test with simple questions first
4. Review the component logs for debugging info

## 🚀 Next Steps

### Potential Enhancements

1. **Voice Integration**: Add speech-to-text and text-to-speech
2. **File Upload**: Allow users to upload documents for context
3. **Multi-language**: Support multiple languages
4. **Analytics**: Track popular questions and responses
5. **Personalization**: Remember user preferences
6. **Integration**: Connect with CRM or analytics tools

### Advanced Features

1. **Conversation Export**: Let users download chat history
2. **Scheduled Updates**: Automatically update AI context
3. **A/B Testing**: Test different response styles
4. **Feedback System**: Collect user feedback on responses

---

**Happy Coding!** 🎉

Your AI-powered portfolio is now ready to engage with visitors and showcase your expertise in an interactive way. 