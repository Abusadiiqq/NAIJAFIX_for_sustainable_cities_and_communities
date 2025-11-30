import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
// REMOVE THIS LINE: import DropdownMenu from './DropdownMenu';

const Header = ({ onMenuToggle }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-green-500 text-white shadow-lg fixed top-0 left-0 right-0 z-50 lg:left-64 lg:right-0 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden text-green-200 hover:text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white text-green-700 p-2 rounded-lg">
                <span className="text-xl"></span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-black font-bold">NaijaFix 🇳🇬</h1>
                <p className="text-white text-xs">Community Reporter</p>
              </div>
            </Link>
          </div>

          {/* REMOVE THIS ENTIRE SECTION: DropdownMenu for mobile */}
          {/* <div className="lg:hidden">
            <DropdownMenu />
          </div> */}

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex space-x-1">
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* REMOVE THIS ENTIRE SECTION: Mobile Navigation */}
        {/* <div className="lg:hidden pb-2">
          <nav className="flex space-x-1 overflow-x-auto">
          </nav>
        </div> */}
      </div>
    </header>
  );
};

export default Header;