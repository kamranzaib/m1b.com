// src/components/AboutPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import images from '../imageConfig';
import { Timeline } from '../utils/ui/timeline';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timeline data for company history
  const historyTimelineData = [
    {
      title: "2010",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            M1B Construction was founded by a team of passionate civil engineers with a vision to transform the construction industry with innovation, transparency, and exceptional craftsmanship.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Company founding"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            Our team expanded to include award-winning architects, interior designers, and project managers, allowing us to offer comprehensive design-build services. By this point, we had completed our first 10 residential projects with rave reviews.
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
      title: "2015",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            We completed our 25th custom home project and established ourselves as a premier residential construction company in the New York metropolitan area. Our reputation for quality craftsmanship and attention to detail began attracting high-profile clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Custom home project"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600573472550-8090733a21e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Interior design"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            Expanding our services to include commercial construction, we began transforming office spaces, retail environments, and mixed-use developments. Our first commercial project won a regional design award for innovative space utilization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Commercial construction"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            We implemented cutting-edge project management systems and digital tools to provide clients with real-time updates and enhance communication throughout the construction process. Our client portal became a game-changer for transparency in the industry.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Custom client dashboards
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Real-time progress tracking
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Integrated communication tools
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Digital documentation system
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            With over 65 completed projects and a 100% client satisfaction rate, we continue to push boundaries and set new standards in modern construction. Our team has grown to 35 industry professionals dedicated to bringing your vision to life.
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
  
  // Process timeline data
  const processTimelineData = [
    {
      title: "Consultation",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            We begin with a detailed discussion about your vision, requirements, preferences, and budget. Our goal is to fully understand what you want to achieve with your project.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ In-depth needs assessment
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Budget planning consultation
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Timeline expectations
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Design & Planning",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            Our team of architects and designers creates custom plans tailored to your needs. We collaborate closely with you to refine the designs until they perfectly match your vision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1589939705384-5133349c7ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Design planning"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Project Execution",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            Construction begins with our skilled craftsmen bringing your project to life. A dedicated project manager oversees every aspect of the build, ensuring quality and timely execution.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Site preparation
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Foundation and structural work
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Mechanical, electrical, and plumbing
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              ✅ Interior and exterior finishes
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Progress Tracking",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            You receive access to our project management platform where you can track progress in real-time. Weekly updates keep you informed about milestones and upcoming work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Progress tracking"
              className="h-48 w-full rounded-lg object-cover shadow-lg"
            />
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-[#1a2e44] mb-2">Client Portal Features:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Dedicated Trello board for your project</li>
                <li>Photo and video updates</li>
                <li>Weekly progress reports</li>
                <li>Direct messaging with your project manager</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Completion",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            Once construction is complete and all inspections are passed, we hand over your new space. We provide complete documentation and warranty information for your peace of mind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Project completion"
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
      bio: 'Software Engineer turned Construction Lead, with years of expertise in project planing and best design for large scale applications'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Architect',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=80',
      bio: 'Award-winning architect with a passion for sustainable design. Sarah leads our design team, turning client visions into beautiful, functional spaces.'
    },
    {
      name: 'David Rodriguez',
      role: 'Project Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&q=80',
      bio: 'With a background in construction management and 12 years of experience, David ensures that every project is delivered on time, within budget, and to the highest standards.'
    },
    {
      name: 'Amara Johnson',
      role: 'Interior Design Lead',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces&q=80',
      bio: 'Specializing in creating personalized, functional interiors, Amara works closely with clients to transform houses into homes that reflect their personalities and lifestyles.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">About M1B Construction</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Building exceptional spaces with precision, passion, and uncompromising quality since 2010.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section with Timeline */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-white/90 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-center">Our Story</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              From our humble beginnings to becoming a leading construction company in New York, our journey has been defined by passion, innovation, and dedication to quality.
            </p>
          </div>
          
          <Timeline data={historyTimelineData} />
        </section>
        
        {/* Meet Our Team Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-white/90 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-center">Meet Our Team</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 sm:mb-12">
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
        
        {/* Our Process Section with Timeline */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-white/90 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-center">Our Process</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              We've developed a streamlined, transparent process that keeps you informed and involved at every stage. From initial concept to final handover, here's how we bring your project to life.
            </p>
          </div>
          
          <Timeline data={processTimelineData} />
        </section>
        
        {/* CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 mb-16 bg-gray-100/95 backdrop-blur-sm rounded-lg mx-4 sm:mx-6 md:mx-8 lg:mx-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
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
                <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">About Us</Link></li>
                <li><Link to="/portfolio" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">Projects</Link></li>
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
    </div>
  );
};

export default AboutPage;