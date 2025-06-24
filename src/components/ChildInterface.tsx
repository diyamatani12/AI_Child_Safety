import React, { useState } from 'react';
import { 
  Home, BookOpen, Navigation as NavigationIcon, Shield, LogOut, Phone, Star, Heart
} from 'lucide-react';
import { useAuth } from './AuthContext';
import Navigation from './Navigation';
import SOSButton from './child/SOSButton';
import CheckInButton from './child/CheckInButton';
import SafetyTips from './child/SafetyTips';

const ChildInterface: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const safetyTips = [
    { id: 1, tip: "Always sit near the driver or conductor", icon: "🚌", completed: true },
    { id: 2, tip: "Keep your phone charged and with you", icon: "📱", completed: true },
    { id: 3, tip: "Know your bus route and stops", icon: "🗺️", completed: false },
    { id: 4, tip: "Stay alert and aware of your surroundings", icon: "👀", completed: false },
  ];

  const handleSOS = () => {
    // SOS logic handled in SOSButton component
    console.log('SOS activated');
  };

  const handleCheckIn = (type: 'boarding' | 'arrived') => {
    console.log(`Check-in: ${type}`);
  };

  const handleStartQuiz = () => {
    alert('Starting safety quiz...');
  };

  const renderHome = () => (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center space-x-6 mb-6">
          <img 
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold">Hi {user?.name}! 👋</h2>
            <p className="text-xl text-blue-100 font-medium">Stay safe on your journey today</p>
          </div>
        </div>
        
        <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-blue-100 font-medium">Safety Score Today</p>
              <p className="text-4xl font-bold">98%</p>
            </div>
            <div className="flex space-x-1">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-8 w-8 text-yellow-300 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOS Button */}
      <SOSButton onPress={handleSOS} />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-6">
        <CheckInButton type="boarding" onCheckIn={handleCheckIn} />
        <CheckInButton type="arrived" onCheckIn={handleCheckIn} />
        <button
          onClick={() => window.open('tel:+919876543210')}
          className="p-6 rounded-2xl border-3 transition-all hover:scale-105 active:scale-95 shadow-lg bg-purple-50 border-purple-300 text-purple-700"
        >
          <Phone className="h-10 w-10 mx-auto mb-3" />
          <p className="text-lg font-bold">Call Parent</p>
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className="p-6 rounded-2xl border-3 transition-all hover:scale-105 active:scale-95 shadow-lg bg-orange-50 border-orange-300 text-orange-700"
        >
          <BookOpen className="h-10 w-10 mx-auto mb-3" />
          <p className="text-lg font-bold">Safety Tips</p>
        </button>
      </div>
    </div>
  );

  const renderJourney = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <NavigationIcon className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">My Journey</h2>
        <p className="text-xl text-gray-600 font-medium">Track your current trip</p>
      </div>

      {/* Current Journey Status */}
      <div className="bg-white rounded-2xl border-3 border-gray-300 p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Current Trip</h3>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg text-green-600 font-bold">At School</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">Started from Home</p>
              <p className="text-lg text-gray-600 font-medium">8:30 AM</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">Arrived at School</p>
              <p className="text-lg text-gray-600 font-medium">8:45 AM - On time!</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex justify-between text-lg mb-3">
            <span className="text-gray-600 font-medium">Journey Progress</span>
            <span className="font-bold text-gray-900">100%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full shadow-lg w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();
      case 'journey':
        return renderJourney();
      case 'safety':
        return <SafetyTips tips={safetyTips} onStartQuiz={handleStartQuiz} />;
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 p-6 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-6 py-4 shadow-2xl">
        <div className="flex justify-around">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'journey', label: 'Journey', icon: NavigationIcon },
            { id: 'safety', label: 'Safety', icon: BookOpen },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-2 py-3 px-6 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'text-blue-600 bg-blue-50 border-2 border-blue-200 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-7 w-7" />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ChildInterface;