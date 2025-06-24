import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  headerAction?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  children, 
  icon: Icon, 
  className = '',
  headerAction 
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6 border-b-2 border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          {headerAction}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;