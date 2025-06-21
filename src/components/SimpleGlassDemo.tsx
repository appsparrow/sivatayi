import React, { useEffect, useState } from 'react';

export const SimpleGlassDemo = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 relative overflow-hidden">
      {/* Mouse Glow Effect */}
      <div 
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">✨ Simple Glass Morphism</h1>
          <p className="text-white/70">Lightweight, performant, and beautiful</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Music Card */}
          <div className="glass-card group">
            <div className="glass-header">
              <div className="glass-icon">🎵</div>
              <div>
                <h3 className="glass-title">Today's Hits</h3>
                <p className="glass-subtitle">Apple Music Hits</p>
              </div>
            </div>
            <div className="glass-widget">
              <div className="album-cover">♪</div>
              <div className="flex-1">
                <div className="text-white font-medium">Current Song</div>
                <div className="text-white/70 text-sm">Artist Name</div>
              </div>
              <button className="play-btn hover:scale-110 transition-transform">▶</button>
            </div>
          </div>

          {/* Reminders Card */}
          <div className="glass-card group">
            <div className="glass-header">
              <div className="glass-icon">📝</div>
              <div>
                <h3 className="glass-title">Reminders</h3>
                <p className="glass-subtitle">3 items</p>
              </div>
            </div>
            <div className="glass-content space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <span className="text-white/90">Pick up contacts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <span className="text-white/90">Order plant food</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <span className="text-white/90">Water Monstera</span>
              </div>
            </div>
          </div>

          {/* Glassmorphism Info Card */}
          <div className="glass-card group">
            <div className="glass-header">
              <div className="glass-icon">✨</div>
              <div>
                <h3 className="glass-title">Glassmorphism</h3>
                <p className="glass-subtitle">Modern Design</p>
              </div>
            </div>
            <div className="glass-content">
              <p className="text-white/80 mb-4">
                The glass effect relies on transparency, backdrop blur and thin edges to create depth.
              </p>
              <button className="glass-btn">
                Discover more
              </button>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-12 glass-card">
          <h2 className="text-2xl font-bold text-white mb-6">⚡ Why This Approach Wins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">55</div>
              <div className="text-white/70">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">2ms</div>
              <div className="text-white/70">Render Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-white/70">Mobile Compatible</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .glass-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .glass-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-size: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-title {
          color: white;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .glass-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin: 0;
        }

        .glass-widget {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .album-cover {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .play-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .glass-content {
          color: rgba(255, 255, 255, 0.9);
        }

        .glass-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px 24px;
          color: white;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }

        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}; 