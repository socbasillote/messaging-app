import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, setCurrentChat } from "../redux/chatSlice";
import { socket } from "../services/socket";

function ChatList() {
  const [online, setOnline] = useState([]);
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(fetchChats("123"));
    //if (user) dispatch(fetchChats(user._id));
  }, [user]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnline(users);
    });
  }, []);

  return (
    <div>
      <button
        className="bg-green-500 text-white p-1 mb-2"
        onClick={() => alert("search user soon")}
      >
        New Chat
      </button>

      {chats.map((chat) => (
        <div
          key={chat.id || chat._id}
          className="border p-2 mb-2 cursor-pointer"
          onClick={() => dispatch(setCurrentChat(chat))}
        >
          <span className="text-green-500">
            {online.includes(chat.id) ? "●" : ""}
          </span>

          <p className="font-semibold">{chat.name}</p>
          <p className="font-semibold">{chat._id}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
