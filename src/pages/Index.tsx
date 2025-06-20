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

const Index = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [colorScheme, setColorScheme] = useState('default');
  
  const containerRef = useRef<HTMLDivElement>(null);

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
      answer: "My approach is rooted in human-centered design, blending empathy with the power of AI and 'vibe coding' to turn ideas into products that truly resonate with users and are ready for the market.",
      x: 15,
      y: 22
    },
    {
      id: '2',
      question: "What technologies do you work with?",
      answer: "I specialize in Product Design Strategy, and I have a good understanding of React, TypeScript, and Tailwind CSS, and have a strong grasp of Salesforce product capabilities. My design process is powered by tools like FigJam, Miro, and Figma, along with the latest AI-driven design platforms to craft seamless digital experiences.",
      x: 65,
      y: 32
    },
    {
      id: '3',
      question: "How do you approach new projects?",
      answer: "Every project starts with understanding people. Even as AI evolves, I believe we're designing for humans first. My process is simple: Ideate → Strategize → Launch. I begin with user research, prototype with 'vibe coding', and deliver working products through a systematic, iterative approach.",
      x: 75,
      y: 18
    },
    {
      id: '4',
      question: "What sets you apart?",
      answer: "I bring together human-centered design, technical depth, and an AI-first mindset. My unique blend of design thinking, product strategy, and hands-on coding allows me to bridge the gap between concept and market-ready product.",
      x: 35,
      y: 28
    },
    {
      id: '5',
      question: "How do you prepare for the future?",
      answer: "I build with AI and for AI—constantly integrating generative tools, exploring neural networks, and designing for intelligent, adaptive experiences that define the next generation of digital products.",
      x: 50,
      y: 20
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Major Airlines Company Mobile & Reservation Platform",
      category: "Travel & Aviation",
      description: "Redesigned the core reservation platform and mobile app for a leading airline, delivering a seamless booking and travel experience.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop"
      ],
      tags: ["Mobile Design", "AI Integration", "Travel Tech"],
      problem: "Outdated reservation system and mobile app led to a fragmented booking experience, high abandonment rates, and customer frustration.",
      solution: "Redesigned a mobile-first booking flow, integrated AI-powered recommendations, and streamlined check-in and seat selection for a unified user journey.",
      impact: "Increased mobile bookings by 45%, reduced customer service calls by 30%, and improved user satisfaction scores by 60%."
    },
    {
      id: 2,
      title: "AI Insights Insurance Platform",
      category: "Insurance Technology",
      description: "Enterprise AI platform providing predictive analytics and risk assessment for insurance leaders.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      tags: ["AI/ML", "Enterprise", "Data Analytics"],
      problem: "Insurance executives lacked real-time insights into risk patterns and market trends, leading to delayed decision-making.",
      solution: "Built AI-powered dashboard with predictive analytics, automated risk scoring, and real-time market intelligence.",
      impact: "Reduced claim processing time by 50% and improved risk prediction accuracy by 75%. Deployed across 10+ major insurance firms."
    },
    {
      id: 3,
      title: "Banking Integration Management",
      category: "Financial Technology",
      description: "Comprehensive banking platform for account and integration management with real-time analytics.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      tags: ["Banking", "Integration", "Financial Tech"],
      problem: "Banks struggled with fragmented account management and integration, causing inefficiencies and errors.",
      solution: "Designed a unified platform with centralized dashboards, automated workflows, and real-time monitoring.",
      impact: "Reduced processing errors by 60% and improved integration efficiency by 80%. Deployed at 15+ financial institutions."
    },
    {
      id: 4,
      title: "Entertainment Platform UX (Salesforce + Skuid)",
      category: "Entertainment & Media",
      description: "Product experience design for a major entertainment client, integrating Salesforce and Skuid for seamless UX.",
      image: "https://images.unsplash.com/photo-1489599735472-352595e75896?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1489599735472-352595e75896?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594736797933-d0acf1653da6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop"
      ],
      tags: ["Entertainment", "Salesforce", "Skuid", "Product UX"],
      problem: "Fragmented user experience and poor data integration across multiple entertainment platforms.",
      solution: "Unified product experience with Salesforce-powered personalization and Skuid-driven rapid prototyping.",
      impact: "Increased user engagement by 55% and improved customer lifetime value by 35%."
    },
    {
      id: 5,
      title: "Salesforce Design System & Team Mentorship",
      category: "Enterprise UX",
      description: "Led Salesforce design system strategy, mentored 8 designers/developers, and delivered a winning product.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
      ],
      tags: ["Salesforce", "Design System", "Mentorship", "UI Engineering"],
      problem: "Misaligned vision and lack of consensus between client and dev teams on design system direction.",
      solution: "Introduced a minimum design cycle, mentored 8 team members in Salesforce and UI tech, and built a high-performing team.",
      impact: "Achieved stakeholder alignment, accelerated delivery, and set a new standard for internal design systems."
    },
    {
      id: 6,
      title: "TravelMate AI - Hackathon Winner",
      category: "Travel App - Winner",
      description: "Generative AI-powered travel companion that won the Design Hackathon with personalized itineraries.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
      ],
      tags: ["Generative AI", "Winner", "Travel Tech"],
      problem: "Travelers spend hours researching and planning trips, often missing hidden gems and dealing with constant itinerary changes.",
      solution: "Built AI-powered app that generates personalized travel plans, adapts to real-time changes, and discovers local experiences.",
      impact: "Won Generative AI Design Hackathon. Prototype tested with 500+ users showing 80% satisfaction rate and 40% reduction in planning time."
    },
    {
      id: 7,
      title: "Metaverse Spaces & Personal Portfolio",
      category: "Metaverse & Personal Branding",
      description: "Exploring immersive metaverse spaces and building a personal portfolio with cutting-edge web and AI tech.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1489599735472-352595e75896?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      tags: ["Metaverse", "Portfolio", "Web3", "AI"],
      problem: "Traditional portfolios lack interactivity and fail to showcase expertise in emerging tech.",
      solution: "Designed immersive metaverse spaces and a dynamic personal portfolio leveraging AI and web3 technologies.",
      impact: "Increased portfolio engagement by 70% and attracted new collaboration opportunities."
    },
    {
      id: 8,
      title: "Process Alignment Workshop & Unified Product Experience",
      category: "Enterprise Collaboration",
      description: "Led process alignment workshops across 11+ internal teams, consolidating insights and unifying product experiences for greater efficiency.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
      ],
      tags: ["Process Design", "Workshops", "Enterprise UX"],
      problem: "Disparate teams with unique processes led to misalignment, inefficiencies, and inconsistent product experiences.",
      solution: "Facilitated cross-team workshops, gathered process insights, and established a unified, user-centered design process.",
      impact: "Streamlined collaboration, improved process efficiency, and delivered a cohesive product experience across the organization."
    },
    {
      id: 9,
      title: "SAP Dashboard Experience & Product Envisioning",
      category: "Enterprise Software",
      description: "Designed a unified dashboard experience for SAP-based products, driving actionable insights and user-centric workflows.",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
      ],
      tags: ["Dashboard", "SAP", "Product Strategy"],
      problem: "Complex SAP interfaces and fragmented data made it difficult for users to access insights and manage workflows efficiently.",
      solution: "Created a streamlined dashboard with intuitive navigation, real-time analytics, and tailored user journeys.",
      impact: "Enhanced decision-making, increased user adoption, and improved operational efficiency for enterprise clients."
    }
  ];
  useEffect(() => {
    const timer = setTimeout(() => setShowProjects(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${colorScheme === 'liquidglass' ? 'liquid-glass-theme' : ''} ${colorScheme === 'liquidglass' ? 'text-white' : 'text-gray-900'}`} ref={containerRef}>
      {/* Liquid Glass Background */}
      {colorScheme === 'liquidglass' && <div className="liquid-glass-background" />}
      
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-start justify-center overflow-hidden px-4 pt-8 sm:pt-16">
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
              <h1 className={`text-2xl md:text-3xl font-light bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                Siva Tayi
              </h1>
            </motion.div>

            <h2 className={`text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-6 mt-2 sm:mt-8 ${
              colorScheme === 'liquidglass' 
                ? 'glass-text leading-tight text-shadow-lg' 
                : `bg-gradient-to-r ${colors.text} bg-clip-text text-transparent leading-tight`
            }`}>
              Ideate.<br />Strategize.<br />Launch.
            </h2>

            <p className={`text-lg md:text-xl mb-4 leading-relaxed ${colorScheme === 'liquidglass' ? 'text-gray-300' : colorScheme === 'professional' ? 'text-gray-700' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Transforming vision into market-leading products through human-centered design, AI-driven innovation, and strategic leadership.
            </p>
            <p className={`text-lg md:text-xl font-semibold mb-8 ${
              colorScheme === 'liquidglass' 
                ? 'text-white text-shadow-lg' 
                : `bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`
            }`}>
              Strategic Design Director • AI-First Product Strategist • Idea to Product Delivery Expert
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              {colorScheme === 'liquidglass' ? (
                <GlassButton size="lg" className="w-full sm:w-auto" onClick={scrollToProjects}>
                  View My Work
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
              Featured Projects
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
            {colorScheme === 'liquidglass' ? (
              <GlassButton size="lg" className="px-12 py-4">
                Get In Touch
              </GlassButton>
            ) : (
            <Button size="lg" className={`px-12 py-4 text-lg bg-gradient-to-r ${colors.accent} hover:opacity-90 text-white ${
              colorScheme === 'professional' ? 'shadow-sm' : ''
            }`}>
              Get In Touch
            </Button>
            )}
          </motion.div>
        </div>
      </section>

      <Footer colorScheme={colorScheme} onSchemeChange={setColorScheme} />

      {/* Ask Me Anything - AI-powered chat interface */}
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
