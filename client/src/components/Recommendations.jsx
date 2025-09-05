import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, ArrowRight, Target, DollarSign, Clock, Search, Sparkles, Award, Crown } from 'lucide-react';

const CareerCard = ({ career, index, onSelect, isAnimated }) => {
  const getMatchColor = (score) => {
    if (score >= 90) return 'from-emerald-400 via-green-500 to-teal-600';
    if (score >= 80) return 'from-blue-400 via-cyan-500 to-indigo-600';
    return 'from-amber-400 via-orange-500 to-red-500';
  };

  const getMatchGlow = (score) => {
    if (score >= 90) return 'shadow-green-500/30';
    if (score >= 80) return 'shadow-blue-500/30';
    return 'shadow-orange-500/30';
  };

  return (
    <div
      className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer border border-gray-100/50 overflow-hidden group relative ${isAnimated ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={() => onSelect(career)}
    >
      {/* Floating sparkles */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
      </div>
      
      {/* Enhanced gradient header */}
      <div className={`bg-gradient-to-br ${getMatchColor(career.matchScore)} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                {career.title}
              </h3>
              <p className="text-sm opacity-90 font-medium px-3 py-1 bg-white/20 rounded-full inline-block">
                {career.category}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="font-semibold">AI Matched</span>
            </div>
            <div className="bg-white/25 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/30">
              <div className="text-lg font-bold">{career.matchScore}%</div>
              <div className="text-xs opacity-90">Match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced content area */}
      <div className="p-6 flex flex-col h-full relative">
        <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-lg font-medium">
          {career.description}
        </p>
        
        <div className="mt-auto space-y-6">
          {/* Enhanced metrics grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 group-hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">{career.salaryRange}</div>
              <div className="text-xs text-gray-500 font-medium">Salary</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 group-hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">{career.growth}</div>
              <div className="text-xs text-gray-500 font-medium">Growth</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 group-hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">{career.timeline}</div>
              <div className="text-xs text-gray-500 font-medium">Timeline</div>
            </div>
          </div>
          
          {/* Enhanced action button */}
          <button className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 text-white py-4 px-6 rounded-2xl hover:from-blue-600 hover:via-cyan-600 hover:to-indigo-700 transition-all duration-300 font-bold text-lg flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-102 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
            <span className="relative z-10">Explore Career Path</span>
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Recommendations = ({ data, onSelect = () => {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const recommendations = data || [];
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const topMatch = recommendations.length > 0 
    ? [...recommendations].sort((a, b) => b.matchScore - a.matchScore)[0] 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-200 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Enhanced hero section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        <div className="absolute top-10 right-10 opacity-20">
          <Sparkles className="w-16 h-16 animate-spin-slow" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-15">
          <Target className="w-20 h-20 animate-pulse" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="mb-6 animate-fade-in-up">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-6">
              <Crown className="w-6 h-6 mr-3 text-yellow-300" />
              <span className="font-bold text-lg">AI-Powered Career Intelligence</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 animate-fade-in-up bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text" style={{ animationDelay: '100ms' }}>
            Your Personalized Career Journey
          </h1>
          <p className="text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '200ms' }}>
            Discover career paths perfectly matched to your unique skills, interests, and aspirations through advanced AI analysis.
          </p>
          
          {/* Enhanced stats section */}
          <div className="flex items-center justify-center mt-10 space-x-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-cyan-300">{recommendations.length}</div>
              <div className="text-sm opacity-80 font-medium">Career Matches</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-green-300">{topMatch ? `${topMatch.matchScore}%` : '--'}</div>
              <div className="text-sm opacity-80 font-medium">Best Match</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-purple-300">AI</div>
              <div className="text-sm opacity-80 font-medium">Powered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {recommendations.length > 0 ? (
          <>
            {/* Enhanced top match section */}
            {topMatch && (
              <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-3 border-amber-200 rounded-3xl p-8 relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-bl-3xl rounded-tr-3xl font-bold text-lg flex items-center shadow-lg">
                    <Crown className="w-5 h-5 mr-2 text-yellow-200" />
                    TOP MATCH
                  </div>
                  
                  <div className="relative z-10 pt-4">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                      {topMatch.title}
                    </h3>
                    <p className="text-gray-700 mb-8 text-xl leading-relaxed max-w-4xl">
                      {topMatch.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 flex-wrap">
                      <div className="flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-2xl border border-amber-200">
                        <Star className="w-6 h-6 text-amber-500 mr-3" />
                        <span className="font-bold text-xl text-amber-700">{topMatch.matchScore}% Perfect Match</span>
                      </div>
                      
                      <button 
                        onClick={() => onSelect(topMatch)} 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center group"
                      >
                        <span>Explore This Career</span>
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Enhanced cards grid */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                All Career Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations.map((career, index) => (
                  <CareerCard 
                    key={career.id || index} 
                    career={career} 
                    index={index} 
                    onSelect={onSelect} 
                    isAnimated={isLoaded} 
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No Career Matches Found</h3>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Our AI couldn't generate personalized recommendations for this profile. Please try updating your information or contact our support team.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Recommendations;
