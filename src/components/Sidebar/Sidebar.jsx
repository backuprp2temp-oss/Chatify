// ============================================
// Sidebar Component - Left Panel
// ============================================
// Contains:
//   - Header with user profile & logout
//   - Search bar to find users
//   - List of existing chats
// ============================================

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthActions } from "../../hooks/useAuth";
import { useChats } from "../../hooks/useChats";
import { getInitials } from "../../utils/helpers";
import ChatListItem from "./ChatListItem";
import UserSearch from "./UserSearch";

export default function Sidebar({ selectedChat, onSelectChat }) {
  const { currentUser } = useAuth();
  const { logout } = useAuthActions();
  const { chats, loading, createChat, searchUsers } = useChats(currentUser?.uid);
  const [showSearch, setShowSearch] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      console.error(err);
      setLoggingOut(false);
    }
  };

  const handleStartChat = async (otherUser) => {
    const chatId = await createChat(currentUser, otherUser);
    onSelectChat({
      id: chatId,
      participants: [currentUser.uid, otherUser.uid],
      participantDetails: {
        [currentUser.uid]: {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          email: currentUser.email,
        },
        [otherUser.uid]: {
          displayName: otherUser.displayName,
          photoURL: otherUser.photoURL,
          email: otherUser.email,
        },
      },
    });
    setShowSearch(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between px-4 py-3 bg-wa-bg-header">
        {/* User Avatar */}
        <div className="flex items-center gap-3">
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-wa-bg-input flex items-center justify-center text-wa-text-secondary text-sm font-medium">
              {getInitials(currentUser?.displayName)}
            </div>
          )}
          <span className="text-wa-text-primary font-medium text-sm hidden sm:block">
            {currentUser?.displayName}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* New Chat Button */}
          <button
            id="new-chat-btn"
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 rounded-full hover:bg-wa-bg-hover transition-colors group"
            title="New chat"
          >
            <svg className="w-5 h-5 text-wa-icon group-hover:text-wa-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            id="logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-2.5 rounded-full hover:bg-wa-bg-hover transition-colors group"
            title="Logout"
          >
            <svg className="w-5 h-5 text-wa-icon group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== SEARCH / NEW CHAT ===== */}
      {showSearch && (
        <UserSearch
          onSelectUser={handleStartChat}
          onClose={() => setShowSearch(false)}
          searchUsers={searchUsers}
        />
      )}

      {/* ===== CHAT LIST ===== */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {loading ? (
          // Loading skeleton
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-wa-bg-input flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-4 bg-wa-bg-input rounded w-24 mb-2" />
                  <div className="h-3 bg-wa-bg-input rounded w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : chats.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-wa-bg-input flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-wa-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h3 className="text-wa-text-primary font-medium mb-1">No chats yet</h3>
            <p className="text-wa-text-secondary text-sm mb-4">
              Click the chat icon above to start a conversation
            </p>
          </div>
        ) : (
          // Chat list
          chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => onSelectChat(chat)}
            />
          ))
        )}
      </div>
    </div>
  );
}
