import React, { useState } from 'react';
import { 
  Check, X, Star, Shield, MapPin, Bell, Navigation, 
  Zap, Eye, BookOpen, Brain, Lock, Radio, QrCode,
  Users, Settings, Calendar, ChevronDown, ChevronUp
} from 'lucide-react';

const FeatureComparison: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'location-tracking',
      icon: MapPin,
      feature: 'Location Tracking',
      smartwatch: {
        available: true,
        description: 'Basic GPS coordinates and general location on map',
        limitations: ['Just shows dot on map', 'No transport context', 'Battery drains quickly', 'Limited to device range']
      },
      transportApp: {
        description: 'Live location with full transport context - vehicle ID, route number, next stops, ETA',
        benefits: [
          'Shows exact bus/train number (e.g., "Bus #DL-1PC-4567")',
          'Displays route information and upcoming stops',
          'Provides accurate arrival time predictions',
          'Works with any smartphone - no special device needed',
          'Integrates with city transport systems for real-time updates'
        ]
      }
    },
    {
      id: 'geofencing',
      icon: Navigation,
      feature: 'Safe Zone Alerts',
      smartwatch: {
        available: true,
        description: 'Basic circular geofences around general locations',
        limitations: ['Generic location alerts', 'No transport stop awareness', 'Many false alarms', 'Limited customization']
      },
      transportApp: {
        description: 'Smart geofences specifically for bus stops, train stations, and transport routes',
        benefits: [
          'Pre-mapped bus stops and train stations as safe zones',
          'Route-specific geofencing (alerts only for designated routes)',
          'Reduced false alarms by understanding transport patterns',
          'Automatic safe zone suggestions based on regular routes',
          'Integration with official transport stop databases'
        ]
      }
    },
    {
      id: 'emergency-sos',
      icon: Zap,
      feature: 'Emergency SOS',
      smartwatch: {
        available: true,
        description: 'Basic SOS to emergency contacts with location',
        limitations: ['Only sends to family', 'No authority integration', 'Limited location context', 'Requires specific device']
      },
      transportApp: {
        description: 'Comprehensive emergency system with transport context and authority coordination',
        benefits: [
          'Alerts both family AND local authorities simultaneously',
          'Includes transport details (vehicle ID, route, driver info)',
          'Coordinates with transport control centers',
          'Provides real-time location updates to responders',
          'Works on any smartphone with one-touch activation'
        ]
      }
    },
    {
      id: 'anomaly-detection',
      icon: Brain,
      feature: 'AI Safety Monitoring',
      smartwatch: {
        available: false,
        description: 'Not available in consumer smartwatches',
        limitations: ['No pattern recognition', 'No route analysis', 'No predictive alerts', 'Limited processing power']
      },
      transportApp: {
        description: 'Advanced AI analyzes transport patterns and predicts potential safety issues',
        benefits: [
          'Detects route deviations and unscheduled stops',
          'Identifies unusual timing patterns',
          'Predicts risky situations before they occur',
          'Learns from transport data to improve accuracy',
          'Proactive alerts instead of reactive responses'
        ]
      }
    },
    {
      id: 'transport-integration',
      icon: Radio,
      feature: 'Real-Time Transport Data',
      smartwatch: {
        available: false,
        description: 'No integration with transport systems',
        limitations: ['No schedule information', 'No delay notifications', 'No route updates', 'No service disruption alerts']
      },
      transportApp: {
        description: 'Direct integration with city transport APIs for live updates',
        benefits: [
          'Real-time bus/train schedules and delays',
          'Service disruption notifications',
          'Route change alerts',
          'Crowd density information',
          'Alternative route suggestions during disruptions'
        ]
      }
    },
    {
      id: 'multi-factor-verification',
      icon: QrCode,
      feature: 'Smart Check-ins',
      smartwatch: {
        available: false,
        description: 'Basic location check-ins only',
        limitations: ['GPS-only verification', 'High false positive rate', 'No transport validation', 'Battery dependent']
      },
      transportApp: {
        description: 'Multi-factor verification combining GPS, QR codes, and transport data',
        benefits: [
          'QR code scanning at bus/train entry points',
          'Cross-verification with transport databases',
          'Significantly reduced false alarms',
          'Confirms child is on correct vehicle',
          'Works even with poor GPS signal'
        ]
      }
    },
    {
      id: 'authority-coordination',
      icon: Users,
      feature: 'Emergency Response',
      smartwatch: {
        available: false,
        description: 'Limited to family notifications',
        limitations: ['No authority integration', 'Slow response coordination', 'No transport operator alerts', 'Manual follow-up required']
      },
      transportApp: {
        description: 'Automated coordination with police, transport control, and emergency services',
        benefits: [
          'Direct alerts to local police stations',
          'Notifications to transport control centers',
          'Automatic incident reporting',
          'Real-time location sharing with responders',
          'Coordinated response protocols'
        ]
      }
    },
    {
      id: 'privacy-security',
      icon: Lock,
      feature: 'Data Privacy & Security',
      smartwatch: {
        available: true,
        description: 'Basic device encryption and cloud storage',
        limitations: ['Vendor data access', 'Limited encryption', 'Third-party sharing', 'Device-dependent security']
      },
      transportApp: {
        description: 'End-to-end encryption with parent-only access and no data sharing',
        benefits: [
          'Complete end-to-end encryption',
          'Zero third-party data sharing',
          'Parent-only access controls',
          'Local data processing where possible',
          'Transparent privacy policies'
        ]
      }
    },
    {
      id: 'safety-education',
      icon: BookOpen,
      feature: 'Safety Learning',
      smartwatch: {
        available: false,
        description: 'No educational content available',
        limitations: ['No learning features', 'No age-appropriate content', 'No transport safety tips', 'Limited interaction']
      },
      transportApp: {
        description: 'Interactive, age-appropriate safety education specifically for public transport',
        benefits: [
          'Transport-specific safety tips and guidelines',
          'Interactive quizzes and games',
          'Age-appropriate content customization',
          'Progress tracking and rewards',
          'Regular safety reminders and updates'
        ]
      }
    },
    {
      id: 'age-customization',
      icon: Settings,
      feature: 'Age-Based Features',
      smartwatch: {
        available: true,
        description: 'Basic parental controls and restrictions',
        limitations: ['Generic age settings', 'Limited customization', 'No transport-specific adaptations', 'One-size-fits-all approach']
      },
      transportApp: {
        description: 'Comprehensive age-based customization for transport safety',
        benefits: [
          'Transport permissions based on age and maturity',
          'Customized safety features for different age groups',
          'Adaptive interface complexity',
          'Age-appropriate emergency procedures',
          'Gradual independence features as child grows'
        ]
      }
    },
    {
      id: 'risk-prediction',
      icon: Eye,
      feature: 'Predictive Safety',
      smartwatch: {
        available: false,
        description: 'No predictive capabilities',
        limitations: ['Reactive only', 'No pattern analysis', 'No risk assessment', 'No proactive warnings']
      },
      transportApp: {
        description: 'AI-powered risk prediction and proactive safety warnings',
        benefits: [
          'Analyzes historical incident data',
          'Predicts high-risk routes and times',
          'Weather-based safety recommendations',
          'Crowd density and safety correlation analysis',
          'Proactive route suggestions for safer travel'
        ]
      }
    }
  ];

  const toggleExpanded = (featureId: string) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Transport-Specific AI Matters
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          See how SafeYatra's transport-focused features go far beyond what smartwatches 
          and general apps can offer for child safety.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl shadow-2xl border-3 border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Feature</h3>
              <p className="text-lg text-blue-100">Safety Capability</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Smartwatch/General App</h3>
              <p className="text-lg text-blue-100">Basic Consumer Devices</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">SafeYatra Transport AI</h3>
              <p className="text-lg text-blue-100">Transport-Specific Intelligence</p>
            </div>
          </div>
        </div>

        {/* Feature Rows */}
        <div className="divide-y-2 divide-gray-200">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isExpanded = expandedFeature === feature.id;
            
            return (
              <div key={feature.id} className="p-8 hover:bg-gray-50 transition-colors">
                {/* Main Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  {/* Feature Column */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{feature.feature}</h4>
                      <button
                        onClick={() => toggleExpanded(feature.id)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-lg mt-2"
                      >
                        <span>View Details</span>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Smartwatch/General App Column */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {feature.smartwatch.available ? (
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <X className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        {feature.smartwatch.available ? 'Basic Available' : 'Not Available'}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {feature.smartwatch.description}
                    </p>
                  </div>

                  {/* Transport App Column */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">Advanced AI</span>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {feature.transportApp.description}
                    </p>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Limitations */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                      <h5 className="text-xl font-bold text-red-900 mb-4">
                        Smartwatch/General App Limitations:
                      </h5>
                      <ul className="space-y-3">
                        {feature.smartwatch.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <X className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-lg text-red-800">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                      <h5 className="text-xl font-bold text-green-900 mb-4">
                        SafeYatra Transport AI Benefits:
                      </h5>
                      <ul className="space-y-3">
                        {feature.transportApp.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-lg text-green-800">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          The Transport-Specific Advantage
        </h3>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
          While smartwatches and general apps provide basic location tracking, SafeYatra's 
          transport-specific AI offers comprehensive safety intelligence that understands 
          the unique challenges of public transport in India.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-orange-300 mb-3">11</div>
            <div className="text-lg text-blue-100 font-medium">Advanced AI Features</div>
          </div>
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-orange-300 mb-3">100%</div>
            <div className="text-lg text-blue-100 font-medium">Transport-Focused</div>
          </div>
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-orange-300 mb-3">0₹</div>
            <div className="text-lg text-blue-100 font-medium">Free for Parents</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;