import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Bell, Users, Smartphone, Heart, Menu, X, AlertTriangle, CheckCircle, Clock, Navigation as NavigationIcon, Zap, Eye, BookOpen, Settings, Brain, Lock, Radio, QrCode } from 'lucide-react';
import Navigation from './Navigation';
import LoginPage from './LoginPage';
import FeatureComparison from './FeatureComparison';
import FAQ from './FAQ';

function LandingPage() {
  const [activeDemo, setActiveDemo] = useState('tracking');
  const [activeFeature, setActiveFeature] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo(prev => {
        const demos = ['tracking', 'alerts', 'routes', 'sos', 'anomaly'];
        const currentIndex = demos.indexOf(prev);
        return demos[(currentIndex + 1) % demos.length];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (showLogin) {
    return <LoginPage />;
  }

  const features = [
    {
      id: 'real-time-tracking',
      icon: MapPin,
      title: 'Live Location Tracking',
      description: 'See your child\'s exact location with bus/train details and upcoming stops.',
      color: 'blue',
      details: [
        'Live GPS with vehicle ID',
        'Route progress tracking',
        'Stop arrival predictions',
        'Transport operator info'
      ]
    },
    {
      id: 'geofencing',
      icon: NavigationIcon,
      title: 'Smart Safe Zones',
      description: 'Get instant alerts when your child enters or leaves safe areas.',
      color: 'green',
      details: [
        'Custom safe zones',
        'Bus stop geofences',
        'Entry/exit alerts',
        'School zone monitoring'
      ]
    },
    {
      id: 'sos-system',
      icon: Zap,
      title: 'Emergency SOS',
      description: 'One-touch emergency button sends alerts to you and authorities.',
      color: 'red',
      details: [
        'Instant parent alerts',
        'Authority notifications',
        'Location sharing',
        'Emergency contacts'
      ]
    },
    {
      id: 'ai-anomaly',
      icon: Brain,
      title: 'AI Safety Monitor',
      description: 'Smart AI watches for unusual routes, stops, or timing patterns.',
      color: 'purple',
      details: [
        'Route deviation alerts',
        'Unusual stop detection',
        'Timing pattern analysis',
        'Behavior monitoring'
      ]
    },
    {
      id: 'transport-integration',
      icon: Radio,
      title: 'Transport Updates',
      description: 'Real-time bus/train schedules, delays, and route changes.',
      color: 'indigo',
      details: [
        'Live schedule updates',
        'Delay notifications',
        'Route change alerts',
        'Service disruptions'
      ]
    },
    {
      id: 'multi-factor-safety',
      icon: QrCode,
      title: 'Smart Check-ins',
      description: 'GPS + QR codes confirm your child is on the right transport.',
      color: 'orange',
      details: [
        'GPS verification',
        'QR code check-ins',
        'Transport data matching',
        'False alarm reduction'
      ]
    },
    {
      id: 'emergency-coordination',
      icon: Users,
      title: 'Authority Alerts',
      description: 'Automatic emergency coordination with police and transport control.',
      color: 'cyan',
      details: [
        'Police notifications',
        'Transport control alerts',
        'Emergency coordination',
        'Response tracking'
      ]
    },
    {
      id: 'privacy-security',
      icon: Lock,
      title: 'Privacy Protection',
      description: 'Your data is encrypted and only accessible to verified parents.',
      color: 'gray',
      details: [
        'End-to-end encryption',
        'Parent-only access',
        'No data sharing',
        'Secure authentication'
      ]
    },
    {
      id: 'safety-education',
      icon: BookOpen,
      title: 'Safety Learning',
      description: 'Fun, interactive safety tips and quizzes for children.',
      color: 'pink',
      details: [
        'Age-appropriate content',
        'Interactive quizzes',
        'Transport safety tips',
        'Emergency training'
      ]
    },
    {
      id: 'age-customization',
      icon: Settings,
      title: 'Age-Based Features',
      description: 'App adapts to your child\'s age and maturity level.',
      color: 'yellow',
      details: [
        'Age-appropriate interface',
        'Feature permissions',
        'Content customization',
        'Parental controls'
      ]
    },
    {
      id: 'risk-prediction',
      icon: Eye,
      title: 'Risk Prediction',
      description: 'AI predicts and warns about dangerous routes and times.',
      color: 'emerald',
      details: [
        'Route risk analysis',
        'Time-based predictions',
        'Weather impact alerts',
        'Crowd density warnings'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-300 text-blue-900',
      green: 'bg-green-50 border-green-300 text-green-900',
      red: 'bg-red-50 border-red-300 text-red-900',
      purple: 'bg-purple-50 border-purple-300 text-purple-900',
      indigo: 'bg-indigo-50 border-indigo-300 text-indigo-900',
      orange: 'bg-orange-50 border-orange-300 text-orange-900',
      cyan: 'bg-cyan-50 border-cyan-300 text-cyan-900',
      gray: 'bg-gray-50 border-gray-300 text-gray-900',
      pink: 'bg-pink-50 border-pink-300 text-pink-900',
      yellow: 'bg-yellow-50 border-yellow-300 text-yellow-900',
      emerald: 'bg-emerald-50 border-emerald-300 text-emerald-900'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 text-white',
      green: 'bg-green-600 text-white',
      red: 'bg-red-600 text-white',
      purple: 'bg-purple-600 text-white',
      indigo: 'bg-indigo-600 text-white',
      orange: 'bg-orange-600 text-white',
      cyan: 'bg-cyan-600 text-white',
      gray: 'bg-gray-600 text-white',
      pink: 'bg-pink-600 text-white',
      yellow: 'bg-yellow-600 text-white',
      emerald: 'bg-emerald-600 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Keep Your Child
                <span className="text-orange-300 block"> Safe on Every Journey</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Advanced AI monitoring with 11 safety features for public transport. 
                Real-time tracking, smart alerts, and emergency response.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-orange-500 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
                >
                  Start Free Trial
                </button>
                <button className="border-3 border-white text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-white hover:text-blue-700 transition-all shadow-xl">
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-lg text-blue-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="font-medium">100% Free for Parents</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="font-medium">Works on Any Device</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="font-medium">11 AI Features</span>
                </div>
              </div>
            </div>
            
            {/* Interactive Demo */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-900 border-4 border-blue-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Live AI Demo</h3>
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {activeDemo === 'tracking' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">Aarav's Journey</p>
                        <p className="text-base text-gray-600">Bus #DL-1PC-4567 → Route 45B</p>
                      </div>
                    </div>
                    <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <span className="text-lg font-bold text-green-800">On Schedule</span>
                      </div>
                      <p className="text-base text-green-700 mt-2">Next: Connaught Place (3 mins)</p>
                    </div>
                  </div>
                )}
                
                {activeDemo === 'alerts' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                        <Bell className="h-7 w-7 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">Safe Zone Alert</p>
                        <p className="text-base text-gray-600">School zone entry detected</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                        <span className="text-lg font-bold text-blue-800">Safe Arrival</span>
                      </div>
                      <p className="text-base text-blue-700 mt-2">Arrived at Delhi Public School</p>
                    </div>
                  </div>
                )}
                
                {activeDemo === 'routes' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                        <NavigationIcon className="h-7 w-7 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">AI Route Analysis</p>
                        <p className="text-base text-gray-600">Safety score updated</p>
                      </div>
                    </div>
                    <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <span className="text-lg font-bold text-green-800">95% Safety Score</span>
                      </div>
                      <p className="text-base text-green-700 mt-2">Low risk route - optimal timing</p>
                    </div>
                  </div>
                )}

                {activeDemo === 'sos' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                        <Zap className="h-7 w-7 text-red-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">Emergency System</p>
                        <p className="text-base text-gray-600">SOS button activated</p>
                      </div>
                    </div>
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <span className="text-lg font-bold text-red-800">Alert Sent</span>
                      </div>
                      <p className="text-base text-red-700 mt-2">Parents & authorities notified</p>
                    </div>
                  </div>
                )}

                {activeDemo === 'anomaly' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                        <Brain className="h-7 w-7 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">AI Safety Monitor</p>
                        <p className="text-base text-gray-600">Pattern analysis complete</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-purple-600" />
                        <span className="text-lg font-bold text-purple-800">Normal Behavior</span>
                      </div>
                      <p className="text-base text-purple-700 mt-2">No unusual patterns detected</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              11 Advanced AI Safety Features
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Each feature goes beyond basic GPS tracking to provide comprehensive protection 
              through advanced AI and transport integration.
            </p>
          </div>
          
          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`px-6 py-3 rounded-xl text-base font-semibold transition-all transform hover:scale-105 ${
                  activeFeature === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>

          {/* Active Feature Display */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className={`border-3 rounded-3xl p-8 md:p-12 shadow-xl ${getColorClasses(features[activeFeature].color)}`}>
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconColorClasses(features[activeFeature].color)} shadow-lg`}>
                  {(() => {
                    const ActiveFeatureIcon = features[activeFeature].icon;
                    return <ActiveFeatureIcon className="h-10 w-10" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{features[activeFeature].title}</h3>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed">{features[activeFeature].description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features[activeFeature].details.map((detail, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 flex-shrink-0" />
                        <span className="text-lg font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.id}
                  className={`rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 border-2 ${
                    activeFeature === index ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                  } ${getColorClasses(feature.color)}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${getIconColorClasses(feature.color)} shadow-lg`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section id="comparison" className="py-20 bg-white">
        <FeatureComparison />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How SafeYatra's AI Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive AI system combines multiple data sources and advanced algorithms 
              to provide unparalleled child safety monitoring.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Collection</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                GPS tracking, transport APIs, QR check-ins, and behavioral patterns are continuously monitored.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Advanced algorithms analyze patterns, predict risks, and detect anomalies in real-time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Alerts</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Intelligent notifications are sent to parents and authorities based on severity and context.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Learning</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The AI system learns from each journey to improve accuracy and reduce false alarms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Safety Statistics */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Thousands of Families
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive AI platform has revolutionized child safety in public transport across India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-5xl md:text-6xl font-bold text-orange-300 mb-4">50,000+</div>
              <div className="text-xl text-blue-100 font-medium">Children Protected</div>
            </div>
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-5xl md:text-6xl font-bold text-orange-300 mb-4">100+</div>
              <div className="text-xl text-blue-100 font-medium">Cities Covered</div>
            </div>
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-5xl md:text-6xl font-bold text-orange-300 mb-4">99.9%</div>
              <div className="text-xl text-blue-100 font-medium">AI Accuracy Rate</div>
            </div>
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-5xl md:text-6xl font-bold text-orange-300 mb-4">24/7</div>
              <div className="text-xl text-blue-100 font-medium">AI Monitoring</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-4xl font-bold text-orange-300 mb-4">2.5M+</div>
              <div className="text-lg text-blue-100 font-medium">Safe Journeys Completed</div>
            </div>
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-4xl font-bold text-orange-300 mb-4">15 Sec</div>
              <div className="text-lg text-blue-100 font-medium">Average Emergency Response</div>
            </div>
            <div className="bg-blue-700 rounded-2xl p-8 shadow-xl">
              <div className="text-4xl font-bold text-orange-300 mb-4">98%</div>
              <div className="text-lg text-blue-100 font-medium">Parent Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Experience Next-Generation Child Safety
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-orange-100 leading-relaxed">
            Join thousands of parents who trust SafeYatra's 11 advanced AI features to keep their children safe 
            during public transport journeys across India.
          </p>
          <div className="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <button 
              onClick={() => setShowLogin(true)}
              className="w-full sm:w-auto bg-white text-orange-600 px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Free Trial - All 11 Features
            </button>
            <button className="w-full sm:w-auto border-3 border-white text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white hover:text-orange-600 transition-all shadow-xl">
              Schedule AI Demo
            </button>
          </div>
          <p className="text-lg text-orange-100 mt-8 font-medium">
            No credit card required • 100% free for parents • Available in 15+ Indian languages
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">SafeYatra</span>
                  <p className="text-sm text-blue-300 font-medium">AI Child Safety</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Advanced AI-powered child safety platform for public transport across India. 
                11 comprehensive features beyond basic tracking.
              </p>
              <div className="text-base text-gray-400 font-medium">
                Built for Hackathon: AI for Safer, Smarter & Inclusive Bharat
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">AI Features</h3>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Real-time Transport Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Geofencing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency SOS System</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Anomaly Detection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Prediction</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Safety & Security</h3>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Encryption</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Authority Integration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Coordination</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Education</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parent Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-lg">
            <p>&copy; 2024 SafeYatra. All rights reserved. AI for Safer, Smarter & Inclusive Bharat Hackathon Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;