/**
 * Central HTTP API Service Layer.
 * Demonstrates:
 * - Decoupling React UI components from low-level fetch/HTTP details.
 * - Centralized Bearer Token injection via request headers.
 * - Standardized error parsing and HTTP status code normalization.
 */

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || '/api';

export async function apiRequest(endpoint, { method = 'GET', body = null, params = {} } = {}) {
  const token = localStorage.getItem('cc_token');

  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      queryParams.append(key, val);
    }
  });

  const queryString = queryParams.toString();
  const url = `${API_BASE}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers = {
    'Accept': 'application/json',
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (netErr) {
    const error = new Error(`Network connection error: Unable to reach ${url}. Please ensure the Spring Boot server is running on port 8080.`);
    error.status = 0;
    error.cause = netErr;
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    // If 401 Unauthorized and a token was attached, the session is expired or invalid
    if (response.status === 401 && token) {
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_user');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    let errorMsg = (data && data.message) || `HTTP Error ${response.status}: ${response.statusText}`;
    if (data && data.validationErrors) {
      const fieldErrors = Object.entries(data.validationErrors)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(', ');
      errorMsg = `${errorMsg} (${fieldErrors})`;
    }
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
