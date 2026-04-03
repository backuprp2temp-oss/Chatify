// ============================================
// Authentication Context
// ============================================
// A "Context" in React is like a shared bulletin board.
// Instead of passing the logged-in user info through every
// component (like a chain of people passing a note), we put
// it on a bulletin board that ANY component can read.
//
// This context:
//   1. Listens for login/logout changes
//   2. Stores the current user's info
//   3. Creates/updates the user's profile in Firestore
//   4. Makes all of this available to the entire app
// ============================================

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

// Create the "bulletin board"
const AuthContext = createContext();

// Custom hook - a shortcut to read the bulletin board
// Usage in any component: const { currentUser } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}

// The Provider component - wraps the app and manages auth state
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);  // Who's logged in?
  const [loading, setLoading] = useState(true);           // Still checking?

  useEffect(() => {
    // onAuthStateChanged is a Firebase "listener"
    // It runs automatically whenever someone logs in or out
    // Think of it like a doorbell - it rings every time someone enters/leaves
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Someone logged in! Save/update their profile in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            online: true,
            lastSeen: serverTimestamp(),
          },
          { merge: true } // merge: true = update existing fields, don't overwrite everything
        );
      }
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup: remove the listener when the component unmounts
    // (prevents memory leaks - like turning off the doorbell when you move out)
    return unsubscribe;
  }, []);

  // The value prop = what goes on the "bulletin board"
  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render anything until we know if someone is logged in */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
