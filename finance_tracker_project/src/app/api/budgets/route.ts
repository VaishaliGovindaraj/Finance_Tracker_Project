import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data.budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();

    const existingBudgetIndex = data.budgets.findIndex(
      b => b.category === body.category && b.month === body.month
    );

    if (existingBudgetIndex !== -1) {
      data.budgets[existingBudgetIndex].limit = parseFloat(body.limit);
      writeData(data);
      return NextResponse.json(data.budgets[existingBudgetIndex]);
    }

    const newBudget = {
      id: Date.now().toString(),
      category: body.category,
      limit: parseFloat(body.limit),
      spent: 0,
      month: body.month,
    };

    data.budgets.push(newBudget);
    writeData(data);

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
}
