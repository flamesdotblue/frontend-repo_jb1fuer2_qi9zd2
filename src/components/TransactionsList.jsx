import React from 'react';
import { Pencil, Trash2, Utensils, Plane, ShoppingBag, Receipt, Film, Wallet } from 'lucide-react';

const categoryIcon = (category) => {
  switch (category) {
    case 'Food':
      return Utensils;
    case 'Travel':
      return Plane;
    case 'Shopping':
      return ShoppingBag;
    case 'Bills':
      return Receipt;
    case 'Entertainment':
      return Film;
    default:
      return Wallet;
  }
};

export default function TransactionsList({ items, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">Recent Transactions</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">No transactions yet. Add your first one!</p>
      ) : (
        <ul className="divide-y divide-white/10">
          {items.map((tx) => {
            const Icon = categoryIcon(tx.category);
            const isIncome = tx.amount >= 0;
            return (
              <li key={tx.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isIncome ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                  }`}>
                    <Icon className={`h-5 w-5 ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{tx.title}</div>
                    <div className="text-xs text-slate-400">{tx.category} • {new Date(tx.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-sm font-semibold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                  </div>
                  <button
                    onClick={() => onEdit(tx)}
                    className="rounded-md p-2 text-slate-300 hover:bg-white/5 hover:text-white"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(tx.id)}
                    className="rounded-md p-2 text-slate-300 hover:bg-white/5 hover:text-rose-400"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
