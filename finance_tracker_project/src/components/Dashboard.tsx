'use client';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface DashboardProps {
  expenses: Expense[];
}

export default function Dashboard({ expenses }: DashboardProps) {
  // Calculate spending by category
  const spendingByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(spendingByCategory).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / expenses.reduce((sum, e) => sum + e.amount, 0)) * 100,
  }));

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Spending Dashboard</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No expenses to display yet.</p>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Total Overview */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
            <h3 className="text-sm sm:text-lg font-medium mb-1 sm:mb-2">Total Spending</h3>
            <p className="text-3xl sm:text-4xl font-bold">${totalSpent.toFixed(2)}</p>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-90">{expenses.length} transactions</p>
          </div>

          {/* Spending by Category */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Spending by Category</h3>
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={item.category}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-0.5">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      ${item.amount.toFixed(2)} ({item.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colors[index % colors.length]}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
              <p className="text-xs sm:text-sm text-green-700 font-medium">Avg per Transaction</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800 mt-1">
                ${(totalSpent / expenses.length).toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
              <p className="text-xs sm:text-sm text-purple-700 font-medium">Categories</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-800 mt-1">
                {Object.keys(spendingByCategory).length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
