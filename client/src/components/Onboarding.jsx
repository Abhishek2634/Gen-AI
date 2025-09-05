import React, { useState } from 'react';
import { Users, BookOpen, Star, Target, Sparkles } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
    <span>Analyzing...</span>
  </div>
);

const Onboarding = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    educationLevel: 'Undergraduate',
    stream: '',
    interests: '',
    skills: {
      communication: 3,
      problemSolving: 3,
      teamwork: 3,
      technical: 3,
      leadership: 3,
      creativity: 3
    },
    experience: 'Fresher',
    careerGoals: '',
    workPreference: 'Hybrid'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSkillChange = (skill, value) => setFormData(prev => ({ ...prev, skills: { ...prev.skills, [skill]: parseInt(value) } }));
  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.name.trim() && formData.educationLevel;
      case 2: return formData.stream.trim() && formData.interests.trim();
      case 3: return Object.values(formData.skills).every(skill => skill > 0);
      case 4: return formData.careerGoals.trim();
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h3>
              <p className="text-gray-600">Let's start with some basic information</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => handleInputChange('name', e.target.value)} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300" 
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Education Level *</label>
              <select 
                value={formData.educationLevel} 
                onChange={(e) => handleInputChange('educationLevel', e.target.value)} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300"
              >
                <option value="">Select level</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Experience</label>
              <select 
                value={formData.experience} 
                onChange={(e) => handleInputChange('experience', e.target.value)} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300"
              >
                <option value="">Select level</option>
                <option value="Fresher">Fresher (0 years)</option>
                <option value="Entry">Entry Level (1-2 years)</option>
                <option value="Mid">Mid Level (3-5 years)</option>
                <option value="Senior">Senior Level (5+ years)</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Academic Background</h3>
              <p className="text-gray-600">Help us understand your interests</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Field of Study/Stream *</label>
              <input 
                type="text" 
                value={formData.stream} 
                onChange={(e) => handleInputChange('stream', e.target.value)} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300" 
                placeholder="e.g., Computer Science, Business"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Areas of Interest *</label>
              <textarea 
                value={formData.interests} 
                onChange={(e) => handleInputChange('interests', e.target.value)} 
                rows={4} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 resize-none" 
                placeholder="Describe your hobbies, passions..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Work Environment</label>
              <select 
                value={formData.workPreference} 
                onChange={(e) => handleInputChange('workPreference', e.target.value)} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300"
              >
                <option value="">Select preference</option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Field">Field Work</option>
              </select>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Rate Your Skills</h3>
              <p className="text-gray-600">1 = Beginner, 5 = Expert</p>
            </div>
            
            <div className="grid gap-6">
              {Object.entries(formData.skills).map(([skill, value]) => (
                <div key={skill} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700 capitalize">
                      {skill.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <span className="text-lg font-bold text-blue-600">{value}/5</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={value} 
                    onChange={(e) => handleSkillChange(skill, e.target.value)} 
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Career Goals</h3>
              <p className="text-gray-600">Tell us about your aspirations</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Career Goals & Aspirations *</label>
              <textarea 
                value={formData.careerGoals} 
                onChange={(e) => handleInputChange('careerGoals', e.target.value)} 
                rows={5} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 resize-none" 
                placeholder="What do you want to achieve in your career?"
              />
            </div>
          </div>
        );
      
      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-100 p-1">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="p-8">
          {renderStep()}
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              onClick={prevStep} 
              disabled={currentStep === 1} 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                onClick={nextStep} 
                disabled={!isStepValid()} 
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isStepValid() 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next Step
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={!isStepValid() || isLoading} 
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isStepValid() && !isLoading 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get My Recommendations
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
