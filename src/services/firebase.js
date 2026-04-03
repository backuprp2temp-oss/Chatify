// ============================================
// Firebase Configuration & Initialization
// ============================================
// This file is the SINGLE place where we connect to Firebase.
// Every other file imports from here.
//
// Think of this like plugging in your appliances:
//   - initializeApp = turning on the power
//   - getAuth = plugging in the security system (login)
//   - getFirestore = plugging in the filing cabinet (database)
// ============================================

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These values come from your .env file
// Vite automatically reads .env and makes VITE_* variables available
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase - this connects your app to Firebase's servers
const app = initializeApp(firebaseConfig);

// Initialize services we'll use
export const auth = getAuth(app);                    // For login/logout
export const db = getFirestore(app);                 // For storing data
export const googleProvider = new GoogleAuthProvider(); // For Google sign-in

export default app;
