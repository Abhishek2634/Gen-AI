import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Recommendations from './components/Recommendations';
import CareerDetail from './components/CareerDetail';
import Header from './components/Header';
import Footer from './components/Footer';

// A simple loading screen for the initial history check
const InitialLoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
    <p className="text-lg font-semibold animate-pulse">Checking for previous sessions...</p>
  </div>
);

function App() {
  const [recommendations, setRecommendations] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHistoryLoading, setIsHistoryLoading] = useState(true); // NEW state for initial load

  // NEW: Check for a previous session on application startup
  useEffect(() => {
    const lastSessionId = localStorage.getItem('careerCoachSessionId');
    if (lastSessionId) {
      console.log("Found previous session ID:", lastSessionId);
      // Fetch the history from your live backend
      fetch(`https://ai-coach-backend-87474148451.us-central1.run.app/api/history/${lastSessionId}`)
        .then(res => {
          if (res.ok) return res.json();
          // If history is not found on server, clear it from local
          throw new Error('History not found on server');
        })
        .then(data => {
          console.log("Successfully loaded history:", data);
          setRecommendations(data.aiResponse);
        })
        .catch(err => {
          console.error("Could not load history:", err);
          localStorage.removeItem('careerCoachSessionId');
        })
        .finally(() => {
          setIsHistoryLoading(false);
        });
    } else {
      setIsHistoryLoading(false);
    }
  }, []);

  const handleProfileSubmit = async (profileData) => {
    setIsLoading(true);
    setError('');
    setRecommendations(null);
    setSelectedCareer(null);

    try {
      const response = await fetch('https://ai-coach-backend-87474148451.us-central1.run.app/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendations(data);
      
      // NEW: Save the new session ID to the browser's local storage
      if (data.sessionId) {
        localStorage.setItem('careerCoachSessionId', data.sessionId);
        console.log("Saved new session ID:", data.sessionId);
      }

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
    // NEW: Clear the session from local storage for a true reset
    localStorage.removeItem('careerCoachSessionId');
    setRecommendations(null);
    setSelectedCareer(null);
    setIsLoading(false);
    setError('');
  };

  // NEW: Show a loading screen while checking for history
  if (isHistoryLoading) {
    return <InitialLoadingScreen />;
  }

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