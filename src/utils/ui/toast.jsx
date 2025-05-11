import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ 
  show, 
  message, 
  type = 'success', 
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(show);
  
  // Set up styles based on message type
  const getStyles = () => {
    switch(type) {
      case 'success':
        return 'bg-gradient-to-r from-[#1a2e44] to-[#3f5675] text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800';
      case 'info':
        return 'bg-gradient-to-r from-[#1a2e44] to-[#3f5675] text-white';
      default:
        return 'bg-gradient-to-r from-[#1a2e44] to-[#3f5675] text-white';
    }
  };

  // Get the icon based on message type
  const getIcon = () => {
    switch(type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  // Automatically hide the toast after duration
  useEffect(() => {
    setIsVisible(show);
    
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.3 }} // Faster animation
        className={`fixed bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg ${getStyles()}`}
        style={{ minWidth: '280px', maxWidth: '90%' }}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
          <div className="mr-2 flex-1 text-sm sm:text-base font-medium">
            {message}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className="flex-shrink-0 ml-2 text-white focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg" style={{ 
            width: '100%',
            animation: `shrink ${duration}ms linear forwards`
          }}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;