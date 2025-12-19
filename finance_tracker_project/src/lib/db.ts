import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'finances.json');

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

export interface FinanceData {
  expenses: Expense[];
  budgets: Budget[];
  categories: string[];
}

export function readData(): FinanceData {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { expenses: [], budgets: [], categories: [] };
  }
}

export function writeData(data: FinanceData): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
}
