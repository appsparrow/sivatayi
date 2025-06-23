import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowDown, Book, Users, Youtube, Search, Award, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingQuestion from '@/components/FloatingQuestion';
import ProjectCard from '@/components/ProjectCard';
import ExplorativeLearningJourney from '@/components/ExplorativeLearningJourney';
import SearchInterface from '@/components/SearchInterface';
import CaseStudyModal from '@/components/CaseStudyModal';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import GlassButton from '@/components/GlassButton';
import AskMeAnything from '@/components/AskMeAnything';
import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import StarFeedback from '@/components/StarFeedback';
import SlimProjectCard from '@/components/SlimProjectCard';

const Index = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [colorScheme, setColorScheme] = useState('liquidglass');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [slimProjectsSearch, setSlimProjectsSearch] = useState('');
  const [showAllSlimProjects, setShowAllSlimProjects] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (colorScheme === 'liquidglass') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [colorScheme]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const getColorSchemeClasses = () => {
    switch (colorScheme) {
      case 'sunset':
        return {
          background: 'bg-gradient-to-br from-orange-50 via-pink-50 to-red-50',
          accent: 'from-orange-600 to-pink-600',
          text: 'from-orange-900 via-pink-800 to-red-800',
          card: 'bg-white/80'
        };
      case 'liquidglass':
        return {
          background: 'liquid-glass-background',
          accent: 'from-blue-400 to-purple-400',
          text: 'from-blue-200 via-purple-200 to-cyan-200',
          card: 'glass-card'
        };
      case 'professional':
        return {
          background: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
          accent: 'from-gray-800 to-gray-900',
          text: 'from-gray-900 to-gray-800',
          card: 'bg-white/90 border border-gray-200'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
          accent: 'from-blue-600 to-purple-600',
          text: 'from-gray-900 via-blue-800 to-purple-800',
          card: 'bg-white/80'
        };
    }
  };

  const colors = getColorSchemeClasses();

  const floatingQuestions = [
    {
      id: '1',
      question: "What's your design philosophy?",
      answer: "I design for humans first. I blend empathy with AI and intuitive coding to create products that actually connect with people—not just look pretty.",
      x: 15,
      y: 35
    },
    {
      id: '2',
      question: "What do you work with?",
      answer: "Product strategy, React, TypeScript, Figma—the usual suspects. But I also love experimenting with AI tools to push creative boundaries and build faster.",
      x: 65,
      y: 45
    },
    {
      id: '3',
      question: "How do you start projects?",
      answer: "Simple: understand people first. I follow Ideate → Design → Develop → Deliver, but always with real humans at the center of every decision.",
      x: 75,
      y: 30
    },
    {
      id: '4',
      question: "What makes you different?",
      answer: "I think like a designer, build like a developer, and dream like an explorer. I bridge ideas and reality—turning 'what if' into 'here it is.'",
      x: 35,
      y: 42
    },
    {
      id: '5',
      question: "How do you stay ahead?",
      answer: "I build with AI, not against it. Always learning, always experimenting, always asking 'what's next?' instead of 'what's safe?'",
      x: 50,
      y: 33
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Insights Hub - AI-Powered Analytics",
      category: "AI & Data Analytics",
      description: "Comprehensive data visualization dashboard with AI-generated insights, predictive analytics, and automated reporting for enterprise decision-making.",
      image: "/project-images/stp-insights01.png",
      images: [
        "/project-images/stp-insights01.png",
        "/project-images/stp-insights02.png",
        "/project-images/stp-insights03.png"
      ],
      tags: ["AI/ML", "Data Visualization", "Enterprise Analytics"],
      problem: "Organizations struggled with fragmented data sources, manual reporting processes, and lack of actionable insights from complex datasets, leading to delayed decision-making and missed opportunities.",
      solution: "Designed and developed an AI-powered analytics platform featuring automated data processing, intelligent visualization, predictive modeling, and natural language insights generation. The platform includes real-time dashboards, automated anomaly detection, and AI-generated executive summaries.",
      impact: "Reduced reporting time by 75%, improved decision accuracy by 60%, and enabled real-time insights for 50+ enterprise clients. The AI summary feature processes complex datasets and generates actionable recommendations, saving executives 10+ hours per week on data analysis."
    },
    
    {
      id: 2,
      title: "AmongAI- GenAI Hackathon Winner",
      category: "AI-Powered Travel Experience - Award Winner",
      description: "Revolutionary immersive trip planner leveraging Generative AI that won the Design Hackathon. Created through human-AI collaboration with 200+ GenAI prompts and 82+ development hours.",
      image: "/project-images/amongai-01.png",
      images: [
        "/project-images/amongai-01.png",
        "/project-images/amongai-02.png",
        "/project-images/amongai-03.png"
      ],
      tags: ["Generative AI", "Hackathon Winner", "Design Innovation", "Human-AI Collaboration", "Travel Tech"],
      problem: "Traditional trip planners offer flat, fragmented experiences. Users visit 10+ sites on average, spending months organizing trips, lacking personalization and immersive journey visualization.",
      solution: "Developed an AI-powered immersive trip planner using 14+ GenAI tools across the entire design lifecycle - from user research and persona creation to wireframing, visual design, and marketing. Generated 65+ AI images, created prototypes with Galileo/Visily/Uizard, and produced a complete commercial with AI-generated music.",
      impact: "🏆 Won GenAI Design Hackathon | 200+ AI prompts utilized | 7 user insight tests conducted | 12+ hours of collaborative sessions | Created 2 marketing websites and 44-second commercial | Demonstrated 40% reduction in design cycle time through strategic AI integration | Showcased effective human-AI collaboration methodology for design teams"
    },
    {
      id: 3,
      title: "Design Discovery Workshop",
  category: "Design Thinking & User Research",
  description: "Conducted a Hyper Design Workshop after multi-user discovery interviews, mapping user needs, pain points, and daily workflows to inform dashboard and visual design solutions.",
  image: "/project-images/portfolio-hyper-discovery.png",
  images: [
    "/project-images/portfolio-hyper-discovery.png"
  ],
  tags: ["Design Workshop", "User Research", "Design Thinking", "Dashboard Design"],
  problem: "Lack of deep user understanding led to unclear requirements and misaligned dashboard features.",
  solution: "Facilitated interactive workshops to capture day-in-the-life scenarios, analyze user pain points, and co-create dashboard and visual design concepts.",
  impact: "Generated actionable insights, aligned design direction with real user needs, and delivered data-driven dashboard and visual design solutions."
  },
  
];

  // Slim project cards data for quick overview
  const slimProjects = [
    {
      title: "Discovery & Design Thinking Workshops",
      description: "Led human-centered design workshops and discovery sessions for solutioning, combining design thinking methodologies with strategic business requirements for RFP responses.",
      tags: ["Design Thinking", "Discovery Workshops", "Human-Centered Design"]
    },
    {
      title: "Cross-Platform Experience Design Strategy",
      description: "Directed end-to-end experience design strategy across web, mobile, and emerging platforms, ensuring consistent user journeys and brand experiences for enterprise clients.",
      tags: ["Experience Design", "Design Strategy", "Cross-Platform"]
    },
    {
      title: "AI Insurance Platform",
      description: "Enterprise AI platform providing predictive analytics and risk assessment, deployed across 10+ major insurance firms with 75% accuracy improvement.",
      tags: ["AI/ML", "Enterprise", "Data Analytics"]
    },
    {
      title: "AI Assistant for Customer Service Agents",
      description: "Created intelligent AI workflows to assist customer service agents, building trust and delivering AI-powered support for a leading insurance provider.",
      tags: ["AI Assistant", "Customer Service", "Workflow Automation"]
    },
    {
      title: "AI Agent Prototyping: Idea to Product",
      description: "Explored and built multiple prototypes using AI agents for end-to-end product ideation, research, development, testing, and CI/CD delivery.",
      tags: ["AI Agents", "Prototyping", "Product Development"]
    },
    {
      title: "Salesforce Design System Leadership",
      description: "Led design system strategy for enterprise clients, mentored 8 designers/developers, established scalable component libraries and governance frameworks.",
      tags: ["Salesforce", "Design System", "Mentorship"]
    },
    {
      title: "Entertainment Platform UX (Salesforce + Skuid)",
      description: "Product experience design for major entertainment client, integrated Salesforce and Skuid for seamless UX increasing engagement by 55%.",
      tags: ["Entertainment", "Salesforce", "Product UX"]
    },
    {
      title: "AI-Driven Product Development from Idea to Launch",
      description: "Transformed a product idea into a deployed React app by conducting user interviews, leveraging AI for research analysis, rapid prototyping with Vibe Coding, and iterative user testing.",
      tags: ["AI Research", "User Interviews", "Prototyping", "React", "Vibe Coding", "Product Launch"]
    },
    {
      title: "Major Airlines Mobile App Redesign",
      description: "Redesigned core reservation platform and mobile app for leading airline, delivered seamless booking experience with personalized recommendations.",
      tags: ["Mobile Design", "Travel Tech", "UX Research"]
    },
    {
      title: "Banking Integration Management",
      description: "Comprehensive banking platform for account management with real-time analytics, deployed at 15+ financial institutions reducing errors by 60%.",
      tags: ["Banking", "Integration", "Financial Tech"]
    },
    {
      title: "Employee Portal & Risk Management for Bank",
      description: "Designed inter-employee portal for a bank, aligning user management and risk indicators with critical employee data management.",
      tags: ["Banking", "Employee Portal", "Risk Management"]
    },
    {
      title: "Excel to PowerApps Process Redesign",
      description: "Transformed complex multi-excel workflows into a streamlined PowerApps experience, improving efficiency and user adoption.",
      tags: ["PowerApps", "Process Design", "Workflow Automation"]
    },
    {
      title: "Pharma Eudamed Product Tracking",
      description: "Developed product tracking and compliance reporting for major pharmaceutical company, ensuring Eudamed standards for medicines and equipment are met on time",
      tags: ["Pharma", "Eudamed", "Compliance"]
    },
    {
      title: "Critical Data Management Dashboards",
      description: "Designed data management dashboards for a large organization, enabling actionable insights and improved decision-making.",
      tags: ["Data Management", "Dashboards", "Analytics"]
    },
    {
      title: "Strategic RFP Leadership for Fortune 500",
      description: "Contributed design solutioning perspective to RFP responses for Fortune 500 clients, focusing on change management, sales enablement, and transformation programs.",
      tags: ["RFP Leadership", "Strategic Design", "Fortune 500"]
    },
    {
      title: "Design Proposals & Solution Narratives",
      description: "Created comprehensive design proposals with user-centered solution narratives, implementation roadmaps, and design-driven delivery models for Fortune 500 transformation programs.",
      tags: ["Design Proposals", "Solution Design", "User-Centered"]
    }
  ];

  // Filter slim projects based on search
  const filteredSlimProjects = slimProjects.filter(project => {
    const searchTerm = slimProjectsSearch.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });

  // Determine which projects to display (first 6 or all if expanded/searching)
  const displayedProjects = slimProjectsSearch || showAllSlimProjects 
    ? filteredSlimProjects 
    : filteredSlimProjects.slice(0, 6);

  const hasMoreProjects = filteredSlimProjects.length > 6;

  useEffect(() => {
    const timer = setTimeout(() => setShowProjects(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${colorScheme === 'liquidglass' ? 'liquid-glass-theme' : ''} ${colorScheme === 'liquidglass' ? 'text-white' : 'text-gray-900'}`} ref={containerRef}>
      {/* Color Scheme Toggle in Top Right */}
      <ColorSchemeToggle onSchemeChange={setColorScheme} />
      
      {/* Liquid Glass Background with Mouse Glow */}
      {colorScheme === 'liquidglass' && (
        <>
          <div className="liquid-glass-background" />
          <div 
            className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-1xl ease-out z-0"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.2) 70%, transparent 25%)',
              left: mousePos.x - 192,
              top: mousePos.y - 192,
              filter: 'blur(40px)',
            }}
          />
          
        </>
      )}
      
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-4 sm:pt-16">
        <div className={`absolute inset-0 ${colorScheme === 'liquidglass' ? '' : colorScheme === 'professional' ? 'bg-gradient-to-r from-gray-200/20 to-gray-300/20' : 'bg-gradient-to-r from-blue-600/5 to-purple-600/5'}`} />
        
        {/* Floating Questions - Always visible, transparent on mobile */}
        <div className="absolute inset-0">
          {floatingQuestions.map((q) => (
            <FloatingQuestion
              key={q.id}
              question={q.question}
              answer={q.answer}
              x={q.x}
              y={q.y}
              isActive={activeQuestion === q.id}
              onClick={() => setActiveQuestion(activeQuestion === q.id ? null : q.id)}
              colorScheme={colorScheme}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name Logo - Thinner font, closer to top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-2"
            >
              <h1 className={`text-4xl md:text-3xl font-thin bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                Siva Tayi
              </h1>
            </motion.div>

            <h2 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold mb-4 sm:mb-6 mt-1 sm:mt-8 leading-[0.9] sm:leading-tight ${
              colorScheme === 'liquidglass' 
                ? 'glass-text text-shadow-lg' 
                : `bg-gradient-to-r ${colors.text} bg-clip-text text-transparent`
            }`}>
              Ideate.<br />Strategize.<br />Launch.
            </h2>

            
            <p className={`text-lg md:text-xl mb-4 leading-relaxed ${colorScheme === 'liquidglass' ? 'text-gray-300' : colorScheme === 'professional' ? 'text-gray-700' : 'text-gray-600'} max-w-3xl mb-20 mt- mx-auto`}>
            The future of product and design is not human or AI—it’s human with AI. 
            <br />I am geared to build organizations where designers, technologists, and AI agents co-create, learn from each other, and deliver outcomes neither could achieve alone.
            </p>

            
            <p className={`text-lg md:text-xl font-semibold mb-20 ${
              colorScheme === 'liquidglass' 
                ? 'text-white text-shadow-lg' 
                : `bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`
            }`}>
              Human-Centered Design • AI-First Product Strategy • Idea to Product Delivery 
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              {colorScheme === 'liquidglass' ? (
                <GlassButton size="lg" className="w-full sm:w-auto" onClick={scrollToProjects}>
                  What I have been up to
                </GlassButton>
              ) : (
              <Button size="lg" className={`w-full sm:w-auto px-8 py-4 text-lg bg-gradient-to-r ${colors.accent} hover:opacity-90 ${
                colorScheme === 'professional' ? 'text-white shadow-sm' : 'text-white'
              }`} onClick={scrollToProjects}>
                View My Work
              </Button>
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className={`h-6 w-6 animate-bounce ${colorScheme === 'liquidglass' ? 'text-gray-400' : colorScheme === 'professional' ? 'text-gray-500' : 'text-gray-400'}`} />
        </motion.div>
      </section>

      {/* Hackathon Winner Badge */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8"
          >
            {colorScheme === 'liquidglass' ? (
              <GlassCard className="inline-flex items-center gap-3 px-6 py-3">
                <Trophy className="h-6 w-6 glass-text" />
                <span className="font-bold text-base glass-text">Generative AI Design Hackathon Winner</span>
                <Award className="h-6 w-6 glass-text" />
              </GlassCard>
            ) : (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
              <Trophy className="h-6 w-6" />
              <span className="font-bold text-base">Generative AI Design Hackathon Winner</span>
              <Award className="h-6 w-6" />
            </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${colorScheme === 'liquidglass' ? 'text-white' : 'text-gray-900'}`}>
              Recent Projects
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${colorScheme === 'liquidglass' ? 'text-gray-300' : colorScheme === 'professional' ? 'text-gray-700' : 'text-gray-600'}`}>
              From concept to market: How I bring ideas to life through strategic design, 
              vibe coding expertise, and systematic delivery approaches.
            </p>
          </motion.div>

          <AnimatePresence>
            {showProjects && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ProjectCard 
                      project={project} 
                      onClick={() => setSelectedProject(project)}
                      colorScheme={colorScheme}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Additional Projects - Slim Cards */}
      <section className={`py-16 px-6 ${colorScheme === 'liquidglass' ? 'bg-gray-900/10' : colorScheme === 'professional' ? 'bg-gray-50/30' : 'bg-gray-50/50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${colorScheme === 'liquidglass' ? 'text-white' : 'text-gray-900'}`}>
              More Projects
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-8 ${colorScheme === 'liquidglass' ? 'text-gray-300' : colorScheme === 'professional' ? 'text-gray-700' : 'text-gray-600'}`}>
              A quick overview of additional projects across various domains
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  colorScheme === 'liquidglass' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or tags..."
                  value={slimProjectsSearch}
                  onChange={(e) => setSlimProjectsSearch(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2
                    ${colorScheme === 'liquidglass' 
                      ? 'bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder-gray-400 focus:ring-blue-400/50 focus:border-white/40' 
                      : colorScheme === 'professional'
                        ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500/20 focus:border-blue-500'
                        : 'bg-white/80 backdrop-blur-sm border-gray-200/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500/20 focus:border-blue-500'
                    }
                  `}
                />
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          {slimProjectsSearch && (
            <div className="text-center mb-6">
              <p className={`text-sm ${colorScheme === 'liquidglass' ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredSlimProjects.length} project{filteredSlimProjects.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}

          {/* Two-column grid on desktop, single column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <SlimProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  colorScheme={colorScheme}
                />
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          {!slimProjectsSearch && hasMoreProjects && !showAllSlimProjects && (
            <div className="text-center mt-8">
              <motion.button
                onClick={() => setShowAllSlimProjects(true)}
                className={`
                  px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-105
                  ${colorScheme === 'liquidglass' 
                    ? 'bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 hover:border-white/30' 
                    : colorScheme === 'professional'
                      ? 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                      : 'bg-white/80 backdrop-blur-sm border-gray-200/50 text-gray-900 hover:bg-white hover:border-gray-300'
                  }
                `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Projects ({filteredSlimProjects.length - 6} more)
              </motion.button>
            </div>
          )}

          {/* Show Less Button */}
          {!slimProjectsSearch && showAllSlimProjects && hasMoreProjects && (
            <div className="text-center mt-8">
              <motion.button
                onClick={() => setShowAllSlimProjects(false)}
                className={`
                  px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-105
                  ${colorScheme === 'liquidglass' 
                    ? 'bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 hover:border-white/30' 
                    : colorScheme === 'professional'
                      ? 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                      : 'bg-white/80 backdrop-blur-sm border-gray-200/50 text-gray-900 hover:bg-white hover:border-gray-300'
                  }
                `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Show Less
              </motion.button>
            </div>
          )}

          {/* No results message */}
          {slimProjectsSearch && filteredSlimProjects.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-lg ${colorScheme === 'liquidglass' ? 'text-gray-400' : 'text-gray-600'}`}>
                No projects found matching "{slimProjectsSearch}"
              </p>
              <p className={`text-sm mt-2 ${colorScheme === 'liquidglass' ? 'text-gray-500' : 'text-gray-500'}`}>
                Try searching for different keywords or tags
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Section */}
      <section className={`py-20 px-6 ${colorScheme === 'liquidglass' ? 'bg-gray-800/20' : colorScheme === 'professional' ? 'bg-gray-50/50' : 'bg-gradient-to-r from-gray-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${colorScheme === 'liquidglass' ? 'text-white' : 'text-gray-900'}`}>
              Explorative Learning Journey
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${colorScheme === 'liquidglass' ? 'text-gray-300' : colorScheme === 'professional' ? 'text-gray-700' : 'text-gray-600'}`}>
              Average of 350 hours invested in learning per year through courses, experiment-based learning, 
              and systematic implementation strategy to reinforce knowledge.
            </p>
          </motion.div>

          <ExplorativeLearningJourney colorScheme={colorScheme} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${colorScheme === 'liquidglass' ? 'text-white' : 'text-gray-900'}`}>
              Ready to transform your product vision into reality?
            </h2>
            <p className={`text-lg md:text-xl mb-8 ${colorScheme === 'liquidglass' ? 'text-gray-300' : colorScheme === 'professional' ? 'text-gray-700' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Let's discuss how my strategic design leadership and AI-first approach can deliver market-winning results.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/siva-tayi/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  colorScheme === 'liquidglass' 
                    ? 'bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl hover:bg-white/20 hover:border-white/40 hover:shadow-2xl text-white' 
                    : colorScheme === 'professional'
                      ? 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:bg-gray-50 text-gray-700'
                      : 'bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white text-gray-700'
                } p-4 rounded-2xl transition-all duration-300 group hover:scale-105`}
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter X */}
              <a
                href="https://x.com/siva_tayi" 
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  colorScheme === 'liquidglass' 
                    ? 'bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl hover:bg-white/20 hover:border-white/40 hover:shadow-2xl text-white' 
                    : colorScheme === 'professional'
                      ? 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:bg-gray-50 text-gray-700'
                      : 'bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white text-gray-700'
                } p-4 rounded-2xl transition-all duration-300 group hover:scale-105`}
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Star Feedback Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <StarFeedback 
            colorScheme={colorScheme} 
            onRatingChange={(rating) => console.log('Rating:', rating)}
          />
        </div>
      </section>

      <Footer colorScheme={colorScheme} />

      {/* Ask Me Anything - Prominent Glass Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-[10001]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => {
            const event = new CustomEvent('openAskMeAnything');
            window.dispatchEvent(event);
          }}
          className={`${
            colorScheme === 'liquidglass' 
              ? 'bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl hover:bg-white/20 hover:border-white/40 hover:shadow-2xl' 
              : colorScheme === 'professional'
                ? 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:bg-gray-50'
                : 'bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white'
          } px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 group`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`${
              colorScheme === 'liquidglass' 
                ? 'text-white' 
                : colorScheme === 'professional'
                  ? 'text-blue-600'
                  : 'text-blue-600'
            }`}
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <MessageSquare className="h-5 w-5" />
          </motion.div>
          
          <span className={`font-medium ${
            colorScheme === 'liquidglass' 
              ? 'text-white' 
              : colorScheme === 'professional'
                ? 'text-gray-800'
                : 'text-gray-800'
          } group-hover:translate-x-0.5 transition-transform duration-200`}>
            Ask me anything
          </span>
          
          {/* Animated glow effect for liquid glass */}
          {colorScheme === 'liquidglass' && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      </motion.div>
      
      <AskMeAnything colorScheme={colorScheme} />

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          colorScheme={colorScheme}
        />
      )}
    </div>
  );
};

export default Index;
