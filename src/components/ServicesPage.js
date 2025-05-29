// src/components/ServicesPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../utils/cards/ServiceCards';
import { serviceCategories } from '../data/categories';
import { getServiceIcon } from '../utils/iconUtils';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
// Import the centralized image config
import images from '../imageConfig';

const ServicesPage = () => {
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
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">Our Services</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Exceptional craftsmanship and innovative solutions for all your construction needs.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
<section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 bg-[#1a2e44]/40 backdrop-blur-sm rounded-3xl mx-4 sm:mx-6 md:mx-8 lg:mx-16">          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
        </section>
        
        {/* Service Details Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 bg-[#1a2e44]/50 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 text-center">Why Choose Us</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Quality Craftsmanship</h3>
                <p className="text-sm text-white/80">Uncompromising attention to detail and premium materials for exceptional results.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">On-Time Delivery</h3>
                <p className="text-sm text-white/80">Efficient project management ensures we complete your project on schedule.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Expert Team</h3>
                <p className="text-sm text-white/80">Highly skilled professionals with decades of combined experience.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Transparent Pricing</h3>
                <p className="text-sm text-white/80">Clear, detailed estimates with no hidden costs or surprises.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer - Mobile Optimized */}
       <Footer/>
      </div>
    </div>
  );
};

export default ServicesPage;