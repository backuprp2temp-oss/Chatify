// ============================================
// App.jsx - The Root Component
// ============================================
// This is the TOP-LEVEL component of our app.
// It decides what to show:
//   - If user is NOT logged in → show Login page
//   - If user IS logged in → show the Chat layout
//
// The AuthProvider wraps everything so all components
// can access the login state.
// ============================================

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import AppLayout from "./components/Layout/AppLayout";

// Inner component that uses the auth context
function AppContent() {
  const { currentUser, loading } = useAuth();

  // Show a loading spinner while Firebase checks if someone is logged in
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wa-bg-deep">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-wa-bg-input border-t-wa-green rounded-full animate-spin" />
          <p className="text-wa-text-secondary text-sm animate-pulse-soft">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // If no user is logged in, show the login page
  // If a user IS logged in, show the chat interface
  return currentUser ? <AppLayout /> : <Login />;
}

// The main App component wraps everything in AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
