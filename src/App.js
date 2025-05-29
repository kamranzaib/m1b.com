import {React, useLocation, useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ConstructionAppUI from './components/homepage';
import RenovationApp from './components/details';
import ContactPage from './components/ContactPage';
import PortfolioPage from './components/PortfolioPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import { ToastProvider } from './utils/context/toastContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConstructionAppUI />
  },
  {
    path: '/services',
    element: <ServicesPage />
  },
  {
    path: '/details',
    element: <RenovationApp />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/portfolio',
    element: <PortfolioPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  }

]);

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </div>
  );
}

export default App;