import {React, useLocation, useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ConstructionAppUI from './components/homepage';
import RenovationApp from './components/details';
import ContactPage from './components/ContactPage';
import PortfolioPage from './components/PortfolioPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConstructionAppUI />
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
  }

]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;