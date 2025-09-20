// File: client/src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // We need this for Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB68nT1CnqAiA2qTuvLqDJO5mbTkySJtQk",
  authDomain: "ai-coach-final.firebaseapp.com",
  projectId: "ai-coach-final",
  storageBucket: "ai-coach-final.firebasestorage.app",
  messagingSenderId: "87474148451",
  appId: "1:87474148451:web:65e6433489fb5af9e29456",
  measurementId: "G-M90C026T6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it for use in other components
export const auth = getAuth(app);