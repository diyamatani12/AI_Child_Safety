import React, { useState } from 'react';
import { 
  BarChart3, MapPin, Bell, Navigation as NavigationIcon, Zap, BookOpen, 
  Calendar, Settings, Shield, CheckCircle, Clock, 
  Users, Phone, MessageCircle, LogOut, Menu, X
} from 'lucide-react';
import { useAuth } from './AuthContext';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data
  const quickStats = [
    { label: 'Today\'s Journeys', value: '3', color: 'blue' as const, icon: MapPin },
    { label: 'Safe Arrivals', value: '100%', color: 'green' as const, icon: CheckCircle },
    { label: 'Active Alerts', value: '0', color: 'orange' as const, icon: Bell },
    { label: 'Safety Score', value: '98%', color: 'purple' as const, icon: Shield },
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'success' as const,
      title: 'Safe Arrival',
      message: 'Aarav arrived at school safely',
      time: '08:45 AM',
      location: 'Delhi Public School'
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Journey Started',
      message: 'Boarding Bus #DL-1PC-4567',
      time: '08:30 AM',
      location: 'Home Bus Stop'
    }
  ];

  const weeklyReports = [
    { date: 'Today', route: 'Home → School', duration: '25 min', safetyScore: 98, incidents: 0 },
    { date: 'Yesterday', route: 'School → Home', duration: '30 min', safetyScore: 95, incidents: 0 },
    { date: 'Dec 18', route: 'Home → School', duration: '22 min', safetyScore: 100, incidents: 0 },
  ];

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
      name: 'Delhi Public School',
      type: 'school' as const,
      address: 'DPS Road, Sector 30, Noida, UP',
      radius: 150,
      isActive: true
    }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: '1',
      name: 'Priya Sharma',
      relationship: 'Mother',
      phone: '+91 98765 43210',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Raj Sharma',
      relationship: 'Father',
      phone: '+91 98765 43211',
      isPrimary: false
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

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Child Status Card */}
      <DashboardCard title="Aarav's Current Status">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                alt="Aarav"
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-200"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Aarav Sharma</h3>
                <p className="text-lg text-gray-600">Age 12 • Class 7</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-600">Online & Safe</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg text-gray-700">Currently at: Delhi Public School</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-lg text-gray-700">Arrived: 08:45 AM (On time)</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-lg text-gray-700">Safety Score: 98% (Excellent)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Today's Journey</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600 font-medium">Route:</span>
                <span className="font-semibold">Home → School (Route 45B)</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600 font-medium">Transport:</span>
                <span className="font-semibold">Bus #DL-1PC-4567</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600 font-medium">Duration:</span>
                <span className="font-semibold">25 minutes</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600 font-medium">Next Journey:</span>
                <span className="font-semibold">3:30 PM (Return)</span>
              </div>
            </div>
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
        <MapCard
          childName="Aarav"
          currentLocation="Delhi Public School"
          transportInfo={{
            type: "Bus",
            id: "DL-1PC-4567",
            route: "Route 45B"
          }}
          nextStop={{
            name: "School Gate",
            eta: "Arrived"
          }}
          progress={100}
        />
        <AlertsCard alerts={recentAlerts} />
      </div>

      {/* Reports */}
      <ReportsCard weeklyReports={weeklyReports} />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'tracking':
        return (
          <MapCard
            childName="Aarav"
            currentLocation="Delhi Public School"
            transportInfo={{
              type: "Bus",
              id: "DL-1PC-4567",
              route: "Route 45B"
            }}
            nextStop={{
              name: "School Gate",
              eta: "Arrived"
            }}
            progress={100}
          />
        );
      case 'alerts':
        return <AlertsCard alerts={recentAlerts} />;
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
        return <ReportsCard weeklyReports={weeklyReports} />;
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
                <p className="text-base text-blue-600 font-medium">Parent Account</p>
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