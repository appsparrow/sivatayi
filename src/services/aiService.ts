import OpenAI from 'openai';
import { contentExtractor } from '@/utils/contentExtractor';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend API
});

// Cache for common questions to save API calls
const CACHED_RESPONSES = {
  "tell me about your ai expertise": "While it has always been forcus on hunan-centered design. Gained good traction in understanding and building AI-first products and have been exploring AI capabilities. I've created user-friendly interfaces for complex AI systems across fintech, healthcare, and insurance applications. My approach focuses on making AI transparent and trustworthy while augmenting human creativity rather than replacing it.",
  
  "what's your design philosophy": "My approach is rooted in human-centered design, blending empathy with the power of AI and 'vibe coding' to turn ideas into products that truly resonate with users and are ready for the market. I believe in designing with code, using data-driven decisions enhanced by user empathy, and creating accessible, inclusive experiences.",
  
  "how do you bring ideas to products": "I follow a systematic Ideate → Strategize → Launch methodology. I start with deep user research, prototype rapidly with code, iterate based on feedback, and deliver market-ready products. I've successfully brought 24 ideas from concept to marketable products using this approach combined with AI-first thinking.",
  
  "what's your design process": "Every project starts with understanding people. Even as AI evolves, I believe we're designing for humans first. My process is simple: Ideate → Strategize → Launch. I begin with user research, prototype with 'vibe coding', and deliver working products through a systematic, iterative approach.",
  
  "what else can you do besides work": "I'm a creative artist who does oil painting, outdoor enthusiast passionate about hiking and casual motorcycle rides, and a home improvement expert who's completed tons of DIY projects. I've built metaverse spaces, fly drones as a hobby, use AI for social media content creation, and apply design thinking to everyday life challenges. There are many interests and experiences I have that you can discover through our conversation!",
  
  "what technologies do you understand": "I specialize in  Human-centered design, keeping users at the center and leveraging AI to enhance the design process and experience. My design process is powered by Figma, Miro, FigJam, and AI-driven design platforms. I also have understanding of full-stack development and CRM systems Salesforce capabilities to craft seamless digital experiences.",
  
  "tell me about your learning journey": "After spending thousands of hours in explorative learning, I personally believe I believe in reinforcing knowledge through practical application and 'learning by doing'. I have 255+ Salesforce badges, 99 LinkedIn Learning courses, and multiple certifications across Microsoft and SAP."
}

// Function to check if a question matches cached responses
function getCachedResponse(question: string): string | null {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Check for exact matches first
  if (CACHED_RESPONSES[normalizedQuestion]) {
    return CACHED_RESPONSES[normalizedQuestion];
  }
  
  // Check for partial matches
  for (const [cachedQuestion, response] of Object.entries(CACHED_RESPONSES)) {
    if (normalizedQuestion.includes(cachedQuestion) || cachedQuestion.includes(normalizedQuestion)) {
      return response;
    }
  }
  
  // Check for keyword matches
  if (normalizedQuestion.includes('ai') && normalizedQuestion.includes('expertise')) {
    return CACHED_RESPONSES["tell me about your ai expertise"];
  }
  
  if (normalizedQuestion.includes('design') && normalizedQuestion.includes('philosophy')) {
    return CACHED_RESPONSES["what's your design philosophy"];
  }
  
  if (normalizedQuestion.includes('ideas') && normalizedQuestion.includes('product')) {
    return CACHED_RESPONSES["how do you bring ideas to products"];
  }
  
  if (normalizedQuestion.includes('process')) {
    return CACHED_RESPONSES["what's your design process"];
  }
  
  if (normalizedQuestion.includes('besides work') || normalizedQuestion.includes('outside work') || normalizedQuestion.includes('personal')) {
    return CACHED_RESPONSES["what else can you do besides work"];
  }
  
  if (normalizedQuestion.includes('technolog') || normalizedQuestion.includes('skills')) {
    return CACHED_RESPONSES["what technologies do you understand"];
  }
  
  if (normalizedQuestion.includes('learning') && normalizedQuestion.includes('journey')) {
    return CACHED_RESPONSES["tell me about your learning journey"];
  }
  
  return null;
}

// Enhanced portfolio context with more comprehensive information
const portfolioContext = `
You are an AI assistant representing Siva Tayi, a Design Director and AI-first product developer. Here's comprehensive information about Siva:

PROFESSIONAL BACKGROUND:
- Over 2 decades of experience, directing product design and strategy. Focusing in AI-first products
- Brought several ideas from concept to marketable products while exploring AI capabilities.
- Expert in Design → Develop → Deliver methodology
- Led cross-functional teams through entire product lifecycle
- Winner of Generative AI Design Hackathon

TECHNICAL EXPERTISE:
- AI/ML Systems: General understanding of neural networks, machine learning models, LLMs
- Frontend Development: React, TypeScript, JavaScript, HTML5, CSS3
- Design Tools: Figma, Adobe Creative Suite, Sketch, Framer
- Backend: Good understanding of full-stack development, API driven development, and CRM systems.
- Databases: Supabase,SQL, NoSQL, vector databases for AI applications
- Cloud: AWS, Google Cloud, Azure, GCP, etc.
- Products: Salesforce, Skuid, PowerApps, PowerBI, Power Automate, Power Point, Excel, etc.
- AI Tools: OpenAI, Anthropic, Claude, Gemini, Copilot, etc.
- AI Agents: Cursor, Cursor AI, Claude, Gemini, CoPilot, etc.
- Exploring AgenticAI capabilities and tools to enhance productivity and creativity.
- 

AI-FIRST PRODUCT DEVELOPMENT:
- Designed interfaces for LLM applications and conversational AI
- Experience with computer vision, predictive analytics, and conversational AI
- Built AI-powered fintech, healthcare, and insurance applications
- Created user-friendly interfaces for complex AI systems
- Expertise in prompt engineering and AI UX patterns

DESIGN SYSTEMS & METHODOLOGIES:
- Created scalable design systems for enterprise applications
- Expert in atomic design principles and component libraries
- Accessibility-first design approach (WCAG compliance)
- Design thinking workshops and user research methodologies
- Prototyping with code (React, Framer, Figma)
- A/B testing and data-driven design decisions

RFP & STRATEGIC PROPOSAL LEADERSHIP:
- Led design-driven RFP responses for Fortune 500 clients including Google Cloud
- Created comprehensive design proposals with user-centered solution narratives
- Developed implementation roadmaps and design-driven delivery models for transformation programs
- Led human-centered design workshops and discovery sessions for strategic solutioning
- Combined design thinking methodologies with business requirements for RFP responses
- Expertise in change management, sales enablement, and GenAI transformation through design lens

CONTINUOUS LEARNING ACHIEVEMENTS:
- Salesforce: 255 badges across various modules
- LinkedIn Learning: 99 courses completed
- Microsoft Learn: Multiple certifications
- SAP: Various certifications
- Total: 350+ hours of continuous learning in couple of years and keeping updated.

FEATURED PROJECTS:
1. Insights Hub - AI-Powered Analytics: Comprehensive data visualization dashboard with AI-generated insights, predictive analytics, and automated reporting for enterprise decision-making. Reduced reporting time by 75%, improved decision accuracy by 60%.

2. AmongAI - GenAI Hackathon Winner: Revolutionary immersive trip planner leveraging Generative AI that won the Design Hackathon. Created through human-AI collaboration with 200+ GenAI prompts and 82+ development hours. Demonstrated 40% reduction in design cycle time through strategic AI integration.

3. Process Alignment Workshop & Unified Product Experience: Led process alignment workshops across 11+ internal teams, consolidating insights and unifying product experiences for greater efficiency.

ADDITIONAL PROJECTS:
- Salesforce Design System Leadership: Led design system strategy for enterprise clients, mentored 8 designers/developers, established scalable component libraries and governance frameworks.
- Major Airlines Mobile App Redesign: Redesigned core reservation platform and mobile app for leading airline, delivered seamless booking experience with personalized recommendations.
- AI Insurance Platform: Enterprise AI platform providing predictive analytics and risk assessment, deployed across 10+ major insurance firms with 75% accuracy improvement.
- Banking Integration Management: Comprehensive banking platform for account management with real-time analytics, deployed at 15+ financial institutions reducing errors by 60%.
- Entertainment Platform UX (Salesforce + Skuid): Product experience design for major entertainment client, integrated Salesforce and Skuid for seamless UX increasing engagement by 55%.
- Excel to PowerApps Process Redesign: Transformed complex multi-excel workflows into a streamlined PowerApps experience, improving efficiency and user adoption.
- Custom CRM for Escalation Management: Designed a Salesforce-based custom CRM interface for largest technology company, optimizing escalation management and case resolution.
- Pharma Eudamed Product Tracking: Developed product tracking and compliance reporting for major pharmaceutical company, ensuring Eudamed standards for medicines and equipment are met on time.
- Critical Data Management Dashboards: Designed data management dashboards for a large organization, enabling actionable insights and improved decision-making.
- AI Assistant for Customer Service Agents: Created intelligent AI workflows to assist customer service agents, building trust and delivering AI-powered support for a leading insurance provider.
- Employee Portal & Risk Management for Bank: Designed inter-employee portal for a bank, aligning user management and risk indicators with critical employee data management.
- AI Agent Prototyping: Idea to Product: Explored and built multiple prototypes using AI agents for end-to-end product ideation, research, development, testing, and CI/CD delivery.
- Cross-Platform Experience Design Strategy: Directed end-to-end experience design strategy across web, mobile, and emerging platforms, ensuring consistent user journeys and brand experiences for enterprise clients.
- Discovery & Design Thinking Workshops: Led human-centered design workshops and discovery sessions for solutioning, combining design thinking methodologies with strategic business requirements for RFP responses.
- Strategic RFP Leadership for Fortune 500: Contributed design solutioning perspective to RFP responses for Fortune 500 clients, focusing on change management, sales enablement, and transformation programs.
- Design Proposals & Solution Narratives: Created comprehensive design proposals with user-centered solution narratives, implementation roadmaps, and design-driven delivery models for Fortune 500 transformation programs.
- Building metaverse spaces and virtual experiences while exploring Metaverse capabilities and spaces for personal art spaces
- social media content, customer service agents and chatbots, employee portals and HR systems, risk management systems and compliance reporting, data management dashboards and analytics, product tracking systems and inventory management
- Constantly exploring new AI tools, techniques, and approaches to enhance productivity and creativity through learning and experimentation.


PERSONALITY & LIFE BEYOND WORK:
- Creative Artist: Does oil painting and explores various art forms and creative expression
- Outdoor Enthusiast: Passionate about hiking and casual motorcycle rides
- Drone Pilot: Flies drones as a hobby and makes sure to carry one for vacations
- Metaverse Builder: Has built metaverse spaces and virtual experiences
- Home Improvement Expert: Completed tons of DIY projects, applying systematic problem-solving
- Knowledge Application Master: Expert at reinforcing learning through practical implementation
- Social Media AI Innovator: Uses AI to generate engaging social media content
- Process-Oriented Thinker: Applies design thinking to everyday life challenges
- Adventure Seeker: Always exploring new experiences and challenges
- Multi-Talented Individual: Has many interests and experiences over time that can be discovered through conversation
- Continuous Experimenter: Constantly trying new tools, techniques, and approaches

CREATIVE & PERSONAL PROJECTS:
- Oil Painting: Creates art through traditional oil painting techniques
- Metaverse Spaces: Built immersive virtual environments and experiences for exhibintg  artwork.
- Drone Photography/Videography: Captures aerial content during travels and adventures
- AI-Generated Social Media Content: Innovative use of AI for content creation
- Home Renovation Projects: Systematic approach to complex improvement projects
- Motorcycle Adventures: Casual rides and mechanical understanding
- Artistic Exploration: Various creative mediums and artistic expression
- Process Documentation: Sharing knowledge and methodologies with others
- Travel Documentation: Uses drones and other tools to capture vacation experiences

DESIGN PHILOSOPHY & APPROACH:
- Human-centered design enhanced by AI capabilities
- Data-driven decision making with user empathy
- Prototype-first approach: "Design with code"
- Collaborative design process with cross-functional teams
- Accessibility and inclusive design principles
- Design systems thinking for scalable solutions
- Life-long learning and knowledge application

AI & DESIGN PERSPECTIVE:
- AI should augment human creativity, not replace it
- Ethical AI design with transparency and user control
- Designing for AI explainability and user trust
- Creating intuitive interfaces for complex AI capabilities
- Balancing automation with human agency

LEADERSHIP & STRATEGY:
- Strategic thinking for product development and market positioning
- Cross-functional team leadership (design, engineering, product, business)
- Agile and design thinking methodologies
- Product roadmap development and stakeholder alignment
- Market research and competitive analysis
- Mentoring junior designers and fostering design culture

PROBLEM-SOLVING APPROACH:
1. Research & Discovery: Deep user research and market analysis
2. Strategic Design: Comprehensive design strategies aligned with business goals
3. Rapid Prototyping: Building working prototypes to validate concepts
4. Iterative Development: Continuous improvement based on user feedback
5. Market Delivery: Launching products with proper go-to-market strategy

COMMUNICATION STYLE:
- Keep responses concise and actionable (2-3 sentences max)
- Always respond in first person ("I", "my", "me")
- Be conversational yet professional
- When asked about projects/experience not specifically listed, provide a brief relevant response and offer to discuss further
- For technical questions, balance depth with accessibility
- Show personality and mention diverse interests when appropriate

IMPORTANT: If asked about specific projects, technologies, or experiences not explicitly mentioned above, acknowledge the question briefly and suggest continuing the conversation to explore that topic in more detail. When discussing what else you can do or your broader skills, mention the creative, artistic, and adventurous side along with professional expertise.
`;

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export class AIService {
  private context: string;
  private contentLoaded: boolean = false;
  private additionalContext: string = '';

  constructor() {
    this.context = portfolioContext;
    this.loadDynamicContent();
  }

  // Load dynamic content from the website
  private loadDynamicContent(): void {
    try {
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        const extractedContent = contentExtractor.getFormattedContext();
        if (extractedContent && extractedContent.length > 100) {
          this.context += extractedContent;
          this.contentLoaded = true;
          console.log('Dynamic content loaded:', contentExtractor.getContentSummary());
        }
      }, 1000);
    } catch (error) {
      console.error('Error loading dynamic content:', error);
    }
  }

  async generateResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    console.log('🔥 generateResponse called with:', userMessage);
    
    try {
      // ⚡ CHECK CACHE FIRST to save API calls and tokens
      const cachedResponse = getCachedResponse(userMessage);
      if (cachedResponse) {
        console.log('💾 Using cached response for question:', userMessage);
        return cachedResponse;
      }
      
      console.log('🌐 No cache hit, calling OpenAI API');
      
      // Refresh content if not loaded yet
      if (!this.contentLoaded) {
        this.loadDynamicContent();
      }

      console.log('🔑 API Key check:', this.isConfigured());
      
      // Enhanced system prompt with additional context
      const systemPrompt = this.context + this.additionalContext + `

RESPONSE GUIDELINES:
- Keep responses to 2-3 sentences maximum
- Be specific and actionable
- If asked about something not in your knowledge base, briefly acknowledge and suggest discussing further
- Always maintain a helpful, professional tone
- Use "I" statements as you are representing Siva Tayi

IMPORTANT: Keep your response concise and to the point.`;

      // Prepare conversation context
      const messages: any[] = [
        {
          role: 'system',
          content: systemPrompt
        }
      ];

      // Add conversation history (last 3 messages for context to save tokens)
      const recentHistory = conversationHistory.slice(-3);
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      console.log('🤖 Calling OpenAI with', messages.length, 'messages');

      const completion = await openai.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS) || 200,
        temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE) || 0.7,
        stream: false,
      });

      const response = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response. Please try again.';
      console.log('✅ OpenAI response received:', response);
      return response;
    } catch (error) {
      console.error('❌ DETAILED Error generating AI response:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Log specific API errors
      if (error.response) {
        console.error('API Response Error:', error.response.data);
        console.error('API Status:', error.response.status);
      }
      
      // Enhanced fallback responses for common topics
      const fallbackResponses: { [key: string]: string } = {
        // Funny personal question responses
        'family': "My family tree is more like a design system - well-structured, documented, and occasionally needs refactoring! 😄 But seriously, I prefer to keep family details private while we chat about design and tech.",
        'address': "I live at 127.0.0.1 - localhost! 😂 But for real conversations, let's stick to talking about design, AI, and creative projects rather than personal addresses.",
        'salary': "My salary is measured in creative satisfaction and successful product launches! 💰 Let's talk about the value I bring through design and AI expertise instead.",
        'manager': "My manager is my curiosity and passion for great design! 🎨 I'm self-directed when it comes to learning and creating. Want to discuss leadership and team dynamics instead?",
        'phone': "My phone number is 1-800-DESIGN! 📱 But honestly, let's keep our chat focused on professional topics - I'm here to discuss design, AI, and product development.",
        'age': "I'm old enough to remember when 'responsive design' meant answering emails quickly! 😅 Age is just a number - what matters is staying current with design trends and AI innovations.",
        'personal': "I keep my personal life as private as my GitHub repos! 🔒 But I'm totally open about discussing my professional journey, creative projects, and design philosophy.",
        'what else': "I actually have way more skills and an interesting personality beyond just work! I'm an artist who loves hiking, biking, motorcycle riding, and I've done tons of home improvement projects. I'm also creative in using AI for social media generation and expert at applying knowledge through process reinforcement.",
        'hobbies': "Beyond design and tech, I'm passionate about motorcycle adventures, hiking trails, creative art projects, and home renovations. I love applying systematic thinking to everything - from DIY projects to exploring new AI tools for creative content.",
        'personality': "I'm someone who brings creativity and adventure into everything I do. Whether it's designing AI interfaces, renovating my home, or exploring mountain trails on my bike, I approach life with curiosity and systematic problem-solving.",
        'creative': "I explore various art forms and use AI innovatively for social media content creation. My creative side complements my technical skills - I see design as both art and science.",
        'motorcycle': "I'm passionate about long-distance motorcycle riding! It combines my love for adventure, mechanical understanding, and the freedom to explore. There's something about the open road that sparks creativity.",
        'home improvement': "I've completed tons of DIY projects using systematic problem-solving approaches. I apply the same design thinking methodology to home renovations as I do to product development - research, prototype, iterate, deliver!",
        'learning': "I'm expert at reinforcing what I learn through practical application. Every course, every new skill gets tested in real projects. That's how I've maintained 350+ hours of learning annually while actually retaining and using the knowledge.",
        'ai social media': "I've been exploring creative ways to use AI for social media content generation. It's fascinating how AI can augment human creativity rather than replace it - I use it as a creative partner in content strategy.",
        'design systems': "I've built 50+ component design systems for enterprise applications. My approach focuses on scalability, accessibility (WCAG 2.1 AA), and developer-designer collaboration. Each system is like building a creative language for teams.",
        'accessibility': "Accessibility isn't just compliance for me - it's about inclusive design that works for everyone. I've implemented WCAG 2.1 AA standards across multiple products, believing that good design should be universally accessible.",
        'voice ui': "Voice interface design fascinates me because it's purely conversational - no visual crutches. I've worked on voice AI systems where the entire experience depends on understanding human conversation patterns and natural language flow.",
        'prototyping': "I believe in 'vibe coding' - rapid prototyping that captures the feel of an idea quickly. Whether it's Figma, React, or even physical mockups for home projects, prototyping is how ideas become reality.",
        'hackathons': "Winning the Generative AI Design Hackathon was incredible! It validated my approach of combining human-centered design with AI capabilities. Hackathons are where creativity meets rapid execution.",
        'startup': "I've been part of multiple startup journeys, understanding the unique challenges of building products with limited resources. It taught me to be scrappy, strategic, and user-focused from day one."
      };

      // Check for fallback responses
      const lowerMessage = userMessage.toLowerCase();
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          console.log('🎯 Using enhanced fallback response for:', key);
          return response;
        }
      }
      
      // Fallback to enhanced responses if API fails
      console.log('🔄 Falling back to enhanced static response');
      return this.getEnhancedFallbackResponse(userMessage);
    }
  }

  private getEnhancedFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Design system related questions
    if (lowerMessage.includes('design system') || lowerMessage.includes('component library')) {
      return "I've built scalable design systems for enterprise applications using atomic design principles. I focus on accessibility-first components and seamless design-to-code workflows. Would you like to discuss specific design system challenges?";
    }
    
    // AI in design questions
    if (lowerMessage.includes('ai in design') || lowerMessage.includes('ai design') || lowerMessage.includes('artificial intelligence design')) {
      return "I believe AI should augment human creativity, not replace it. I focus on designing ethical AI interfaces with transparency and user control. Let's chat about how AI can enhance your design process!";
    }
    
    // Accessibility questions
    if (lowerMessage.includes('accessibility') || lowerMessage.includes('a11y') || lowerMessage.includes('inclusive')) {
      return "Accessibility is core to my design philosophy - I ensure WCAG compliance and inclusive design principles in all projects. I believe great design works for everyone. Want to discuss accessibility strategies?";
    }
    
    // Voice UI / Conversational design
    if (lowerMessage.includes('voice') || lowerMessage.includes('conversational') || lowerMessage.includes('chatbot')) {
      return "I've designed conversational AI interfaces for healthcare and customer service applications. Voice UI requires different design thinking than visual interfaces. Let's explore conversational design principles!";
    }
    
    // Prototyping questions
    if (lowerMessage.includes('prototype') || lowerMessage.includes('figma') || lowerMessage.includes('framer')) {
      return "I prototype with code using React and design tools like Figma and Framer. This approach helps validate technical feasibility early. Happy to discuss prototyping strategies that work for your team!";
    }
    
    // Existing fallback responses with enhancement
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return "I have 5+ years as a Design Director specializing in AI-first products, bringing 24 ideas to market. My approach combines strategic design with hands-on development. What specific aspect interests you most?";
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
      return "I specialize in designing user-friendly interfaces for complex AI systems, from LLMs to computer vision. My focus is making AI accessible and trustworthy. Let's discuss your AI design challenges!";
    }
    
    if (lowerMessage.includes('projects') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
      return "I've delivered projects across fintech, healthcare, insurance, and entertainment - each focusing on solving real user problems with AI-enhanced experiences. Which industry or project type interests you?";
    }
    
    if (lowerMessage.includes('design') || lowerMessage.includes('process')) {
      return "My process is Design → Develop → Deliver: user research, strategic design, code prototypes, and market-ready products. This end-to-end approach ensures ideas become reality. Want to dive deeper into any phase?";
    }
    
    if (lowerMessage.includes('learning') || lowerMessage.includes('education') || lowerMessage.includes('growth')) {
      return "I invest 350+ hours annually in learning across Salesforce (255 badges), LinkedIn Learning (99 courses), and other platforms. Continuous learning keeps me current with AI and design evolution. What learning strategies work for you?";
    }

    if (lowerMessage.includes('technology') || lowerMessage.includes('tools') || lowerMessage.includes('tech stack')) {
      return "I work with React, TypeScript, Python for AI/ML, plus design tools like Figma and Framer. My approach combines strategic design with technical implementation. What's your current tech stack?";
    }

    if (lowerMessage.includes('leadership') || lowerMessage.includes('team') || lowerMessage.includes('management')) {
      return "I lead cross-functional teams through entire product lifecycles, from ideation to market launch. I believe in collaborative design and data-driven decisions. Let's discuss leadership challenges you're facing!";
    }
    
    // Hackathon related
    if (lowerMessage.includes('hackathon') || lowerMessage.includes('competition')) {
      return "I won the Generative AI Design Hackathon with TravelMate AI, a personalized travel companion. Hackathons are great for rapid innovation and testing new ideas. Have you participated in any design competitions?";
    }
    
    // General fallback with invitation to continue
    return "While I'd love to share more specific insights about that topic, let's continue our conversation - I'm happy to dive deeper into any aspect of design, AI, or product development that interests you.";
  }

  // Method to add custom context for specific topics
  addCustomContext(topic: string, content: string): void {
    this.additionalContext += `\n\nADDITIONAL CONTEXT - ${topic.toUpperCase()}:\n${content}`;
    console.log(`Added custom context for: ${topic}`);
  }

  // Method to update context with additional information
  updateContext(additionalInfo: string): void {
    this.context += `\n\nADDITIONAL CONTEXT:\n${additionalInfo}`;
  }

  // Method to add manual content sections
  addContentSections(sections: any[]): void {
    contentExtractor.addManualContent(sections);
    this.loadDynamicContent(); // Refresh context
  }

  // Method to check if API key is configured
  isConfigured(): boolean {
    return !!import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key-here';
  }

  // Method to get current context for debugging
  getContext(): string {
    return this.context + this.additionalContext;
  }

  // Method to refresh content from website
  refreshContent(): void {
    contentExtractor.clearContent();
    this.contentLoaded = false;
    this.loadDynamicContent();
  }
}

export const aiService = new AIService(); 