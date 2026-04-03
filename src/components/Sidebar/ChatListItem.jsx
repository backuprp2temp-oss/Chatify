// ============================================
// ChatListItem - Single Chat Preview in Sidebar
// ============================================
// Shows:
//   - User avatar (with online indicator)
//   - User name
//   - Last message preview
//   - Timestamp
// ============================================

import { useAuth } from "../../contexts/AuthContext";
import {
  getOtherParticipant,
  formatTimestamp,
  truncateText,
  getInitials,
} from "../../utils/helpers";

export default function ChatListItem({ chat, isSelected, onClick }) {
  const { currentUser } = useAuth();
  const otherUser = getOtherParticipant(chat, currentUser?.uid);

  if (!otherUser) return null;

  return (
    <button
      id={`chat-item-${chat.id}`}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-wa-bg-hover transition-all duration-150 border-b border-wa-border/30 text-left ${
        isSelected ? "bg-wa-bg-active" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {otherUser.photoURL ? (
          <img
            src={otherUser.photoURL}
            alt={otherUser.displayName}
            className="w-12 h-12 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-wa-bg-input flex items-center justify-center text-wa-text-secondary font-medium">
            {getInitials(otherUser.displayName)}
          </div>
        )}
        {/* Online indicator dot */}
        {otherUser.online && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-wa-green rounded-full border-2 border-wa-bg-sidebar" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="text-wa-text-primary font-medium text-[15px] truncate">
            {otherUser.displayName || "Unknown User"}
          </h3>
          <span className="text-wa-text-secondary text-xs flex-shrink-0 ml-2">
            {formatTimestamp(chat.lastMessageTime)}
          </span>
        </div>
        <p className="text-wa-text-secondary text-sm truncate">
          {chat.lastMessageSenderId === currentUser?.uid && (
            <span className="text-wa-icon mr-1">
              {/* Double check mark icon */}
              <svg className="w-4 h-4 inline-block" viewBox="0 0 16 15" fill="currentColor">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.88a.32.32 0 01-.484.032l-.358-.325a.32.32 0 00-.484.032l-.378.48a.418.418 0 00.036.54l1.32 1.267a.32.32 0 00.484-.034l6.272-8.048a.366.366 0 00-.064-.512zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.88a.32.32 0 01-.484.032L1.892 7.77a.366.366 0 00-.516.005l-.423.433a.364.364 0 00.006.514l3.255 3.185a.32.32 0 00.484-.033l6.272-8.048a.365.365 0 00-.063-.51z" />
              </svg>
            </span>
          )}
          {truncateText(chat.lastMessage) || "No messages yet"}
        </p>
      </div>
    </button>
  );
}
