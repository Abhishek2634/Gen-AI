import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Zap } from 'lucide-react';

const Header = ({ onReset }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b transition-all duration-500 ${
      isScrolled ? 'shadow-xl border-gray-200/50' : 'shadow-md border-gray-100'
    }`}>
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 animate-gradient-x"></div>
      
      <div className="container mx-auto px-6 py-5 relative">
        <div className="flex justify-between items-center">
          {/* Logo section with enhanced animations */}
          <div 
            className="flex items-center cursor-pointer group transition-all duration-500 hover:scale-105"
            onClick={onReset}
          >
            <div className="relative">
              {/* Floating sparkle effects */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              
              <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 p-3 rounded-2xl mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                <Sparkles className="w-7 h-7 text-white relative z-10 group-hover:animate-spin transition-all duration-500" />
              </div>
            </div>
            
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-500 animate-text-gradient">
                AI Career Coach
              </h1>
              <div className="flex items-center -mt-1">
                <Zap className="w-3 h-3 text-yellow-500 mr-1 animate-pulse" />
                <p className="text-sm text-gray-500 font-medium">Powered by Artificial Intelligence</p>
              </div>
            </div>
          </div>

          {/* Reset button with enhanced styling */}
          <div className="animate-fade-in-right">
            <button 
              onClick={onReset}
              className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-cyan-50 text-gray-700 hover:text-blue-700 px-6 py-3 rounded-2xl transition-all duration-500 font-semibold group border border-gray-200 hover:border-blue-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
              
              <div className="flex items-center relative z-10">
                <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-700 group-hover:text-blue-600" />
                <span className="group-hover:font-bold transition-all duration-300">Start Over</span>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-cyan-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:via-cyan-400/10 group-hover:to-purple-400/10 transition-all duration-500"></div>
            </button>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute bottom-2 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes fade-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fade-in-right {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-5px) rotate(180deg); }
          75% { transform: translateY(-15px) rotate(270deg); }
        }
        
        @keyframes text-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-text-gradient {
          background-size: 200% 200%;
          animation: text-gradient 4s ease infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
