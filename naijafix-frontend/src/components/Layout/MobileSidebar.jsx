import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileSidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('navigation.dashboard'), href: '/', icon: '🏠' },
    { name: t('navigation.reports'), href: '/reports', icon: '📋' },
    { name: t('navigation.createReport'), href: '/create-report', icon: '📢' },
    { name: t('navigation.statistics'), href: '/statistics', icon: '📊' },
  ];

  const isActive = (path) => location.pathname === path;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-green-800 text-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="p-6 pt-20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-green-200 hover:text-white text-2xl"
          >
            ×
          </button>

          {/* Navigation Links */}
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`block p-4 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'bg-green-700 text-white shadow-lg'
                    : 'text-green-100 hover:bg-green-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-lg">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Quick Info */}
          <div className="mt-8 p-4 bg-green-700 rounded-lg">
            <div className="text-center">
              <div className="text-2xl mb-2">🇳🇬</div>
              <p className="text-green-100 text-sm">
                Serving all 36 Nigerian states
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;