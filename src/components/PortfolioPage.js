import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import { portfolioProjects } from '../data/portfolioProjects';

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
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16 mb-16 bg-white/20 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
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
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-20 md:mb-24 bg-[#1a2e44]/50 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-white">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base text-white">
              Let's discuss how we can bring your vision to life with the same quality craftsmanship showcased in our portfolio.
            </p>
            <Link to="/contact" className="bg-black text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Contact Us
            </Link>
          </div>
        </section>

        {/* Footer - Mobile optimized */}
        <Footer/>
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