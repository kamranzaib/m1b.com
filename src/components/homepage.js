// Updated homepage.js with background images and structure adjustments

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import ServiceCard from '../utils/cards/ServiceCards';
import { serviceCategories } from '../data/categories';
import { getServiceIcon } from '../utils/iconUtils';
import Navbar from '../utils/Navbar';
import orbGradientAnimation from '../assets/animations/orb-animation';

const serviceImages = {
  '1': 'http://tiny.cc/9moh001', // Custom Home Building
  '2': 'http://tiny.cc/rmoh001', // Renovations & Additions
  '3': 'http://tiny.cc/nmoh001'  // Commercial Projects
};

const ModernHomePage = () => {
  const servicesRef = useRef(null);
  
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32">
      {/* Header/Navigation */}    
      <Navbar /> 
      
      {/* Background Images - Similar to Contact Page */}
      <div className="fixed inset-0 z-0">
        {/* Single image for mobile, split for larger screens */}
        <div className="h-full md:h-1/2 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3087&auto=format&fit=crop')" }}></div>
        <div className="hidden md:block md:h-1/2 md:grid md:grid-cols-2">
          <div className="bg-cover bg-center" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=3087&auto=format&fit=crop')" }}></div>
          <div className="bg-cover bg-center" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3087&auto=format&fit=crop')" }}></div>
        </div>
        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
      </div>
      
      {/* Content Container - Positioned above background */}
      <div className="relative z-10">
        {/* Hero Section - Responsive adjustments */}
        <section className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-3xl mx-4 sm:mx-6 md:mx-8 lg:mx-16 mb-12 md:mb-16 overflow-hidden bg-[#1a2e44]/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-xl sm:rounded-3xl">
            {/* Background image - adjusted for mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/3 bg-cover bg-center opacity-50"
                 style={{backgroundImage: `url('https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}>
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
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="relative z-10 bg-transparent text-white px-8 py-3 transition-all text-base sm:text-lg font-medium hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dream Build Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 text-center mb-16 sm:mb-20 md:mb-24 bg-white/90 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 text-black">
                {/* Diamond icon */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-3">
              If you can <span className="italic">dream it</span>, we can <span className="italic">build it</span>.
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
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
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
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

            {/* Estimates Image */}
            <Link 
              to="/contact"
              className="relative group rounded-xl sm:rounded-3xl overflow-hidden h-[250px] sm:h-[300px] cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern house exterior night" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
              />
              {/* Desktop hover effect */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 md:flex md:items-center md:justify-center md:transition md:duration-700">
                <span className="hidden md:block text-white text-xl sm:text-2xl font-semibold tracking-wide">ESTIMATES</span>
              </div>
              
              {/* Always visible on mobile */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:hidden">
                <span className="text-white text-xl font-semibold tracking-wide">ESTIMATES</span>
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

        {/* Services Section */}
        <section id="services" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 mx-4 sm:mx-6 md:mx-8 lg:mx-16">          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 text-center text-white">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {serviceCategories.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  image={serviceImages[service.id]}
                  icon={getServiceIcon(service.id)}
                />
              ))}
            </div>
          </div>
        </section>
      
        {/* CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 bg-gray-100/95 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Whether you're ready to begin or just exploring options, we're here to help.
              Let's discuss how we can bring your vision to life.
            </p>
            <Link to="/contact" className="bg-black text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Contact Us
            </Link>
          </div>
        </section>

        {/* Footer - Mobile optimized */}
        <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 rounded-t-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">M1B Construction</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Building exceptional spaces with precision and passion since 2010.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Custom Homes</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Renovations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Commercial</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Consulting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Projects</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Testimonials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">New York, NY 10001</p>
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">info@m1bconstruction.com</p>
              <p className="text-gray-600 text-sm sm:text-base">(555) 123-4567</p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-gray-200 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-0">© 2025 M1B Construction. All rights reserved.</p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
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

export default ModernHomePage;