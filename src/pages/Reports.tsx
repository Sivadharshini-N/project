import React, { useState } from 'react';
import { Download, PieChart, BarChart as BarChartIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports: React.FC = () => {
  const [period, setPeriod] = useState('monthly');

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [4500, 5000, 4800, 5200, 5100, 5500],
        backgroundColor: '#A2C78F',
      },
      {
        label: 'Expenses',
        data: [3800, 4200, 3900, 4100, 4300, 4200],
        backgroundColor: '#F18D7E',
      },
    ],
  };

  const pieData = {
    labels: ['Housing', 'Transportation', 'Food', 'Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [35, 20, 15, 10, 10, 10],
        backgroundColor: [
          '#A2C78F',
          '#F6C358',
          '#F18D7E',
          '#7F8305',
          '#6B7280',
          '#9CA3AF',
        ],
      },
    ],
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text('Financial Report', 20, 20);
    // Add more report content here
    doc.save('financial-report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Financial Reports</h2>
        <div className="flex gap-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={downloadReport}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChartIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Income vs Expenses</h3>
          </div>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Expense Distribution</h3>
          </div>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right' as const,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Income</h4>
            <p className="text-2xl font-bold text-green-600">$30,100</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Expenses</h4>
            <p className="text-2xl font-bold text-red-600">$24,500</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Net Savings</h4>
            <p className="text-2xl font-bold text-primary">$5,600</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;