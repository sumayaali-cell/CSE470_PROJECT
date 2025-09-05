import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/post", 
    withCredentials: true,
  });

export const uploadPost = (formData) =>
  API.post("/upload-post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });


export const getAllPost = (query = {}) => {
  return API.get('/get-all-post', {
    params: query,
  });
};


  export const deleteMovie = (id)=>API.delete(`/delete-movie/${id}`)
  export const updateMovie = (id,status) =>API.put(`/update-movie/${id}`,{status})
  export const getMovieById = (id) =>API.get(`/get-movie-by-id/${id}`)
 export const getItemsById = (id) =>API.get(`/get-item-by-id/${id}`)
 export const submitReport = (itemId,userId,message) =>API.post('/submit-report',{itemId,userId,message})
 export const getReports = () =>API.get('/get-report')
 export const deleteItem = (itemId) =>API.delete(`/delete-item/${itemId}`)
 export const postQuestion = (reportId,userId,questions)=>API.post(`/post-question/${reportId}`,{userId,questions})
 export const getQestion = (userId) =>API.get(`/get-question/${userId}`)
 export const postAnswer = (reportId,answers) =>API.put(`/post-answer/${reportId}`,{answers})
 export const getAnswer = (reportId) =>API.get(`/get-answer/${reportId}`)
 export const getItemByname = (search) =>API.get(`/get-item-by-name/${search}`)
 export const getDonatedItem = () =>API.get('/get-donated-item')
 export const updateClaimed = (itemId,userId) =>API.put(`/update-claimed/${itemId}/${userId}`)
 export const getResolved = () =>API.get('/get-resolved')
 export const getMyItems = (userId) =>API.get(`/get-my-items/${userId}`)
export const getNotification = (userId) =>API.get(`/get-notification/${userId}`)
export const updateResolved = (itemId) =>API.put(`/update-resolved/${itemId}`)
export const getResolvedCasesById = (userId) =>API.get(`/get-resolved-cases-by-id/${userId}`)