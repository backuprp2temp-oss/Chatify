// ============================================
// useMessages Hook - Real-Time Message Listener
// ============================================
// This hook connects to Firestore and listens for new messages
// in a specific chat. When ANYONE sends a message, it appears
// on ALL connected screens instantly.
//
// How it works:
//   1. You give it a chatId
//   2. It sets up a real-time "listener" on that chat's messages
//   3. Whenever messages change, it updates the array automatically
//   4. When you leave the chat, it disconnects (cleanup)
//
// Usage:
//   const { messages, loading } = useMessages("chat123");
// ============================================

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

export function useMessages(chatId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there's no chatId, don't set up a listener
    if (!chatId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Create a query:
    // "Get all messages in this chat, sorted by when they were created"
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    // onSnapshot = the real-time listener
    // Think of it like subscribing to a mailbox:
    // every time a new letter arrives, you get notified
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);
      setLoading(false);
    });

    // Cleanup: unsubscribe when leaving the chat
    return () => unsubscribe();
  }, [chatId]); // Re-run this effect whenever chatId changes

  // Function to send a new message
  const sendMessage = async (chatId, text, sender) => {
    if (!text.trim() || !chatId) return;

    try {
      // 1. Add the message to the chat's messages sub-collection
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        text: text.trim(),
        senderId: sender.uid,
        senderName: sender.displayName,
        senderPhoto: sender.photoURL,
        createdAt: serverTimestamp(),
        read: false,
      });

      // 2. Update the chat document with the last message info
      //    (so the sidebar can show a preview)
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        lastMessage: text.trim(),
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: sender.uid,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return { messages, loading, sendMessage };
}
