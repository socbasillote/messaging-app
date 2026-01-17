import React from "react";

function Chat() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r p-4">
        <h3 className="font-bold">Chats</h3>
        <p>Chat list will go here</p>
      </div>

      {/* Right chat window */}
      <div className="w-2/3 p-4">
        <h3 className="font-bold">Messages</h3>
        <p>Conversation will show here</p>
      </div>
    </div>
  );
}

export default Chat;
