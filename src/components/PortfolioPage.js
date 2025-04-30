import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../utils/Navbar';

// Portfolio project data
const portfolioProjects = [
  {
    id: 1,
    title: "Modern Beachside Villa",
    category: "Custom Home",
    description: "A stunning 4,500 sq ft custom home with panoramic ocean views, featuring floor-to-ceiling windows and sustainable materials throughout.",
    location: "Malibu, CA",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ],
    featured: true
  },
  {
    id: 2,
    title: "Midcentury Modern Renovation",
    category: "Renovation",
    description: "Complete restoration of a 1960s architectural gem, preserving original elements while adding modern amenities and energy efficiency.",
    location: "Palm Springs, CA",
    year: "2022",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090733a21e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ],
    featured: true
  },
  {
    id: 3,
    title: "Downtown Loft Conversion",
    category: "Commercial",
    description: "Transformed an industrial warehouse into a vibrant mixed-use space with offices, retail, and luxury apartments.",
    location: "New York, NY",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ],
    featured: true
  },
  {
    id: 4,
    title: "Luxury Kitchen Remodel",
    category: "Renovation",
    description: "High-end kitchen renovation featuring custom cabinetry, marble countertops, and state-of-the-art appliances.",
    location: "Chicago, IL",
    year: "2022",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ],
    featured: false
  },
  {
    id: 5,
    title: "Minimalist Mountain Retreat",
    category: "Custom Home",
    description: "A 3,200 sq ft mountain home designed to maximize views while minimizing environmental impact, featuring reclaimed materials and geothermal heating.",
    location: "Aspen, CO",
    year: "2021",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090733a21e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ],
    featured: false
  },
  {
    id: 6,
    title: "Waterfront Office Complex",
    category: "Commercial",
    description: "A modern 80,000 sq ft office complex with sustainable design features, collaborative workspaces, and extensive amenities.",
    location: "Seattle, WA",
    year: "2021",
    images: [
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ],
    featured: false
  }
];

// Aceternity-inspired Carousel component
const ProjectCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
    
    // Update active index based on scroll position
    const scrollPosition = containerRef.current.scrollLeft;
    const itemWidth = containerRef.current.clientWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
    
    // Update active index based on scroll position
    const scrollPosition = containerRef.current.scrollLeft;
    const itemWidth = containerRef.current.clientWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      setActiveIndex(newIndex);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    containerRef.current.scrollTo({
      left: containerRef.current.clientWidth * index,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        const scrollPosition = container.scrollLeft;
        const itemWidth = container.clientWidth;
        const newIndex = Math.round(scrollPosition / itemWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
          setActiveIndex(newIndex);
        }
      };

      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeIndex, images.length]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full snap-center">
            <img 
              src={src} 
              alt={`Project slide ${index + 1}`} 
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-white w-4' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      {images.length > 1 && (
        <>
          <button 
            onClick={() => goToSlide(activeIndex > 0 ? activeIndex - 1 : images.length - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => goToSlide(activeIndex < images.length - 1 ? activeIndex + 1 : 0)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

// Project card for portfolio grid
const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img 
          src={project.images[0]} 
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <span className="inline-block bg-[#1a2e44] px-2 py-1 text-xs rounded mb-2">
            {project.category}
          </span>
          <h3 className="text-xl font-medium">{project.title}</h3>
          <p className="text-sm text-gray-200">{project.location} • {project.year}</p>
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Page Component
const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [scrollPosition, setScrollPosition] = useState(0);
  const modalRef = useRef(null);

  // Save scroll position when opening modal
  const openModal = (project) => {
    setScrollPosition(window.pageYOffset);
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  // Restore scroll position when closing modal
  const closeModal = () => {
    document.body.style.overflow = '';
    setSelectedProject(null);
    window.scrollTo(0, scrollPosition);
  };

  // Handle click outside modal
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Filter projects by category
  const filteredProjects = filter === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === filter);

  // Featured projects for hero section
  const featuredProjects = portfolioProjects.filter(project => project.featured);

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
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">Our Portfolio</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Explore our showcase of completed projects, from custom homes to commercial spaces and renovations.
              </p>
            </div>
            
            {/* Featured Project Showcase */}
            <div className="mt-8 mb-16">
              {featuredProjects.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <ProjectCarousel images={featuredProjects.map(project => project.images[0])} />
                  <div className="mt-4 sm:mt-6 text-white">
                    <h2 className="text-xl sm:text-2xl font-medium mb-2">Featured Projects</h2>
                    <p className="text-white/80">
                      Browse through our highlighted work showcasing exceptional craftsmanship and design.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Portfolio Grid Section */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16 mb-16 bg-white/90 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center mb-8">
              {/* Filter Buttons */}
              {['All', 'Custom Home', 'Renovation', 'Commercial'].map((category) => (
                <button
                  key={category}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full text-sm transition-colors ${
                    filter === category 
                      ? 'bg-[#1a2e44] text-white' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onClick={() => openModal(project)}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 bg-gray-100/95 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Let's discuss how we can bring your vision to life with the same quality craftsmanship showcased in our portfolio.
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
                <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Contact</Link></li>
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

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={handleOutsideClick}>
          <div 
            ref={modalRef}
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Project Carousel */}
            <ProjectCarousel images={selectedProject.images} />
            
            {/* Project Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-[#1a2e44] px-2 py-1 text-xs text-white rounded mb-2">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-medium">{selectedProject.title}</h2>
                  <p className="text-gray-500">{selectedProject.location} • {selectedProject.year}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedProject.description}</p>
              
              <div className="border-t border-gray-200 pt-4">
                <Link 
                  to="/contact" 
                  className="bg-[#1a2e44] text-white px-4 py-2 rounded hover:bg-[#152435] transition-colors inline-block"
                >
                  Inquire About This Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;