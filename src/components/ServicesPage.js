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
import { Timeline } from '../utils/ui/timeline';


const ServicesPage = () => {

   // Process timeline data
  const processTimelineData = [
    {
      title: (<span className="text-white">Consultation</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            We begin with a detailed discussion about your vision, requirements, preferences, and budget. Our goal is to fully understand what you want to achieve with your project.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-white">
               In-depth needs assessment
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
               Budget planning consultation
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
               Timeline expectations
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">Design & Planning</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            Our team of engineers creates custom plans tailored to your needs. We collaborate closely with you to refine the designs until they perfectly match your vision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1589939705384-5133349c7ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Design planning"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">Project Execution</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            Construction begins with our skilled craftsmen bringing your project to life. A dedicated project manager oversees every aspect of the build, ensuring quality and timely execution.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-white">
               Site preparation
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
               Foundation and structural work
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
               Mechanical, electrical, and plumbing
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
               Interior and exterior finishes
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">Progress Tracking</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            You receive access to our project management platform where you can track progress in real-time. Weekly updates keep you informed about milestones and upcoming work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://storage.googleapis.com/m1b_portfolio_photos/project%20photos/renovated/renovated/Screenshot%202025-05-29%20at%204.40.22%E2%80%AFPM.png"
              alt="Progress tracking"
              className="w-full h-auto rounded-lg object-contain shadow-lg"
            />
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-[#1a2e44] mb-2">Client Portal Features:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Dedicated tracking board for your project</li>
                <li>Photo and video updates</li>
                <li>Weekly progress reports</li>
                <li>Direct messaging with your project manager</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">Completion</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            Once construction is complete and all inspections are passed, we hand over your new space. We provide complete documentation and warranty information for your peace of mind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Project completion"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];
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
         {/* Our Process Section with Timeline */}
                <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-[#1a2e44]/50 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
                  <div className="max-w-7xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-center text-white">Our Process</h2>
                    <p className="text-center text-gray-600 max-w-3xl mx-auto text-white">
                      We've developed a streamlined, transparent process that keeps you informed and involved at every stage. From initial concept to final handover, here's how we bring your project to life.
                    </p>
                  </div>
                  
                  <Timeline data={processTimelineData} />
                </section>
        
        {/* Footer - Mobile Optimized */}
       <Footer/>
      </div>
    </div>
  );
};

export default ServicesPage;