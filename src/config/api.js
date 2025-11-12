// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'https://atspeaks-zqwc.vercel.app';

console.log('🔗 API URL configured as:', API_URL);

export const getApiUrl = () => {
  return API_URL;
};

export default API_URL;
