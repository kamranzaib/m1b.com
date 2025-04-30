import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, service, image, icon }) => {
  return (
    <Link
      to="/details"
      state={{ selectedService: title, fromHomepage: true }}
      className="rounded-xl sm:rounded-2xl overflow-hidden text-white relative group hover:shadow-lg transition transform hover:-translate-y-1 h-[220px] sm:h-[250px] md:h-[300px]"
    >
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue overlay covering 40% of left side */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-y-0 left-0 w-[40%] bg-[#1a2e44]"></div>
        </div>
        
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-20 p-4 sm:p-6 md:p-8 flex flex-col justify-end h-full">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/80 text-black rounded-full flex items-center justify-center mb-3 sm:mb-6">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">{title}</h3>
        <p className="text-gray-300 text-xs sm:text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;