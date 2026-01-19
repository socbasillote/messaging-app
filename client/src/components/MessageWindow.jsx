import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { setMessages } from "../redux/messageSlice";

function MessageWindow() {
  const { currentChat } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentChat) {
      API.get("/messages/" + currentChat._id).then((res) =>
        dispatch(setMessages(res.data)),
      );
    }
  }, [currentChat]);

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
