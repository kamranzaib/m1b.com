import { useState, useEffect, useCallback, useRef } from 'react';
import { useUrlState } from './useUrlState';
import { debounce } from '../utils/urlUtils';

/**
 * Custom hook for persisting form state in URL parameters
 * Handles form field synchronization with URL state and restoration
 */
export const useFormPersistence = (formConfig = {}) => {
  const { 
    fields = [], 
    debounceMs = 500, 
    excludeFromUrl = ['password', 'confirmPassword'],
    sensitiveFields = ['email', 'phone'] // Fields to exclude from URL sharing
  } = formConfig;

  const { urlState, updateUrl } = useUrlState();
  const [formData, setFormData] = useState({});
  const [isRestoring, setIsRestoring] = useState(true);
  const initializedRef = useRef(false);
  const updateUrlRef = useRef(updateUrl);
  
  // Keep updateUrl ref current
  useEffect(() => {
    updateUrlRef.current = updateUrl;
  }, [updateUrl]);

  // Initialize form data from URL state (only once)
  useEffect(() => {
    if (!initializedRef.current) {
      const initialFormData = {};
      fields.forEach(fieldName => {
        const urlValue = urlState[fieldName];
        if (urlValue !== undefined && urlValue !== null) {
          initialFormData[fieldName] = urlValue;
        }
      });
      setFormData(initialFormData);
      setIsRestoring(false);
      initializedRef.current = true;
    }
  }, [fields]);

  // Debounced URL update function  
  const debouncedUrlUpdate = useCallback(
    debounce((data) => {
      const urlData = {};
      Object.entries(data).forEach(([key, value]) => {
        if (!excludeFromUrl.includes(key) && value !== '' && value !== null && value !== undefined) {
          urlData[key] = value;
        }
      });
      updateUrlRef.current(urlData, { replace: true });
    }, debounceMs),
    [excludeFromUrl, debounceMs]
  );

  // Update form data and URL
  const updateFormData = useCallback((field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Update URL with debounce for non-sensitive fields
    if (!isRestoring) {
      debouncedUrlUpdate(newFormData);
    }
  }, [formData, debouncedUrlUpdate, isRestoring]);

  // Handle form field changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    updateFormData(name, fieldValue);
  }, [updateFormData]);

  // Bulk update form data
  const updateMultipleFields = useCallback((updates) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    
    if (!isRestoring) {
      debouncedUrlUpdate(newFormData);
    }
  }, [formData, debouncedUrlUpdate, isRestoring]);

  // Reset form data
  const resetForm = useCallback(() => {
    setFormData({});
    const urlKeysToRemove = fields.filter(field => !excludeFromUrl.includes(field));
    // Clear form-related URL parameters
    const clearedParams = {};
    urlKeysToRemove.forEach(key => {
      clearedParams[key] = null;
    });
    updateUrl(clearedParams, { replace: true });
  }, [fields, excludeFromUrl, updateUrl]);

  // Get shareable URL (excludes sensitive information)
  const getShareableUrl = useCallback(() => {
    const currentUrl = new URL(window.location);
    sensitiveFields.forEach(field => {
      currentUrl.searchParams.delete(field);
    });
    return currentUrl.toString();
  }, [sensitiveFields]);

  // Check if form has data
  const hasFormData = useCallback(() => {
    return Object.values(formData).some(value => 
      value !== '' && value !== null && value !== undefined
    );
  }, [formData]);

  // Validate form data based on URL state
  const validateFromUrl = useCallback(() => {
    const errors = {};
    fields.forEach(field => {
      const value = formData[field];
      if (field === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field] = 'Invalid email format';
        }
      }
      if (field === 'phone' && value) {
        const phoneRegex = /^\(?[\d\s\-\(\)\.]{10,}$/;
        if (!phoneRegex.test(value)) {
          errors[field] = 'Invalid phone format';
        }
      }
    });
    return errors;
  }, [formData, fields]);

  return {
    formData,
    handleChange,
    updateFormData,
    updateMultipleFields,
    resetForm,
    getShareableUrl,
    hasFormData,
    validateFromUrl,
    isRestoring
  };
};

export default useFormPersistence;