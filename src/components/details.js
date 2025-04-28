import React, { useState, useEffect,useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/icon.png';
import { getServiceIcon } from '../utils/iconUtils';
import ServiceCard from '../utils/cards/ServiceCards';
import Navbar from '../utils/Navbar';
import SubcategorySelection from '../utils/SubcategorySelection';
import ProjectDetailsForm from './ProjectDetailsForm';
import { 
  serviceCategories, 
  renovationCategories,
  customHomeCategories,
  commercialCategories,
  kitchenSubCategories, 
  bathroomSubCategories,
  structuralSubCategories
} from '../data/categories';

const DetailsPage = () => {
  const topRef = useRef(null);
  const categoriesRef = useRef(null);
  const subcategoriesRef = useRef(null);
  const detailsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.selectedService || 'Custom Home Building';
  
  // State to track the app flow
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    area: '',
    scope: 'partial',
    budget: 'medium',
    timeline: 'flexible',
    description: '',
    name: '',
    email: '',
    phone: ''
  });

  // Get service hero image
  const getServiceHeroImage = () => {
    const serviceId = getServiceId();
    switch(serviceId) {
      case '1': // Custom Home Building
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
      case '2': // Renovations & Additions
        return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
      case '3': // Commercial Projects
        return 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
      default:
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
    }
  };

  // Find the service ID based on the selected service title
  const getServiceId = () => {
    const service = serviceCategories.find(s => s.title === selectedService);
    return service ? service.id : '1'; // Default to Custom Home Building (id: '1')
  };

  // Categories Selection
  const getCategories = () => {
  const serviceId = getServiceId();
  switch(serviceId) {
    case '1': // Custom Home Building
      return customHomeCategories;
    case '2': // Renovations & Additions
      return renovationCategories;
    case '3': // Commercial Projects
      return commercialCategories;
    default:
      return renovationCategories;
  }
};

const categories = getCategories();
  
  // Scroll to top when component mounts
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);


  // Content-specific edge images based on service
  const getEdgeImages = () => {
    const serviceId = getServiceId();
    switch(serviceId) {
      case '1': // Custom Home Building
        return [
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600573472550-8090733a21e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
        ];
      case '2': // Renovations & Additions
        return [
          'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
        ];
      case '3': // Commercial Projects
        return [
          'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
        ];
      default:
        return [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
        ];
    }
  };

  // Handle category selection
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('subcategories');
    
    // Delay to ensure DOM update before scrolling
    setTimeout(() => {
      if (subcategoriesRef.current) {
        subcategoriesRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, 0);
  };
  
  // Handle subcategory submission
  const handleSubcategorySubmit = (subcategories) => {
    setSelectedSubcategories(subcategories);
    setCurrentScreen('details');
    
    // Delay to ensure DOM update before scrolling
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, 0);
  };
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({
      ...projectDetails,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form submission logic
    console.log('Project details:', {
      service: selectedService,
      category: selectedCategory,
      subcategories: selectedSubcategories,
      ...projectDetails
    });
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentScreen('confirmation');
      window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white pt-32" ref={topRef}>
      {/* Header/Navigation - Matching Homepage */}
    
      <Navbar /> 
      {/* Main Content */}
      <div className="min-h-screen">
        {/* Categories Screen */}
        {currentScreen === 'categories' && (
            <div ref={categoriesRef}>
        
            {/* Hero Section */}
            <section className="px-8 md:px-16 py-16 pt-32 bg-[#1a2e44] rounded-3xl mx-6 md:mx-12 mb-16 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 pr-8">
                <h1 className="text-4xl md:text-5xl font-light italic text-white mb-6">{selectedService}</h1>
                <p className="text-xl text-white mb-8">
                  {serviceCategories.find(s => s.title === selectedService)?.description || 
                  'Custom solutions designed around your unique needs and preferences.'}
                </p>
                <div className="flex flex-wrap gap-8 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-semibold text-[#B79001]">65+</div>
                    <div className="text-white text-sm">completed projects</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-semibold text-[#B79001]">7+</div>
                    <div className="text-white text-sm">years of experience</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-semibold text-[#B79001]">100%</div>
                    <div className="text-white text-sm">client satisfaction</div>
                  </div>
                </div>
                <Link 
                  to="/contact" 
                  className="mt-10 inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="rounded-3xl overflow-hidden h-[350px]">
                  <img 
                    src={getServiceHeroImage()} 
                    alt={selectedService} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
            {/* Categories Catalog Section - Horizontal Scrollable */}
            <section className="py-16 mb-16 px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Our {selectedService} Options
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Select from our selection of quality renovation solutions
                </p>
              </div>
              
              {/* Carousel Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Carousel Viewport */}
                <div className="overflow-x-auto pb-6 hide-scrollbar">
                  <div 
                    className="flex gap-4 snap-x"
                    id="categoryCarousel"
                  >
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="w-[180px] md:w-[200px] flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl snap-start group"
                        onClick={() => selectCategory(category.id)}
                      >
                        {/* Image */}
                        <div className="h-52 overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Overlay Text */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <h3 className="text-white text-lg font-medium">{category.name}</h3>
                          <p className="text-white/90 text-sm mt-1">
                            Starting from <span className="font-bold">$5,000</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Process Steps Section */}
            <section className="px-8 md:px-16 py-16 mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-10 text-center">
                Our Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                  <h3 className="text-xl font-semibold mb-3">Consultation</h3>
                  <p className="text-gray-600">We discuss your vision, preferences, requirements, and budget to understand your needs.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                  <h3 className="text-xl font-semibold mb-3">Design & Planning</h3>
                  <p className="text-gray-600">Our team develops detailed designs and plans tailored to your specific requirements.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                  <h3 className="text-xl font-semibold mb-3">Construction</h3>
                  <p className="text-gray-600">We bring your vision to life with precision craftsmanship and quality materials.</p>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Subcategories Selection Screen */}
        {currentScreen === 'subcategories' && (
            <div ref={subcategoriesRef}>
         <SubcategorySelection 
         category={selectedCategory}
         serviceId={getServiceId()}
         categories={categories}
         onBack={() => setCurrentScreen('categories')}
         onSubmit={handleSubcategorySubmit}
       />
       </div>
        )}
        
        {/* Details Screen */}
        {currentScreen === 'details' && (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-10">
              <button 
                onClick={() => setCurrentScreen('subcategories')} 
                className="inline-flex items-center text-gray-600 hover:text-black mb-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Options
              </button>
              <h2 className="text-3xl font-light mb-4">
                Tell us about your {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} project
              </h2>
              <p className="text-gray-600">
                Please provide details about your project so we can better understand your needs.
              </p>
            </div>
            
            <ProjectDetailsForm 
            projectDetails={projectDetails}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            selectedCategory={selectedCategory}
            selectedSubcategories={selectedSubcategories}
            categories={categories}
            />
          </div>
        )}
        
        {/* Confirmation Screen */}
        {currentScreen === 'confirmation' && (
          <div className="max-w-2xl mx-auto px-8 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
              {/* Success icon */}
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-8">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Request Submitted!
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your interest. We'll contact you shortly to discuss your {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} project.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">M1B Construction</h3>
            <p className="text-gray-600">
              Building exceptional spaces with precision and passion since 2010.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceCategories.map(service => (
                <li key={service.id}>
                  <Link to="/details" state={{ selectedService: service.title }} className="text-gray-600 hover:text-black transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/#about" className="text-gray-600 hover:text-black transition-colors">About Us</a></li>
              <li><a href="/#portfolio" className="text-gray-600 hover:text-black transition-colors">Projects</a></li>
              <li><a href="/#testimonials" className="text-gray-600 hover:text-black transition-colors">Testimonials</a></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-600 mb-2">New York, NY 10001</p>
            <p className="text-gray-600 mb-2"><a href="mailto:info@m1bconstruction.com" className="hover:text-black transition-colors">info@m1bconstruction.com</a></p>
            <p className="text-gray-600"><a href="tel:+15551234567" className="hover:text-black transition-colors">(555) 123-4567</a></p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2025 M1B Construction. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="text-gray-400 hover:text-black transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="text-gray-400 hover:text-black transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page" className="text-gray-400 hover:text-black transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DetailsPage;