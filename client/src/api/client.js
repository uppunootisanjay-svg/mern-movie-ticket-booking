// Determine API base URL:
// 1. If VITE_API_BASE_URL is set, use it.
// 2. If running on production (Vercel / domain other than localhost), default directly to your deployed Render backend.
// 3. If running locally on localhost/127.0.0.1, use '/api' to leverage Vite's local proxy.
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    const clean = envUrl.replace(/\/+$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://mern-movie-ticket-booking-1.onrender.com/api';
    }
  }

  return '/api';
};

const API_BASE_URL = getBaseUrl();

export const apiClient = async (endpoint, { method = 'GET', body, token } = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const storedToken = token || localStorage.getItem('cinepass_token');
  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (netErr) {
    throw new Error('Cannot connect to backend. Render free tier may be waking up (takes ~30s on first request).');
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    throw new Error('Backend server is starting up or returned an error.');
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
