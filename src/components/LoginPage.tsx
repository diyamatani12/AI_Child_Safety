import React, { useState } from 'react';
import { Shield, User, Baby, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [activeRole, setActiveRole] = useState<'parent' | 'child'>('parent');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, isLoading } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }

    if (mode === 'signup') {
      if (activeRole === 'parent' && (!formData.email.trim() || !formData.email.includes('@'))) {
        setError('Please enter a valid email address');
        return false;
      }
      
      if (activeRole === 'child' && !formData.email.trim()) {
        setError('Please enter a username');
        return false;
      }

      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else {
      if (!formData.email.trim()) {
        setError(activeRole === 'parent' ? 'Please enter your email address' : 'Please enter your username');
        return false;
      }

      if (!formData.password) {
        setError('Please enter your password');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (mode === 'signup') {
      // Simulate account creation
      setSuccess('Account created successfully! Please log in with your new credentials.');
      setMode('login');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      return;
    }

    // Handle login
    const success = await login(formData.email, formData.password, activeRole);
    if (!success) {
      setError('Invalid credentials. Please check your email/username and password.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  const getDemoCredentials = () => {
    if (activeRole === 'parent') {
      return [
        { email: 'parent1@example.com', name: 'Rajesh Sharma', child: 'Aarav' },
        { email: 'parent2@example.com', name: 'Meera Patel', child: 'Priya' },
        { email: 'parent3@example.com', name: 'Suresh Kumar', child: 'Arjun' }
      ];
    } else {
      return [
        { username: 'aarav', name: 'Aarav', age: 12 },
        { username: 'priya', name: 'Priya', age: 10 },
        { username: 'arjun', name: 'Arjun', age: 14 }
      ];
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

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-200">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xl text-gray-600">
              {mode === 'login' 
                ? 'Sign in to access your dashboard' 
                : 'First, create an account to get started. If you already have an account, please sign in to continue.'
              }
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-2 mb-8">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all font-semibold text-lg ${
                mode === 'login'
                  ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowRight className="h-6 w-6" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all font-semibold text-lg ${
                mode === 'signup'
                  ? 'bg-white text-green-600 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-6 w-6" />
              <span>Sign Up</span>
            </button>
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

          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-3 text-green-600 bg-green-50 p-4 rounded-xl border-2 border-green-200 mb-6">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg font-medium">{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                {activeRole === 'parent' ? 'Email Address' : 'Username'}
              </label>
              <input
                type={activeRole === 'parent' ? 'email' : 'text'}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder={activeRole === 'parent' ? 'your@email.com' : 'Choose a username'}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Password {mode === 'signup' && '(minimum 6 characters)'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg pr-14"
                  placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
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

            {mode === 'signup' && (
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg pr-14"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            )}

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
                mode === 'signup'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : activeRole === 'parent'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading 
                ? (mode === 'signup' ? 'Creating Account...' : 'Signing In...') 
                : (mode === 'signup' 
                  ? 'Create Account' 
                  : `Sign In as ${activeRole === 'parent' ? 'Parent' : 'Child'}`
                )
              }
            </button>
          </form>

          {/* Demo Credentials */}
          {mode === 'login' && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Demo Credentials for {activeRole === 'parent' ? 'Parents' : 'Children'}:
              </h4>
              <div className="space-y-3">
                {getDemoCredentials().map((cred, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {activeRole === 'parent' ? cred.email : `Username: ${(cred as any).username}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activeRole === 'parent' 
                          ? `Parent of ${(cred as any).child}` 
                          : `${cred.name}, Age ${(cred as any).age}`
                        }
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          email: activeRole === 'parent' ? cred.email! : (cred as any).username,
                          name: cred.name,
                          password: 'demo123'
                        }));
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Use This
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Password for all demo accounts: <code className="bg-gray-200 px-2 py-1 rounded">demo123</code>
              </p>
            </div>
          )}

          {/* Switch Mode Link */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                {mode === 'login' ? 'Sign up here' : 'Log in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;