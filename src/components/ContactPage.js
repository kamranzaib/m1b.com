import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../utils/Navbar';

const ContactPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoToServices = () => {
    navigate('/#services');
  };

  return (
    <div className="pt-32 min-h-screen bg-[#1a2e44] px-8 md:px-16">
            <Navbar /> 
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <div className="flex-1 bg-white p-10 md:p-16 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-light italic text-[#1a2e44] mb-4">
              Get a Free Consultation
            </h1>
            <p className="text-gray-600">
              Let's discuss how we can bring your vision to life.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" 
                placeholder="John Doe" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" 
                placeholder="john@example.com" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input 
                type="tel" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" 
                placeholder="(123) 456-7890" 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Message</label>
              <textarea 
                rows="5" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" 
                placeholder="Tell us a bit about your project..." 
                required
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="bg-[#1a2e44] hover:bg-[#152435] text-white px-8 py-3 rounded-lg transition-colors font-medium"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>

        {/* Smaller Sidebar */}
        <div className="md:w-1/3 self-start p-8 bg-gray-100 rounded-2xl shadow-md">
          <h2 className="text-2xl font-light text-[#1a2e44] mb-4">
            Already know?
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Select your service directly and help us get started faster.
          </p>
          <button 
            onClick={handleGoToServices}
            className="border border-[#1a2e44] text-[#1a2e44] hover:bg-[#1a2e44] hover:text-white transition-colors px-6 py-3 rounded-lg font-medium text-sm"
          >
            Browse Services
          </button>
        </div>

      </div>
      </div>
  );
};

export default ContactPage;
