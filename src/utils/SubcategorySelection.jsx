import React, { useState, useEffect, useRef} from 'react';

import { 
  kitchenSubCategories, 
  bathroomSubCategories, 
  structuralSubCategories,
  modernHomeSubCategories,
  retailSubCategories,
  subCategories
} from '../data/categories';

const SubcategorySelection = ({ category, serviceId, onBack, onSubmit, categories }) => {
  
  const componentRef = useRef(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Get the appropriate subcategories based on the category and service
  const getSubcategories = () => {
    if (serviceId === '1') { // Custom Home Building
      switch(category) {
        case 'modern':
          return modernHomeSubCategories;
        // Add cases for other custom home categories
        default:
          return subCategories['1']; // Default to general custom home subcategories
      }
    } else if (serviceId === '2') { // Renovations
      switch(category) {
        case 'kitchen':
          return kitchenSubCategories;
        case 'bathroom':
          return bathroomSubCategories;
        case 'structural':
          return structuralSubCategories;
        // Add cases for other renovation categories
        default:
          return subCategories['2']; // Default to general renovation subcategories
      }
    } else if (serviceId === '3') { // Commercial
      switch(category) {
        case 'retail':
          return retailSubCategories;
        // Add cases for other commercial categories
        default:
          return subCategories['3']; // Default to general commercial subcategories
      }
    }
    
    return []; // Default empty array if no matching category
  };
  
  const subcategories = getSubcategories();
  
  const toggleSubcategory = (id) => {
    if (selectedSubcategories.includes(id)) {
      setSelectedSubcategories(selectedSubcategories.filter(item => item !== id));
    } else {
      setSelectedSubcategories([...selectedSubcategories, id]);
    }
  };
  
  const handleSubmit = () => {
    // Only proceed if at least one subcategory is selected
    if (selectedSubcategories.length > 0) {
      onSubmit(selectedSubcategories);
    }
  };
  
  const handleSkip = () => {
    // Skip subcategory selection and proceed with empty selection
    onSubmit([]);
  };
  
  // Handle back navigation with smooth scrolling
  const handleBack = () => {
    // First change the screen state through the parent's callback
    onBack();
    // No need to add manual scrolling here as it's handled by the parent component
  };
  
  const getCategoryName = () => {
    const categoryObj = categories.find(c => c.id === category);
    return categoryObj ? categoryObj.name : '';
  };
  
  return (
    <div ref={componentRef} id="subcategory-top" className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 text-white">
      <div className="mb-6 sm:mb-10">
        <button 
          onClick={handleBack} 
          className="inline-flex items-center text-gray-600 hover:text-black mb-3 sm:mb-4 text-sm sm:text-base text-white"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Categories
        </button>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4">
          Tell us about your {getCategoryName().toLowerCase()} project
        </h2>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-white">
          Select the aspects of your {getCategoryName().toLowerCase()} that you're interested in renovating.
          You can select multiple options or skip this step.
        </p>
      </div>
      
      <div className="bg-[#1a2e44]/100 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-8 border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Select Options</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {subcategories.map((subcat) => (
            <div 
              key={subcat.id}
              className={`
                border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200
                ${selectedSubcategories.includes(subcat.id) 
                  ? 'border border-gray-300 text-white hover:text-black hover:border-gray-400 transition-colors' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}
              `}
              onClick={() => toggleSubcategory(subcat.id)}
            >
              <div className="flex items-center">
                <div className={`
                  w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3
                  ${selectedSubcategories.includes(subcat.id) 
                    ? 'bg-[#1a2e44] text-white' 
                    : 'border border-gray-300'}
                `}>
                  {selectedSubcategories.includes(subcat.id) && (
                    <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-sm sm:text-base">{subcat.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-white hover:text-black border border-gray-300 hover:border-gray-400 transition-colors text-sm sm:text-base"
          >
            Skip this step
          </button>
          
          {/* Continue button */}
          <button
            onClick={handleSubmit}
            disabled={selectedSubcategories.length === 0}
            className={`
              w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base
              ${selectedSubcategories.length > 0
                               ? 'bg-[#1a2e44] text-white border border-white hover:bg-[#152435]'
                : 'bg-[#1a2e44]/10 text-gray-500 cursor-not-allowed border border-white/30'}
            `}
          >
            Continue to Details
            {selectedSubcategories.length > 0 && (
              <span className="ml-2 bg-white/20 text-white text-xs rounded-full px-2 py-1">
                {selectedSubcategories.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubcategorySelection;