import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, Volume2, VolumeX,
  Maximize, Minimize, Smartphone, Download, ArrowRight,
  Shield, MapPin, Bell, Zap, CheckCircle, Star, AlertCircle
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Using a working demo video - Sintel trailer in portrait format
  const demoVideoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
  
  // Fallback to YouTube embed if direct video fails
  const youtubeEmbedId = "dQw4w9WgXcQ"; // Replace with actual SafeYatra demo video ID
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeEmbedId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;

  // Key features demonstrated in the video
  const demoFeatures = [
    {
      icon: Shield,
      title: "Account Setup",
      description: "Quick parent registration and child profile creation",
      timestamp: "0:00-0:15"
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Real-time location with transport details and route info",
      timestamp: "0:15-0:35"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Instant notifications for arrivals, departures, and safety",
      timestamp: "0:35-0:50"
    },
    {
      icon: Zap,
      title: "SOS Emergency",
      description: "One-touch emergency button with authority coordination",
      timestamp: "0:50-1:05"
    }
  ];

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen && isVideoLoaded) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVideoLoaded]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setLoadingProgress(10);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setLoadingProgress((bufferedEnd / duration) * 100);
        }
      }
    };

    const handleCanPlay = () => {
      setLoadingProgress(100);
      setIsVideoLoaded(true);
      setVideoError(false);
    };

    const handleLoadedData = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError(true);
      setIsVideoLoaded(false);
      setLoadingProgress(0);
    };

    const handleWaiting = () => {
      setIsVideoLoaded(false);
    };

    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  // Play/pause control
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoLoaded) return;

    if (isPlaying) {
      video.play().catch((error) => {
        console.error('Play failed:', error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, isVideoLoaded]);

  // Mute control
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setIsVideoLoaded(false);
      setVideoError(false);
      setLoadingProgress(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  // Keyboard controls
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
          if (isVideoLoaded && !videoError) {
            setIsPlaying(prev => !prev);
          }
          break;
        case 'r':
          e.preventDefault();
          restartVideo();
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
  }, [isOpen, isVideoLoaded, videoError]);

  const restartVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
      setIsPlaying(true);
    }
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const renderPhoneDemo = () => {
    if (videoError) {
      return (
        <div className="w-80 h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
            
            {/* YouTube Embed Fallback */}
            <div className="w-full h-full">
              <iframe
                src={youtubeEmbedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="SafeYatra Demo Video"
              ></iframe>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-80 h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          {/* Video Container */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
          >
            <source src={demoVideoUrl} type="video/mp4" />
            <p className="text-center p-8 text-gray-600">
              Your browser does not support the video tag.
            </p>
          </video>
          
          {/* Loading Overlay */}
          {(!isVideoLoaded && !videoError) && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-semibold mb-2">Loading SafeYatra Demo</p>
                <div className="w-48 bg-white bg-opacity-30 rounded-full h-2 mx-auto">
                  <div 
                    className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-blue-100 mt-2">{Math.round(loadingProgress)}% loaded</p>
              </div>
            </div>
          )}
          
          {/* Play Button Overlay */}
          {!isPlaying && isVideoLoaded && !videoError && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-[2.5rem] transition-all hover:bg-opacity-40"
            >
              <div className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg transform hover:scale-110 transition-transform">
                <Play className="h-12 w-12 text-blue-600 ml-1" />
              </div>
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${
          isFullscreen 
            ? 'w-full h-full max-w-none max-h-none' 
            : 'max-w-6xl w-full max-h-[95vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-xl">
              <Smartphone className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">SafeYatra Mobile App Demo</h2>
              <p className="text-blue-100">See how it works on your phone</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
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

        <div className="flex flex-col lg:flex-row">
          {/* Video Section */}
          <div className="lg:w-2/3 bg-gradient-to-br from-gray-900 to-black relative flex items-center justify-center p-8">
            {renderPhoneDemo()}

            {/* Video Controls */}
            {isVideoLoaded && !videoError && (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black bg-opacity-70 rounded-2xl p-4 backdrop-blur-sm">
                  {/* Progress Bar */}
                  <div 
                    className="bg-white bg-opacity-30 rounded-full h-2 mb-4 cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
                        title="Play/Pause (Space)"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
                        title="Mute/Unmute (M)"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                      
                      <span className="text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <button
                      onClick={restartVideo}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
                      title="Restart (R)"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {videoError && (
              <div className="absolute top-6 left-6 right-6">
                <div className="bg-blue-600 text-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-200" />
                    <div>
                      <p className="font-semibold">Demo Video Loading</p>
                      <p className="text-sm text-blue-100">Showing YouTube demo instead</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="lg:w-1/3 p-8 flex flex-col">
            <div className="flex-1">
              {/* Demo Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Real Mobile App Demo
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Watch how SafeYatra works on a real smartphone. This 90-second demo shows 
                  the complete parent experience from setup to emergency response.
                </p>
                
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Portrait Mobile View</span>
                  </div>
                  <p className="text-blue-800 text-sm">
                    Optimized for smartphones - see exactly how it looks on your device
                  </p>
                </div>
              </div>

              {/* Demo Features Timeline */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">What You'll See:</h4>
                {demoFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">{feature.title}</h5>
                      <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                      <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                        {feature.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-bold text-green-900 mb-4">Why Parents Choose SafeYatra:</h4>
                <div className="space-y-3">
                  {[
                    "Works on any smartphone - no special device needed",
                    "100% free for parents - no hidden costs",
                    "Setup takes less than 2 minutes",
                    "AI-powered safety beyond basic GPS tracking"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-green-800 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">Rated 4.9/5 by parents</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900">Ready to protect your child?</h4>
                <p className="text-gray-600 mb-6">
                  Join 50,000+ families using SafeYatra's AI-powered safety platform.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={onClose}
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Get SafeYatra Free</span>
                  </button>
                  
                  <button
                    onClick={restartVideo}
                    className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Watch Again</span>
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  No credit card required • Available on iOS & Android
                </p>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mt-6 text-xs text-gray-500 space-y-1 border-t border-gray-200 pt-4">
              <p><kbd className="bg-gray-200 px-1 rounded text-xs">Space</kbd> Play/Pause</p>
              <p><kbd className="bg-gray-200 px-1 rounded text-xs">R</kbd> Restart <kbd className="bg-gray-200 px-1 rounded text-xs">M</kbd> Mute <kbd className="bg-gray-200 px-1 rounded text-xs">F</kbd> Fullscreen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;