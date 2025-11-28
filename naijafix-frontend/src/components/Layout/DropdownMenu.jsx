import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 text-green-100 hover:bg-green-600"
        aria-label="Menu"
      >
        <span>☰</span> {/* Hamburger icon */}
        <span>{t('navigation.menu')}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-green-700 rounded-md shadow-lg z-10">
          <Link
            to="/"
            className="block px-4 py-2 text-green-100 hover:bg-green-600 transition-colors"
          >
            {t('navigation.dashboard')}
          </Link>
          <Link
            to="/reports"
            className="block px-4 py-2 text-green-100 hover:bg-green-600 transition-colors"
          >
            {t('navigation.reports')}
          </Link>
          <Link
            to="/create-report"
            className="block px-4 py-2 text-green-100 hover:bg-green-600 transition-colors"
          >
            {t('navigation.createReport')}
          </Link>
          <Link
            to="/statistics"
            className="block px-4 py-2 text-green-100 hover:bg-green-600 transition-colors"
          >
            {t('navigation.statistics')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;