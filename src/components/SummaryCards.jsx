import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Scale } from 'lucide-react';

export default function SummaryCards({ totalIncome, totalExpense }) {
  const balance = totalIncome - totalExpense;

  const Stat = ({ icon: Icon, label, value, colorClasses }) => (
    <div className="flex flex-1 items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses.bg}`}>
          <Icon className={`h-5 w-5 ${colorClasses.icon}`} />
        </div>
        <div>
          <div className="text-sm text-slate-400">{label}</div>
          <div className="text-lg font-semibold text-white">{value.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Stat
        icon={Scale}
        label="Balance"
        value={balance}
        colorClasses={{ bg: 'bg-sky-500/10', icon: 'text-sky-400' }}
      />
      <Stat
        icon={ArrowDownCircle}
        label="Income"
        value={totalIncome}
        colorClasses={{ bg: 'bg-emerald-500/10', icon: 'text-emerald-400' }}
      />
      <Stat
        icon={ArrowUpCircle}
        label="Expenses"
        value={totalExpense}
        colorClasses={{ bg: 'bg-rose-500/10', icon: 'text-rose-400' }}
      />
    </div>
  );
}
