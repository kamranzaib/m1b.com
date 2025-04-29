import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Navbar from '../utils/Navbar';
import orbGradientAnimation from '../assets/animations/orb-animation';
const ContactPage = () => {
  const navigate = useNavigate();

  const [consultName, setConsultName] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultMessage, setConsultMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    console.log('Consultation form submitted:', { consultName, consultEmail, consultPhone, consultMessage });
    setConsultName('');
    setConsultEmail('');
    setConsultPhone('');
    setConsultMessage('');
  };

  const handleGoToServices = () => {
    navigate('/');
    setTimeout(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="relative">
        <div className="fixed inset-0 z-0">
          <div className="h-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3087&auto=format&fit=crop')" }}></div>
          <div className="h-1/2 grid grid-cols-2">
            <div className="bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=3087&auto=format&fit=crop')" }}></div>
            <div className="bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3087&auto=format&fit=crop')" }}></div>
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 pt-32 px-8 md:px-16">
          <div className="max-w-7xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row gap- justify-center">
              <div className="md:w-2/5 mx-auto bg-white p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-10">
                  <h1 className="text-4xl md:text-5xl font-light italic text-[#1a2e44] mb-4">Get a Free Consultation</h1>
                  <p className="text-gray-600">Let's discuss how we can bring your vision to life.</p>
                </div>

                <form className="space-y-6" onSubmit={handleConsultSubmit}>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" placeholder="John Doe" value={consultName} onChange={(e) => setConsultName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input type="email" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" placeholder="john@example.com" value={consultEmail} onChange={(e) => setConsultEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input type="tel" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" placeholder="(123) 456-7890" value={consultPhone} onChange={(e) => setConsultPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                    <textarea rows="4" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2e44] focus:border-transparent" placeholder="Tell us a bit about your project..." value={consultMessage} onChange={(e) => setConsultMessage(e.target.value)} required></textarea>
                  </div>
                  <div className="text-center pt-4">
                    <button type="submit" className="bg-[#1a2e44] hover:bg-[#152435] text-white px-8 py-3 rounded-lg transition-colors font-medium">Submit Request</button>
                  </div>
                </form>
              </div>

              <div className="md:w-1/4 relative p-8 self-start overflow-visible">
              <Player
                  autoplay
                  loop
                  speed={3}   // <--- speed
                  src={orbGradientAnimation}
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-40%',
                    width: '160%',
                    height: '160%',
                    opacity: 1, // add opacity
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                <div className="relative z-10 text-white">
                  <h2 className="text-2xl font-light mb-4">Already know?</h2>
                  <p className="mb-6 text-sm">Select your service directly and<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;help us get started faster.</p>
                  <button onClick={handleGoToServices} className="border border-white text-white hover:bg-white hover:text-[#1a2e44] transition-colors px-6 py-3 rounded-lg font-medium text-sm">Browse Services</button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 md:px-16 py-16 mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-10 text-center text-white">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Quality</h3>
                <p className="text-gray-300">We pride ourselves on delivering the highest quality solutions tailored to your specific needs.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Timeliness</h3>
                <p className="text-gray-300">We respect deadlines and ensure your project is completed on time, every time.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Transparent Pricing</h3>
                <p className="text-gray-300">No hidden costs. We provide clear, upfront pricing for all our services.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1a2e44] text-white flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">24/7 Support</h3>
                <p className="text-gray-300">Our team is always available to address your concerns and provide assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;