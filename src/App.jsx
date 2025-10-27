import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionsList';

export default function App() {
  const [transactions, setTransactions] = useState([
    {
      id: crypto.randomUUID(),
      title: 'Salary',
      amount: 4200,
      category: 'Other',
      type: 'Income',
      date: new Date().toISOString().slice(0, 10),
      notes: 'Monthly paycheck',
    },
    {
      id: crypto.randomUUID(),
      title: 'Groceries',
      amount: -86.45,
      category: 'Food',
      type: 'Expense',
      date: new Date().toISOString().slice(0, 10),
    },
    {
      id: crypto.randomUUID(),
      title: 'Internet Bill',
      amount: -59.99,
      category: 'Bills',
      type: 'Expense',
      date: new Date().toISOString().slice(0, 10),
    },
  ]);
  const [editing, setEditing] = useState(null);

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.amount >= 0).reduce((s, t) => s + t.amount, 0);
    const expense = Math.abs(transactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0));
    return { income, expense };
  }, [transactions]);

  const handleSave = (tx) => {
    setTransactions((prev) => {
      const exists = prev.some((p) => p.id === tx.id);
      if (exists) {
        return prev.map((p) => (p.id === tx.id ? tx : p));
      }
      return [tx, ...prev];
    });
    setEditing(null);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const handleEdit = (tx) => setEditing(tx);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <Hero />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <SummaryCards totalIncome={totals.income} totalExpense={totals.expense} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TransactionForm onSave={handleSave} editing={editing} />
          </div>
          <div className="lg:col-span-2">
            <TransactionsList items={transactions} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>

        <footer className="py-6 text-center text-xs text-slate-400">
          Built with love for your wallet. Green for income, red for expenses.
        </footer>
      </div>
    </div>
  );
}
