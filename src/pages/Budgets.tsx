import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Budget } from '../types';

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBudgets(data || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Budgets</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90">
          <Plus className="w-5 h-5" />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Loading budgets...
          </div>
        ) : budgets.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No budgets found. Create your first budget to get started!
          </div>
        ) : (
          budgets.map((budget) => {
            const progress = (budget.spent / budget.amount) * 100;
            const isOverBudget = progress > 100;

            return (
              <div key={budget.id} className="bg-surface rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {budget.category}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {budget.period} Budget
                    </p>
                  </div>
                  <TrendingUp className={`w-5 h-5 ${
                    isOverBudget ? 'text-red-500' : 'text-green-500'
                  }`} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-medium">${budget.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-medium">${budget.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        isOverBudget ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {progress.toFixed(1)}% used
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Budgets;