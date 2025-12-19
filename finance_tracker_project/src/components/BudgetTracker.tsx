'use client';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

interface BudgetTrackerProps {
  budgets: Budget[];
}

export default function BudgetTracker({ budgets }: BudgetTrackerProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressWidth = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Budget Overview</h2>

      {budgets.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No budgets set yet.</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const remaining = budget.limit - budget.spent;

            return (
              <div key={budget.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{budget.category}</h3>
                  <span className="text-sm text-gray-600">
                    ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(percentage)}`}
                    style={{ width: `${getProgressWidth(budget.spent, budget.limit)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over budget!`}
                  </span>
                </div>

                {percentage >= 100 && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    <strong>Alert:</strong> You have exceeded your budget for this category!
                  </div>
                )}
                {percentage >= 80 && percentage < 100 && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    <strong>Warning:</strong> You're approaching your budget limit.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Total Budget:</span>
          <span className="text-lg font-bold text-gray-900">
            ${budgets.reduce((sum, b) => sum + b.limit, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm font-medium text-gray-600">Total Spent:</span>
          <span className="text-lg font-bold text-gray-900">
            ${budgets.reduce((sum, b) => sum + b.spent, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
