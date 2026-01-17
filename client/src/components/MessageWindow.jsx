import React from "react";
import { useSelector } from "react-redux";

function MessageWindow() {
  const { currentChat } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.message);

  if (!currentChat) {
    return <p>Selct a chat</p>;
  }

  return (
    <div>
      <h3 className="font-bold mb-4">Chat with {currentChat.name}</h3>

      {messages.map((m, i) => (
        <div key={i} className="border p-2 mb-2">
          {m.text}
        </div>
      ))}
    </div>
  );
}

export default MessageWindow;
