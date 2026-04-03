// ============================================
// MessageBubble - Individual Message Display
// ============================================
// Renders a single message as a WhatsApp-style bubble:
//   - Green bubble (right) = your messages
//   - Dark bubble (left) = other person's messages
//   - Includes timestamp and read status
//   - "Tail" on first message in a group
// ============================================

import { formatMessageTime } from "../../utils/helpers";

export default function MessageBubble({ message, isOwn, showTail }) {
  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`relative max-w-[65%] md:max-w-[45%] rounded-lg px-3 pt-1.5 pb-1 shadow-sm ${
          isOwn
            ? `bg-wa-msg-out text-wa-text-primary ${showTail ? "msg-tail-out" : ""}`
            : `bg-wa-msg-in text-wa-text-primary ${showTail ? "msg-tail-in" : ""}`
        } ${showTail ? "mt-2" : "mt-0.5"}`}
      >
        {/* Message text */}
        <p className="text-[14.2px] leading-[19px] break-words whitespace-pre-wrap">
          {message.text}
        </p>

        {/* Timestamp & read status */}
        <div className={`flex items-center gap-1 justify-end mt-0.5 -mb-0.5 ${
          isOwn ? "text-wa-text-secondary/70" : "text-wa-text-secondary/60"
        }`}>
          <span className="text-[11px] leading-none">
            {formatMessageTime(message.createdAt)}
          </span>
          {isOwn && (
            <svg
              className={`w-4 h-4 ${
                message.read ? "text-blue-400" : "text-wa-text-secondary/50"
              }`}
              viewBox="0 0 16 15"
              fill="currentColor"
            >
              <path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.88a.32.32 0 01-.484.032l-.358-.325a.32.32 0 00-.484.032l-.378.48a.418.418 0 00.036.54l1.32 1.267a.32.32 0 00.484-.034l6.272-8.048a.366.366 0 00-.064-.512zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.88a.32.32 0 01-.484.032L1.892 7.77a.366.366 0 00-.516.005l-.423.433a.364.364 0 00.006.514l3.255 3.185a.32.32 0 00.484-.033l6.272-8.048a.365.365 0 00-.063-.51z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
