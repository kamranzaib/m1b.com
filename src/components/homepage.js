// src/components/homepage.js

import React, { useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import ServiceCard from '../utils/cards/ServiceCards';
import { serviceCategories } from '../data/categories';
import { getServiceIcon } from '../utils/iconUtils';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import orbGradientAnimation from '../assets/animations/orb-animation';
// Import the centralized image config
import images from '../imageConfig';

const ModernHomePage = () => {
  const navigate = useNavigate(); // Add this line
  const servicesRef = useRef(null);
  
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32">
      {/* Header/Navigation */}    
      <Navbar /> 
      
      {/* Background Images - Using centralized config */}
      <div className="fixed inset-0 z-0">
        <div className="h-full md:h-1/2 bg-cover bg-center" 
             style={{ backgroundImage: `url('${images.backgrounds.main}')` }}></div>
        <div className="hidden md:block md:h-1/2 md:grid md:grid-cols-2">
          <div className="bg-cover bg-center" 
               style={{ backgroundImage: `url('${images.backgrounds.secondary}')` }}></div>
          <div className="bg-cover bg-center" 
               style={{ backgroundImage: `url('${images.backgrounds.tertiary}')` }}></div>
        </div>
        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
      </div>
      
      {/* Content Container - Positioned above background */}
      <div className="relative z-10">
        {/* Hero Section - Responsive adjustments */}
        <section className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-3xl mx-4 sm:mx-6 md:mx-8 lg:mx-16 mb-12 md:mb-16 overflow-hidden bg-[#1a2e44]/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-xl sm:rounded-3xl">
            {/* Background image - Using the centralized config */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/3 bg-cover bg-center opacity-50"
                 style={{backgroundImage: `url('${images.hero.home}')`}}>
            </div>
          </div>
          
          {/* Content container with flex column */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Top text content */}
            <div className="text-white p-6 sm:p-8 md:p-12 lg:p-16 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
              <p className="text-xs sm:text-sm tracking-widest mb-2 sm:mb-4 uppercase">Crafting Tomorrow's Living Spaces</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mb-4">
                Set New Standards in <span className="italic">Modern Home</span> Construction
              </h2>
            </div>
            
            {/* Bottom button container */}
            <div className="flex justify-center w-full pb-6 sm:pb-8">
              <div className="relative">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-0">
                  <Player
                    autoplay
                    loop
                    speed={3}
                    src={orbGradientAnimation}
                    style={{
                      width: '200px',
                      height: '200px',
                      opacity: 0.9,
                      pointerEvents: 'none'
                    }}
                  />
                </div>
                <button
    onClick={() => navigate('/services')}
    className="relative z-10 bg-transparent text-white px-8 py-3 transition-all text-base sm:text-lg font-medium hover:scale-105"
  >
    Get Started
  </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dream Build Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 text-center mb-16 sm:mb-20 md:mb-24 bg-[#1a2e44]/30 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 text-black">
                {/* Diamond icon */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-3 text-white">
              If you can <span className="italic">dream it</span>, we can <span className="italic">build it</span>.
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base text-white">
              We adopt a uniquely personalized perspective to each project to deliver stunning spaces of optimal function.
              Renowned for our architectural understanding and masterful craftsmanship, our portfolio of residential projects.
            </p>
            <Link to="/contact" className="bg-black text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Get in touch
            </Link>
          </div>
          
          {/* Feature Images - Mobile friendly grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-16 sm:mt-20 md:mt-24">
            {/* Portfolio Image */}
            <Link 
              to="/portfolio"
              className="relative group rounded-xl sm:rounded-3xl overflow-hidden h-[250px] sm:h-[300px] cursor-pointer"
            >
              <img 
                src={images.portfolio.project1[0]} 
                alt="Modern house exterior" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
              />
              {/* Desktop hover effect */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 md:flex md:items-center md:justify-center md:transition md:duration-700">
                <span className="hidden md:block text-white text-xl sm:text-2xl font-semibold tracking-wide">PORTFOLIO</span>
              </div>
              
              {/* Always visible on mobile */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:hidden">
                <span className="text-white text-xl font-semibold tracking-wide">PORTFOLIO</span>
              </div>
            </Link>

            {/* Estimates Video */}
            <Link to="/services" className="block">
              <div className="relative group rounded-xl sm:rounded-3xl overflow-hidden h-[250px] sm:h-[300px] cursor-pointer">
                <div className="overflow-hidden">
                  <video 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/video/Estimates.mp4"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold tracking-wide">ESTIMATES</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Inclusions Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24">
          <div className="bg-gray-900 text-white rounded-xl sm:rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
                  Our timeless <span className="italic">inclusions</span>
                </h2>
                <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                  We've been creating dream homes our clients are thrilled to call their own. 
                  Delighting them with hand-picked finishes, accessories and accents.
                </p>
                <div>
                  <Link to="/inclusions" className="border border-white text-white px-6 py-2 sm:py-3 inline-block hover:bg-white hover:text-black transition-colors text-sm sm:text-base">
                    View Inclusions
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[200px] sm:h-[250px] md:min-h-[200px]">
                <img 
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Luxury kitchen" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section
        <section id="services" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 mx-4 sm:mx-6 md:mx-8 lg:mx-16">          
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 text-center text-white">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {serviceCategories.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  image={images.services[service.id === '1' ? 'customHome' : service.id === '2' ? 'renovation' : 'commercial']}
                  icon={getServiceIcon(service.id)}
                />
              ))}
            </div>
          </div>
        </section> */}
                  
        {/* CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 bg-[#1a2e44]/50 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Ready to Start Your Project?</h2>
            <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base">
              Whether you're ready to begin or just exploring options, we're here to help.
              Let's discuss how we can bring your vision to life.
            </p>
            <Link to="/contact" className="bg-black text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Contact Us
            </Link>
          </div>
        </section>

        {/* Footer - Mobile optimized */}
        <Footer />
      </div>
    </div>
  );
};

export default ModernHomePage;