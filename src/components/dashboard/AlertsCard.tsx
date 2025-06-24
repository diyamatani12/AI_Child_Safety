import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Clock, MapPin } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  location?: string;
}

interface AlertsCardProps {
  alerts: Alert[];
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getAlertColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <DashboardCard 
      title="Recent Alerts" 
      icon={Bell}
      headerAction={
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      }
    >
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900">All Clear!</p>
            <p className="text-gray-600">No alerts at this time</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`rounded-xl p-4 border-2 ${getAlertColors(alert.type)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColors(alert.type)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{alert.title}</h4>
                    <p className="text-base mt-1">{alert.message}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm opacity-75">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{alert.time}</span>
                      </div>
                      {alert.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardCard>
  );
};

export default AlertsCard;