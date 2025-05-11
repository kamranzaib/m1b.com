// src/components/ProjectDetailsForm.jsx
import React from 'react';
import { 
  serviceCategories, 
  renovationCategories,
  customHomeCategories,
  commercialCategories,
  kitchenSubCategories, 
  bathroomSubCategories,
  structuralSubCategories,
  modernHomeSubCategories,
  retailSubCategories,
  subCategories
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
  
  const getCategoryName = () => {
    const categoryObj = categories.find(c => c.id === selectedCategory);
    return categoryObj ? categoryObj.name : '';
  };
  
  // Enhanced getSubcategoryNames to handle all category types
  const getSubcategoryNames = () => {
    if (!selectedCategory || !selectedSubcategories || selectedSubcategories.length === 0) {
      return [];
    }

    let subcategoriesList = [];
    const serviceId = getServiceId();
    
    // Get the appropriate subcategory list based on category and service type
    if (serviceId === '1') { // Custom Home Building
      switch(selectedCategory) {
        case 'modern':
          subcategoriesList = modernHomeSubCategories;
          break;
        default:
          subcategoriesList = subCategories['1'] || [];
          break;
      }
    } else if (serviceId === '2') { // Renovations
      switch(selectedCategory) {
        case 'kitchen':
          subcategoriesList = kitchenSubCategories;
          break;
        case 'bathroom':
          subcategoriesList = bathroomSubCategories;
          break;
        case 'structural':
          subcategoriesList = structuralSubCategories;
          break;
        default:
          subcategoriesList = subCategories['2'] || [];
          break;
      }
    } else if (serviceId === '3') { // Commercial
      switch(selectedCategory) {
        case 'retail':
          subcategoriesList = retailSubCategories;
          break;
        default:
          subcategoriesList = subCategories['3'] || [];
          break;
      }
    }
    
    // Map selected IDs to names
    return selectedSubcategories.map(subId => {
      const subcat = subcategoriesList.find(s => s.id === subId);
      return subcat ? subcat.name : '';
    }).filter(name => name);
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
  
  const subcategoryNames = getSubcategoryNames();
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-8 border border-gray-100">
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
              value={projectDetails.area}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base"
              placeholder="e.g. 200"
              required
              disabled={isSubmitting}
            />
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
                  className={`p-2 sm:p-3 rounded-lg border text-center text-xs sm:text-sm ${
                    projectDetails.budget === option 
                      ? 'border-[#1a2e44] bg-[#1a2e44] text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={() => !isSubmitting && handleChange({
                    target: { name: 'budget', value: option }
                  })}
                  disabled={isSubmitting}
                >
                  {option === 'economy' ? 'Economy' : option === 'medium' ? 'Mid-Range' : 'Premium'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Project Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Project Description
            </label>
            <textarea
              name="description"
              value={projectDetails.description}
              onChange={handleChange}
              rows="4" 
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base"
              placeholder="Describe what you want to accomplish"
              required
              disabled={isSubmitting}
            ></textarea>
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
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Full Name</label>
              <input
                type="text"
                name="name"
                value={projectDetails.name}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base"
                required
                disabled={isSubmitting}
              />
            </div>
            
            {/* Email Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email Address</label>
              <input
                type="email"
                name="email"
                value={projectDetails.email}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base"
                required
                disabled={isSubmitting}
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={projectDetails.phone}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent text-sm sm:text-base"
                disabled={isSubmitting}
              />
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;