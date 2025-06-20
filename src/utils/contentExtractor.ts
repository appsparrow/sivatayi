// Content extraction utility to gather information from the website
// This helps build comprehensive context for the AI assistant

export interface ContentSection {
  type: 'project' | 'experience' | 'skill' | 'learning' | 'general';
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

export class ContentExtractor {
  private static instance: ContentExtractor;
  private extractedContent: ContentSection[] = [];

  static getInstance(): ContentExtractor {
    if (!ContentExtractor.instance) {
      ContentExtractor.instance = new ContentExtractor();
    }
    return ContentExtractor.instance;
  }

  // Extract content from DOM elements
  extractFromDOM(): ContentSection[] {
    const sections: ContentSection[] = [];

    try {
      // Extract project information
      const projectElements = document.querySelectorAll('[data-project]');
      projectElements.forEach((element, index) => {
        const title = element.querySelector('h1, h2, h3, h4')?.textContent || `Project ${index + 1}`;
        const content = this.cleanTextContent(element.textContent || '');
        
        if (content.length > 50) { // Only include substantial content
          sections.push({
            type: 'project',
            title,
            content,
            metadata: {
              element: element.tagName,
              dataAttributes: this.getDataAttributes(element)
            }
          });
        }
      });

      // Extract experience/skills sections
      const experienceSelectors = [
        '[data-experience]',
        '[data-skills]',
        '.experience',
        '.skills',
        '[class*="experience"]',
        '[class*="skill"]'
      ];

      experienceSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const title = element.querySelector('h1, h2, h3, h4')?.textContent || 
                       this.inferTitleFromClass(element.className) || 
                       `Experience Section ${index + 1}`;
          const content = this.cleanTextContent(element.textContent || '');
          
          if (content.length > 30) {
            sections.push({
              type: selector.includes('skill') ? 'skill' : 'experience',
              title,
              content,
              metadata: {
                selector,
                className: element.className
              }
            });
          }
        });
      });

      // Extract learning/achievement content
      const learningSelectors = [
        '[data-learning]',
        '[data-achievement]',
        '.learning',
        '.achievement',
        '[class*="learning"]',
        '[class*="achievement"]'
      ];

      learningSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const title = element.querySelector('h1, h2, h3, h4')?.textContent || 
                       `Learning Section ${index + 1}`;
          const content = this.cleanTextContent(element.textContent || '');
          
          if (content.length > 30) {
            sections.push({
              type: 'learning',
              title,
              content
            });
          }
        });
      });

      // Extract general content from main content areas
      const mainContentSelectors = [
        'main',
        '[role="main"]',
        '.main-content',
        '#main-content'
      ];

      mainContentSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          const paragraphs = element.querySelectorAll('p');
          paragraphs.forEach((p, index) => {
            const content = this.cleanTextContent(p.textContent || '');
            if (content.length > 100) { // Only substantial paragraphs
              sections.push({
                type: 'general',
                title: `Content Section ${index + 1}`,
                content
              });
            }
          });
        }
      });

    } catch (error) {
      console.error('Error extracting content from DOM:', error);
    }

    this.extractedContent = sections;
    return sections;
  }

  // Add manual content (for content you provide)
  addManualContent(content: ContentSection[]): void {
    this.extractedContent.push(...content);
  }

  // Get all extracted content formatted for AI context
  getFormattedContext(): string {
    const sections = this.extractedContent.length > 0 
      ? this.extractedContent 
      : this.extractFromDOM();

    let formattedContent = '\n\nADDITIONAL WEBSITE CONTENT:\n';

    const groupedSections = this.groupSectionsByType(sections);

    Object.entries(groupedSections).forEach(([type, items]) => {
      if (items.length > 0) {
        formattedContent += `\n${type.toUpperCase()} INFORMATION:\n`;
        items.forEach(item => {
          formattedContent += `- ${item.title}: ${item.content.substring(0, 300)}${item.content.length > 300 ? '...' : ''}\n`;
        });
      }
    });

    return formattedContent;
  }

  // Clean and normalize text content
  private cleanTextContent(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, ' ') // Replace newlines with space
      .trim()
      .replace(/[^\w\s.,!?-]/g, '') // Remove special characters except common punctuation
      .substring(0, 1000); // Limit content length
  }

  // Extract data attributes from elements
  private getDataAttributes(element: Element): Record<string, string> {
    const dataAttrs: Record<string, string> = {};
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        dataAttrs[attr.name] = attr.value;
      }
    });
    return dataAttrs;
  }

  // Infer title from CSS class names
  private inferTitleFromClass(className: string): string | null {
    const classWords = className
      .split(/[\s-_]/)
      .filter(word => word.length > 2)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return classWords.length > 0 ? classWords : null;
  }

  // Group sections by type for better organization
  private groupSectionsByType(sections: ContentSection[]): Record<string, ContentSection[]> {
    return sections.reduce((groups, section) => {
      if (!groups[section.type]) {
        groups[section.type] = [];
      }
      groups[section.type].push(section);
      return groups;
    }, {} as Record<string, ContentSection[]>);
  }

  // Get content summary for debugging
  getContentSummary(): string {
    const sections = this.extractedContent.length > 0 
      ? this.extractedContent 
      : this.extractFromDOM();

    const summary = {
      total: sections.length,
      byType: this.groupSectionsByType(sections)
    };

    return `Content Summary:
- Total sections: ${summary.total}
- Projects: ${summary.byType.project?.length || 0}
- Experience: ${summary.byType.experience?.length || 0}
- Skills: ${summary.byType.skill?.length || 0}
- Learning: ${summary.byType.learning?.length || 0}
- General: ${summary.byType.general?.length || 0}`;
  }

  // Clear extracted content
  clearContent(): void {
    this.extractedContent = [];
  }
}

// Export singleton instance
export const contentExtractor = ContentExtractor.getInstance(); 