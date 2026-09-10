// Use VITE_API_BASE_URL if set in environment (e.g. Render backend URL on Vercel), else fallback to '/api'
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl) return '/api';
  const clean = envUrl.replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
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
    throw new Error('Cannot connect to the backend server. Please make sure the backend is running.');
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    throw new Error('The backend server is offline or returned an error.');
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
