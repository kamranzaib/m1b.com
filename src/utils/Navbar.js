// src/components/utils/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: 'home', path: '/' },
    { label: 'Services', href: 'services', path: '/#services' },
    { label: 'About', href: 'about', path: '/about' },
    { label: 'Portfolio', href: 'portfolio', path: '/portfolio' },
  ];

  const renderNavLink = (item) => {
    const { label, href, path } = item;
    
    // If we're on the homepage and it's not the Portfolio link
    if (isHome && label !== 'Portfolio' && label !== 'About') {
      return (
        <a
          key={label}
          href={`#${href}`}
          onClick={(e) => scrollToSection(e, href)}
          className="relative text-white hover:text-black transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300"
        >
          {label}
        </a>
      );
    }
    
    // For Portfolio link or when not on homepage
    return (
      <Link
        key={label}
        to={path}
        className="relative text-white hover:text-black transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300"
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 px-4 sm:px-6 md:px-8 lg:px-16 flex justify-between items-center">
      {/* Logo / Brand Name */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">M1B</h1>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex space-x-6 lg:space-x-10">
        {navItems.map(item => renderNavLink(item))}
      </nav>

      {/* Desktop Consultation Button */}
      <div className="hidden md:block">
        <Link 
          to="/contact" 
          className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white z-40 flex flex-col">
          <nav className="flex flex-col py-8 px-6">
            {navItems.map(item => {
              const { label, href, path } = item;
              
              if (isHome && label !== 'Portfolio') {
                return (
                  <a
                    key={label}
                    href={`#${href}`}
                    onClick={(e) => scrollToSection(e, href)}
                    className="py-4 text-lg font-medium text-gray-700 hover:text-black border-b border-gray-100"
                  >
                    {label}
                  </a>
                );
              }
              
              return (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 text-lg font-medium text-gray-700 hover:text-black border-b border-gray-100"
                >
                  {label}
                </Link>
              );
            })}
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
            >
             Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;