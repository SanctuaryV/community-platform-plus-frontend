import axios from 'axios';

// Base URL (can be empty to keep relative requests for CRA proxy)
const API_BASE = process.env.REACT_APP_API_URL || '';

// Per-endpoint env vars (if set, they override the default API_BASE + path)
const ENDPOINTS = {
  REGISTER: process.env.REACT_APP_API_REGISTER || `${API_BASE}/Register`,
  LOGIN: process.env.REACT_APP_API_LOGIN || `${API_BASE}/Login`,
  AUTHEN: process.env.REACT_APP_API_AUTHEN || `${API_BASE}/authen`,
  ROOM: process.env.REACT_APP_API_ROOM || `${API_BASE}/room`,
  MESSAGES: process.env.REACT_APP_API_MESSAGES || `${API_BASE}/messages`,
  FOLLOWING: process.env.REACT_APP_API_FOLLOWING || `${API_BASE}/following`,
  GETGROUPS: process.env.REACT_APP_API_GETGROUPS || `${API_BASE}/getgroups`,
  CREATEGROUPS: process.env.REACT_APP_API_CREATEGROUPS || `${API_BASE}/creategroups`,
  DELETEGROUP: process.env.REACT_APP_API_DELETEGROUP || `${API_BASE}/deletegroup`,
  USERS: process.env.REACT_APP_API_USERS || `${API_BASE}/users`,
  CREATEPOST: process.env.REACT_APP_API_CREATEPOST || `${API_BASE}/createPost`,
  DELETEPOST: process.env.REACT_APP_API_DELETEPOST || `${API_BASE}/deletePost`,
  UPDATEPOST: process.env.REACT_APP_API_UPDATEPOST || `${API_BASE}/updatePost`,
  ADDLIKE: process.env.REACT_APP_API_ADDLIKE || `${API_BASE}/addLike`,
  ADDCOMMENT: process.env.REACT_APP_API_ADDCOMMENT || `${API_BASE}/addComment`,
  REMOVELIKE: process.env.REACT_APP_API_REMOVELIKE || `${API_BASE}/removeLike`,
  MAIN: process.env.REACT_APP_API_MAIN || `${API_BASE}/main`,
  PROFILE: process.env.REACT_APP_API_PROFILE || `${API_BASE}/profile`,
  EDITPROFILE: process.env.REACT_APP_API_EDITPROFILE || `${API_BASE}/edit-profile`,
  FOLLOW: process.env.REACT_APP_API_FOLLOW || `${API_BASE}/follow`,
  UNFOLLOW: process.env.REACT_APP_API_UNFOLLOW || `${API_BASE}/unfollow`,
};

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || API_BASE || '/';

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

export { API_BASE, ENDPOINTS, axiosInstance, SOCKET_URL };
