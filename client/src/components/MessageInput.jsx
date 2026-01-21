import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { sendMessage } from "../services/chatService";
import { socket } from "../services/socket";

function MessageInput() {
  const [text, setText] = useState("");

  const { currentChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!currentChat) return null;

  const receiverId = currentChat.members.find((id) => id !== user._id);

  const send = async () => {
    const data = {
      conversationId: currentChat._id,
      sender: user._id,
      text,
    };

    const res = await sendMessage(data);

    socket.emit("sendMessage", {
      receiverId,
      message: res.data,
    });

    dispatch(addMessage(res.data));

    setText("");
  };

  return (
    <div className="mt-4">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);

          socket.emit("typing", { receiverId });
        }}
        className="border p-2 w-full"
        placeholder="type message..."
      />

      <button onClick={send} className="bg-green-500 text-white p-2 mt-2">
        Send
      </button>
    </div>
  );
}

export default MessageInput;
