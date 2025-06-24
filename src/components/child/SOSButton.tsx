import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface SOSButtonProps {
  onPress: () => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onPress();
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsPressed(false);
    }, 3000);
  };

  return (
    <div className="text-center">
      <button
        onClick={handlePress}
        disabled={isPressed}
        className={`w-40 h-40 rounded-full text-white font-bold text-2xl shadow-2xl transform transition-all duration-200 ${
          isPressed 
            ? 'bg-red-700 scale-95 animate-pulse' 
            : 'bg-red-500 hover:bg-red-600 hover:scale-110 active:scale-95'
        }`}
      >
        {isPressed ? (
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-12 w-12 mb-2" />
            <span className="text-lg">ALERT SENT!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Zap className="h-12 w-12 mb-2" />
            <span className="text-xl">SOS</span>
          </div>
        )}
      </button>
      <p className="text-lg text-gray-600 mt-4 font-medium">
        {isPressed ? 'Help is on the way!' : 'Press for emergency help'}
      </p>
    </div>
  );
};

export default SOSButton;