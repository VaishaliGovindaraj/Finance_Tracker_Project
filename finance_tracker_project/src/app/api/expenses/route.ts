import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data.expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();

    const newExpense = {
      id: Date.now().toString(),
      description: body.description,
      amount: parseFloat(body.amount),
      category: body.category,
      date: body.date,
      createdAt: new Date().toISOString(),
    };

    data.expenses.push(newExpense);

    // Update budget spent amount
    const budget = data.budgets.find(b => b.category === body.category);
    if (budget) {
      budget.spent += newExpense.amount;
    }

    writeData(data);
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = readData();
    const expenseIndex = data.expenses.findIndex(e => e.id === id);

    if (expenseIndex === -1) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    const deletedExpense = data.expenses[expenseIndex];

    // Update budget spent amount
    const budget = data.budgets.find(b => b.category === deletedExpense.category);
    if (budget) {
      budget.spent -= deletedExpense.amount;
    }

    data.expenses.splice(expenseIndex, 1);
    writeData(data);

    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();

    const expenseIndex = data.expenses.findIndex(e => e.id === body.id);

    if (expenseIndex === -1) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    const oldExpense = data.expenses[expenseIndex];

    // Update budget spent amounts
    const oldBudget = data.budgets.find(b => b.category === oldExpense.category);
    if (oldBudget) {
      oldBudget.spent -= oldExpense.amount;
    }

    const updatedExpense = {
      ...oldExpense,
      description: body.description,
      amount: parseFloat(body.amount),
      category: body.category,
      date: body.date,
    };

    data.expenses[expenseIndex] = updatedExpense;

    const newBudget = data.budgets.find(b => b.category === body.category);
    if (newBudget) {
      newBudget.spent += updatedExpense.amount;
    }

    writeData(data);
    return NextResponse.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}
