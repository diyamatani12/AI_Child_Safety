import React, { useState } from 'react';
import { 
  BarChart3, MapPin, Bell, Navigation as NavigationIcon, Zap, BookOpen, 
  Calendar, Settings, Shield, CheckCircle, Clock, 
  Users, Phone, MessageCircle, LogOut, Menu, X, AlertCircle, Loader
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { useChildData } from '../hooks/useChildData';
import Navigation from './Navigation';
import DashboardCard from './dashboard/DashboardCard';
import StatCard from './dashboard/StatCard';
import MapCard from './dashboard/MapCard';
import AlertsCard from './dashboard/AlertsCard';
import ReportsCard from './dashboard/ReportsCard';
import GeofencingSettings from './settings/GeofencingSettings';
import EmergencyContacts from './settings/EmergencyContacts';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    child, 
    journeys, 
    alerts, 
    transportInfo, 
    stats, 
    isLoading, 
    error, 
    refreshData, 
    markAlertAsRead 
  } = useChildData(user?.id);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Settings state (these would also come from database in a real app)
  const [safeZones, setSafeZones] = useState([
    {
      id: '1',
      name: 'Home',
      type: 'home' as const,
      address: '123 Sector 15, Noida, UP',
      radius: 100,
      isActive: true
    },
    {
      id: '2',
      name: child?.school || 'School',
      type: 'school' as const,
      address: `${child?.school || 'School'} Address`,
      radius: 150,
      isActive: true
    }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: '1',
      name: user?.name || 'Parent',
      relationship: 'Parent',
      phone: '+91 98765 43210',
      isPrimary: true
    }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin },
    { id: 'alerts', label: 'Alerts & Notifications', icon: Bell },
    { id: 'geofencing', label: 'Safe Zones', icon: NavigationIcon },
    { id: 'emergency', label: 'Emergency Settings', icon: Zap },
    { id: 'education', label: 'Safety Education', icon: BookOpen },
    { id: 'reports', label: 'Journey Reports', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleAddSafeZone = (zone: any) => {
    setSafeZones([...safeZones, { ...zone, id: Date.now().toString() }]);
  };

  const handleEditSafeZone = (id: string, updates: any) => {
    setSafeZones(safeZones.map(zone => zone.id === id ? { ...zone, ...updates } : zone));
  };

  const handleDeleteSafeZone = (id: string) => {
    setSafeZones(safeZones.filter(zone => zone.id !== id));
  };

  const handleAddEmergencyContact = (contact: any) => {
    setEmergencyContacts([...emergencyContacts, { ...contact, id: Date.now().toString() }]);
  };

  const handleEditEmergencyContact = (id: string, updates: any) => {
    setEmergencyContacts(emergencyContacts.map(contact => contact.id === id ? { ...contact, ...updates } : contact));
  };

  const handleDeleteEmergencyContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'at_school':
        return { text: 'At School', color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'in_transit':
        return { text: 'In Transit', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'at_home':
        return { text: 'At Home', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      default:
        return { text: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const getCurrentJourney = () => {
    return journeys.find(j => j.status === 'in_progress') || journeys[0];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-xl text-gray-600 font-medium">Loading your child's information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Data</h2>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No child found
  if (!child) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Child Profile Found</h2>
          <p className="text-lg text-gray-600 mb-6">
            No child profile is linked to your parent account. Please contact support to set up your child's profile.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    );
  }

  const statusDisplay = getStatusDisplay(child.currentStatus);
  const currentJourney = getCurrentJourney();

  // Quick stats based on real data
  const quickStats = [
    { 
      label: 'Today\'s Journeys', 
      value: stats.todayJourneys.toString(), 
      color: 'blue' as const, 
      icon: MapPin 
    },
    { 
      label: 'Safe Arrivals', 
      value: `${stats.safeArrivals}`, 
      color: 'green' as const, 
      icon: CheckCircle 
    },
    { 
      label: 'Active Alerts', 
      value: stats.activeAlerts.toString(), 
      color: 'orange' as const, 
      icon: Bell 
    },
    { 
      label: 'Safety Score', 
      value: `${stats.safetyScore}%`, 
      color: 'purple' as const, 
      icon: Shield 
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Child Status Card */}
      <DashboardCard title={`${child.name}'s Current Status`}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={child.avatar}
                alt={child.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-200"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                <p className="text-lg text-gray-600">Age {child.age} • {child.class}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${child.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm font-semibold ${child.isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                    {child.isOnline ? 'Online & Safe' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg text-gray-700">Currently at: {child.currentLocation}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusDisplay.bgColor}`}>
                  <Clock className={`h-5 w-5 ${statusDisplay.color}`} />
                </div>
                <span className="text-lg text-gray-700">Status: {statusDisplay.text}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-lg text-gray-700">Safety Score: {child.safetyScore}% (Excellent)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              {currentJourney ? 'Current/Recent Journey' : 'No Recent Journeys'}
            </h4>
            {currentJourney ? (
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 font-medium">Route:</span>
                  <span className="font-semibold">{currentJourney.startLocation} → {currentJourney.endLocation}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 font-medium">Transport:</span>
                  <span className="font-semibold">{currentJourney.transportType} #{currentJourney.transportId}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 font-medium">Started:</span>
                  <span className="font-semibold">{currentJourney.startTime}</span>
                </div>
                {currentJourney.duration && (
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600 font-medium">Duration:</span>
                    <span className="font-semibold">{currentJourney.duration}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className={`font-semibold capitalize ${
                    currentJourney.status === 'completed' ? 'text-green-600' : 
                    currentJourney.status === 'in_progress' ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {currentJourney.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-lg">No journey data available</p>
            )}
          </div>
        </div>
      </DashboardCard>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Map and Alerts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {transportInfo && (
          <MapCard
            childName={child.name}
            currentLocation={child.currentLocation}
            transportInfo={transportInfo}
            nextStop={transportInfo.nextStop}
            progress={transportInfo.progress}
          />
        )}
        <AlertsCard alerts={alerts} />
      </div>

      {/* Reports */}
      <ReportsCard weeklyReports={journeys.slice(0, 7)} />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'tracking':
        return transportInfo ? (
          <MapCard
            childName={child.name}
            currentLocation={child.currentLocation}
            transportInfo={transportInfo}
            nextStop={transportInfo.nextStop}
            progress={transportInfo.progress}
          />
        ) : (
          <DashboardCard title="Live Tracking">
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Active Journey</h3>
              <p className="text-xl text-gray-600">{child.name} is currently {child.currentLocation.toLowerCase()}</p>
            </div>
          </DashboardCard>
        );
      case 'alerts':
        return <AlertsCard alerts={alerts} />;
      case 'geofencing':
        return (
          <GeofencingSettings
            safeZones={safeZones}
            onAddZone={handleAddSafeZone}
            onEditZone={handleEditSafeZone}
            onDeleteZone={handleDeleteSafeZone}
          />
        );
      case 'emergency':
        return (
          <EmergencyContacts
            contacts={emergencyContacts}
            onAddContact={handleAddEmergencyContact}
            onEditContact={handleEditEmergencyContact}
            onDeleteContact={handleDeleteEmergencyContact}
          />
        );
      case 'reports':
        return <ReportsCard weeklyReports={journeys.slice(0, 7)} />;
      default:
        return (
          <DashboardCard title={menuItems.find(item => item.id === activeTab)?.label || 'Feature'}>
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <Settings className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-xl text-gray-600">This feature is under development!</p>
            </div>
          </DashboardCard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <Navigation 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        showMobileMenu={isSidebarOpen}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r-2 border-gray-200 mt-20 lg:mt-0`}>
          <div className="flex items-center justify-between h-20 px-8 border-b-2 border-gray-200 lg:hidden">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Menu</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-center space-x-4 mb-8 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <img 
                src={user?.avatar}
                alt={user?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-300"
              />
              <div>
                <p className="text-lg font-bold text-gray-900">{user?.name}</p>
                <p className="text-base text-blue-600 font-medium">Parent of {child.name}</p>
              </div>
            </div>

            <nav className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all font-medium text-lg ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <header className="bg-white shadow-lg border-b-2 border-gray-200 h-20 flex items-center justify-between px-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600 p-2"
              >
                <Menu className="h-8 w-8" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            <button
              onClick={refreshData}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Clock className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </header>

          {/* Content */}
          <main className="p-8">
            {renderContent()}
          </main>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;