import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

/**
 * Custom hook for managing URL state across the application
 * Provides centralized URL state management with validation and history handling
 */
export const useUrlState = (defaultValues = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [urlState, setUrlState] = useState(() => {
    // Initialize state from URL parameters
    const initialState = { ...defaultValues };
    for (const [key, value] of searchParams.entries()) {
      if (key === 'subcategories') {
        initialState[key] = value.split(',').filter(Boolean);
      } else {
        initialState[key] = value;
      }
    }
    return initialState;
  });

  // Sync urlState with searchParams changes (browser navigation, direct URL access)
  useEffect(() => {
    const newState = { ...defaultValues };
    for (const [key, value] of searchParams.entries()) {
      if (key === 'subcategories') {
        newState[key] = value.split(',').filter(Boolean);
      } else {
        newState[key] = value;
      }
    }
    setUrlState(newState);
  }, [searchParams]);

  // Update URL when state changes
  const updateUrl = useCallback((newState, options = {}) => {
    const { replace = false, preserveHistory = false } = options;
    
    // Merge with current state
    const updatedState = { ...urlState, ...newState };
    
    // Build new search params
    const newSearchParams = new URLSearchParams();
    
    Object.entries(updatedState).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newSearchParams.set(key, value.join(','));
          }
        } else {
          newSearchParams.set(key, String(value));
        }
      }
    });

    // Update URL without page reload
    if (replace || preserveHistory) {
      setSearchParams(newSearchParams, { replace });
    } else {
      setSearchParams(newSearchParams);
    }
    
    // Update local state to trigger re-renders
    setUrlState(updatedState);
  }, [urlState, setSearchParams]);

  // Clear specific parameters
  const clearUrlParams = useCallback((paramKeys) => {
    const newState = { ...urlState };
    paramKeys.forEach(key => {
      delete newState[key];
    });
    updateUrl(newState, { replace: true });
  }, [urlState, updateUrl]);

  // Navigate to new route with state
  const navigateWithState = useCallback((path, state = {}) => {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(','));
          }
        } else {
          params.set(key, String(value));
        }
      }
    });
    
    const queryString = params.toString();
    navigate(`${path}${queryString ? `?${queryString}` : ''}`);
  }, [navigate]);

  // Get specific URL parameter
  const getUrlParam = useCallback((key) => {
    return urlState[key];
  }, [urlState]);

  return {
    urlState,
    updateUrl,
    clearUrlParams,
    navigateWithState,
    getUrlParam,
    searchParams
  };
};

export default useUrlState;