'use client';

import { useState, useEffect } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import BudgetTracker from '@/components/BudgetTracker';
import Dashboard from '@/components/Dashboard';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [expensesRes, budgetsRes, categoriesRes] = await Promise.all([
        fetch('/api/expenses'),
        fetch('/api/budgets'),
        fetch('/api/categories'),
      ]);

      const expensesData = await expensesRes.json();
      const budgetsData = await budgetsRes.json();
      const categoriesData = await categoriesRes.json();

      setExpenses(expensesData);
      setBudgets(budgetsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Expenses', icon: '💰' },
    { id: 'add', label: 'Add Expense', icon: '➕' },
    { id: 'budgets', label: 'Budgets', icon: '🎯' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">💸 Smart Budget Tracker</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Track your expenses and manage your budget effortlessly</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span>
                <span className="ml-1 sm:ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {activeTab === 'dashboard' && <Dashboard expenses={expenses} />}

        {activeTab === 'expenses' && (
          <ExpenseList expenses={expenses} onExpenseDeleted={fetchData} />
        )}

        {activeTab === 'add' && (
          <ExpenseForm categories={categories} onExpenseAdded={fetchData} />
        )}

        {activeTab === 'budgets' && <BudgetTracker budgets={budgets} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            Smart Budget Tracker - Minimal Version using JSON storage
          </p>
          <p className="text-center text-xs text-gray-400 mt-1 hidden sm:block">
            Ready to be upgraded to a full-stack application with database integration
          </p>
        </div>
      </footer>
    </div>
  );
}
