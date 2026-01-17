import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  currentChat: null,
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
