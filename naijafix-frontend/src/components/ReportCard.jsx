import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReportCard = ({ report, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(report.status);
  const [priority, setPriority] = useState(report.priority);
  const { t } = useTranslation();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    resolved: 'bg-green-100 text-green-800 border-green-300'
  };

  const priorityColors = {
    urgent: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  const categoryIcons = {
    Roads: '🛣️',
    Electricity: '💡', 
    Water: '💧',
    Sanitation: '🧹',
    Security: '👮',
    Healthcare: '🏥',
    Education: '📚',
    Other: '📋'
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(report._id, { status, priority });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update report:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{categoryIcons[report.category]}</span>
          <div>
            <h3 className="text-xl font-bold text-green-800">{report.title}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="mr-1">📍</span>
              {report.location.area}, {report.location.lga}, {report.location.state}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors flex items-center space-x-1"
          >
            <span>{isEditing ? '✖️' : '✏️'}</span>
            <span>{isEditing ? t('report.cancel') : t('buttons.edit')}</span>
          </button>
          <button 
            onClick={() => onDelete(report._id)}
            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
          >
            <span>🗑️</span>
            <span>{t('buttons.delete')}</span>
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{report.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-1">📂</span>
            {t('report.category')}
          </p>
          <p className="font-semibold text-green-800">{t(`categories.${report.category}`)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-1">📅</span>
            Reported Date
          </p>
          <p className="font-semibold">{new Date(report.createdAt).toLocaleDateString('en-NG')}</p>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg border-2 border-green-200">
          <h4 className="font-semibold text-green-800 flex items-center">
            <span className="mr-2">⚙️</span>
            Update Report
          </h4>
          <div className="flex space-x-3">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">{t('report.status')}</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
              >
                <option value="pending">{t('status.pending')}</option>
                <option value="in-progress">{t('status.in-progress')}</option>
                <option value="resolved">{t('status.resolved')}</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">{t('report.priority')}</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
              >
                <option value="low">{t('priority.low')}</option>
                <option value="medium">{t('priority.medium')}</option>
                <option value="high">{t('priority.high')}</option>
                <option value="urgent">{t('priority.urgent')}</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleUpdate}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>💾</span>
              <span>{t('buttons.save')}</span>
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
            >
              <span>❌</span>
              <span>{t('report.cancel')}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-3">
          <div className={`flex-1 border-2 rounded-lg px-3 py-2 text-center font-semibold ${statusColors[report.status]} flex items-center justify-center space-x-2`}>
            <span>
              {report.status === 'pending' && '⏳'}
              {report.status === 'in-progress' && '🔄'}
              {report.status === 'resolved' && '✅'}
            </span>
            <span>{t(`status.${report.status}`)}</span>
          </div>
          <div className={`flex-1 border-2 rounded-lg px-3 py-2 text-center font-semibold ${priorityColors[report.priority] || 'bg-gray-100 text-gray-800 border-gray-300'} flex items-center justify-center space-x-2`}>
            <span>
              {report.priority === 'urgent' && '🔴'}
              {report.priority === 'high' && '🟠'}
              {report.priority === 'medium' && '🟡'}
              {report.priority === 'low' && '🟢'}
              {!report.priority && '⚪'}
            </span>
            <span>{report.priority ? t(`priority.${report.priority}`) : 'No Priority'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;