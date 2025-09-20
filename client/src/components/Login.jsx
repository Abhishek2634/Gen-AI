// File: client/src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Sparkles } from 'lucide-react';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLoginView ? 'Sign in to access your personalized recommendations.' : 'Join to discover your future career path.'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (at least 6 characters)" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300" />
          <button type="submit" className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            {isLoginView ? 'Login' : 'Create Account'}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="text-center text-sm">
          <span onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-blue-600 hover:underline cursor-pointer">
            {isLoginView ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;