import { createSlice } from "@reduxjs/toolkit";
import API from "../services/api";

const initialState = {
  chats: [],
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

    addChat: (state, action) => {
      const exists = state.chats.some((c) => c._id === action.payload._id);

      if (!exists) {
        state.chats.push(action.payload);
      }
    },

    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setChats, setCurrentChat, addChat } = chatSlice.actions;

export default chatSlice.reducer;
