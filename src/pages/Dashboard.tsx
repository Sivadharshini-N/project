import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import OverviewCard from '../components/dashboard/OverviewCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [3000, 3500, 3200, 3800, 3600, 4000],
        borderColor: '#A2C78F',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [2500, 2800, 2600, 3000, 2900, 3200],
        borderColor: '#F18D7E',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Income"
          amount={4000}
          type="income"
          trend={5.2}
        />
        <OverviewCard
          title="Total Expenses"
          amount={3200}
          type="expense"
          trend={-2.1}
        />
        <OverviewCard
          title="Total Savings"
          amount={800}
          type="savings"
          trend={12.5}
        />
        <OverviewCard
          title="Budget Status"
          amount={1200}
          type="budget"
          trend={3.8}
        />
      </div>

      <div className="bg-surface p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Income vs Expenses
        </h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;