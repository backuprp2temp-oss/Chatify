// ============================================
// Helper / Utility Functions
// ============================================
// Small, reusable functions used across the app.
// Think of these like kitchen tools - you use them
// in many different recipes.
// ============================================

/**
 * Generates a consistent chat ID from two user IDs.
 * By sorting the IDs alphabetically, we ensure the SAME
 * two users always get the SAME chat ID, regardless of
 * who starts the chat.
 *
 * Example:
 *   generateChatId("user_B", "user_A") → "user_A_user_B"
 *   generateChatId("user_A", "user_B") → "user_A_user_B"
 *   Both produce the same ID! ✓
 */
export function generateChatId(userId1, userId2) {
  return [userId1, userId2].sort().join("_");
}

/**
 * Formats a Firestore Timestamp into a human-readable time.
 *
 * - Today: "2:30 PM"
 * - Yesterday: "Yesterday"
 * - This week: "Monday"
 * - Older: "3/15/2026"
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return "";

  // Firestore timestamps have a toDate() method
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Today - show time like "2:30 PM"
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    // This week - show day name
    return date.toLocaleDateString([], { weekday: "long" });
  } else {
    // Older - show date
    return date.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }
}

/**
 * Formats a timestamp into just the time portion (e.g., "2:30 PM")
 * Used for individual message timestamps.
 */
export function formatMessageTime(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/**
 * Gets the other participant's details from a chat object.
 * In a 1-on-1 chat, you want to display the OTHER person's name/photo.
 */
export function getOtherParticipant(chat, currentUserId) {
  if (!chat?.participantDetails) return null;
  const otherUserId = chat.participants.find((id) => id !== currentUserId);
  return chat.participantDetails[otherUserId] || null;
}

/**
 * Truncates a string to a maximum length, adding "..." if truncated.
 * Used for message previews in the sidebar.
 */
export function truncateText(text, maxLength = 40) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

/**
 * Gets initials from a display name (for avatar fallback).
 * "John Doe" → "JD"
 */
export function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
