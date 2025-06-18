// src/utils/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#1a2e44]/50 backdrop-blur-sm border-t border-gray-200 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 rounded-t-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16 text-white">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">M1B Construction</h3>
        <p className="text-sm sm:text-base">
          Building exceptional spaces with precision and passion.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
        <ul className="space-y-1 sm:space-y-2">
          <li><Link to="/services" className="hover:text-black transition-colors">Custom Homes</Link></li>
          <li><Link to="/services" className="hover:text-black transition-colors">Renovations</Link></li>
          <li><Link to="/services" className="hover:text-black transition-colors">Commercial</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
        <ul className="space-y-1 sm:space-y-2">
          <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
          <li><Link to="/portfolio" className="hover:text-black transition-colors">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
        <p className="mb-1 sm:mb-2 text-sm sm:text-base">New York, NY 10001</p>
        <p className=" mb-1 sm:mb-2 text-sm sm:text-base">info@m1-b.com</p>
        <p className=" text-sm sm:text-base">(917) 893-0561</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-gray-200 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-0">© 2025 M1B Construction. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;