import React, { useState } from 'react';
import { BookOpen, CheckCircle, Award } from 'lucide-react';
import SafetyQuiz from './SafetyQuiz';

interface SafetyTip {
  id: number;
  tip: string;
  icon: string;
  completed: boolean;
}

interface SafetyTipsProps {
  tips: SafetyTip[];
  onStartQuiz: () => void;
}

const SafetyTips: React.FC<SafetyTipsProps> = ({ tips }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  if (showQuiz) {
    return <SafetyQuiz onClose={handleCloseQuiz} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <BookOpen className="h-10 w-10 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Safety Tips</h2>
        <p className="text-xl text-gray-600 font-medium">Learn how to stay safe during your journey</p>
      </div>

      {/* Safety Tips List */}
      <div className="space-y-4">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className={`p-6 rounded-2xl border-3 transition-all shadow-lg ${
              tip.completed 
                ? 'bg-green-50 border-green-300' 
                : 'bg-gray-50 border-gray-300 hover:border-orange-300'
            }`}
          >
            <div className="flex items-center space-x-6">
              <div className="text-4xl">{tip.icon}</div>
              <div className="flex-1">
                <p className={`text-xl font-bold ${tip.completed ? 'text-green-800' : 'text-gray-900'}`}>
                  {tip.tip}
                </p>
              </div>
              {tip.completed && (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Quiz */}
      <div className="bg-purple-50 border-3 border-purple-300 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <Award className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-purple-900 mb-3">Daily Safety Quiz</h3>
          <p className="text-xl text-purple-700 mb-6 font-medium">Test your safety knowledge and earn points!</p>
          <button 
            onClick={handleStartQuiz}
            className="bg-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-purple-700 transition-colors shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;