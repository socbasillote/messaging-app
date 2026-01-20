import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",

  initialState,

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      const exists = state.messages.some((m) => m._id === action.payload._id);

      if (!exists) {
        state.messages.push(action.payload);
      }
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
