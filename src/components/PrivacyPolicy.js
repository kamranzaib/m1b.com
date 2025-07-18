// src/components/PrivacyPolicy.js
import React from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import Meta from './Meta';
import images from '../imageConfig';
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32">
      <Meta title="Privacy Policy" />
      <Navbar />

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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">Privacy Policy</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-[#1a2e44]/50 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16 text-white">
          <p className="text-sm sm:text-base mb-4">
            At M1B Construction, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <h2 className="text-2xl sm:text-3xl font-light mt-8 mb-4">Information We Collect</h2>
          <p className="text-sm sm:text-base mb-4">
            We may collect personal details such as your name, email address, phone number, and project details when you fill out forms on our website or through advertisements. We also use cookies and similar technologies to analyze site traffic and improve your experience.
          </p>

          <h2 className="text-2xl sm:text-3xl font-light mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-sm sm:text-base mb-4">
            We use your information to:
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base mb-4">
            <li>Respond to inquiries and provide services.</li>
            <li>Send updates, promotions, and marketing communications.</li>
            <li>Improve our website and services.</li>
            <li>Run targeted ads via platforms like Google Ads and Facebook.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-light mt-8 mb-4">Sharing Your Information</h2>
          <p className="text-sm sm:text-base mb-4">
            We may share your information with trusted third parties such as advertising platforms and service providers. We do not sell your data.
          </p>

          <h2 className="text-2xl sm:text-3xl font-light mt-8 mb-4">Your Choices</h2>
          <p className="text-sm sm:text-base mb-4">
            You may opt out of receiving marketing emails at any time by clicking the unsubscribe link in our emails or contacting us directly.
          </p>

          <h2 className="text-2xl sm:text-3xl font-light mt-8 mb-4">Security</h2>
          <p className="text-sm sm:text-base mb-4">
            We implement reasonable security measures to protect your data.
          </p>

          <h2 className="text-2xl sm:text-3xl font-light mt-8 mb-4">Contact Us</h2>
          <p className="text-sm sm:text-base mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-sm sm:text-base mb-4">
            M1B Construction<br />
            info@m1-b.com<br />
            New York, NY
          </p>

          <p className="text-sm sm:text-base mt-8">
            This Privacy Policy was last updated on July 18, 2025. We may update it from time to time.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
