// API Configuration
// For development: use local backend
// For production: use deployed backend

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// IMPORTANT: Update this with your deployed backend URL after deploying the server
const PRODUCTION_API_URL = 'https://atspeaksplease.vercel.app'; // ⚠️ This should be your BACKEND URL, not frontend URL
const DEVELOPMENT_API_URL = 'http://localhost:5000';

const API_URL = isDevelopment ? DEVELOPMENT_API_URL : PRODUCTION_API_URL;

console.log('🔗 API URL configured as:', API_URL);
console.log('🌍 Environment:', isDevelopment ? 'Development' : 'Production');

export const getApiUrl = () => {
  return API_URL;
};

export default API_URL;
