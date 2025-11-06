import axios from 'axios';

// All REST calls go through Nginx at /api → backend Service
// Use environment variable or fallback to relative path
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

// Socket.IO configuration from environment variables
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || window.location.origin;
const SOCKET_PATH = process.env.REACT_APP_SOCKET_PATH || '/socket.io';

// Socket.IO connection options
const SOCKET_OPTIONS = {
  path: SOCKET_PATH,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
};

const axiosInstance = axios.create({ 
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token and logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('\n🔵 [API REQUEST]', config.method.toUpperCase(), config.url);
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('📤 Headers:', config.headers);
    
    if (config.data) {
      // Mask sensitive data
      const logData = { ...config.data };
      if (logData.password) logData.password = '***';
      console.log('📦 Data:', logData);
    }
    
    if (config.params) {
      console.log('🔍 Params:', config.params);
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token:', token.substring(0, 20) + '...');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ [API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ [API RESPONSE]', response.config.method.toUpperCase(), response.config.url);
    console.log('📥 Status:', response.status, response.statusText);
    console.log('📦 Data:', response.data);
    console.log('⏱️ Duration:', new Date().toISOString());
    console.log('-----------------------------------\n');
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ [API RESPONSE ERROR]', error.response.config.method.toUpperCase(), error.response.config.url);
      console.error('📥 Status:', error.response.status, error.response.statusText);
      console.error('📦 Error Data:', error.response.data);
    } else if (error.request) {
      console.error('❌ [API NO RESPONSE]', error.request);
    } else {
      console.error('❌ [API ERROR]', error.message);
    }
    console.log('-----------------------------------\n');
    return Promise.reject(error);
  }
);

// Usage example:
// axiosInstance.post(ENDPOINTS.REGISTER, payload)  // -> POST /api/Register

export { 
  API_BASE, 
  ENDPOINTS, 
  axiosInstance, 
  SOCKET_URL, 
  SOCKET_PATH,
  SOCKET_OPTIONS 
};
