// ============================================
// UserSearch - Find Users to Start a Chat
// ============================================
// A search panel that slides in when clicking "New Chat".
// Users can search by name or email, and clicking a
// result starts a new conversation.
// ============================================

import { useState, useEffect, useRef } from "react";
import { getInitials } from "../../utils/helpers";

export default function UserSearch({ onSelectUser, onClose, searchUsers }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);

  // Focus the search input when the panel opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Search with debounce (wait 300ms after user stops typing)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      const users = await searchUsers(query);
      setResults(users);
      setSearching(false);
    }, 300);

    // Cancel previous timer if user keeps typing
    return () => clearTimeout(timer);
  }, [query, searchUsers]);

  return (
    <div className="bg-wa-bg-panel border-b border-wa-border animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-wa-bg-header">
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-wa-bg-hover transition-colors"
        >
          <svg className="w-5 h-5 text-wa-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h2 className="text-wa-text-primary font-medium">New Chat</h2>
      </div>

      {/* Search Input */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-3 bg-wa-search-bg rounded-lg px-4 py-2">
          <svg className="w-4 h-4 text-wa-text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id="user-search-input"
            ref={inputRef}
            type="text"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-wa-text-primary text-sm w-full placeholder:text-wa-text-secondary"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-wa-text-secondary hover:text-wa-text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="max-h-60 overflow-y-auto scrollbar-hide">
        {searching ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-wa-bg-input border-t-wa-green rounded-full animate-spin" />
          </div>
        ) : results.length > 0 ? (
          results.map((user) => (
            <button
              key={user.uid}
              id={`search-result-${user.uid}`}
              onClick={() => onSelectUser(user)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-wa-bg-hover transition-colors text-left"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-11 h-11 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-wa-bg-input flex items-center justify-center text-wa-text-secondary text-sm font-medium">
                  {getInitials(user.displayName)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-wa-text-primary text-[15px] font-medium truncate">
                  {user.displayName}
                </h4>
                <p className="text-wa-text-secondary text-xs truncate">
                  {user.email}
                </p>
              </div>
            </button>
          ))
        ) : query.trim() ? (
          <div className="text-center py-8 text-wa-text-secondary text-sm">
            No users found for "{query}"
          </div>
        ) : (
          <div className="text-center py-8 text-wa-text-secondary text-sm">
            Type a name or email to search
          </div>
        )}
      </div>
    </div>
  );
}
