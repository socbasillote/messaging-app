import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../redux/chatSlice";

function ChatList() {
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="font-bold mb-4">Chats</div>

      {chats.map((chat) => (
        <div
          key={chat.id}
          className="border p-2 mb-2 cursor-pointer"
          onClick={() => dispatch(setCurrentChat(chat))}
        >
          <p className="font-semibold">{chat.name}</p>
          <p className="text-sm">{chat.last}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
