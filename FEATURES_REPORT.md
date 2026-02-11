# Finance Tracker Project - Features Report

**Project Name:** Finance Tracker
**Framework:** Next.js 16.1.0 with React 19.2.3
**Language:** TypeScript 5
**Styling:** Tailwind CSS 4
**Report Generated:** 2026-02-11

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Application Features](#application-features)
4. [API Endpoints](#api-endpoints)
5. [Data Models](#data-models)
6. [Frontend Components](#frontend-components)
7. [Data Flow Architecture](#data-flow-architecture)
8. [Project Structure](#project-structure)
9. [Current Limitations](#current-limitations)
10. [Recommended Enhancements](#recommended-enhancements)

---

## 1. Project Overview

The Finance Tracker is a full-stack web application built with Next.js that allows users to track personal expenses, manage budgets by category, and visualize spending patterns through an interactive dashboard. The application uses a JSON file-based storage system and provides a responsive UI suitable for both desktop and mobile devices.

---

## 2. Technology Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React 19.2.3, Next.js 16.1.0       |
| Language     | TypeScript 5                        |
| Styling      | Tailwind CSS 4, PostCSS 4          |
| Backend      | Next.js API Routes (Node.js)       |
| Data Storage | JSON file (`data/finances.json`)   |
| Build Tool   | Next.js build system               |
| Optimization | Babel React Compiler 1.0.0         |
| Package Mgr  | npm                                |

---

## 3. Application Features

### 3.1 Dashboard (Spending Overview)

- **Total Spending Display:** Shows the aggregate sum of all expenses along with the total transaction count.
- **Spending by Category:** Visual breakdown of spending per category with color-coded progress bars and percentage indicators.
- **Quick Statistics:**
  - Average amount per transaction
  - Number of distinct categories used
- **Color-Coded Categories:** Each of the 8 predefined categories is assigned a unique color for easy visual identification.

### 3.2 Expense Tracking

- **Expense List View:** Displays all recorded expenses sorted by date (newest first).
- **Responsive Layout:**
  - Desktop: Full table view with columns for Date, Description, Category, Amount, and Actions.
  - Mobile: Card-based layout optimized for smaller screens.
- **Delete Expenses:** Users can remove individual expenses with a confirmation dialog to prevent accidental deletion.
- **Running Total:** A cumulative total of all expenses is displayed at the bottom of the list.

### 3.3 Add Expense

- **Expense Form Fields:**
  - Description (text input, required)
  - Amount (decimal input with 0.01 step precision)
  - Category (dropdown populated from predefined categories)
  - Date (date picker, defaults to current date)
- **Form Validation:** All fields are required before submission is allowed.
- **Loading Feedback:** Visual loading indicator during form submission.
- **Auto-Reset:** Form fields clear automatically upon successful submission.
- **Real-Time Updates:** Parent data refreshes immediately after a new expense is added.

### 3.4 Budget Management

- **Budget Tracking:** Displays the budget limit vs. actual spent amount for each category.
- **Visual Progress Bars:** Color-coded indicators showing budget utilization:
  - **Green (0-79%):** Under budget - healthy spending.
  - **Yellow (80-99%):** Warning - approaching the budget limit.
  - **Red (100%+):** Alert - budget exceeded.
- **Remaining/Overage Amounts:** Shows either the remaining budget or the overage amount per category.
- **Alert Messages:** Contextual warning and exceeded-budget messages are displayed per category.
- **Summary Statistics:** Aggregated total budget limit and total spent across all categories.

### 3.5 Navigation and UX

- **Tab-Based Navigation:** Four main tabs with emoji icons:
  1. Dashboard
  2. Expenses
  3. Add Expense
  4. Budgets
- **Sticky Header:** Navigation bar remains visible while scrolling.
- **Responsive Design:** Mobile-first approach using Tailwind CSS breakpoints, adapting layout across all screen sizes.
- **Loading State:** A spinner is displayed during initial data fetch on page load.

### 3.6 Data Persistence

- **JSON File Storage:** All expense, budget, and category data is stored in `data/finances.json`.
- **Atomic Read/Write:** The database utility (`src/lib/db.ts`) handles reading from and writing to the JSON file.
- **Auto-Budget Updates:** When an expense is added or deleted, the corresponding budget's `spent` field is automatically recalculated.

### 3.7 Predefined Categories

The application includes 8 predefined expense categories:

1. Food & Groceries
2. Transportation
3. Entertainment
4. Utilities
5. Healthcare
6. Shopping
7. Education
8. Other

---

## 4. API Endpoints

### 4.1 Expenses — `/api/expenses`

| Method | Path             | Description                | Status Codes         |
|--------|------------------|----------------------------|----------------------|
| GET    | `/api/expenses`  | Retrieve all expenses      | 200, 500             |
| POST   | `/api/expenses`  | Create a new expense       | 201, 500             |
| PUT    | `/api/expenses`  | Update an existing expense | 200, 404, 500        |
| DELETE | `/api/expenses?id={id}` | Delete an expense by ID | 200, 400, 404, 500 |

- **POST** auto-generates an ID using `Date.now().toString()` and updates the associated budget's `spent` field.
- **DELETE** subtracts the deleted expense amount from the corresponding budget.
- **PUT** adjusts budgets for both the old and new categories when an expense category changes.

### 4.2 Budgets — `/api/budgets`

| Method | Path            | Description                        | Status Codes  |
|--------|-----------------|------------------------------------|---------------|
| GET    | `/api/budgets`  | Retrieve all budgets               | 200, 500      |
| POST   | `/api/budgets`  | Create or update a budget          | 200, 201, 500 |

- **POST** performs an upsert: if a budget for the same category and month exists, it updates the limit; otherwise, it creates a new budget with `spent = 0`.

### 4.3 Categories — `/api/categories`

| Method | Path               | Description                      | Status Codes |
|--------|--------------------|----------------------------------|--------------|
| GET    | `/api/categories`  | Retrieve all predefined categories | 200, 500   |

---

## 5. Data Models

### Expense

| Field       | Type   | Description                              |
|-------------|--------|------------------------------------------|
| id          | string | Unique identifier (timestamp-based)      |
| description | string | Transaction description                  |
| amount      | number | Expense amount in dollars (decimal)      |
| category    | string | Category name from predefined list       |
| date        | string | Transaction date (YYYY-MM-DD format)     |
| createdAt   | string | ISO 8601 timestamp of record creation    |

### Budget

| Field    | Type   | Description                             |
|----------|--------|-----------------------------------------|
| id       | string | Unique identifier                       |
| category | string | Category name                           |
| limit    | number | Maximum budget amount in dollars        |
| spent    | number | Total spent in this category            |
| month    | string | Budget month (YYYY-MM format)           |

### Finance Data (Root Structure)

| Field      | Type       | Description                    |
|------------|------------|--------------------------------|
| expenses   | Expense[]  | Array of all expense records   |
| budgets    | Budget[]   | Array of all budget records    |
| categories | string[]   | Array of predefined categories |

---

## 6. Frontend Components

| Component          | File                          | Description                                              |
|--------------------|-------------------------------|----------------------------------------------------------|
| Main Page          | `src/app/page.tsx`            | Root client component managing state, data fetching, and tab navigation |
| Layout             | `src/app/layout.tsx`          | Root HTML layout with metadata and global styles         |
| Dashboard          | `src/components/Dashboard.tsx`| Spending overview with category breakdown and statistics  |
| ExpenseForm        | `src/components/ExpenseForm.tsx`| Form for adding new expenses with validation            |
| ExpenseList        | `src/components/ExpenseList.tsx`| Responsive table/card view of all expenses with delete  |
| BudgetTracker      | `src/components/BudgetTracker.tsx`| Budget progress bars with alerts and summaries        |

### State Management

The application uses React hooks (`useState`, `useEffect`) for state management. All state is centralized in the main page component and passed to children as props. There is no external state management library.

---

## 7. Data Flow Architecture

```
┌─────────────────────────────────────────────────┐
│                  page.tsx (Main)                 │
│  State: expenses, budgets, categories, loading  │
│  Fetches data on mount via Promise.all()        │
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐│
│  │Dashboard │ │ExpenseList│ │  ExpenseForm     ││
│  │(read)    │ │(read+del) │ │  (create)        ││
│  └────┬─────┘ └─────┬────┘ └────────┬─────────┘│
│       │              │               │          │
│  ┌────┴──────────────┴───────────────┴────┐     │
│  │          BudgetTracker (read)          │     │
│  └────────────────────────────────────────┘     │
└────────────────────┬────────────────────────────┘
                     │ HTTP (fetch API)
                     ▼
┌─────────────────────────────────────────────────┐
│              Next.js API Routes                  │
│  /api/expenses  /api/budgets  /api/categories    │
└────────────────────┬────────────────────────────┘
                     │ fs read/write
                     ▼
┌─────────────────────────────────────────────────┐
│            data/finances.json                    │
│  { expenses[], budgets[], categories[] }         │
└─────────────────────────────────────────────────┘
```

1. **Initial Load:** The main page fetches expenses, budgets, and categories in parallel.
2. **Add Expense:** ExpenseForm POSTs to the API, which writes to the JSON file and updates the relevant budget. A callback triggers a full data refetch.
3. **Delete Expense:** ExpenseList sends a DELETE request, the API updates storage, and a callback triggers a refetch.
4. **View Data:** GET requests return the latest data from the JSON file. Components compute derived values (totals, percentages) locally.

---

## 8. Project Structure

```
finance_tracker_project/
├── data/
│   └── finances.json              # JSON-based data store
├── public/                        # Static assets (SVGs)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── budgets/route.ts   # Budget API (GET, POST)
│   │   │   ├── categories/route.ts# Category API (GET)
│   │   │   └── expenses/route.ts  # Expense API (GET, POST, PUT, DELETE)
│   │   ├── globals.css            # Global Tailwind styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Main application page
│   ├── components/
│   │   ├── BudgetTracker.tsx      # Budget progress display
│   │   ├── Dashboard.tsx          # Spending analytics
│   │   ├── ExpenseForm.tsx        # New expense form
│   │   └── ExpenseList.tsx        # Expense list/table
│   └── lib/
│       └── db.ts                  # JSON file read/write utility
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS/Tailwind config
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

---

## 9. Current Limitations

| Area                | Limitation                                                       |
|---------------------|------------------------------------------------------------------|
| Authentication      | No user authentication or authorization system                   |
| Multi-User Support  | Single-user mode; all data is shared globally                    |
| Data Storage        | JSON file-based; not suitable for production or concurrent use   |
| Testing             | No automated test suite (unit, integration, or E2E)              |
| Search & Filtering  | No ability to search or filter expenses by date range or keyword |
| Data Export         | No CSV, PDF, or other export functionality                       |
| Category Management | Categories are fixed; users cannot add or modify categories      |
| Charts              | No graphical charts (pie, line, bar); only progress bars         |
| Expense Editing     | PUT endpoint exists but no edit UI in the frontend               |
| Receipt Uploads     | No image/receipt upload capability                               |

---

## 10. Recommended Enhancements

| Priority | Enhancement                    | Description                                                    |
|----------|--------------------------------|----------------------------------------------------------------|
| High     | Database Integration           | Migrate from JSON file to PostgreSQL or Supabase               |
| High     | User Authentication            | Add NextAuth.js for login, registration, and session handling  |
| High     | Automated Testing              | Add Jest/Vitest for unit tests and Playwright for E2E testing  |
| Medium   | Advanced Charts                | Integrate Recharts or Chart.js for pie, line, and bar charts   |
| Medium   | Expense Search & Filtering     | Add date range filters, keyword search, and category filters   |
| Medium   | Expense Edit UI                | Build a frontend form for editing existing expenses            |
| Medium   | Data Export                    | Add CSV and PDF export functionality                           |
| Low      | AI Categorization              | Auto-categorize expenses using OpenAI or Claude API            |
| Low      | Receipt OCR                    | Upload and parse receipt images for automatic data entry        |
| Low      | Custom Categories              | Allow users to create, rename, and delete categories           |

---

*This report provides a complete overview of the Finance Tracker Project's current features, architecture, and potential areas for improvement.*
