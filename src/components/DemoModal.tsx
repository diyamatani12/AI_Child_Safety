import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, 
  Shield, MapPin, Bell, Zap, Brain, Users, 
  CheckCircle, Clock, Navigation, Phone, Star
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  content: React.ReactNode;
  highlights: string[];
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const demoSteps: DemoStep[] = [
    {
      id: 'intro',
      title: 'Welcome to SafeYatra',
      description: 'AI-powered child safety for public transport across India',
      duration: 8,
      highlights: [
        '11 Advanced AI Features',
        '100% Free for Parents',
        'Works on Any Device',
        'Real-time Monitoring'
      ],
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SafeYatra</h2>
            <p className="text-xl text-gray-700 mb-6">
              The most advanced AI child safety platform for public transport in India
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                <div className="text-2xl font-bold text-blue-900">50,000+</div>
                <div className="text-blue-700">Children Protected</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                <div className="text-2xl font-bold text-green-900">100+</div>
                <div className="text-green-700">Cities Covered</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                <div className="text-2xl font-bold text-purple-900">99.9%</div>
                <div className="text-purple-700">AI Accuracy</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200">
                <div className="text-2xl font-bold text-orange-900">24/7</div>
                <div className="text-orange-700">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'signup',
      title: 'Quick & Easy Setup',
      description: 'Create your account and add your child in under 2 minutes',
      duration: 10,
      highlights: [
        'Simple Registration Process',
        'Child Profile Setup',
        'Emergency Contacts',
        'Safe Zone Configuration'
      ],
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step 1: Create Parent Account</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Enter your name and email</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Create secure password</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Verify your account</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step 2: Add Your Child</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Child's Name</label>
                <input 
                  type="text" 
                  value="Aarav Sharma" 
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input 
                  type="number" 
                  value="12" 
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
                <input 
                  type="text" 
                  value="Delhi Public School" 
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                <input 
                  type="text" 
                  value="Class 7" 
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Parent Dashboard Overview',
      description: 'Monitor your child\'s safety with real-time insights and comprehensive tracking',
      duration: 12,
      highlights: [
        'Real-time Status Updates',
        'Safety Score Monitoring',
        'Journey Tracking',
        'Alert Management'
      ],
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                alt="Child"
                className="w-16 h-16 rounded-full object-cover border-3 border-white/30"
              />
              <div>
                <h3 className="text-2xl font-bold">Aarav's Status</h3>
                <p className="text-blue-100">Currently at Delhi Public School</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Safety Score Today</p>
                  <p className="text-3xl font-bold">98%</p>
                </div>
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-300 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">3</div>
              <div className="text-sm text-blue-700">Today's Journeys</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">100%</div>
              <div className="text-sm text-green-700">Safe Arrivals</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200 text-center">
              <Bell className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">0</div>
              <div className="text-sm text-orange-700">Active Alerts</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200 text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">98%</div>
              <div className="text-sm text-purple-700">Safety Score</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tracking',
      title: 'Real-Time Location Tracking',
      description: 'See exactly where your child is with transport details and route progress',
      duration: 10,
      highlights: [
        'Live GPS Tracking',
        'Transport Information',
        'Route Progress',
        'ETA Predictions'
      ],
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl h-48 flex items-center justify-center border-2 border-blue-200">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
              <p className="text-xl font-bold text-blue-900">Live Location Map</p>
              <p className="text-blue-700">Aarav is on Bus #DL-1PC-4567</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Current Location</span>
              </div>
              <p className="text-blue-700 font-medium">Connaught Place</p>
              <p className="text-sm text-blue-600">Bus #DL-1PC-4567 • Route 45B</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <div className="flex items-center space-x-3 mb-2">
                <Navigation className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900">Next Stop</span>
              </div>
              <p className="text-green-700 font-medium">Delhi Public School</p>
              <p className="text-sm text-green-600">ETA: 3 minutes</p>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-orange-900">Progress</span>
              </div>
              <p className="text-orange-700 font-medium">85% Complete</p>
              <div className="bg-orange-200 rounded-full h-2 mt-2">
                <div className="bg-orange-600 h-2 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'alerts',
      title: 'Smart Safety Alerts',
      description: 'Get instant notifications about your child\'s journey status and safety',
      duration: 8,
      highlights: [
        'Instant Notifications',
        'Journey Updates',
        'Safety Confirmations',
        'Emergency Alerts'
      ],
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-green-800">Safe Arrival</h4>
                <p className="text-base mt-1 text-green-700">Aarav arrived at school safely</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-green-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>08:45 AM</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Delhi Public School</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-blue-800">Journey Started</h4>
                <p className="text-base mt-1 text-blue-700">Boarding Bus #DL-1PC-4567</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-blue-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>08:30 AM</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Home Bus Stop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-orange-800">Route Update</h4>
                <p className="text-base mt-1 text-orange-700">Bus taking alternate route due to traffic</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-orange-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>08:35 AM</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Route 45B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sos',
      title: 'Emergency SOS System',
      description: 'One-touch emergency response with instant alerts to parents and authorities',
      duration: 10,
      highlights: [
        'One-Touch Activation',
        'Parent Notifications',
        'Authority Alerts',
        'Location Sharing'
      ],
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <Zap className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency SOS Activated</h3>
            <p className="text-lg text-gray-700 mb-6">
              When your child presses the SOS button, here's what happens instantly:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Phone className="h-6 w-6 text-red-600" />
                  <span className="font-bold text-red-900">Parents Notified</span>
                </div>
                <p className="text-red-700">Instant call and SMS to all emergency contacts</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span className="font-bold text-blue-900">Location Shared</span>
                </div>
                <p className="text-blue-700">Real-time GPS coordinates with transport details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  <span className="font-bold text-purple-900">Authorities Alerted</span>
                </div>
                <p className="text-purple-700">Local police and transport control notified</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  <span className="font-bold text-green-900">Response Coordinated</span>
                </div>
                <p className="text-green-700">Emergency services coordinate rescue efforts</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-features',
      title: 'Advanced AI Safety Features',
      description: 'Discover what makes SafeYatra unique with 11 AI-powered safety features',
      duration: 12,
      highlights: [
        'Anomaly Detection',
        'Risk Prediction',
        'Pattern Learning',
        'Proactive Alerts'
      ],
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Safety Intelligence</h3>
            <p className="text-lg text-gray-700">
              Our AI continuously monitors and learns to keep your child safer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <h4 className="text-xl font-bold text-purple-900 mb-4">What Our AI Detects:</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-800">Route deviations and unscheduled stops</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-800">Unusual timing patterns</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-800">Behavioral anomalies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-800">High-risk routes and times</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <h4 className="text-xl font-bold text-blue-900 mb-4">AI Advantages:</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">99.9% accuracy in threat detection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Learns from 2.5M+ safe journeys</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Predicts risks before they happen</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Reduces false alarms by 95%</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">Unlike Basic GPS Trackers</h4>
            <p className="text-lg text-green-100">
              SafeYatra's AI understands transport context, not just location dots
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cta',
      title: 'Start Protecting Your Child Today',
      description: 'Join thousands of parents who trust SafeYatra for their child\'s safety',
      duration: 8,
      highlights: [
        '100% Free for Parents',
        'Works on Any Device',
        'No Special Hardware Needed',
        'Instant Setup'
      ],
      content: (
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience Next-Generation Child Safety?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join 50,000+ parents who trust SafeYatra's 11 advanced AI features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-900 mb-2">100% Free</h3>
              <p className="text-green-700">No subscription fees, no hidden costs</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-blue-900 mb-2">11 AI Features</h3>
              <p className="text-blue-700">Advanced safety beyond basic tracking</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-purple-900 mb-2">2-Min Setup</h3>
              <p className="text-purple-700">Start protecting your child instantly</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onClose}
              className="w-full bg-orange-500 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started Free - All 11 Features
            </button>
            <p className="text-lg text-gray-600">
              No credit card required • Available in 15+ Indian languages
            </p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const currentStepData = demoSteps[currentStep];
    const stepDuration = currentStepData.duration * 1000; // Convert to milliseconds
    const interval = 100; // Update every 100ms for smooth progress

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (interval / stepDuration) * 100;
        
        if (newProgress >= 100) {
          // Move to next step
          if (currentStep < demoSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setProgress(0);
            setTimeRemaining(demoSteps[currentStep + 1]?.duration || 0);
          } else {
            // Demo finished
            setIsPlaying(false);
            setProgress(100);
            setTimeRemaining(0);
          }
          return 0;
        }
        
        setTimeRemaining(Math.ceil((100 - newProgress) / 100 * currentStepData.duration));
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setIsPlaying(false);
      setTimeRemaining(demoSteps[0].duration);
    }
  }, [isOpen]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (timeRemaining === 0) {
      setTimeRemaining(demoSteps[currentStep].duration);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(true);
    setTimeRemaining(demoSteps[0].duration);
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(false);
    setTimeRemaining(demoSteps[stepIndex].duration);
  };

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const currentStepData = demoSteps[currentStep];
  const totalDuration = demoSteps.reduce((acc, step) => acc + step.duration, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">SafeYatra Demo</h2>
              <p className="text-blue-100">See how AI keeps your child safe</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-orange-400 h-2 rounded-full transition-all duration-100"
              style={{ width: `${((currentStep + progress/100) / demoSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Info */}
          <div className="flex items-center justify-between text-sm text-blue-100">
            <span>Step {currentStep + 1} of {demoSteps.length}</span>
            <span>{timeRemaining}s remaining</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentStepData.title}</h3>
            <p className="text-xl text-gray-700 mb-6">{currentStepData.description}</p>
            
            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {currentStepData.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStepData.content}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 p-6 border-t-2 border-gray-200">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentStep === demoSteps.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRestart}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              
              {isPlaying ? (
                <button
                  onClick={handlePause}
                  className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Pause className="h-5 w-5" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={handlePlay}
                  className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Play</span>
                </button>
              )}
            </div>

            {/* Step Indicators */}
            <div className="flex space-x-2">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepChange(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-blue-600' 
                      : index < currentStep 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;