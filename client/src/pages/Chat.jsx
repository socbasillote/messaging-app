import React from "react";
import ChatList from "../components/ChatList";
import MessageWindow from "../components/MessageWindow";
import MessageInput from "../components/MessageInput";

function Chat() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r p-4">
        <h3 className="font-bold">Chats</h3>
        <ChatList />
      </div>

      {/* Right chat window */}
      <div className="w-2/3 p-4">
        <h3 className="font-bold">Messages</h3>

        <MessageWindow />
        <MessageInput />
      </div>
    </div>
  );
}

export default Chat;
