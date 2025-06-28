import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, 
  Shield, MapPin, Bell, Zap, Brain, Users, Volume2, VolumeX,
  Maximize, Minimize, SkipForward
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const demoSteps = [
    {
      id: 'welcome',
      title: 'Welcome to SafeYatra',
      subtitle: 'AI-Powered Child Safety for Public Transport',
      description: 'See how SafeYatra keeps your children safe with 11 advanced AI features.',
      duration: 8,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Demo video
      highlights: [
        '50,000+ children protected',
        '100+ cities covered',
        '99.9% AI accuracy',
        '24/7 monitoring'
      ]
    },
    {
      id: 'setup',
      title: 'Quick & Easy Setup',
      subtitle: 'Get started in under 2 minutes',
      description: 'Create your account, add your child, and start monitoring immediately.',
      duration: 10,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      highlights: [
        'Free parent account',
        'Works on any device',
        'No special hardware needed',
        'Instant activation'
      ]
    },
    {
      id: 'tracking',
      title: 'Real-Time Location Tracking',
      subtitle: 'Know exactly where your child is',
      description: 'Live GPS tracking with transport details, route information, and arrival predictions.',
      duration: 12,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      highlights: [
        'Live GPS with vehicle ID',
        'Route progress tracking',
        'Stop arrival predictions',
        'Transport operator info'
      ]
    },
    {
      id: 'alerts',
      title: 'Smart Safety Alerts',
      subtitle: 'Instant notifications when it matters',
      description: 'Get intelligent alerts for arrivals, departures, delays, and safety concerns.',
      duration: 10,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      highlights: [
        'Safe zone entry/exit alerts',
        'Journey start/end notifications',
        'Delay and route change alerts',
        'Emergency notifications'
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency SOS System',
      subtitle: 'Help when you need it most',
      description: 'One-touch emergency button alerts both parents and authorities instantly.',
      duration: 8,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      highlights: [
        'Instant parent alerts',
        'Authority notifications',
        'Location sharing',
        'Emergency coordination'
      ]
    },
    {
      id: 'ai-features',
      title: 'Advanced AI Monitoring',
      subtitle: 'Intelligence that keeps children safe',
      description: 'AI analyzes patterns, predicts risks, and provides proactive safety recommendations.',
      duration: 15,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      highlights: [
        'Route deviation detection',
        'Behavior pattern analysis',
        'Risk prediction',
        'Anomaly detection'
      ]
    },
    {
      id: 'get-started',
      title: 'Start Protecting Your Child Today',
      subtitle: 'Join thousands of families using SafeYatra',
      description: 'Experience the peace of mind that comes with comprehensive AI-powered child safety.',
      duration: 6,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      highlights: [
        '100% free for parents',
        'No contracts or commitments',
        'Works on any smartphone',
        'Start in under 2 minutes'
      ]
    }
  ];

  const totalDuration = demoSteps.reduce((acc, step) => acc + step.duration, 0);

  // Auto-play functionality
  useEffect(() => {
    if (isOpen && !isPlaying) {
      // Start playing automatically when modal opens
      setTimeout(() => {
        setIsPlaying(true);
      }, 500);
    }
  }, [isOpen]);

  // Video control effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isPlaying, currentStep]);

  // Progress tracking
  useEffect(() => {
    if (!isPlaying) return;

    const stepDuration = demoSteps[currentStep].duration;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += 0.1;
      const stepProgress = (elapsed / stepDuration) * 100;
      setProgress(stepProgress);
      setTimeRemaining(Math.ceil(stepDuration - elapsed));

      if (elapsed >= stepDuration) {
        if (currentStep < demoSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
          elapsed = 0;
        } else {
          setIsPlaying(false);
          setProgress(100);
          setTimeRemaining(0);
        }
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, demoSteps]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsPlaying(false);
      setProgress(0);
      setTimeRemaining(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
        case 'k':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPreviousStep();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextStep();
          break;
        case 'r':
          e.preventDefault();
          restartDemo();
          break;
        case 'm':
          e.preventDefault();
          setIsMuted(prev => !prev);
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentStep]);

  const goToNextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setProgress(0);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
  };

  const restartDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipToEnd = () => {
    setCurrentStep(demoSteps.length - 1);
    setProgress(0);
  };

  if (!isOpen) return null;

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className={`bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden ${
          isFullscreen ? 'max-w-none max-h-none h-full' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-xl">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">SafeYatra Demo</h2>
              <p className="text-blue-100">AI Child Safety Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {demoSteps.length}
              </span>
              <div className="w-32 bg-blue-800 rounded-full h-2">
                <div 
                  className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Close (Esc)"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Video Section */}
          <div className="lg:w-2/3 bg-black relative">
            <video
              ref={videoRef}
              className="w-full h-64 lg:h-96 object-cover"
              muted={isMuted}
              loop
              playsInline
              poster={`https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2`}
            >
              <source src={currentStepData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 right-4">
                {/* Progress Bar */}
                <div className="bg-white bg-opacity-20 rounded-full h-2 mb-4">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all"
                      title="Play/Pause (Space)"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
                      title="Mute/Unmute (M)"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    
                    <span className="text-sm font-medium">
                      {timeRemaining > 0 ? `${timeRemaining}s remaining` : 'Complete'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={restartDemo}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
                      title="Restart (R)"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={skipToEnd}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
                      title="Skip to End"
                    >
                      <SkipForward className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/3 p-6 flex flex-col">
            {/* Step Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-lg text-blue-600 font-semibold mb-4">
                  {currentStepData.subtitle}
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3 mb-6">
                {currentStepData.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goToPreviousStep}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                  title="Previous (←)"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {demoSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentStep
                          ? 'bg-blue-600'
                          : index < currentStep
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                      title={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextStep}
                  disabled={currentStep === demoSteps.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === demoSteps.length - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                  title="Next (→)"
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Call to Action */}
            {currentStep === demoSteps.length - 1 && (
              <div className="border-t-2 border-gray-200 pt-6">
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">Ready to Get Started?</h4>
                  <p className="text-gray-600">Join thousands of families protecting their children with SafeYatra.</p>
                  <div className="space-y-3">
                    <button
                      onClick={onClose}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                      Start Free Trial
                    </button>
                    <button
                      onClick={restartDemo}
                      className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                    >
                      Watch Demo Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts */}
            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p><kbd className="bg-gray-200 px-1 rounded">Space</kbd> Play/Pause</p>
              <p><kbd className="bg-gray-200 px-1 rounded">←/→</kbd> Previous/Next</p>
              <p><kbd className="bg-gray-200 px-1 rounded">R</kbd> Restart <kbd className="bg-gray-200 px-1 rounded">M</kbd> Mute</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;