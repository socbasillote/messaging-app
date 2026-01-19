import React, { useEffect } from "react";
import ChatList from "../components/ChatList";
import MessageWindow from "../components/MessageWindow";
import MessageInput from "../components/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { socket } from "../services/socket";
import { addMessage } from "../redux/messageSlice";

function Chat() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      socket.emit("addUser", user._id);
    }

    socket.on("getMessage", (msg) => {
      dispatch(addMessage(msg));
    });
  }, [user]);

  if (!user) return <Navigate to="/" />;

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
