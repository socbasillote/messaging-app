import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, setCurrentChat } from "../redux/chatSlice";

function ChatList() {
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(fetchChats("USER_ID_FROM_DB"));
    //if (user) dispatch(fetchChats(user._id));
  }, [user]);

  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id || chat._id}
          className="border p-2 mb-2 cursor-pointer"
          onClick={() => dispatch(setCurrentChat(chat))}
        >
          <p className="font-semibold">{chat._id}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
