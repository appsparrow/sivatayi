// Custom content utility for adding specific knowledge to the AI assistant
import { aiService } from '@/services/aiService';

// Add custom content for topics not covered in the main portfolio
export const addCustomContent = () => {
  // Design Systems Experience
  aiService.addCustomContext('Design Systems', `
  - Built design system for 50+ component library at enterprise scale
  - Implemented token-based design system with automated code generation
  - Created design system governance and adoption strategies
  - Experience with Design Tokens, Storybook, and Figma variants
  - Led design system migration for 15+ product teams
  `);

  // AI in Design Philosophy
  aiService.addCustomContext('AI in Design', `
  - Advocate for human-centered AI that enhances rather than replaces creativity
  - Experience designing AI transparency and explainability features
  - Created ethical AI guidelines for design teams
  - Designed AI-powered design tools and automation workflows
  - Expert in prompt engineering for design applications
  `);

  // Voice and Conversational Design
  aiService.addCustomContext('Voice UI Design', `
  - Designed voice interfaces for smart home and automotive applications
  - Created conversational design frameworks for chatbots and voice assistants
  - Experience with speech recognition UX and multimodal interactions
  - Designed for accessibility in voice interfaces (screen readers, voice control)
  `);

  // Accessibility Expertise
  aiService.addCustomContext('Accessibility', `
  - WCAG 2.1 AA compliance expert with certification
  - Conducted accessibility audits for Fortune 500 companies
  - Designed inclusive experiences for users with disabilities
  - Created accessibility testing frameworks and training programs
  - Experience with screen readers, keyboard navigation, and assistive technologies
  `);

  // Research and Strategy
  aiService.addCustomContext('User Research', `
  - Led user research for 20+ products across different industries
  - Expert in ethnographic research, usability testing, and behavioral analytics
  - Created research operations frameworks for scaling research teams
  - Experience with quantitative and qualitative research methodologies
  `);

  // Startup and Innovation Experience
  aiService.addCustomContext('Startup Experience', `
  - Advised 10+ startups on product strategy and design
  - Experience building products from 0 to 1 with limited resources
  - Created MVP strategies and rapid validation frameworks
  - Expert in lean startup methodology and design sprints
  `);

  console.log('✅ Custom content loaded for enhanced AI responses');
};

// Auto-load custom content when imported
addCustomContent(); 