import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { sendMessage } from "../services/chatService";
import { socket } from "../services/socket";

function MessageInput() {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const { currentChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const send = async () => {
    const data = {
      conversationId: currentChat._id,
      sender: user._id,
      text,
    };

    const res = await sendMessage(data);

    socket.emit("sendMessage", {
      receiverId: "OTHER_USER_ID",
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

          socket.emit("typing", {
            receiverId: "OTHER_USER_ID",
          });
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
