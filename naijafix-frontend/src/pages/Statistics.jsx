import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReportsAPI } from '../lib/api';
import Background from '../components/UI/Background';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, reportsResponse] = await Promise.all([
        ReportsAPI.getStats(),
        ReportsAPI.list()
      ]);
      
      setStats(statsResponse.data);
      setReports(reportsResponse.data || []);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryStats = reports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});

  const stateStats = reports.reduce((acc, report) => {
    acc[report.location.state] = (acc[report.location.state] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('messages.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <span className="text-4xl mr-3">📊</span>
            {t('navigation.statistics')}
          </h1>
          <p className="text-gray-600 mt-2">
            {t('statistics.subtitle')}
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-green-500 text-white p-6 rounded-2xl text-center shadow-lg">
            <div className="text-3xl font-bold">{stats?.total || 0}</div>
            <div className="text-green-100">{t('statistics.totalReports')}</div>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-2xl text-center shadow-lg">
            <div className="text-3xl font-bold">{stats?.pending || 0}</div>
            <div className="text-yellow-100">{t('status.pending')}</div>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-2xl text-center shadow-lg">
            <div className="text-3xl font-bold">{stats?.inProgress || 0}</div>
            <div className="text-blue-100">{t('status.in-progress')}</div>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-2xl text-center shadow-lg">
            <div className="text-3xl font-bold">{stats?.resolved || 0}</div>
            <div className="text-green-100">{t('status.resolved')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📂</span>
              {t('statistics.byCategory')}
            </h2>
            <div className="space-y-4">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {category === 'Roads' && '🛣️'}
                      {category === 'Electricity' && '💡'}
                      {category === 'Water' && '💧'}
                      {category === 'Sanitation' && '🧹'}
                      {category === 'Security' && '👮'}
                      {category === 'Healthcare' && '🏥'}
                      {category === 'Education' && '📚'}
                      {category === 'Other' && '📋'}
                    </span>
                    <span className="font-medium">{t(`categories.${category}`)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-green-600">{count}</span>
                    <span className="text-gray-500 text-sm">
                      ({Math.round((count / (stats?.total || 1)) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* State Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">🗺️</span>
              {t('statistics.byState')}
            </h2>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {Object.entries(stateStats)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([state, count]) => (
                  <div key={state} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📍</span>
                      <span className="font-medium">{state}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-blue-600">{count}</span>
                      <span className="text-gray-500 text-sm">
                        ({Math.round((count / (stats?.total || 1)) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">📈</span>
            {t('statistics.resolutionRate')}
          </h2>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {stats?.total ? Math.round(((stats?.resolved || 0) / stats.total) * 100) : 0}%
              </div>
              <div className="text-gray-600">
                {t('statistics.ofReportsResolved')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;