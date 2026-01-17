import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice";

function MessageInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const send = () => {
    dispatch(
      addMessage({
        text,
        sender: "me",
      }),
    );

    setText("");
  };

  return (
    <div className="mt-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
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
