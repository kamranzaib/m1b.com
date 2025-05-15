// src/components/details.js

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import logoImage from '../assets/images/icon.png';
import { getServiceIcon } from '../utils/iconUtils';
import ServiceCard from '../utils/cards/ServiceCards';
import scrollDownAnimation from '../assets/animations/scroll-down';
import Navbar from '../utils/Navbar';
import SubcategorySelection from '../utils/SubcategorySelection';
import ProjectDetailsForm from './ProjectDetailsForm';
import motion from 'framer-motion';
import { useToast } from '../utils/context/toastContext';
import { 
  serviceCategories, 
  renovationCategories,
  customHomeCategories,
  commercialCategories,
  kitchenSubCategories, 
  bathroomSubCategories,
  structuralSubCategories
} from '../data/categories';
// Import the centralized image config
import images from '../imageConfig';

const DetailsPage = () => {
  const topRef = useRef(null);
  const categoriesRef = useRef(null);
  const subcategoriesRef = useRef(null);
  const detailsRef = useRef(null);
  const carouselRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.selectedService || 'Custom Home Building';
  
  // State to track the app flow
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCarouselHighlighted, setIsCarouselHighlighted] = useState(false);
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
        return images.hero.home;
      case '2': // Renovations & Additions
        return images.hero.details;
      case '3': // Commercial Projects
        return images.portfolio.project2[0];
      default:
        return images.hero.home;
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
          images.backgrounds.secondary,
          images.portfolio.project1[1]
        ];
      case '2': // Renovations & Additions
        return [
          images.portfolio.project2[0],
          images.portfolio.project2[2]
        ];
      case '3': // Commercial Projects
        return [
          images.portfolio.project3 ? images.portfolio.project3[0] : images.portfolio.project1[0],
          images.portfolio.project3 ? images.portfolio.project3[1] : images.portfolio.project2[0]
        ];
      default:
        return [
          images.backgrounds.main,
          images.backgrounds.tertiary
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

  // Handle form submission (async, send to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionPayload = {
      service: selectedService,
      category: selectedCategory,
      subcategories: selectedSubcategories,
      ...projectDetails
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload)
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitting(false);
        setCurrentScreen('confirmation');
        window.scrollTo(0, 0);
      } else {
        console.error('Backend error:', data.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32" ref={topRef}>
      {/* Header/Navigation */}
      <Navbar /> 
      
      {/* Background Images - Using centralized config */}
      <div className="fixed inset-0 z-0">
        {/* Single image for mobile, split for larger screens */}
        <div className="h-full md:h-1/2 bg-cover bg-center" 
             style={{ backgroundImage: `url('${images.backgrounds.tertiary}')` }}></div>
        <div className="hidden md:block md:h-1/2 md:grid md:grid-cols-2">
          <div className="bg-cover bg-center" 
               style={{ backgroundImage: `url('${images.portfolio.project2[0]}')` }}></div>
          <div className="bg-cover bg-center" 
               style={{ backgroundImage: `url('${images.portfolio.project2[2]}')` }}></div>
        </div>
        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Categories Screen */}
        {currentScreen === 'categories' && (
          <div ref={categoriesRef}>
            {/* Hero Section - Mobile Optimized */}
            <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16 pt-16 sm:pt-20 md:pt-32 bg-[#1a2e44]/50 backdrop-blur-sm rounded-xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 lg:mx-12 mb-10 sm:mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-white mb-4 sm:mb-6">{selectedService}</h1>
                  <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8">
                    {serviceCategories.find(s => s.title === selectedService)?.description || 
                    'Custom solutions designed around your unique needs and preferences.'}
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-8 mt-6 sm:mt-8">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#B79001]">65+</div>
                      <div className="text-white text-xs sm:text-sm">completed projects</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#B79001]">7+</div>
                      <div className="text-white text-xs sm:text-sm">years of experience</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#B79001]">100%</div>
                      <div className="text-white text-xs sm:text-sm">client satisfaction</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCarouselHighlighted(true);
                      if (carouselRef.current) {
                        carouselRef.current.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }
                      setTimeout(() => {
                        setIsCarouselHighlighted(false);
                      }, 2000);
                    }}
                    className="mt-6 sm:mt-10 inline-block bg-transparent text-white px-8 py-3 transition-all text-base sm:text-lg font-medium hover:scale-105 border border-white"
                  >
                    Browse Options
                  </button>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="rounded-xl sm:rounded-3xl overflow-hidden h-[200px] sm:h-[250px] md:h-[350px]">
                    <img 
                      src={getServiceHeroImage()} 
                      alt={selectedService} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Scroll Down Animation - Responsive version */}
            <div className="relative left-1/2 transform -translate-x-1/2 opacity-80 z-10" 
                style={{ marginTop: '-8rem', marginBottom: '1.5rem' }}>
              <div className="sm:hidden">
                {/* Smaller version for mobile */}
                <Player
                  autoplay
                  loop
                  src={scrollDownAnimation}
                  style={{ height: '80px', width: '80px' }}
                />
              </div>
              <div className="hidden sm:block">
                {/* Larger version for tablets and up */}
                <Player
                  autoplay
                  loop
                  src={scrollDownAnimation}
                  style={{ height: '140px', width: '140px' }}
                />
              </div>
            </div>
            
            {/* Categories Catalog Section - Mobile-Optimized Horizontal Scrollable */}
            <section 
              ref={carouselRef}
              className={`py-10 sm:py-12 md:py-16 mb-10 sm:mb-16 px-4 bg-[#1a2e44]/50 backdrop-blur-sm rounded-xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 lg:mx-12 transition-all duration-500 ${
                isCarouselHighlighted ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="text-center mb-6 sm:mb-10 text-white">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 transition-all duration-500 ${
                  isCarouselHighlighted ? 'text-blue-600 dark:text-blue-400' : ''
                }`}>
                The more details you share about your project, the more precise our estimate will be – tell us everything that matters to you
                </h2>
              </div>
              
              {/* Carousel Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Carousel Viewport - Optimized for mobile */}
                <div className="overflow-x-auto pb-6 hide-scrollbar">
                  <div 
                    className="flex gap-3 sm:gap-4 snap-x"
                    id="categoryCarousel"
                  >
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="w-[150px] sm:w-[180px] md:w-[200px] flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl snap-start group"
                        onClick={() => selectCategory(category.id)}
                      >
                        {/* Image - Using the config image if available, or fallback to category's image property */}
                        <div className="h-40 sm:h-52 overflow-hidden">
                          <img 
                            src={category.image || getServiceHeroImage()} 
                            alt={category.name} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Overlay Text */}
                        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium">{category.name}</h3>
                          <p className="text-white/90 text-xs sm:text-sm mt-1">
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
            <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16 mb-10 sm:mb-16  bg-[#1a2e44]/50 backdrop-blur-sm rounded-xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 lg:mx-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 sm:mb-10 text-center text-white">
                Our Process
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-white">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">1</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Consultation</h3>
                  <p className="text-white text-sm sm:text-base">We discuss your vision, preferences, requirements, and budget to understand your needs.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">2</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Design & Planning</h3>
                  <p className="text-white text-sm sm:text-base">Our team develops detailed designs and plans tailored to your specific requirements.</p>
                </div>
                <div className="text-center sm:col-span-2 md:col-span-1 sm:max-w-xs sm:mx-auto md:max-w-none">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">3</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Construction</h3>
                  <p className="text-white text-sm sm:text-base">We bring your vision to life with precision craftsmanship and quality materials.</p>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Subcategories Selection Screen */}
        {currentScreen === 'subcategories' && (
          <div ref={subcategoriesRef} className="bg-[#1a2e44]/50 backdrop-blur-sm rounded-xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 lg:mx-12 mb-10 sm:mb-16">
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
          <div ref={detailsRef} className="max--4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 bg-[#1a2e44]/50 backdrop-blur-sm rounded-xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 lg:mx-12 mb-10 sm:mb-16 text-white">
            <div className="mb-6 sm:mb-10">
              <button 
                onClick={() => setCurrentScreen('subcategories')} 
                className="inline-flex items-center text-white hover:text-black mb-3 sm:mb-4 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Options
              </button>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4">
                Tell us about your {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} project
              </h2>
              <p className="text-white text-sm sm:text-base">
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
          <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 text-center bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 lg:mx-12 mb-10 sm:mb-16">
            <div className="p-6 sm:p-8 md:p-12 border border-gray-100">
              {/* Success icon */}
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 sm:mb-8">
                <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Request Submitted!
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                Thank you for your interest. We'll contact you shortly to discuss your {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} project.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}
        
        {/* Footer - Mobile Optimized */}
        <footer className="bg-[#1a2e44]/50 backdrop-blur-sm border-t border-gray-200 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 rounded-t-lg mx-3 sm:mx-4 md:mx-6 lg:mx-12 text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">M1B Construction</h3>
              <p className="text-white text-sm sm:text-base">
                Building exceptional spaces with precision and passion since 2010.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-1 sm:space-y-2">
                {serviceCategories.map(service => (
                  <li key={service.id}>
                    <Link to="/details" state={{ selectedService: service.title }} className="text-white hover:text-black transition-colors text-sm sm:text-base">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="/#about" className="text-white hover:text-black transition-colors text-sm sm:text-base">About Us</a></li>
                <li><a href="/#portfolio" className="text-white hover:text-black transition-colors text-sm sm:text-base">Projects</a></li>
                <li><a href="/#testimonials" className="text-white hover:text-black transition-colors text-sm sm:text-base">Testimonials</a></li>
                <li><Link to="/contact" className="text-white hover:text-black transition-colors text-sm sm:text-base">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <p className="text-white mb-1 sm:mb-2 text-sm sm:text-base">New York, NY 10001</p>
              <p className="text-white mb-1 sm:mb-2 text-sm sm:text-base"><a href="mailto:info@m1bconstruction.com" className="hover:text-black transition-colors">info@m1-b.com</a></p>
              <p className="text-white text-sm sm:text-base"><a href="tel:+15551234567" className="hover:text-black transition-colors">(555) 123-4567</a></p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-gray-200 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-0">© 2025 M1B Construction. All rights reserved.</p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DetailsPage;