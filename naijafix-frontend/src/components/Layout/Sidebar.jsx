import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { 
      name: t('navigation.dashboard'), 
      href: '/', 
      icon: '🏠',
      description: t('sidebar.dashboardDesc')
    },
    { 
      name: t('navigation.reports'), 
      href: '/reports', 
      icon: '📋',
      description: t('sidebar.reportsDesc')
    },
    { 
      name: t('navigation.createReport'), 
      href: '/create-report', 
      icon: '📢',
      description: t('sidebar.createReportDesc')
    },
    { 
      name: t('navigation.statistics'), 
      href: '/statistics', 
      icon: '📊',
      description: t('sidebar.statisticsDesc')
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-green-800 text-white min-h-screen fixed left-0 top-0 pt-16 hidden lg:block">
      <div className="p-6">
        {/* Sidebar Header */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">Navigation</h2>
          <div className="w-12 h-1 bg-red-600 rounded-full"></div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block p-3 rounded-lg transition-all group ${
                isActive(item.href)
                  ? 'bg-green-700 text-white shadow-lg border-l-4 border-green-400'
                  : 'text-green-100 hover:bg-green-700 hover:border-l-4 hover:border-green-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-green-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Quick Stats Section */}
        <div className="mt-12 p-4 bg-green-700 rounded-lg">
          <h3 className="font-bold text-green-100 mb-3 flex items-center">
            <span className="mr-2">🚀</span>
            {t('sidebar.quickStats')}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-green-200">Coverage:</span>
              <span className="font-bold text-white">36 States</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-200">LGAs:</span>
              <span className="font-bold text-white">774</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-200">Languages:</span>
              <span className="font-bold text-white">4</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-6 p-4 bg-green-900 rounded-lg">
          <h3 className="font-bold text-green-100 mb-2 flex items-center">
            <span className="mr-2">💚</span>
            {t('sidebar.support')}
          </h3>
          <p className="text-green-200 text-xs">
            {t('sidebar.supportDesc')}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;