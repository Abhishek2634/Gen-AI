import React from 'react';
import { Sparkles, CheckCircle, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-800 text-white mt-auto relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center animate-fade-in-up">
          {/* Logo and title section */}
          <div className="flex items-center justify-center mb-6 group">
            <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 p-3 rounded-2xl mr-4 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-500">
              AI Career Coach
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Empowering your future with AI-driven career insights and personalized recommendations. 
            <span className="inline-flex items-center ml-2 text-cyan-400 font-semibold">
              Built with <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" /> for the Google Cloud Generative AI competition
            </span>
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {[
              'AI-Powered Insights',
              'Personalized Recommendations', 
              'Industry Trends Analysis',
              'Skills Gap Assessment'
            ].map((feature, index) => (
              <div 
                key={feature}
                className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 animate-fade-in-up cursor-default"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-medium text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-gray-800 to-slate-800 px-6">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
            © {currentYear} AI Career Coach. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Transforming careers through intelligent technology
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-4 left-4 opacity-20">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute bottom-8 right-6 opacity-20">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute top-6 right-12 opacity-20">
          <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .border-gradient-to-r {
          background: linear-gradient(to right, transparent, #4b5563, transparent);
          height: 1px;
          border: none;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
