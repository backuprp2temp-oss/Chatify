// ============================================
// useAuth Hook - Login & Logout Functions
// ============================================
// A "hook" is a reusable piece of logic.
// This hook provides two simple functions:
//   - signInWithGoogle() → opens Google login popup
//   - logout() → signs the user out
//
// Usage in any component:
//   const { signInWithGoogle, logout } = useAuthActions();
// ============================================

import { signInWithPopup, signOut } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../services/firebase";

export function useAuthActions() {
  // Opens a Google sign-in popup window
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The AuthContext listener will automatically detect
      // the login and update the user state
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  };

  // Signs the user out
  const logout = async () => {
    try {
      // Before signing out, update the user's status to offline
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          online: false,
          lastSeen: serverTimestamp(),
        });
      }
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  };

  return { signInWithGoogle, logout };
}
