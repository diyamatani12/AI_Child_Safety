import React from 'react';
import { Calendar, Download, TrendingUp, Clock, MapPin, Shield } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Journey } from '../../services/database';

interface ReportsCardProps {
  weeklyReports: Journey[];
}

const ReportsCard: React.FC<ReportsCardProps> = ({ weeklyReports }) => {
  const completedJourneys = weeklyReports.filter(report => report.status === 'completed');
  const averageSafetyScore = completedJourneys.length > 0 
    ? Math.round(completedJourneys.reduce((acc, report) => acc + report.safetyScore, 0) / completedJourneys.length)
    : 0;
  const totalIncidents = weeklyReports.reduce((acc, report) => acc + report.incidents, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'delayed':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DashboardCard 
      title="Journey Reports" 
      icon={Calendar}
      headerAction={
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      }
    >
      {weeklyReports.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-lg font-semibold text-gray-900">No Journey Data</p>
          <p className="text-gray-600">Journey reports will appear here once your child starts traveling</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="text-2xl font-bold text-green-900">{averageSafetyScore}%</div>
              <div className="text-sm text-green-700 font-medium">Avg Safety Score</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="text-2xl font-bold text-blue-900">{weeklyReports.length}</div>
              <div className="text-sm text-blue-700 font-medium">Total Journeys</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
              <div className="text-2xl font-bold text-orange-900">{totalIncidents}</div>
              <div className="text-sm text-orange-700 font-medium">Total Incidents</div>
            </div>
          </div>

          {/* Recent Journeys */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Journeys</h4>
            {weeklyReports.map((report, index) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{report.startLocation} → {report.endLocation}</p>
                    <p className="text-sm text-gray-600">{report.date} • {report.startTime}</p>
                    <p className="text-sm text-gray-500">{report.transportType} #{report.transportId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">{report.safetyScore}%</span>
                  </div>
                  <p className={`text-sm font-medium capitalize ${getStatusColor(report.status)}`}>
                    {report.status.replace('_', ' ')}
                  </p>
                  {report.duration && (
                    <p className="text-sm text-gray-600">{report.duration}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardCard>
  );
};

export default ReportsCard;