import React, { useState } from 'react';
import { Shield, User, Baby, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'parent' | 'child'>('parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    const success = await login(email, password, activeRole);
    if (!success) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-2xl inline-block mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">SafeYatra</h1>
          <p className="text-xl text-blue-100 font-medium">AI Child Safety Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome</h2>
            <p className="text-xl text-gray-600">Sign in or create your account</p>
          </div>

          {/* Role Selection */}
          <div className="flex bg-gray-100 rounded-2xl p-2 mb-8">
            <button
              onClick={() => setActiveRole('parent')}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all font-semibold text-lg ${
                activeRole === 'parent'
                  ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-6 w-6" />
              <span>Parent</span>
            </button>
            <button
              onClick={() => setActiveRole('child')}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all font-semibold text-lg ${
                activeRole === 'child'
                  ? 'bg-white text-orange-600 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Baby className="h-6 w-6" />
              <span>Child</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                {activeRole === 'parent' ? 'Email Address' : 'Username'}
              </label>
              <input
                type={activeRole === 'parent' ? 'email' : 'text'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder={activeRole === 'parent' ? 'your@email.com' : 'Choose a username'}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg pr-14"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-xl border-2 border-red-200">
                <AlertCircle className="h-6 w-6" />
                <span className="text-lg font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg ${
                activeRole === 'parent'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing In...' : `Continue as ${activeRole === 'parent' ? 'Parent' : 'Child'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;