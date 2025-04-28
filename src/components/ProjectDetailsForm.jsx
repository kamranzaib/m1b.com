import React from 'react';
import { 
  serviceCategories, 
  renovationCategories,
  customHomeCategories,
  commercialCategories,
  kitchenSubCategories, 
  bathroomSubCategories,
  structuralSubCategories
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
  
  // Get subcategory names
  const getSubcategoryNames = () => {
    let subcategories = [];
    
    if (selectedCategory === 'kitchen') {
      subcategories = kitchenSubCategories;
    } else if (selectedCategory === 'bathroom') {
      subcategories = bathroomSubCategories;
    }
    
    return selectedSubcategories.map(subId => {
      const subcat = subcategories.find(s => s.id === subId);
      return subcat ? subcat.name : '';
    }).filter(name => name);
  };
  
  const subcategoryNames = getSubcategoryNames();
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      {subcategoryNames.length > 0 && (
        <div className="mb-6 pt-4 pb-4 border-t border-b border-gray-200">
          <h4 className="text-gray-700 font-medium mb-2">Selected Options:</h4>
          <div className="flex flex-wrap gap-2">
            {subcategoryNames.map((name, index) => (
              <span 
                key={index}
                className="bg-[#1a2e44]/10 text-[#1a2e44] px-3 py-1 rounded-full text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Approximate Area (sq ft)
        </label>
        <input
          type="text"
          name="area"
          value={projectDetails.area}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
          placeholder="e.g. 200"
          required
        />
      </div>
      
      {/* Budget Range */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Budget Range
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['economy', 'medium', 'premium'].map(option => (
            <button
              key={option}
              type="button"
              className={`p-3 rounded-lg border text-center ${
                projectDetails.budget === option 
                  ? 'border-[#1a2e44] bg-[#1a2e44] text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
              onClick={() => handleChange({
                target: { name: 'budget', value: option }
              })}
            >
              {option === 'economy' ? 'Economy' : option === 'medium' ? 'Mid-Range' : 'Premium'}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Project Description
        </label>
        <textarea
          name="description"
          value={projectDetails.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
          placeholder="Describe what you want to accomplish"
          required
        ></textarea>
      </div>
      
      {/* Contact Information */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Your Contact Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={projectDetails.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={projectDetails.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={projectDetails.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;