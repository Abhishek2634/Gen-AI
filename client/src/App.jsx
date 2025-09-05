import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Recommendations from './components/Recommendations';
import CareerDetail from './components/CareerDetail';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [recommendations, setRecommendations] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProfileSubmit = async (profileData) => {
    setIsLoading(true);
    setError('');
    setRecommendations(null);
    setSelectedCareer(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendations(data);

    } catch (e) {
      console.error("Failed to fetch recommendations:", e);
      setError('Failed to get recommendations from the AI server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCareer = (career) => {
    setSelectedCareer(career);
  };

  const handleBack = () => {
    setSelectedCareer(null);
  };

  const handleReset = () => {
    setRecommendations(null);
    setSelectedCareer(null);
    setIsLoading(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header onReset={handleReset} />
      
      <main className="flex-grow">
        {!recommendations && !selectedCareer && (
          <Onboarding 
            onSubmit={handleProfileSubmit} 
            isLoading={isLoading} 
            error={error} 
          />
        )}
        
        {recommendations && !selectedCareer && (
          <Recommendations 
            data={recommendations.careerPaths} 
            onSelect={handleSelectCareer} 
          />
        )}
        
        {selectedCareer && (
          <CareerDetail 
            career={selectedCareer} 
            onBack={handleBack} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
