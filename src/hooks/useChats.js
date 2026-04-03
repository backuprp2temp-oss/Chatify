// ============================================
// useChats Hook - Real-Time Chat List Listener
// ============================================
// This hook gets the list of all conversations the current
// user is part of. It updates in real-time when:
//   - A new chat is created
//   - A new message is received (lastMessage updates)
//
// Usage:
//   const { chats, loading, createChat } = useChats(currentUser.uid);
// ============================================

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { generateChatId } from "../utils/helpers";

export function useChats(userId) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setChats([]);
      setLoading(false);
      return;
    }

    // Query: "Get all chats where I'm a participant, sorted by latest message"
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("participants", "array-contains", userId),
      orderBy("lastMessageTime", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // Create a new chat between two users (or return existing one)
  const createChat = async (currentUser, otherUser) => {
    // Generate a consistent ID so the same two users always get the same chat
    const chatId = generateChatId(currentUser.uid, otherUser.uid);

    // Check if chat already exists
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      // Create new chat document
      await setDoc(chatRef, {
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
        lastMessage: "",
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: "",
        createdAt: serverTimestamp(),
      });
    }

    return chatId;
  };

  // Search for users by name or email
  const searchUsers = async (searchTerm) => {
    if (!searchTerm.trim()) return [];

    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      const results = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (user) =>
            user.uid !== userId && // Don't show yourself
            (user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        );

      return results;
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  return { chats, loading, createChat, searchUsers };
}
