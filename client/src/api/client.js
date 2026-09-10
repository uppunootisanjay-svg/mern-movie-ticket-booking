// Determine API base URL:
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

  // 4-second timeout prevents browser hanging when Render free tier is sleeping
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (netErr) {
    clearTimeout(timeoutId);
    throw new Error('Backend server is offline or sleeping');
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    throw new Error('Non-JSON response from backend');
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
