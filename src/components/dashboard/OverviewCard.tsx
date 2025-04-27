import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'savings' | 'budget';
  trend: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  amount,
  type,
  trend,
}) => {
  const getColor = () => {
    switch (type) {
      case 'income':
        return 'bg-green-100 text-green-800';
      case 'expense':
        return 'bg-red-100 text-red-800';
      case 'savings':
        return 'bg-blue-100 text-blue-800';
      case 'budget':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${getColor()}`}>
          {trend >= 0 ? (
            <ArrowUpRight className="w-4 h-4 inline" />
          ) : (
            <ArrowDownRight className="w-4 h-4 inline" />
          )}
          {Math.abs(trend)}%
        </span>
      </div>
      <p className="text-2xl font-bold mt-2">
        ${amount.toLocaleString()}
      </p>
    </div>
  );
};

export default OverviewCard;