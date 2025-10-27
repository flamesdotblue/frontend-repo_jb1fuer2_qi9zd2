import React from 'react';
import Spline from '@splinetool/react-spline';
import { Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl bg-slate-900">
      <Spline
        scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:pb-0">
          <div className="max-w-xl rounded-2xl bg-slate-900/50 p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
              <Wallet className="h-4 w-4" />
              Smart Expense Tracking
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Take control of your money with clarity and confidence
            </h1>
            <p className="mt-3 text-slate-300">
              Add transactions in seconds, visualize spending by category, and watch your savings grow. Green for income, red for expenses—simple.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
