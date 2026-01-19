import API from "./api";

export const getChats = (userId) => API.get("/conversations/" + userId);

export const getMessages = (convId) => API.get("/messages/" + convId);

export const sendMessage = (data) => API.post("/messages", data);
