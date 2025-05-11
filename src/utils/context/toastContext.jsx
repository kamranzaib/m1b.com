// src/context/ToastContext.jsx
import React, { createContext, useState, useContext } from 'react';
import Toast from '../ui/toast';
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
    duration: 5000
  });

  const showToast = (message, type = 'success', duration = 5000) => {
    setToast({
      show: true,
      message,
      type,
      duration
    });
  };

  const hideToast = () => {
    setToast({
      ...toast,
      show: false
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);