# 💸 Smart Budget Tracker - Minimal Version

A minimal finance tracking application that helps you track expenses, manage budgets, and visualize spending patterns. This version uses a JSON file for data storage, making it easy to understand and upgrade to a full-stack application later.

## ✨ Features

- **📊 Dashboard**: Visual overview of your spending with category breakdowns and statistics
- **💰 Expense Tracking**: Add, view, and delete expenses with automatic categorization
- **🎯 Budget Management**: Set budgets for different categories with progress tracking
- **⚠️ Budget Alerts**: Visual warnings when approaching or exceeding budget limits
- **📈 Visual Analytics**: Simple, intuitive charts showing spending patterns
- **🔄 Real-time Updates**: Instant UI updates when adding or removing expenses

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── data/
│   └── finances.json          # JSON data storage
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── expenses/     # Expense CRUD operations
│   │   │   ├── budgets/      # Budget management
│   │   │   └── categories/   # Category list
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main application page
│   ├── components/           # React components
│   │   ├── Dashboard.tsx     # Spending dashboard
│   │   ├── ExpenseForm.tsx   # Add expense form
│   │   ├── ExpenseList.tsx   # Expense list with delete
│   │   └── BudgetTracker.tsx # Budget overview
│   └── lib/
│       └── db.ts             # JSON file operations
```

## 💾 Data Storage

This minimal version uses a JSON file (`data/finances.json`) to store:
- **Expenses**: Transaction records with description, amount, category, and date
- **Budgets**: Budget limits and spending by category
- **Categories**: Predefined expense categories

### Sample Data Structure

```json
{
  "expenses": [
    {
      "id": "1",
      "description": "Grocery shopping",
      "amount": 85.50,
      "category": "Food & Groceries",
      "date": "2024-12-15"
    }
  ],
  "budgets": [
    {
      "id": "1",
      "category": "Food & Groceries",
      "limit": 500,
      "spent": 85.50,
      "month": "2024-12"
    }
  ],
  "categories": [
    "Food & Groceries",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Education",
    "Other"
  ]
}
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS 4
- **Data Storage**: JSON file (file system)
- **API**: Next.js API routes

## 📈 Upgrade Path

This minimal version is designed to be easily upgraded:

1. **Database Integration**: Replace `src/lib/db.ts` with PostgreSQL/Supabase
2. **Authentication**: Add NextAuth.js for multi-user support
3. **AI Categorization**: Integrate OpenAI/Claude API for auto-categorization
4. **Advanced Charts**: Add Recharts or Chart.js for complex visualizations
5. **CSV Export**: Add data export functionality
6. **Receipt OCR**: Add image upload and text extraction

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Dashboard**
   - ✅ View total spending
   - ✅ See spending by category
   - ✅ Check quick statistics

2. **Expenses**
   - ✅ View all expenses in a table
   - ✅ Delete expenses
   - ✅ See expense totals

3. **Add Expense**
   - ✅ Fill in description, amount, category, date
   - ✅ Submit form
   - ✅ See expense appear in list

4. **Budgets**
   - ✅ View budget progress bars
   - ✅ See warnings when approaching limits
   - ✅ See alerts when exceeding budgets

## 🎯 Project Goals

This project demonstrates:
- Modern web development with Next.js and TypeScript
- RESTful API design with Next.js API routes
- State management in React
- File-based data storage
- Clean, maintainable code structure
- Responsive UI design with Tailwind CSS

## 📝 License

This is a graduation project. Feel free to use it as a learning resource.

## 🤝 Contributing

This is a minimal version for demonstration. Future enhancements will include:
- User authentication
- Database integration
- AI-powered categorization
- Advanced analytics
- Mobile app version
