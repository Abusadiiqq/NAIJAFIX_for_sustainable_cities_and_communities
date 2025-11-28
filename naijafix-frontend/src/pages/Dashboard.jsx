import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReportsAPI } from '../lib/api';
import StatsCard from '../components/StatsCard';
import heroImage from '../assets/images/coa.jpg';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentReports, setRecentReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsResponse, reportsResponse] = await Promise.all([
                ReportsAPI.getStats(),
                ReportsAPI.list()
            ]);

            setStats(statsResponse.data);
            setRecentReports(reportsResponse.data?.slice(0, 4) || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const quickActions = [
        {
            title: t('dashboard.actions.createReport'),
            description: t('dashboard.actions.createReportDesc'),
            icon: '📢',
            link: '/create-report',
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            title: t('dashboard.actions.viewReports'),
            description: t('dashboard.actions.viewReportsDesc'),
            icon: '📋',
            link: '/reports',
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            title: t('dashboard.actions.seeStats'),
            description: t('dashboard.actions.seeStatsDesc'),
            icon: '📊',
            link: '/statistics',
            color: 'bg-green-500 hover:bg-green-600'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-700 font-semibold">{t('messages.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container mx-auto px-6 py-8">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 [text-shadow:_0_2px_8px_rgb(255_255_255_/_60%)]">
    {t('dashboard.welcome')} <span className="text-green-300">NaijaFix</span>
</h1>
                    <p className="text-xl text-white font-semibold max-w-2xl mx-auto drop-shadow-lg">
                        {t('dashboard.subtitle')}
                    </p>
                </section>


                {/* Quick Actions */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
                        <span className="mr-3 text-4xl">🚀</span>
                        {t('dashboard.quickActions')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => (
                            <Link
                                key={index}
                                to={action.link}
                                className={`${action.color} text-white p-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 flex flex-col items-center text-center border-2 border-white`}
                            >
                                <div className="text-4xl mb-3">{action.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{action.title}</h3>
                                <p className="text-white/90 drop-shadow-md text-sm">{action.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                
                {/* Statistics */}
                <section className="mb-12">
                    <StatsCard stats={stats} />
                </section>

                {/* Recent Reports Preview */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-white flex items-center drop-shadow-lg">
                            <span className="mr-3 text-4xl">🕒</span>
                            {t('dashboard.recentReports')}
                        </h2>
                        <Link
                            to="/reports"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-bold drop-shadow-lg border-2 border-white"
                        >
                            <span>📋</span>
                            <span>{t('dashboard.viewAll')}</span>
                        </Link>
                    </div>

                    {recentReports.length === 0 ? (
                        <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-white">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                {t('dashboard.noReports')}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {t('dashboard.createFirstReport')}
                            </p>
                            <Link
                                to="/create-report"
                                className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors inline-flex items-center space-x-2 drop-shadow-lg"
                            >
                                <span>📢</span>
                                <span>{t('dashboard.createReport')}</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentReports.slice(0, 4).map((report) => (
                                <div key={report._id} className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg text-gray-800">{report.title}</h3>
                                        <span className="text-2xl">
                                            {report.category === 'Roads' && '🛣️'}
                                            {report.category === 'Electricity' && '💡'}
                                            {report.category === 'Water' && '💧'}
                                            {report.category === 'Sanitation' && '🧹'}
                                            {report.category === 'Security' && '👮'}
                                            {report.category === 'Healthcare' && '🏥'}
                                            {report.category === 'Education' && '📚'}
                                            {report.category === 'Other' && '📋'}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-3 line-clamp-2 font-medium">
                                        {report.description}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <span>📍 {report.location.area}, {report.location.state}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                        }`}>
                                            {report.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;