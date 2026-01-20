import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { addMessage, setMessages } from "../redux/messageSlice";
import { socket } from "../services/socket";

function MessageWindow() {
  const bottomRef = useRef();
  const [isTyping, setIsTyping] = useState(false);

  const { currentChat } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentChat) {
      API.get("/messages/" + currentChat._id).then((res) =>
        dispatch(setMessages(res.data)),
      );
    }
  }, [currentChat]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => socket.off("receiveMessage");
  }, [dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.on("typing", () => {
      setIsTyping(true);

      setTimeout(() => setIsTyping(false), 1000);
    });
  }, []);

  if (!currentChat) {
    return <p>Selct a chat</p>;
  }

  return (
    <div>
      <h3 className="font-bold mb-4">Chat with {currentChat.name}</h3>

      <div className="flex flex-col">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 mb-2 rounded w-fit ${
              m.sender === user._id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {isTyping && <p>typing...</p>}
      {/* <div ref={bottomRef}></div> */}
    </div>
  );
}

export default MessageWindow;
