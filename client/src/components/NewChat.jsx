import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../services/userService";
import API from "../services/api";
import { fetchChats, setCurrentChat } from "../redux/chatSlice";

function NewChat({ close }) {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const createChat = async (otherId) => {
    const res = await API.post("/conversations", {
      senderId: user._id,
      receiverId: otherId,
    });

    // refresh chat list
    dispatch(fetchChats(user._id));

    // open that chat immediately
    dispatch(setCurrentChat(res.data));

    close();
  };

  return (
    <div className="border p-3 bg-white">
      <h3 className="font-bold mb-2">Start Chat</h3>
      <p className="text-sm text-gray-500">
        Existing chat will open if already created
      </p>

      {users
        .filter((u) => u._id !== user._id)
        .map((u) => (
          <div
            key={u._id}
            className="p-2 border mb-1 cursor-pointer"
            onClick={() => createChat(u._id)}
          >
            {u.username}
          </div>
        ))}

      <button onClick={close} className="mt-2">
        close
      </button>
    </div>
  );
}

export default NewChat;
