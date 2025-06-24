import React, { useState } from 'react';
import { Award, CheckCircle, X, ArrowRight, RotateCcw, Star } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SafetyQuizProps {
  onClose: () => void;
}

const SafetyQuiz: React.FC<SafetyQuizProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What should you do when boarding a bus?",
      options: [
        "Rush to get the best seat",
        "Wait for others to get off first, then board calmly",
        "Push through the crowd",
        "Jump on while it's moving"
      ],
      correctAnswer: 1,
      explanation: "Always wait for passengers to get off first, then board calmly and safely."
    },
    {
      id: 2,
      question: "Where is the safest place to sit on a bus?",
      options: [
        "At the very back",
        "Near the driver or conductor",
        "By the emergency exit",
        "Standing in the aisle"
      ],
      correctAnswer: 1,
      explanation: "Sitting near the driver or conductor is safest as they can help you if needed."
    },
    {
      id: 3,
      question: "What should you always keep with you during travel?",
      options: [
        "Lots of cash",
        "Your phone charged and emergency contacts saved",
        "Expensive jewelry",
        "All your school books"
      ],
      correctAnswer: 1,
      explanation: "A charged phone with emergency contacts is essential for safety during travel."
    },
    {
      id: 4,
      question: "If you feel unsafe during your journey, what should you do?",
      options: [
        "Ignore the feeling and continue",
        "Call your parents or press the SOS button immediately",
        "Wait until you reach your destination",
        "Ask strangers for help"
      ],
      correctAnswer: 1,
      explanation: "Trust your instincts! Always contact your parents or use the SOS feature if you feel unsafe."
    },
    {
      id: 5,
      question: "What should you do if your bus takes a different route than usual?",
      options: [
        "Assume it's normal and stay quiet",
        "Alert your parents immediately",
        "Get off at the next stop without telling anyone",
        "Ask other passengers what to do"
      ],
      correctAnswer: 1,
      explanation: "Route changes are unusual and should be reported to your parents immediately for safety."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're a safety superstar! 🌟";
    if (percentage >= 80) return "Excellent! You know how to stay safe! 🎉";
    if (percentage >= 60) return "Good job! Keep learning about safety! 👍";
    return "Keep practicing! Safety is important! 💪";
  };

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Award className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
          <p className="text-2xl text-gray-600 font-medium">Here are your results</p>
        </div>

        {/* Score Display */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <div className="text-6xl font-bold mb-4">{score}/{questions.length}</div>
          <div className="text-2xl font-bold mb-4">{getScoreMessage(score)}</div>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-8 w-8 ${i < Math.ceil((score / questions.length) * 5) ? 'text-yellow-300 fill-current' : 'text-white/30'}`} 
              />
            ))}
          </div>
        </div>

        {/* Answer Review */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Answers</h3>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className={`rounded-2xl p-6 border-3 shadow-lg ${
                isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <X className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Question {index + 1}: {question.question}
                    </h4>
                    <div className="space-y-2 mb-4">
                      <p className={`text-lg font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-lg font-medium text-green-800">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                    <div className={`p-4 rounded-xl border-2 ${
                      isCorrect ? 'bg-green-100 border-green-200' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <p className="text-lg font-medium text-gray-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={restartQuiz}
            className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            <RotateCcw className="h-6 w-6" />
            <span>Take Quiz Again</span>
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-700 transition-all shadow-lg"
          >
            Back to Safety Tips
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Award className="h-10 w-10 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Safety Quiz</h2>
        <p className="text-xl text-gray-600 font-medium">Test your safety knowledge!</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-4 mb-8 shadow-inner">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-600 h-4 rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Counter */}
      <div className="text-center mb-8">
        <span className="text-2xl font-bold text-purple-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-3 border-purple-200">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-6 rounded-2xl border-3 text-left transition-all transform hover:scale-105 text-lg font-medium ${
                selectedAnswer === index
                  ? 'bg-purple-100 border-purple-500 text-purple-900 shadow-lg'
                  : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-400'
                }`}>
                  {selectedAnswer === index && (
                    <CheckCircle className="h-5 w-5 text-white" />
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl text-lg font-bold hover:bg-gray-600 transition-all"
          >
            Exit Quiz
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`flex items-center space-x-3 px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg ${
              selectedAnswer !== null
                ? 'bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyQuiz;