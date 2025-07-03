// src/components/ProjectDetailsForm.jsx
import React, { useState, useEffect } from 'react';
import UploadPhoto from '../utils/photoUploader';
import { 
  serviceCategories, 
  renovationCategories,
  customHomeCategories,
  commercialCategories,
  getSubcategories  // IMPORT THIS FROM THE DATA FILE
} from '../data/categories';

const ProjectDetailsForm = ({ 
  projectDetails, 
  handleChange, 
  handleSubmit, 
  isSubmitting, 
  selectedCategory,
  selectedSubcategories,
  categories 
}) => {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  // Merged form data state
  const [mergedFormData, setMergedFormData] = useState({});

  // Placeholder for updateFormData
  const updateFormData = (name, value) => {
    setMergedFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form data for required fields and email format
  const validateFormData = (data, type) => {
    const errors = {};
    
    if (!data.name || data.name.trim() === '') {
      errors.name = 'Full name is required.';
    }

    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email address is required.';
    } else {
      // Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  };

  
  const getCategoryName = () => {
    const categoryObj = categories.find(c => c.id === selectedCategory);
    return categoryObj ? categoryObj.name : '';
  };
  
  // Helper function to determine service ID
  const getServiceId = () => {
    if (!categories || categories.length === 0) return '2'; // Default to renovation
    
    const categoryObj = categories.find(c => c.id === selectedCategory);
    if (!categoryObj) return '2';
    
    // Check which category list this belongs to
    if (customHomeCategories.some(c => c.id === selectedCategory)) {
      return '1'; // Custom Home
    } else if (renovationCategories.some(c => c.id === selectedCategory)) {
      return '2'; // Renovation
    } else if (commercialCategories.some(c => c.id === selectedCategory)) {
      return '3'; // Commercial
    }
    
    return '2'; // Default to renovation
  };

  // Updated getSubcategoryNames to ensure only selected subcategories (valid for the chosen category) are submitted
  const getSubcategoryNames = () => {
    if (!selectedCategory || !selectedSubcategories || selectedSubcategories.length === 0) {
      return [];
    }

    const subcategoriesList = getSubcategories(selectedCategory); // NOW USES THE IMPORTED FUNCTION
    const validSubIds = new Set(subcategoriesList.map(s => s.id));

    return selectedSubcategories
      .filter(subId => validSubIds.has(subId))
      .map(subId => {
        const subcat = subcategoriesList.find(s => s.id === subId);
        return subcat?.name || '';
      })
      .filter(name => name);
  };
  
  const subcategoryNames = getSubcategoryNames();
  
  // Enhanced form change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    // Update local form data
    updateFormData(name, value);
    
    // Call parent handler for URL persistence
    handleChange(e);
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Enhanced form submission with validation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowValidation(true);
    
    // Validate form data
    const validation = validateFormData(mergedFormData, 'form');
    setFormErrors(validation.errors);
    
    if (!validation.isValid) {
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    const finalData = {
      ...mergedFormData,
      uploadedPhotos,
      category: getCategoryName(),
      subcategories: getSubcategoryNames(),
    };
    handleSubmit(e, finalData);
  };

  
  // Handle budget selection
  const handleBudgetSelect = (budget) => {
    const syntheticEvent = {
      target: { name: 'budget', value: budget }
    };
    handleFormChange(syntheticEvent);
  };


  return (
    <div>

      <form onSubmit={handleFormSubmit} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-8 border border-gray-100">
        {/* Selected Options - Displayed at the top if there are any */}
        {subcategoryNames.length > 0 && (
          <div className="mb-4 sm:mb-6 py-3 sm:py-4 border-b border-gray-200">
            <h4 className="text-gray-700 font-medium mb-2 text-sm sm:text-base">Selected Options:</h4>
            <div className="flex flex-wrap gap-2">
              {subcategoryNames.map((name, index) => (
                <span 
                  key={index}
                  className="bg-[#1a2e44]/10 text-[#1a2e44] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Form Layout - Improved for landscape view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
              Project Details
            </h3>
            
            {/* Approximate Area */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Approximate Area (sq ft)
              </label>
              <input
                type="text"
                name="area"
                value={mergedFormData.area || ''}
                onChange={handleFormChange}
                className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base text-gray-800 ${
                  formErrors.area ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. 200"
                disabled={isSubmitting}
              />
              {formErrors.area && (
                <p className="text-red-500 text-xs mt-1">{formErrors.area}</p>
              )}
            </div>
            
            {/* Budget Range */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Budget Range
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {['economy', 'medium', 'premium'].map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`p-2 sm:p-3 rounded-lg border text-center text-xs sm:text-sm transition-colors ${
                      mergedFormData.budget === option 
                        ? 'border-[#1a2e44] bg-[#1a2e44] text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                    onClick={() => !isSubmitting && handleBudgetSelect(option)}
                    disabled={isSubmitting}
                  >
                    {option === 'economy' ? 'Economy' : option === 'medium' ? 'Mid-Range' : 'Premium'}
                  </button>
                ))}
              </div>
              {formErrors.budget && (
                <p className="text-red-500 text-xs mt-1">{formErrors.budget}</p>
              )}
            </div>

            {/* Upload Photo */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Upload a Photo (optional)
              </label>
              <UploadPhoto onUploadComplete={(files) => setUploadedPhotos(files)} />
            </div>
            
            {/* Project Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Project Description
              </label>
              <textarea
                name="description"
                value={mergedFormData.description || ''}
                onChange={handleFormChange}
                rows="4" 
                className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base text-gray-800 ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe what you want to accomplish..."
                disabled={isSubmitting}
              ></textarea>
              {formErrors.description && (
                <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          {/* Right Column: Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
              Your Contact Information
            </h3>
            
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={mergedFormData.name || ''}
                  onChange={handleFormChange}
                  className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base text-gray-800 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              
              {/* Email Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={mergedFormData.email || ''}
                  onChange={handleFormChange}
                  className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base text-gray-800 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
              
              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={mergedFormData.phone || ''}
                  onChange={handleFormChange}
                  className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base text-gray-800 ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-6 sm:mt-8">
              <button
                type="submit"
                className={`w-full bg-black hover:bg-gray-800 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed bg-gray-700' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Request'
                )}
              </button>
              
              {showValidation && Object.keys(formErrors).length > 0 && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium mb-1">Please fix the following errors:</p>
                  <ul className="text-red-600 text-xs space-y-1">
                    {Object.entries(formErrors).map(([field, error]) => (
                      <li key={field}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetailsForm;