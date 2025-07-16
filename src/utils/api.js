// API utility for handling requests across different environments
// Dynamically detects the correct base URL for local development and production

/**
 * Get the API base URL based on environment
 * - Development: Uses the proxy defined in package.json
 * - Production: Uses the same origin as the frontend
 */
export const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    // In development, use relative URLs to leverage the proxy
    return '';
  }
  
  // In production, use your backend service URL
  return process.env.REACT_APP_API_BASE_URL || 'https://email-backend-832099135223.us-central1.run.app';
};

/**
 * Enhanced fetch wrapper with automatic base URL detection
 * @param {string} endpoint - The API endpoint (e.g., '/api/contact')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} - Fetch promise
 */
export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  // Default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Merge default headers with provided headers
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };
  
  // Enhanced options with default headers
  const requestOptions = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, requestOptions);
    
    // Log API requests in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${requestOptions.method || 'GET'} ${url}`);
      console.log('Request options:', requestOptions);
    }
    
    return response;
  } catch (error) {
    // Log errors in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('API Request failed:', error);
      console.error('URL:', url);
      console.error('Options:', requestOptions);
    }
    
    throw error;
  }
};

/**
 * POST request helper
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The data to send
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiPost = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * GET request helper
 * @param {string} endpoint - The API endpoint
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiGet = (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * PUT request helper
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The data to send
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiPut = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * DELETE request helper
 * @param {string} endpoint - The API endpoint
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiDelete = (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    method: 'DELETE',
    ...options,
  });
};