/**
 * URL utility functions for construction app
 * Handles URL generation, parameter encoding/decoding, and validation
 */

// Service ID to slug mapping
export const serviceIdToSlug = {
  '1': 'custom-home',
  '2': 'renovations',
  '3': 'commercial'
};

export const serviceSlugToId = {
  'custom-home': '1',
  'renovations': '2',
  'commercial': '3'
};

// Category ID to slug mapping (for SEO-friendly URLs)
export const categoryIdToSlug = {
  // Renovation categories
  'kitchen': 'kitchen',
  'bathroom': 'bathroom',
  'structural': 'structural',
  'livingroom': 'living-room',
  'basement': 'basement',
  'outdoor': 'outdoor-space',
  
  // Custom home categories
  'modern': 'modern',
  'traditional': 'traditional',
  'contemporary': 'contemporary',
  'ecological': 'ecological',
  'luxury': 'luxury',
  'farmhouse': 'farmhouse',
  
  // Commercial categories
  'retail': 'retail',
  'office': 'office',
  'restaurant': 'restaurant',
  'hotel': 'hotel',
  'medical': 'medical',
  'industrial': 'industrial'
};

export const categorySlugToId = Object.fromEntries(
  Object.entries(categoryIdToSlug).map(([id, slug]) => [slug, id])
);

/**
 * Build URL with parameters
 */
export const buildUrl = (basePath, params = {}) => {
  const url = new URL(basePath, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          url.searchParams.set(key, value.join(','));
        }
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });
  
  return url.pathname + url.search;
};

/**
 * Parse URL parameters into object
 */
export const parseUrlParams = (searchParams) => {
  const params = {};
  
  for (const [key, value] of searchParams.entries()) {
    if (key === 'subcategories') {
      params[key] = value.split(',').filter(Boolean);
    } else {
      params[key] = value;
    }
  }
  
  return params;
};

/**
 * Validate URL parameters
 */
export const validateUrlParams = (params) => {
  const errors = {};
  
  // Validate service
  if (params.service && !serviceSlugToId[params.service]) {
    errors.service = `Invalid service: ${params.service}`;
  }
  
  // Validate category
  if (params.category && !categorySlugToId[params.category]) {
    errors.category = `Invalid category: ${params.category}`;
  }
  
  // Validate step
  const validSteps = ['categories', 'subcategories', 'form', 'confirmation'];
  if (params.step && !validSteps.includes(params.step)) {
    errors.step = `Invalid step: ${params.step}`;
  }
  
  // Validate email format
  if (params.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      errors.email = 'Invalid email format';
    }
  }
  
  // Validate phone format
  if (params.phone) {
    const phoneRegex = /^\(?[\d\s\-\(\)\.]{10,}$/;
    if (!phoneRegex.test(params.phone)) {
      errors.phone = 'Invalid phone format';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitize URL parameters
 */
export const sanitizeUrlParams = (params) => {
  const sanitized = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (typeof value === 'string') {
        // Remove potentially dangerous characters
        sanitized[key] = value.replace(/[<>\"']/g, '');
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item => 
          typeof item === 'string' ? item.replace(/[<>\"']/g, '') : item
        );
      } else {
        sanitized[key] = value;
      }
    }
  });
  
  return sanitized;
};

/**
 * Generate SEO-friendly URL
 */
export const generateSeoUrl = (service, category, subcategories = []) => {
  const params = {};
  
  if (service) {
    params.service = serviceIdToSlug[service] || service;
  }
  
  if (category) {
    params.category = categoryIdToSlug[category] || category;
  }
  
  if (subcategories && subcategories.length > 0) {
    params.subcategories = subcategories;
  }
  
  return buildUrl('/details', params);
};

/**
 * Generate shareable URL (excludes sensitive information)
 */
export const generateShareableUrl = (params) => {
  const sensitiveFields = ['email', 'phone', 'name'];
  const shareableParams = { ...params };
  
  sensitiveFields.forEach(field => {
    delete shareableParams[field];
  });
  
  return buildUrl(window.location.pathname, shareableParams);
};

/**
 * Debounce function for URL updates
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get context-aware navigation URLs
 */
export const getContextualUrls = (currentParams = {}) => {
  return {
    // Services page with highlighting
    services: (highlight) => buildUrl('/services', { highlight }),
    
    // Portfolio with filters
    portfolio: (filters = {}) => buildUrl('/portfolio', filters),
    
    // Contact with context
    contact: (context = {}) => buildUrl('/contact', { 
      source: context.source || 'direct',
      ...context 
    }),
    
    // About with section focus
    about: (section) => buildUrl('/about', { section }),
    
    // Details flow
    details: (params = {}) => buildUrl('/details', { ...currentParams, ...params })
  };
};

/**
 * Extract project context from URL
 */
export const extractProjectContext = (params) => {
  const context = {
    service: params.service,
    category: params.category,
    subcategories: params.subcategories || [],
    step: params.step || 'categories'
  };
  
  // Add human-readable labels
  context.serviceLabel = getServiceLabel(params.service);
  context.categoryLabel = getCategoryLabel(params.category);
  
  return context;
};

/**
 * Get service label from slug
 */
export const getServiceLabel = (serviceSlug) => {
  const labels = {
    'custom-home': 'Custom Home Building',
    'renovations': 'Renovations & Additions',
    'commercial': 'Commercial Projects'
  };
  return labels[serviceSlug] || serviceSlug;
};

/**
 * Get category label from slug
 */
export const getCategoryLabel = (categorySlug) => {
  const labels = {
    'kitchen': 'Kitchen',
    'bathroom': 'Bathroom',
    'structural': 'Structural',
    'living-room': 'Living Room',
    'basement': 'Basement',
    'outdoor-space': 'Outdoor Space',
    'modern': 'Modern Design',
    'traditional': 'Traditional Style',
    'contemporary': 'Contemporary',
    'ecological': 'Ecological',
    'luxury': 'Luxury',
    'farmhouse': 'Farmhouse',
    'retail': 'Retail Spaces',
    'office': 'Office Buildings',
    'restaurant': 'Restaurants & Cafes',
    'hotel': 'Hotels & Hospitality',
    'medical': 'Medical Facilities',
    'industrial': 'Industrial Buildings'
  };
  return labels[categorySlug] || categorySlug;
};

/**
 * Check if URL represents a deep link
 */
export const isDeepLink = (params) => {
  return !!(params.service || params.category || params.step);
};

/**
 * Generate meta tags for SEO based on URL parameters
 */
export const generateMetaTags = (params) => {
  const { service, category, step } = params;
  const serviceLabel = getServiceLabel(service);
  const categoryLabel = getCategoryLabel(category);
  
  let title = 'M1B Construction';
  let description = 'Professional construction services in New York';
  
  if (service && category) {
    title = `${categoryLabel} - ${serviceLabel} | M1B Construction`;
    description = `Professional ${categoryLabel.toLowerCase()} services for ${serviceLabel.toLowerCase()}. Get a free estimate today.`;
  } else if (service) {
    title = `${serviceLabel} | M1B Construction`;
    description = `Professional ${serviceLabel.toLowerCase()} services. Custom solutions for your project needs.`;
  }
  
  if (step === 'form') {
    title = `Get Quote - ${title}`;
  }
  
  return {
    title,
    description,
    canonical: window.location.href
  };
};