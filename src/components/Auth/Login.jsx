// ============================================
// Login Component - The First Screen Users See
// ============================================
// A beautiful, WhatsApp-inspired login page with:
//   - Animated logo and branding
//   - "Sign in with Google" button
//   - Gradient background with floating elements
// ============================================

import { useState } from "react";
import { useAuthActions } from "../../hooks/useAuth";

export default function Login() {
  const { signInWithGoogle } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wa-bg-deep relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-wa-green/20 via-transparent to-transparent rounded-full animate-pulse-soft" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-wa-teal-dark/20 via-transparent to-transparent rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Top colored bar - like WhatsApp Web */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-wa-teal-dark" />

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-wa-green to-wa-teal-dark rounded-full flex items-center justify-center mb-6 animate-bounce-in shadow-lg">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Chatify
          </h1>
          <p className="text-gray-500 text-center text-sm leading-relaxed">
            Send and receive messages in real-time.
            <br />
            Simple, reliable, and free.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wider">Sign in to continue</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          id="google-sign-in-btn"
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-3.5 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300 border-t-wa-green rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              {/* Google "G" Logo */}
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          🔒 Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
}
