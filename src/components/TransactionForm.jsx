import React, { useEffect, useState } from 'react';
import { Plus, Save } from 'lucide-react';

const CATEGORIES = [
  { value: 'Food', label: 'Food' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' },
];

export default function TransactionForm({ onSave, editing }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'Expense',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        amount: String(Math.abs(editing.amount)),
        category: editing.category,
        type: editing.amount >= 0 ? 'Income' : 'Expense',
        date: editing.date,
        notes: editing.notes || '',
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number(form.amount);

    if (!form.title.trim()) return alert('Please enter a title');
    if (!amountNum || amountNum <= 0) return alert('Enter a valid amount');
    if (!form.date) return alert('Please select a date');

    const payload = {
      id: editing?.id || crypto.randomUUID(),
      title: form.title.trim(),
      amount: form.type === 'Income' ? amountNum : -amountNum,
      category: form.category,
      type: form.type,
      date: form.date,
      notes: form.notes.trim() || undefined,
    };

    onSave(payload);

    if (!editing) {
      setForm({
        title: '',
        amount: '',
        category: 'Food',
        type: 'Expense',
        date: new Date().toISOString().slice(0, 10),
        notes: '',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">
          {editing ? 'Edit Transaction' : 'Add Transaction'}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="mb-1 block text-sm text-slate-300">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none ring-0 placeholder:text-slate-400 focus:border-white/20"
            placeholder="e.g., Salary, Pizza, Uber"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">Amount</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-white/20"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-white/20"
          >
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-white/20"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-white/20"
          />
        </div>
        <div className="sm:col-span-6">
          <label className="mb-1 block text-sm text-slate-300">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-white/20"
            placeholder="Add a short note"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          {editing ? (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Transaction
            </>
          )}
        </button>
      </div>
    </form>
  );
}
