/**
 * Step validation utilities for multi-step navigation
 * Ensures users can only access valid steps based on their current progress
 */

import { serviceSlugToId, categorySlugToId } from './urlUtils';

/**
 * Validate if a user can transition to a specific step
 */
export const validateStepTransition = (urlState, targetStep, requiredFields = {}) => {
  const { service, category, subcategories, step: currentStep } = urlState;
  
  switch (targetStep) {
    case 'categories':
      // Categories step only requires a service selection
      // If no service, should redirect to service selection (not implemented in this flow)
      return true; // Allow access to categories regardless
      
    case 'subcategories':
      // Subcategories requires service and category
      if (!service) {
        return false;
      }
      if (!category) {
        return false;
      }
      // Validate service exists
      if (!isValidService(service)) {
        return false;
      }
      // Validate category exists for this service
      if (!isValidCategory(service, category)) {
        return false;
      }
      return true;
      
    case 'form':
      // Form requires service and category, but subcategories can be empty (skipped)
      if (!service || !category) {
        return false;
      }
      // Validate all selections are valid
      if (!isValidService(service) || !isValidCategory(service, category)) {
        return false;
      }
      // Only validate subcategories if they exist (allow empty for skip functionality)
      if (subcategories && subcategories.length > 0 && !areValidSubcategories(category, subcategories)) {
        return false;
      }
      return true;
      
    case 'confirmation':
      // Confirmation requires all previous steps plus required form fields
      if (!service || !category) {
        return false;
      }
      
      // Check required form fields
      const formRequiredFields = requiredFields.form || ['name', 'email'];
      const hasRequiredFields = formRequiredFields.every(field => {
        const value = urlState[field];
        return value && value.trim() !== '';
      });
      
      if (!hasRequiredFields) {
        return false;
      }
      
      // Validate email format if present
      if (urlState.email && !isValidEmail(urlState.email)) {
        return false;
      }
      
      return true;
      
    default:
      return false;
  }
};

/**
 * Check if service is valid
 */
export const isValidService = (service) => {
  const validServices = ['custom-home', 'renovations', 'commercial'];
  return validServices.includes(service) || serviceSlugToId[service];
};

/**
 * Check if category is valid for given service
 */
export const isValidCategory = (service, category) => {
  if (!isValidService(service)) return false;
  
  const serviceId = serviceSlugToId[service] || service;
  
  const validCategories = {
    '1': ['modern', 'traditional', 'contemporary', 'ecological', 'luxury', 'farmhouse'], // Custom Home
    '2': ['kitchen', 'bathroom', 'structural', 'livingroom', 'basement', 'outdoor'], // Renovations
    '3': ['retail', 'office', 'restaurant', 'hotel', 'medical', 'industrial'] // Commercial
  };
  
  const categoriesForService = validCategories[serviceId] || [];
  return categoriesForService.includes(category) || categorySlugToId[category];
};

/**
 * Check if subcategories are valid for given category
 */
export const areValidSubcategories = (category, subcategories) => {
  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    return false;
  }
  
  const validSubcategories = {
    // Renovation subcategories
    'kitchen': ['countertops', 'flooring', 'layout', 'painting', 'appliances', 'cabinets', 'demolition', 'lighting', 'sink', 'plumbing'],
    'bathroom': ['tub', 'shower', 'toilet', 'vanity', 'tile', 'flooring', 'plumbing', 'ventilation', 'lighting', 'demolition'],
    'structural': ['foundation', 'beams', 'walls', 'framing', 'roofing', 'waterproofing', 'insulation', 'seismic'],
    'livingroom': ['structural-changes', 'interior-design', 'fireplace-mantel', 'lighting', 'windows-doors', 'audio-visual', 'furniture-layout'],
    'basement': ['finishing', 'waterproofing', 'insulation', 'flooring', 'lighting', 'plumbing', 'layout-design'],
    'outdoor': ['deck', 'patio', 'landscaping', 'lighting', 'structure'],
    
    // Custom home subcategories
    'modern': ['openplan', 'minimalist', 'glass', 'smarttech', 'flatroof', 'industrial'],
    'traditional': ['molding', 'fireplace', 'porch', 'roof', 'paneling'],
    'contemporary': ['asymmetry', 'mixedmaterials', 'largewindows', 'flatroof', 'openinterior'],
    'ecological': ['solar', 'greenroof', 'geothermal', 'recycled', 'rainwater'],
    'luxury': ['spa', 'theater', 'winecellar', 'grandentry', 'customstone'],
    'farmhouse': ['shiplap', 'barndoors', 'wraparound', 'farmkitchen', 'reclaimedwood'],
    
    // Commercial subcategories
    'retail': ['storefront', 'display', 'lighting', 'flooring', 'checkout', 'storage'],
    'office': ['workstations', 'conference', 'acoustic', 'lighting', 'networking', 'breakroom'],
    'restaurant': ['kitchen', 'dining', 'bar', 'hvac', 'restrooms', 'lighting'],
    'hotel': ['guestrooms', 'lobby', 'amenities', 'elevators', 'hallways', 'bathrooms'],
    'medical': ['exam', 'waiting', 'surgical', 'compliance', 'sterile', 'plumbing'],
    'industrial': ['warehouse', 'loading', 'mezzanine', 'electrical', 'fire', 'flooring']
  };
  
  const validSubs = validSubcategories[category] || [];
  return subcategories.every(sub => validSubs.includes(sub));
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\(?[\d\s\-\(\)\.]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Get the next valid step based on current state
 */
export const getNextValidStep = (urlState) => {
  const { service, category, subcategories } = urlState;
  
  if (!service) {
    return 'categories'; // Need to select service first (or redirect to services page)
  }
  
  if (!category) {
    return 'categories';
  }
  
  // Allow progression to form even with empty subcategories (skip functionality)
  return 'form';
};

/**
 * Get validation errors for current URL state
 */
export const getValidationErrors = (urlState, targetStep = null) => {
  const errors = [];
  const { service, category, subcategories, email, phone, name } = urlState;
  const step = targetStep || urlState.step;
  
  // Service validation
  if (service && !isValidService(service)) {
    errors.push(`Invalid service: ${service}`);
  }
  
  // Category validation
  if (category) {
    if (!service) {
      errors.push('Service is required when category is specified');
    } else if (!isValidCategory(service, category)) {
      errors.push(`Invalid category "${category}" for service "${service}"`);
    }
  }
  
  // Subcategories validation
  if (subcategories && subcategories.length > 0) {
    if (!category) {
      errors.push('Category is required when subcategories are specified');
    } else if (!areValidSubcategories(category, subcategories)) {
      errors.push(`Invalid subcategories for category "${category}"`);
    }
  }
  
  // Form field validation
  if (email && !isValidEmail(email)) {
    errors.push('Invalid email format');
  }
  
  if (phone && !isValidPhone(phone)) {
    errors.push('Invalid phone format');
  }
  
  // Step-specific validation
  if (step) {
    if (!validateStepTransition(urlState, step)) {
      errors.push(`Cannot access step "${step}" with current state`);
    }
  }
  
  return errors;
};

/**
 * Sanitize and fix URL state
 */
export const sanitizeUrlState = (urlState) => {
  const sanitized = { ...urlState };
  
  // Remove invalid service
  if (sanitized.service && !isValidService(sanitized.service)) {
    delete sanitized.service;
    delete sanitized.category; // Category becomes invalid too
    delete sanitized.subcategories;
  }
  
  // Remove invalid category
  if (sanitized.category && sanitized.service && !isValidCategory(sanitized.service, sanitized.category)) {
    delete sanitized.category;
    delete sanitized.subcategories; // Subcategories become invalid too
  }
  
  // Remove invalid subcategories
  if (sanitized.subcategories && sanitized.category) {
    const validSubs = sanitized.subcategories.filter(sub => {
      // This is a simplified check - in real implementation, check against actual subcategory list
      return typeof sub === 'string' && sub.length > 0;
    });
    if (validSubs.length === 0) {
      delete sanitized.subcategories;
    } else {
      sanitized.subcategories = validSubs;
    }
  }
  
  // Fix step based on available data
  if (sanitized.step) {
    const nextValidStep = getNextValidStep(sanitized);
    if (!validateStepTransition(sanitized, sanitized.step)) {
      sanitized.step = nextValidStep;
    }
  }
  
  return sanitized;
};

/**
 * Check if URL state represents a complete project specification
 */
export const isCompleteProjectSpec = (urlState) => {
  const { service, category, subcategories, name, email } = urlState;
  
  return !!(
    service &&
    category &&
    subcategories &&
    subcategories.length > 0 &&
    name &&
    email &&
    isValidEmail(email)
  );
};

export default {
  validateStepTransition,
  isValidService,
  isValidCategory,
  areValidSubcategories,
  isValidEmail,
  isValidPhone,
  getNextValidStep,
  getValidationErrors,
  sanitizeUrlState,
  isCompleteProjectSpec
};