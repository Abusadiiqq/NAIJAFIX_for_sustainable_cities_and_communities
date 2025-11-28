import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ReportsAPI } from '../lib/api';
import ReportCard from '../components/ReportCard';
import Background from '../components/UI/Background';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await ReportsAPI.list();
      setReports(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateReport = async (id, updateData) => {
    try {
      const response = await ReportsAPI.update(id, updateData);
      setReports(prev => prev.map(report => 
        report._id === id ? response.data : report
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteReport = async (id) => {
    try {
      await ReportsAPI.delete(id);
      setReports(prev => prev.filter(report => report._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t('messages.error')}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchReports}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            {t('buttons.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="text-4xl mr-3">📋</span>
              {t('navigation.reports')}
            </h1>
            <p className="text-gray-600 mt-2">
              {t('reports.subtitle')} ({reports.length})
            </p>
          </div>
          <Link
            to="/create-report"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>📢</span>
            <span>{t('reports.createNew')}</span>
          </Link>
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              {t('reports.noReports')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t('reports.noReportsDesc')}
            </p>
            <Link
              to="/create-report"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>📢</span>
              <span>{t('reports.createFirst')}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              report && report._id && (
                <ReportCard
                  key={report._id}
                  report={report}
                  onUpdate={updateReport}
                  onDelete={deleteReport}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;