// src/components/ServicePageForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import orbGradientAnimation from '../assets/animations/orb-animation';
import { useToast } from '../utils/context/toastContext';
import { motion } from 'framer-motion';
import { getServiceLabel, getCategoryLabel } from '../utils/urlUtils';
import Meta from './Meta';
import { trackMetaEvent } from '../utils/metaTracker';
import { apiPost } from '../utils/api';

const ServicePageForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();

  // Extract context from URL parameters
  const urlContext = {
    source: searchParams.get('source') || 'direct',
    service: searchParams.get('service'),
    category: searchParams.get('category'),
    project: searchParams.get('project'),
    referrer: searchParams.get('ref')
  };

  // Initialize form with context-aware defaults
  const getInitialFormData = () => {
    let projectType = 'Custom Home';
    let message = '';

    // Map service slugs to form project types
    const serviceToProjectType = {
      'custom-home': 'Custom Home',
      'renovations': 'Renovation',
      'commercial': 'Commercial'
    };

    // Pre-populate based on URL context
    if (urlContext.service) {
      const serviceLabel = getServiceLabel(urlContext.service);
      projectType = serviceToProjectType[urlContext.service] || 'Custom Home';

      if (urlContext.category) {
        const categoryLabel = getCategoryLabel(urlContext.category);
        message = `I'm interested in ${categoryLabel.toLowerCase()} for ${serviceLabel.toLowerCase()}. `;
      } else {
        message = `I'm interested in ${serviceLabel.toLowerCase()}. `;
      }
    }

    if (urlContext.project) {
      message += `Specifically interested in ${urlContext.project.replace(/-/g, ' ')}. `;
    }

    // Add source context
    if (urlContext.source === 'details-form') {
      message += 'I was filling out your project details form and would like to discuss my project further.';
    } else if (urlContext.source === 'portfolio') {
      message += 'I saw your portfolio and would like to discuss a similar project.';
    } else if (urlContext.source === 'services') {
      message += 'I would like to learn more about this service and discuss my project.';
    }

    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      projectType,
      message: message.trim()
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // Add state to track form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update form data if URL context changes
    setFormData(getInitialFormData());
  }, [searchParams]);

  // Get contextual page title
  const getPageTitle = () => {
    if (urlContext.service && urlContext.category) {
      return `Get a Quote - ${getCategoryLabel(urlContext.category)}`;
    } else if (urlContext.service) {
      return `Get a Quote - ${getServiceLabel(urlContext.service)}`;
    }
    return 'Get a Quote';
  };

  // Get contextual subtitle
  const getPageSubtitle = () => {
    if (urlContext.service) {
      return `Tell us about your ${getServiceLabel(urlContext.service).toLowerCase()} project`;
    }
    return 'Tell us about your project and we\'ll get back to you within 24 hours';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      projectType: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include URL context in form submission
    const submissionData = {
      ...formData,
      context: urlContext,
      timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', submissionData);

    // Set submitting state to true to show loading indicator
    setIsSubmitting(true);

    try {
      const res = await apiPost('/api/contact', formData);
      const data = await res.json();

      if (res.ok) {
        // Show success toast
        showToast('Thank you for your message! We will get back to you soon.', 'success', 3000);

        // Trigger Meta Conversions API
        await trackMetaEvent('Contact', {
          email: formData.email,
          phone: formData.phone
        }, {
          sourceUrl: window.location.href,
          projectType: formData.projectType,
          referrer: urlContext.referrer,
          service: urlContext.service,
          category: urlContext.category
        });

        // Set submitted state to true to show thank you message
        setIsSubmitted(true);

        // Reset submitting state
        setIsSubmitting(false);
      } else {
        showToast('Failed to send message. Please try again later.', 'error');
        console.error('Backend error:', data.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
      console.error('Fetch error:', err);
      setIsSubmitting(false);
    }
  };

  const handleGoToServices = () => {
    navigate('/services');
  };

  // Thank you message component to display after form submission
  const ThankYouMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1a2e44] text-white p-8 sm:p-12 rounded-2xl text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-[#1a2e44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Thank You!</h2>
      <p className="text-lg mb-6">
        We've received your inquiry and will get back to you within 24 hours.
      </p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Your Project Details:</h3>
        <p><strong>Type:</strong> {formData.projectType}</p>
        <p><strong>Contact:</strong> {formData.email}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-[#1a2e44] hover:bg-gray-100 px-5 py-2 rounded-lg font-medium transition-colors"
        >
          Submit Another Inquiry
        </button>

        <button
          onClick={handleGoToServices}
          className="bg-transparent border border-white text-white hover:bg-white/20 px-5 py-2 rounded-lg font-medium transition-colors"
        >
          Browse Services
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <Meta />
      <Navbar />

      {/* Background Images */}
      <div className="fixed inset-0 z-0">
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

      {/* Content Container */}
      <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center text-white mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl font-light mb-4">{getPageTitle()}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              {getPageSubtitle()}
            </p>
          </div>

          {/* Contact Container */}
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-xl">
            {/* Left Column - Contact Information */}
            <div className="bg-[#1a2e44] text-white p-6 sm:p-10 md:w-5/12 relative" style={{ overflow: 'visible' }}>
              {/* Info Content */}
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Contact Information</h2>
                <p className="mb-8 text-white/80">
                  Fill up the form and our Team will get back to you within 24 hours.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span>(917) 893-0561</span>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>info@m1-b.com</span>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>New York, NY 10001</span>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex mt-12 space-x-4">
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Decorative Elements - Circles */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mb-10 -mr-10"></div>
              <div className="absolute top-1/2 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10"></div>

              {/* Orb Animation with Services Button */}
              <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10">
                <div className="relative" style={{ overflow: 'visible' }}>
                <div className="absolute hidden sm:block" style={{ right: '-30px', top: '-85px', overflow: 'visible' }}>
                <Player
                      autoplay
                      loop
                      speed={3}
                      src={orbGradientAnimation}
                      style={{
                        width: '200px',
                        height: '200px',
                        opacity: 0.9,
                        overflow: 'visible',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                  <button
                    onClick={handleGoToServices}
                    className="relative z-10 bg-white/10 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 transition-all text-xs sm:text-sm font-medium hover:bg-white/30 rounded-lg"
                    >
                    Browse Services
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form or Thank You Message */}
            <div className="p-6 sm:p-10 md:w-7/12">
              {isSubmitted ? (
                <ThankYouMessage />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields - 2 column on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
                        placeholder="John"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
                        placeholder="Doe"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Email and Phone - 2 column on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
                        placeholder="example@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
                        placeholder="(123) 456-7890"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Project Type Selection */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">What type of project do you need?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Custom Home', 'Renovation', 'Commercial', 'Other'].map((type) => (
                        <div
                          key={type}
                          className={`
                            flex items-center justify-center p-3 border rounded-lg cursor-pointer text-center transition-colors
                            ${formData.projectType === type
                              ? 'border-[#1a2e44] bg-[#1a2e44] text-white'
                              : 'border-gray-300 hover:border-gray-400'}
                            ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}
                          `}
                          onClick={() => !isSubmitting && handleRadioChange(type)}
                        >
                          <span className="text-sm">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent"
                      placeholder="Tell us about your project..."
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        bg-[#1a2e44] text-white font-medium py-3 px-6 rounded-lg transition-colors
                        ${isSubmitting
                          ? 'opacity-70 cursor-not-allowed'
                          : 'hover:bg-[#152435]'}
                      `}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Get a Quote'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePageForm;
