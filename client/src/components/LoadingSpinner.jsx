import React from 'react';
import { Loader, Brain, Sparkles, Zap } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', variant = 'primary', text = '' }) => {
  const sizes = {
    sm: { spinner: 'w-4 h-4', container: 'w-6 h-6', pulse: 'w-8 h-8' },
    md: { spinner: 'w-6 h-6', container: 'w-8 h-8', pulse: 'w-12 h-12' },
    lg: { spinner: 'w-8 h-8', container: 'w-10 h-10', pulse: 'w-16 h-16' },
    xl: { spinner: 'w-12 h-12', container: 'w-14 h-14', pulse: 'w-20 h-20' }
  };

  const variants = {
    primary: {
      spinner: 'text-blue-500',
      pulse: 'bg-blue-500/20',
      glow: 'shadow-blue-500/50',
      gradient: 'from-blue-400 to-cyan-500',
      text: 'text-blue-600'
    },
    secondary: {
      spinner: 'text-purple-500',
      pulse: 'bg-purple-500/20',
      glow: 'shadow-purple-500/50',
      gradient: 'from-purple-400 to-pink-500',
      text: 'text-purple-600'
    },
    success: {
      spinner: 'text-green-500',
      pulse: 'bg-green-500/20',
      glow: 'shadow-green-500/50',
      gradient: 'from-green-400 to-emerald-500',
      text: 'text-green-600'
    },
    white: {
      spinner: 'text-white',
      pulse: 'bg-white/20',
      glow: 'shadow-white/50',
      gradient: 'from-white to-gray-200',
      text: 'text-white'
    }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in">
      {/* Main spinner container with layered effects */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing ring */}
        <div className={`absolute rounded-full ${currentSize.pulse} ${currentVariant.pulse} animate-ping opacity-40`}></div>
        
        {/* Middle rotating ring */}
        <div className={`absolute rounded-full ${currentSize.container} border-2 border-transparent bg-gradient-to-r ${currentVariant.gradient} animate-spin-slow`}
             style={{ 
               background: `conic-gradient(from 0deg, transparent, ${variant === 'primary' ? '#3b82f6' : variant === 'secondary' ? '#8b5cf6' : variant === 'success' ? '#10b981' : '#ffffff'}, transparent)`,
               borderRadius: '50%',
               mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
               WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))'
             }}>
        </div>
        
        {/* Inner spinner with glow effect */}
        <div className={`relative ${currentSize.container} rounded-full bg-white/90 backdrop-blur-sm shadow-2xl ${currentVariant.glow} flex items-center justify-center animate-bounce-subtle`}>
          <div className={`animate-spin-reverse ${currentSize.spinner} ${currentVariant.spinner} drop-shadow-lg`}>
            <Brain className="w-full h-full" />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Zap className="w-2 h-2 text-cyan-400 animate-ping" />
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 ${currentVariant.pulse.replace('/20', '')} rounded-full`}></div>
        </div>
        <div className="absolute inset-0 animate-spin-reverse" style={{ animationDuration: '4s' }}>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1.5 h-1.5 ${currentVariant.pulse.replace('/20', '/60')} rounded-full`}></div>
        </div>
      </div>

      {/* Enhanced text with animations */}
      {text && (
        <div className="flex items-center space-x-2 animate-pulse-text">
          <span className={`text-sm font-semibold ${currentVariant.text} animate-fade-in-up`}>
            {text}
          </span>
          <div className="flex space-x-1">
            <div className={`w-1 h-1 rounded-full ${currentVariant.pulse.replace('/20', '')} animate-bounce`}></div>
            <div className={`w-1 h-1 rounded-full ${currentVariant.pulse.replace('/20', '')} animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-1 h-1 rounded-full ${currentVariant.pulse.replace('/20', '')} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.05); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
