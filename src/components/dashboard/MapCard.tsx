import React from 'react';
import { MapPin, Navigation, Clock, CheckCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface MapCardProps {
  childName: string;
  currentLocation: string;
  transportInfo: {
    type: string;
    id: string;
    route: string;
  };
  nextStop: {
    name: string;
    eta: string;
  };
  progress: number;
}

const MapCard: React.FC<MapCardProps> = ({ 
  childName, 
  currentLocation, 
  transportInfo, 
  nextStop, 
  progress 
}) => {
  return (
    <DashboardCard 
      title="Live Location Tracking" 
      icon={MapPin}
      headerAction={
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-green-600">Live</span>
        </div>
      }
    >
      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl h-64 flex items-center justify-center mb-6 border-2 border-blue-200">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <p className="text-xl font-bold text-blue-900">Interactive Map</p>
          <p className="text-lg text-blue-700">{childName}'s Live Location</p>
        </div>
      </div>

      {/* Location Details */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Current Location</span>
          </div>
          <p className="text-blue-700 font-medium">{currentLocation}</p>
          <p className="text-sm text-blue-600">{transportInfo.type} #{transportInfo.id}</p>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center space-x-3 mb-2">
            <Navigation className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">Next Stop</span>
          </div>
          <p className="text-green-700 font-medium">{nextStop.name}</p>
          <p className="text-sm text-green-600">ETA: {nextStop.eta}</p>
        </div>

        <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-orange-900">Progress</span>
          </div>
          <p className="text-orange-700 font-medium">{progress}% Complete</p>
          <div className="bg-orange-200 rounded-full h-2 mt-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default MapCard;