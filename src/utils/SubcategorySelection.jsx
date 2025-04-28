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
    <div ref={componentRef} id="subcategory-top" className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-10">
        <button 
          onClick={handleBack} 
          className="inline-flex items-center text-gray-600 hover:text-black mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Categories
        </button>
        <h2 className="text-3xl font-light mb-4">
          Tell us about your {getCategoryName().toLowerCase()} project
        </h2>
        <p className="text-gray-600 mb-6">
          Select the aspects of your {getCategoryName().toLowerCase()} that you're interested in renovating.
          You can select multiple options or skip this step.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Select Options</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subcategories.map((subcat) => (
            <div 
              key={subcat.id}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all duration-200
                ${selectedSubcategories.includes(subcat.id) 
                  ? 'border-[#1a2e44] bg-[#1a2e44]/5 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}
              `}
              onClick={() => toggleSubcategory(subcat.id)}
            >
              <div className="flex items-center">
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center mr-3
                  ${selectedSubcategories.includes(subcat.id) 
                    ? 'bg-[#1a2e44] text-white' 
                    : 'border border-gray-300'}
                `}>
                  {selectedSubcategories.includes(subcat.id) && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{subcat.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:text-black border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Skip this step
          </button>
          
          {/* Continue button */}
          <button
            onClick={handleSubmit}
            disabled={selectedSubcategories.length === 0}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors
              ${selectedSubcategories.length > 0
                ? 'bg-[#1a2e44] text-white hover:bg-[#152435]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
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