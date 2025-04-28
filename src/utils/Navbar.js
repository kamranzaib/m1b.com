// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white py-6 px-8 md:px-16 flex justify-between items-center shadow">
      {/* Logo / Brand Name */}
      <div>
        <h1 className="text-2xl font-semibold text-black">M1B Construction</h1>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-10">
        {[
          { label: 'Home', href: 'home' },
          { label: 'Services', href: 'services' },
          { label: 'About', href: 'about' },
          { label: 'Portfolio', href: 'portfolio' },
        ].map(({ label, href }) => (
          isHome ? (
            <a
              key={label}
              href={`#${href}`}
              onClick={(e) => scrollToSection(e, href)}
              className="relative text-gray-700 hover:text-black transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300"
            >
              {label}
            </a>
          ) : (
            <Link
              key={label}
              to={`/#${href}`}
              className="relative text-gray-700 hover:text-black transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300"
            >
              {label}
            </Link>
          )
        ))}
      </nav>

      {/* Consultation Button */}
      <div>
        <Link 
          to="/contact" 
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Free Consultation
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
