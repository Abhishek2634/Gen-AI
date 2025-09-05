import React, { useState } from 'react';
import { ArrowLeft, Star, TrendingUp, BookOpen, Users, Briefcase, Target, ExternalLink, Award, Clock, DollarSign } from 'lucide-react';

const SkillBadge = ({ children, type }) => {
  const colors = {
    core: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-sm',
    specialized: 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200 shadow-sm',
    emerging: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200 shadow-sm'
  };
  
  return (
    <span className={`inline-flex items-center text-sm font-medium mr-2 mb-2 px-4 py-2 rounded-full border ${colors[type] || colors.core} transition-all duration-300 transform hover:scale-105 hover:shadow-md animate-fade-in-up cursor-default`}>
      {children}
    </span>
  );
};

const MetricCard = ({ icon: Icon, label, value, description, index }) => (
  <div 
    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up group"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="flex items-center mb-3">
      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
    <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
      {value || 'N/A'}
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ResourceCard = ({ resource }) => (
  <a 
    href={resource.link || '#'} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:border-blue-300 group transform hover:-translate-y-1 animate-fade-in-up"
  >
    <div className="flex items-start justify-between mb-3">
      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
        {resource.title}
      </h4>
      <div className="p-1 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300">
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
      </div>
    </div>
    <p className="text-sm text-blue-600 font-semibold mb-3 px-3 py-1 bg-blue-50 rounded-full inline-block">
      {resource.platform}
    </p>
    {resource.description && (
      <p className="text-sm text-gray-600 leading-relaxed">{resource.description}</p>
    )}
  </a>
);

const CareerDetail = ({ career, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'learning', label: 'Learning Path', icon: BookOpen },
    { id: 'preparation', label: 'Job Prep', icon: Briefcase }
  ];

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 animate-fade-in">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button 
            onClick={onBack} 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 mb-6 group font-semibold hover:bg-blue-50 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
            Back to Recommendations
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="animate-slide-in-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 leading-tight">
                {career.title}
              </h1>
              <p className="text-gray-600 text-xl max-w-2xl leading-relaxed">{career.description}</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-6 md:mt-0 animate-slide-in-right">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {career.matchScore}% Match
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard index={0} icon={DollarSign} label="Salary Range" value={career.salaryRange} description="Entry to mid-level" />
          <MetricCard index={1} icon={TrendingUp} label="Job Growth" value={career.growth} description="Year over year" />
          <MetricCard index={2} icon={Users} label="Experience" value={career.experienceLevel} description="Typical requirement" />
          <MetricCard index={3} icon={Target} label="Match Score" value={`${career.matchScore}%`} description="Based on your profile" />
        </div>

        {/* Enhanced Match Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-8 rounded-3xl mb-10 shadow-xl animate-fade-in-up hover:shadow-2xl transition-all duration-500" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl mr-4 shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Why This Is a Strong Match For You
            </h3>
          </div>
          <p className="text-blue-800 leading-relaxed text-lg">{career.fitReason}</p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 p-2 rounded-2xl mb-10 overflow-x-auto shadow-inner">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button 
              key={id} 
              onClick={() => setActiveTab(id)} 
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                activeTab === id 
                  ? 'bg-white text-blue-600 shadow-lg border border-blue-200' 
                  : 'text-gray-600 hover:bg-white/50 hover:text-blue-500'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Enhanced Tab Content */}
        <div key={activeTab} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 animate-fade-in border border-gray-200/50">
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  Potential Job Roles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {career.jobRoles?.map((role, i) => (
                    <div 
                      key={i} 
                      className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-default"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="font-semibold text-gray-800">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl mr-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  Industry Trends in India
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-lg">
                  <p className="text-green-800 leading-relaxed text-lg">{career.industryTrendsIndia}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-10">
              <div>
                <h4 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  Core Skills
                </h4>
                <div className="flex flex-wrap">
                  {career.requiredSkills?.core.map((skill, i) => (
                    <div key={skill} style={{ animationDelay: `${i * 100}ms` }}>
                      <SkillBadge type="core">{skill}</SkillBadge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl mr-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  Specialized Skills
                </h4>
                <div className="flex flex-wrap">
                  {career.requiredSkills?.specialized.map((skill, i) => (
                    <div key={skill} style={{ animationDelay: `${i * 100}ms` }}>
                      <SkillBadge type="specialized">{skill}</SkillBadge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-xl mr-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  Emerging Skills
                </h4>
                <div className="flex flex-wrap">
                  {career.requiredSkills?.emerging.map((skill, i) => (
                    <div key={skill} style={{ animationDelay: `${i * 100}ms` }}>
                      <SkillBadge type="emerging">{skill}</SkillBadge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                Recommended Learning Path
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {career.learningResources?.map((resource, i) => (
                  <div key={i} style={{ animationDelay: `${i * 150}ms` }}>
                    <ResourceCard resource={resource} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div className="space-y-10">
              <div>
                <h4 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl mr-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  Resume Tips
                </h4>
                <div className="space-y-4">
                  {career.jobReadiness?.resumeTips.map((tip, i) => (
                    <div 
                      key={i} 
                      className="flex items-start p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                        {i + 1}
                      </div>
                      <span className="text-green-800 leading-relaxed font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  Common Interview Questions
                </h4>
                <div className="space-y-4">
                  {career.jobReadiness?.interviewQuestions.map((question, i) => (
                    <div 
                      key={i} 
                      className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-default animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="text-blue-800 font-semibold text-lg">Q: {question}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
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
        
        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CareerDetail;
