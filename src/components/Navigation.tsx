import React, { useState } from 'react';
import { Shield, Menu, X, Bell, MessageCircle, User, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';

interface NavigationProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onMenuToggle, showMobileMenu = false }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">SafeYatra</span>
              <p className="text-sm text-blue-600 font-medium">AI Child Safety</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          {!user && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#comparison" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">Comparison</a>
              <a href="#how-it-works" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#faq" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            </div>
          )}

          {/* User Navigation */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden text-gray-400 hover:text-gray-600 p-2"
              >
                {showMobileMenu ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>

              {/* Notifications */}
              <button className="relative p-3 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <Bell className="h-7 w-7" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Messages */}
              <button className="p-3 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <MessageCircle className="h-7 w-7" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <img 
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-blue-600 capitalize">{user.role}</p>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                Get Started Free
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;