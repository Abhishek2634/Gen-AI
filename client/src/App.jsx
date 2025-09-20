// File: client/src/App.jsx

import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";

import Onboarding from './components/Onboarding';
import Recommendations from './components/Recommendations';
import CareerDetail from './components/CareerDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';

const AuthLoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">Loading...</div>
);

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (!currentUser) {
        setRecommendations(null);
        setSelectedCareer(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleProfileSubmit = async (profileData) => {
    if (!user) {
      setError("Authentication error. Please log in again.");
      return;
    }
    setIsLoading(true);
    setError('');
    const token = await user.getIdToken();

    try {
      const response = await fetch('https://ai-coach-backend-87474148451.us-central1.run.app/api/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Server responded with an unreadable error.' }));
        throw new Error(errData.error || `Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (e) {
      setError(e.message || 'Failed to get recommendations from the AI server.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectCareer = (career) => setSelectedCareer(career);
  const handleBack = () => setSelectedCareer(null);

  const handleReset = () => {
    setRecommendations(null);
    setSelectedCareer(null);
    setError('');
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (authLoading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header onReset={handleReset} onLogout={handleLogout} />
      
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