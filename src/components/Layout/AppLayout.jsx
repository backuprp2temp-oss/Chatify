// ============================================
// AppLayout - The Main Two-Panel Layout
// ============================================
// This is the "skeleton" of the chat app:
//   Left panel: Sidebar with chat list
//   Right panel: Chat window with messages
//
// On mobile, only one panel shows at a time.
// ============================================

import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ChatWindow from "../Chat/ChatWindow";

export default function AppLayout() {
  // Which chat is currently open? null = no chat selected
  const [selectedChat, setSelectedChat] = useState(null);

  // On mobile, are we showing the sidebar or the chat?
  // true = sidebar visible, false = chat visible
  const [showSidebar, setShowSidebar] = useState(true);

  // When a chat is selected from the sidebar
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowSidebar(false); // On mobile, switch to chat view
  };

  // When user presses back button (mobile only)
  const handleBack = () => {
    setShowSidebar(true);
    // Don't clear selectedChat so it stays highlighted on desktop
  };

  return (
    <div className="h-screen flex bg-wa-bg-deep">
      {/* Optional: decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-wa-teal-dark z-0" />

      {/* Main container - centered with max width */}
      <div className="relative z-10 flex w-full max-w-[1600px] mx-auto my-0 md:my-5 h-full md:h-[calc(100vh-40px)] shadow-2xl overflow-hidden md:rounded-sm">
        {/* LEFT PANEL: Sidebar */}
        <div
          className={`${
            showSidebar ? "flex" : "hidden"
          } md:flex flex-col w-full md:w-[420px] md:min-w-[340px] bg-wa-bg-sidebar border-r border-wa-border`}
        >
          <Sidebar
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* RIGHT PANEL: Chat Window */}
        <div
          className={`${
            !showSidebar ? "flex" : "hidden"
          } md:flex flex-col flex-1 bg-wa-bg-chat`}
        >
          <ChatWindow
            chat={selectedChat}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
}
