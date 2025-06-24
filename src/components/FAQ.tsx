import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, MapPin, Zap, Brain, Lock } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'safety' | 'technical' | 'privacy';
}

const FAQ: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      question: 'How is SafeYatra different from smartwatches or general tracking apps?',
      answer: 'SafeYatra is specifically designed for public transport safety with 11 advanced AI features. Unlike smartwatches that only show GPS dots, we provide full transport context - which bus/train, route details, upcoming stops, and ETA. Our AI detects route deviations, predicts risks, and coordinates with authorities during emergencies.'
    },
    {
      id: '2',
      category: 'safety',
      question: 'What happens when my child presses the SOS button?',
      answer: 'The SOS button instantly sends alerts to both parents and local authorities with your child\'s exact location, transport details (vehicle ID, route), and emergency contact information. Our system coordinates with police stations and transport control centers for faster response times.'
    },
    {
      id: '3',
      category: 'technical',
      question: 'How does the AI anomaly detection work?',
      answer: 'Our AI continuously monitors journey patterns, route adherence, timing, and behavior. It learns normal patterns and alerts you to deviations like unscheduled stops, route changes, unusual delays, or if your child doesn\'t board their regular transport. The system gets smarter over time.'
    },
    {
      id: '4',
      category: 'privacy',
      question: 'Is my child\'s data safe and private?',
      answer: 'Absolutely. We use end-to-end encryption for all data transmission and storage. Only verified parents/guardians can access child data. We never share information with third parties, and all data processing follows strict privacy guidelines. Your family\'s privacy is our top priority.'
    },
    {
      id: '5',
      category: 'general',
      question: 'Do I need to buy any special devices?',
      answer: 'No! SafeYatra works on any smartphone - Android or iPhone. Unlike smartwatches that cost thousands of rupees, our app is completely free for parents and works with devices you already have.'
    },
    {
      id: '6',
      category: 'technical',
      question: 'How accurate is the real-time tracking?',
      answer: 'Our tracking combines GPS, transport APIs, and QR code check-ins for 99.9% accuracy. We cross-verify location data with official transport systems to ensure your child is actually on the correct vehicle, not just near it.'
    },
    {
      id: '7',
      category: 'safety',
      question: 'Can I set up safe zones for my child?',
      answer: 'Yes! You can create custom geofences around home, school, bus stops, and any other important locations. Our smart geofencing is transport-aware, so you get relevant alerts when your child enters/exits these zones via public transport.'
    },
    {
      id: '8',
      category: 'general',
      question: 'What age groups is SafeYatra suitable for?',
      answer: 'SafeYatra adapts to different age groups from 6-18 years. The interface, features, and permissions automatically adjust based on your child\'s age and maturity level. Younger children get simpler interfaces, while teens get more independence features.'
    },
    {
      id: '9',
      category: 'technical',
      question: 'Does SafeYatra work in all Indian cities?',
      answer: 'We currently support 100+ cities across India with direct transport API integration. Even in cities without API access, basic GPS tracking and safety features work perfectly. We\'re constantly expanding to new cities.'
    },
    {
      id: '10',
      category: 'privacy',
      question: 'Who can see my child\'s location?',
      answer: 'Only verified parents/guardians linked to your child\'s account can see location data. During emergencies, location is shared with relevant authorities (police, transport control) but only for safety purposes. No commercial entities ever access this data.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: Shield },
    { id: 'safety', label: 'Safety Features', icon: Zap },
    { id: 'technical', label: 'Technical', icon: Brain },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleExpanded = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Get answers to common questions about SafeYatra's AI-powered child safety features.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-base font-semibold transition-all transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 pr-4">{item.question}</h3>
                {expandedItem === item.id ? (
                  <ChevronUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {expandedItem === item.id && (
                <div className="px-8 pb-6 border-t-2 border-gray-100">
                  <p className="text-lg text-gray-700 leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-blue-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Still Have Questions?</h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our support team is here to help you keep your child safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all shadow-lg">
              Contact Support
            </button>
            <button className="border-3 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-600 transition-all shadow-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;