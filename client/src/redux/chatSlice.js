import { createSlice } from "@reduxjs/toolkit";
import API from "../services/api";

const initialState = {
  chats: [
    { id: 1, name: "John", last: "Hello there" },
    { id: 2, name: "Sarah", last: "See you" },
  ],
  currentChat: null,
};

export const fetchChats = (userId) => async (dispatch) => {
  const res = await API.get("/conversations/" + userId);
  console.log("FETCH CHATS RESPONSE:", res.data); // 👈 ADD THIS
  dispatch(setChats(res.data));
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setChats, setCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
