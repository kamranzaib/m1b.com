import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import logoImage from '../assets/images/icon.png';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact information
  const contactInfo = {
    phone: "(555) 123-4567",
    email: "M1BUILDERS@M1BLLC.COM",
    address: "New York, NY 10001"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded flex items-center justify-center text-light font-bold mr-2">
                <img src={logoImage} alt="M1B Construction Logo" className="w-10 h-10" />
              </div>
              <span className="text-xl font-bold text-white">M1B Construction</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/#services" className="text-white hover:text-indigo-400">Services</a>
            <a href="/#projects" className="text-white hover:text-indigo-400">Projects</a>
            <a href="/#about" className="text-white hover:text-indigo-400">About</a>
            <Link to="/contact" className="text-[#5D4E45] font-medium">Contact</Link>
          </nav>
          <button className="md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
            <div className="w-16 h-1 bg-[#5D4E45] mx-auto"></div>
            <p className="mt-4 text-[#5D4E45]">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="md:flex md:gap-10">
            {/* Contact Information */}
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-gray-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#D6C0B3] rounded-full p-2 mr-3">
                      <Phone className="h-5 w-5 text-[#5D4E45]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <p className="text-[#5D4E45]">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D6C0B3] rounded-full p-2 mr-3">
                      <Mail className="h-5 w-5 text-[#5D4E45]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-[#5D4E45]">{contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D6C0B3] rounded-full p-2 mr-3">
                      <svg className="h-5 w-5 text-[#5D4E45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Address</p>
                      <p className="text-[#5D4E45]">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="mt-1 ml-7">Thank you for contacting us. We'll be in touch soon.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg shadow-md shadow-black/10 shadow-black/10 shadow-[#5D4E45]/10 shadow-black/50 p-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-taupe rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-taupe rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-taupe rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-3 border border-taupe rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#5D4E45] hover:bg-[#4A3E38] text-light font-bold py-3 px-4 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#5D4E45] text-light py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-6">© 2025 M1B Construction. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="w-10 h-10 bg-[#5D4E45] rounded-full flex items-center justify-center hover:bg-[#5D4E45] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="w-10 h-10 bg-[#5D4E45] rounded-full flex items-center justify-center hover:bg-[#5D4E45] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="w-10 h-10 bg-[#5D4E45] rounded-full flex items-center justify-center hover:bg-[#5D4E45] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;