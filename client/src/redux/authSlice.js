import { createSlice } from "@reduxjs/toolkit";
import API from "../services/api";

const initialState = {
  user: null, // who logged in
  token: null, // JWT from backend
  loading: false, // show spinner
  error: null, // show message
};

export const loginUser = (form) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const res = await API.post("/auth/login", form);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail("Login failed"));
  }
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  authSlice.actions;

export default authSlice.reducer;
