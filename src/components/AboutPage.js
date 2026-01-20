// src/components/AboutPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import images from '../imageConfig';
import Footer from '../utils/Footer';
import { Timeline } from '../utils/ui/timeline';
import Meta from './Meta';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timeline data for company history
  const historyTimelineData = [
    {
      title: (<span className="text-white">2020</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base text-white">
M1B was founded in 2020 by a software engineer with a lifelong passion for architecture and design. Having grown up around the construction world and later working in real estate project management, he saw firsthand the inefficiencies and communication gaps developers often face. Driven by the belief that construction could be more transparent, streamlined, and client-focused, he launched M1B to build better—through both process and product.          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src='https://storage.googleapis.com/m1b_portfolio_photos/project%20photos/renovated/renovated/Duplex-B-LR_staged2-scaled.jpg'
              alt="Company founding"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">2021</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            Our team expanded to include in-house civil engineers with real-world field experience, a structural engineering consultant, a multimedia infrastructure specialist, and a seasoned foreman. This diverse expertise allowed us to streamline execution on-site and build smarter, faster, and safer. By this point, we had completed our 10th residential project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Team expansion"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">2022</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            We completed our custom home project and established ourselves as a premier residential construction company in the New York metropolitan area. Our reputation for quality craftsmanship and attention to detail began attracting high-profile clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://storage.googleapis.com/m1b_portfolio_photos/project%20photos/renovated/renovated/Living-Dining-Room-scaled.jpg"
              alt="Custom home project"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://storage.googleapis.com/m1b_portfolio_photos/project%20photos/renovated/renovated/20.jpeg"
              alt="Interior design"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">2024</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            We implemented cutting-edge project management systems and digital tools to provide clients with real-time updates and enhance communication throughout the construction process. Our client portal became a game-changer for transparency in the industry.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-white">
                Custom client dashboards
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
                Real-time progress tracking
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
               Integrated communication tools
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
                Digital documentation system
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (<span className="text-white">2025</span>),
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-white md:text-base">
            With over 30 completed projects and a 100% client satisfaction rate, we continue to push boundaries and set new standards in modern construction. Our team has grown to 35 industry professionals dedicated to bringing your vision to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Modern construction"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Kitchen design"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];
  
 

  // Team members data
  const teamMembers = [
    {
      name: 'Kamran Zaib',
      role: 'Founder & Lead Engineer',
      image: '',
      bio: 'Software Engineer turned Construction Lead, with years of expertise in project planing and best design for large scale systems'
    },
    {
      name: 'Mohammad Awan',
      role: 'Chief Design Engineer',
      image: 'Mohammad is an expert in architectural visualization and CAD workflows, our Chief Design Engineer leads the creative and technical aspects of every design. With a sharp eye for detail and functionality, Mohammad ensure that every project blends innovation, aesthetics, and client intent.',
      bio: ''
    },
    {
      name: 'Jawad Ahmad',
      role: 'Chief Structural Engineer',
      image: 'With over a decade of structural analysis and on-site engineering experience, our Chief Structural Engineer guarantees every project is safe, resilient, and built to last. From foundational integrity to load-bearing systems, their oversight ensures compliance and durability at every step.',
      bio: 'With a background in construction management and 12 years of experience, Jawad ensures that every project is delivered on time, within budget, and to the highest standards.'
    },
    {
      name: 'Tommy Giannopolous',
      role: 'Project Head',
      image: 'A hands-on leader with extensive field experience, our Project Head oversees all phases of construction—from breaking ground to final handoff. Known for precise coordination and deadline-driven execution, they ensure every job meets our highest standards for quality and efficiency.',
      bio: 'Specializing in creating personalized, functional interiors, Tommy works closely with clients to transform houses into homes that reflect their personalities and lifestyles.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32">
      <Meta />
      {/* Navigation */}
      <Navbar />
      
      {/* Background Images */}
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
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">About M1B</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Building exceptional spaces with precision, passion, and uncompromising quality.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section with Timeline */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-white/10 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-center text-white">Our Story</h2>
            <p className="text-center text-gray-600 text-white max-w-3xl mx-auto">
              From our humble beginnings to becoming a leading construction company in New York, our journey has been defined by passion, innovation, and dedication to quality.
            </p>
          </div>
          
          <Timeline data={historyTimelineData} />
        </section>
        
        {/* Meet Our Team Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-white/20 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-center text-white">Meet Our Team</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 sm:mb-12 text-white">
              Our team of experienced professionals brings together diverse expertise in engineering, architecture, design, and construction management. We work collaboratively to bring your vision to life.
            </p>
            
            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 text-[#1a2e44]">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        
        {/* CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-[#1a2e44]/40 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-white">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base text-white">
              Let's create something exceptional together. Our team is ready to bring your vision to life with the expertise, transparency, and quality that defines M1B Construction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-black text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
                Contact Us
              </Link>
              <Link to="/portfolio" className="bg-white border border-black text-black px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">
                View Our Portfolio
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer/>

      </div>
    </div>
  );
};

export default AboutPage;