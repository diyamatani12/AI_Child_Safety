import React, { useState } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

interface CheckInButtonProps {
  type: 'boarding' | 'arrived';
  onCheckIn: (type: 'boarding' | 'arrived') => void;
}

const CheckInButton: React.FC<CheckInButtonProps> = ({ type, onCheckIn }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    onCheckIn(type);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsCheckedIn(false);
    }, 2000);
  };

  const config = {
    boarding: {
      label: 'Check-in: Boarding',
      icon: MapPin,
      color: 'blue',
      message: 'Boarding confirmed!'
    },
    arrived: {
      label: 'Check-in: Arrived',
      icon: CheckCircle,
      color: 'green',
      message: 'Arrival confirmed!'
    }
  };

  const IconComponent = config[type].icon;

  return (
    <div>
      <button
        onClick={handleCheckIn}
        disabled={isCheckedIn}
        className={`w-full p-6 rounded-2xl border-3 transition-all hover:scale-105 active:scale-95 shadow-lg ${
          type === 'boarding' 
            ? 'bg-blue-50 border-blue-300 text-blue-700' 
            : 'bg-green-50 border-green-300 text-green-700'
        } ${isCheckedIn ? 'opacity-75' : ''}`}
      >
        <IconComponent className="h-10 w-10 mx-auto mb-3" />
        <p className="text-lg font-bold">{config[type].label}</p>
      </button>

      {isCheckedIn && (
        <div className={`mt-4 p-4 rounded-xl border-2 shadow-lg ${
          type === 'boarding' 
            ? 'bg-blue-50 border-blue-300 text-blue-800'
            : 'bg-green-50 border-green-300 text-green-800'
        }`}>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6" />
            <span className="text-lg font-bold">{config[type].message}</span>
          </div>
          <p className="text-base mt-2 font-medium">Your parents have been notified</p>
        </div>
      )}
    </div>
  );
};

export default CheckInButton;