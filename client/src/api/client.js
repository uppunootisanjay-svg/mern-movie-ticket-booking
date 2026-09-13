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

  // 35-second timeout for cloud instances
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

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

    // Fallback for demo login if cloud backend is momentarily asleep
    if (endpoint === '/auth/login' && body?.email === 'demo@cinepass.com') {
      return {
        _id: 'u_demo',
        name: 'Demo User',
        email: 'demo@cinepass.com',
        role: 'user',
        token: 'demo_token_cinepass'
      };
    }

    throw new Error('Backend server is waking up. Please wait 10 seconds and try again.');
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    if (endpoint === '/auth/login' && body?.email === 'demo@cinepass.com') {
      return {
        _id: 'u_demo',
        name: 'Demo User',
        email: 'demo@cinepass.com',
        role: 'user',
        token: 'demo_token_cinepass'
      };
    }
    throw new Error('Server starting up. Please retry.');
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
