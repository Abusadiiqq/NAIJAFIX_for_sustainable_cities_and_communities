import { useTranslation } from 'react-i18next';

const StatsCard = ({ stats }) => {
  const { t } = useTranslation();

  const statItems = [
    {
      label: t('hero.stats'),
      value: stats?.total || 0,
      color: 'text-naija-green',
      bgColor: 'bg-green-50',
      icon: '📊'
    },
    {
      label: t('status.pending'),
      value: stats?.pending || 0,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: '⏳'
    },
    {
      label: t('status.in-progress'),
      value: stats?.inProgress || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: '🔄'
    },
    {
      label: t('status.resolved'),
      value: stats?.resolved || 0,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: '✅'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((stat, index) => (
        <div 
          key={index}
          className={`${stat.bgColor} rounded-xl p-6 text-center shadow-lg border-2 border-white fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className={`text-3xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 font-semibold">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;