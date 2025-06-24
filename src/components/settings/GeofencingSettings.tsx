import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, CheckCircle } from 'lucide-react';
import DashboardCard from '../dashboard/DashboardCard';

interface SafeZone {
  id: string;
  name: string;
  type: 'home' | 'school' | 'bus_stop' | 'custom';
  address: string;
  radius: number;
  isActive: boolean;
}

interface GeofencingSettingsProps {
  safeZones: SafeZone[];
  onAddZone: (zone: Omit<SafeZone, 'id'>) => void;
  onEditZone: (id: string, zone: Partial<SafeZone>) => void;
  onDeleteZone: (id: string) => void;
}

const GeofencingSettings: React.FC<GeofencingSettingsProps> = ({
  safeZones,
  onAddZone,
  onEditZone,
  onDeleteZone
}) => {
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [newZone, setNewZone] = useState({
    name: '',
    type: 'custom' as const,
    address: '',
    radius: 100,
    isActive: true
  });

  const handleAddZone = () => {
    if (newZone.name && newZone.address) {
      onAddZone(newZone);
      setNewZone({
        name: '',
        type: 'custom',
        address: '',
        radius: 100,
        isActive: true
      });
      setIsAddingZone(false);
    }
  };

  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'bg-blue-100 text-blue-800';
      case 'school':
        return 'bg-green-100 text-green-800';
      case 'bus_stop':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getZoneTypeLabel = (type: string) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'school':
        return 'School';
      case 'bus_stop':
        return 'Bus Stop';
      default:
        return 'Custom';
    }
  };

  return (
    <DashboardCard 
      title="Safe Zone Management" 
      icon={MapPin}
      headerAction={
        <button
          onClick={() => setIsAddingZone(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Zone</span>
        </button>
      }
    >
      {/* Add New Zone Form */}
      {isAddingZone && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Add New Safe Zone</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Zone Name</label>
              <input
                type="text"
                value={newZone.name}
                onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Home, School, Bus Stop"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Zone Type</label>
              <select
                value={newZone.type}
                onChange={(e) => setNewZone({ ...newZone, type: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="home">Home</option>
                <option value="school">School</option>
                <option value="bus_stop">Bus Stop</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={newZone.address}
                onChange={(e) => setNewZone({ ...newZone, address: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Radius (meters)</label>
              <input
                type="number"
                value={newZone.radius}
                onChange={(e) => setNewZone({ ...newZone, radius: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="50"
                max="1000"
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddZone}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Zone
            </button>
            <button
              onClick={() => setIsAddingZone(false)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing Safe Zones */}
      <div className="space-y-4">
        {safeZones.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900">No Safe Zones Yet</p>
            <p className="text-gray-600">Add your first safe zone to get started</p>
          </div>
        ) : (
          safeZones.map((zone) => (
            <div key={zone.id} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getZoneTypeColor(zone.type)}`}>
                      {getZoneTypeLabel(zone.type)}
                    </span>
                    {zone.isActive && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{zone.address}</p>
                  <p className="text-xs text-gray-500">Radius: {zone.radius}m</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEditZone(zone.id, { isActive: !zone.isActive })}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                    zone.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {zone.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => onDeleteZone(zone.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardCard>
  );
};

export default GeofencingSettings;