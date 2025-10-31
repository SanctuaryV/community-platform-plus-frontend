import axios from 'axios';

// All REST calls go through Nginx at /api → backend Service
const API_BASE = process.env.REACT_APP_API_URL || '/api';

// Keep endpoints as path segments (no leading slash) to avoid /api/api/...
const ENDPOINTS = {
  REGISTER: 'Register',
  LOGIN: 'Login',
  AUTHEN: 'authen',
  ROOM: 'room',
  MESSAGES: 'messages',
  FOLLOWING: 'following',
  GETGROUPS: 'getgroups',
  CREATEGROUPS: 'creategroups',
  DELETEGROUP: 'deletegroup',
  USERS: 'users',
  CREATEPOST: 'createPost',
  DELETEPOST: 'deletePost',
  UPDATEPOST: 'updatePost',
  ADDLIKE: 'addLike',
  ADDCOMMENT: 'addComment',
  REMOVELIKE: 'removeLike',
  MAIN: 'main',
  PROFILE: 'profile',
  EDITPROFILE: 'edit-profile',
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
};

// Socket.IO endpoint is its own path (do NOT set it to API_BASE)
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '/socket.io';

const axiosInstance = axios.create({ baseURL: API_BASE });

// Usage example:
// axiosInstance.post(ENDPOINTS.REGISTER, payload)  // -> POST /api/Register

export { API_BASE, ENDPOINTS, axiosInstance, SOCKET_URL };
