// ============================================
// MessageInput - Text Input & Send Button
// ============================================
// The bottom bar where users type and send messages.
// Features:
//   - Auto-growing textarea (expands as you type)
//   - Send on Enter (Shift+Enter for new line)
//   - Send button with animation
//   - Emoji placeholder icon
// ============================================

import { useState, useRef, useEffect } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    }
  }, [text]);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      await onSend(text);
      setText("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter (without Shift)
    // Shift+Enter = new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 px-4 py-3 bg-wa-bg-header border-t border-wa-border/30">
      {/* Emoji button (decorative) */}
      <button
        className="p-2 rounded-full hover:bg-wa-bg-hover transition-colors flex-shrink-0 mb-0.5"
        title="Emojis"
      >
        <svg className="w-6 h-6 text-wa-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      </button>

      {/* Text Input */}
      <div className="flex-1 bg-wa-bg-input rounded-lg px-4 py-2.5">
        <textarea
          id="message-input"
          ref={textareaRef}
          rows={1}
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-wa-text-primary text-[15px] resize-none placeholder:text-wa-text-secondary leading-5 max-h-[150px]"
        />
      </div>

      {/* Send Button */}
      <button
        id="send-message-btn"
        onClick={handleSend}
        disabled={!text.trim() || sending}
        className={`p-2.5 rounded-full flex-shrink-0 mb-0.5 transition-all duration-200 ${
          text.trim()
            ? "bg-wa-green hover:bg-wa-green-dark text-white shadow-lg shadow-wa-green/20 scale-100"
            : "text-wa-icon hover:bg-wa-bg-hover scale-95"
        }`}
      >
        {sending ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
