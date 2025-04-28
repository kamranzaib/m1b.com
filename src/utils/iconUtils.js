import React from 'react';

export const getServiceIcon = (serviceId) => {
  switch(serviceId) {
    case '1': // Custom Home Building
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case '2': // Renovations & Additions
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case '3': // Commercial Projects
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    // House room categories
    case 'kitchen':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.5A3.5 3.5 0 0017.5 12h-1.423a.25.25 0 01-.198-.1l-.375-.525A3.5 3.5 0 0012 8.963M13 6c0 .732-.203 1.42-.56 2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6a3 3 0 11-6 0 3 3 0 016 0zM8.267 13.5a.267.267 0 00-.267.267v2.466c0 .147.12.267.267.267h10.466a.267.267 0 00.267-.267v-2.466a.267.267 0 00-.267-.267H8.267zM2 12h1a2 2 0 012 2v6a2 2 0 01-2 2H2v-5" />
        </svg>
      );
    case 'bathroom':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 10H3m18 0a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2m18 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v3m14 10v-2m-10 2v-2" />
        </svg>
      );
    case 'bedroom':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h12a2 2 0 012 2v12a4 4 0 01-4 4H7m4-16h2m-2 4h2m-6 4h10" />
        </svg>
      );
    case 'livingroom':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12V8.5A2.5 2.5 0 0017.5 6h-11A2.5 2.5 0 004 8.5V12m16 0v3.5a.5.5 0 01-.5.5H4.5a.5.5 0 01-.5-.5V12m16 0H4" />
        </svg>
      );
    case 'basement':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4m14 0l-5-5-5 5m10 0h-10" />
        </svg>
      );
    case 'outdoor':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-9 3v-1m0 0v-1m0 1h1m-1 0h-1" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
};