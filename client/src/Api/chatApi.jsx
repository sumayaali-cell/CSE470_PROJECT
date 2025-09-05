import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/chat", 
    withCredentials: true,
  });

export const postChat = (data) =>API.post('/post-chat',data)
export const getChats = (senderId, receiverId) => 
  API.get('/get-chat', {
    params: {
      senderId,
      receiverId,
    },
  });


  export const getChatByGroup = (userId) =>API.get(`/get-chat-by-group/${userId}`)