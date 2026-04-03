// ============================================
// ChatWindow - The Main Chat Area
// ============================================
// The right panel showing:
//   - Header with chat partner's info
//   - Messages area (scrollable)
//   - Message input at the bottom
//
// When no chat is selected, shows a welcome screen.
// ============================================

import { useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useMessages } from "../../hooks/useMessages";
import { getOtherParticipant, getInitials } from "../../utils/helpers";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ chat, onBack }) {
  const { currentUser } = useAuth();
  const { messages, loading, sendMessage } = useMessages(chat?.id);
  const messagesEndRef = useRef(null);
  const otherUser = chat ? getOtherParticipant(chat, currentUser?.uid) : null;

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSend = async (text) => {
    await sendMessage(chat.id, text, currentUser);
  };

  // ===== EMPTY STATE - No chat selected =====
  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-wa-bg-panel/50 px-8 animate-fade-in">
        <div className="max-w-md text-center">
          {/* App logo */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-wa-bg-input to-wa-bg-hover flex items-center justify-center">
            <svg className="w-12 h-12 text-wa-text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>

          <h2 className="text-wa-text-primary text-2xl font-light mb-3">
            Chatify for Web
          </h2>
          <p className="text-wa-text-secondary text-sm leading-relaxed mb-6">
            Send and receive messages in real time. Select a conversation from the sidebar
            or start a new chat to begin.
          </p>

          <div className="flex items-center justify-center gap-2 text-wa-text-secondary text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  // ===== CHAT VIEW =====
  return (
    <div className="flex flex-col h-full">
      {/* ===== CHAT HEADER ===== */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-wa-bg-header border-b border-wa-border/30 flex-shrink-0">
        {/* Back button (mobile only) */}
        <button
          id="back-btn"
          onClick={onBack}
          className="md:hidden p-1.5 rounded-full hover:bg-wa-bg-hover transition-colors mr-1"
        >
          <svg className="w-5 h-5 text-wa-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        {/* Avatar */}
        {otherUser?.photoURL ? (
          <img
            src={otherUser.photoURL}
            alt={otherUser.displayName}
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-wa-bg-input flex items-center justify-center text-wa-text-secondary text-sm font-medium">
            {getInitials(otherUser?.displayName)}
          </div>
        )}

        {/* Name & Status */}
        <div className="flex-1 min-w-0">
          <h3 className="text-wa-text-primary font-medium text-[15px] truncate">
            {otherUser?.displayName || "Unknown User"}
          </h3>
          <p className="text-wa-text-secondary text-xs">
            {otherUser?.online ? (
              <span className="text-wa-green">online</span>
            ) : (
              "offline"
            )}
          </p>
        </div>
      </div>

      {/* ===== MESSAGES AREA ===== */}
      <div className="flex-1 overflow-y-auto chat-bg-pattern px-4 md:px-16 py-4">
        {loading ? (
          // Loading state
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-wa-bg-input border-t-wa-green rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          // No messages yet
          <div className="flex items-center justify-center h-full">
            <div className="bg-wa-msg-in/80 backdrop-blur-sm rounded-lg px-4 py-2 text-wa-text-secondary text-sm text-center animate-fade-in shadow-sm">
              <span className="text-yellow-300 mr-1">🔒</span>
              Messages are stored in Firebase. Say hello!
            </div>
          </div>
        ) : (
          // Message list
          <div className="space-y-1">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUser?.uid}
                showTail={
                  index === 0 ||
                  messages[index - 1]?.senderId !== message.senderId
                }
              />
            ))}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ===== MESSAGE INPUT ===== */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
