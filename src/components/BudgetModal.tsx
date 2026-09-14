import React, { useState } from 'react';
import { useApp, CURRENCY_MAP } from '../context/AppContext';
import { ExpenseItem, CurrencyCode } from '../types';
import {
  X,
  DollarSign,
  Plus,
  PieChart,
  Users,
  ArrowRightLeft,
  CheckCircle2,
  Receipt
} from 'lucide-react';

export const BudgetModal: React.FC = () => {
  const {
    isBudgetModalOpen,
    setBudgetModalOpen,
    expenses,
    addExpense,
    groupMembers,
    currency,
    setCurrency,
    showToast
  } = useApp();

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseItem['category']>('dining');
  const [newPaidBy, setNewPaidBy] = useState(groupMembers[0]?.name || 'Elena Vance');

  if (!isBudgetModalOpen) return null;

  const targetBudget = 8400;
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = targetBudget - totalSpent;
  const spentPercentage = Math.min(100, Math.round((totalSpent / targetBudget) * 100));

  // Category totals
  const categoryTotals: Record<string, number> = {
    lodging: 0,
    dining: 0,
    transit: 0,
    activities: 0,
    other: 0
  };

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (!newTitle.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast('Please enter a valid expense title and amount', 'error');
      return;
    }

    addExpense({
      title: newTitle.trim(),
      amount: parsedAmount,
      category: newCategory,
      paidBy: newPaidBy,
      date: 'Today',
      splitWith: groupMembers.map((m) => m.name)
    });

    setNewTitle('');
    setNewAmount('');
  };

  const curr = CURRENCY_MAP[currency as CurrencyCode] || CURRENCY_MAP.USD;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full shadow-2xl border border-surface-container-high/40 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface leading-tight">
                Collaborative Budget Tracker
              </h3>
              <span className="text-[11px] text-on-surface-variant">
                Live group expenditure & equal split calculations
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Currency selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-surface-container text-xs font-bold text-on-surface px-2.5 py-1.5 rounded-lg border border-surface-container-high focus:outline-none"
            >
              {Object.values(CURRENCY_MAP).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>

            <button
              onClick={() => setBudgetModalOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Budget Overview Card */}
          <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-surface-container-high/40 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Total Expedition Spend
                </span>
                <p className="text-2xl sm:text-3xl font-black text-on-surface">
                  {curr.symbol}{(totalSpent * curr.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-xs font-normal text-on-surface-variant ml-1.5">
                    / {curr.symbol}{(targetBudget * curr.rate).toLocaleString()} target
                  </span>
                </p>
              </div>

              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {spentPercentage}% Utilized
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${spentPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-surface-container-high/40 text-center text-xs">
              <div>
                <span className="text-[10px] text-on-surface-variant">Remaining</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {curr.symbol}{(Math.max(0, remainingBudget) * curr.rate).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant">Per Person Share</span>
                <p className="font-bold text-on-surface">
                  {curr.symbol}{((totalSpent / Math.max(1, groupMembers.length)) * curr.rate).toFixed(0)}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant">Active Members</span>
                <p className="font-bold text-on-surface">{groupMembers.length} Travelers</p>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant">Transactions</span>
                <p className="font-bold text-on-surface">{expenses.length} Logged</p>
              </div>
            </div>
          </div>

          {/* Quick Category Distribution */}
          <div>
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 block">
              Expenditure Breakdown
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/40 text-xs">
                <span className="text-primary font-bold">🏨 Lodging</span>
                <p className="text-sm font-extrabold text-on-surface mt-0.5">
                  {curr.symbol}{(categoryTotals.lodging * curr.rate).toFixed(0)}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/40 text-xs">
                <span className="text-amber-600 font-bold">🍝 Dining</span>
                <p className="text-sm font-extrabold text-on-surface mt-0.5">
                  {curr.symbol}{(categoryTotals.dining * curr.rate).toFixed(0)}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/40 text-xs">
                <span className="text-sky-600 font-bold">🚤 Transit & Boats</span>
                <p className="text-sm font-extrabold text-on-surface mt-0.5">
                  {curr.symbol}{(categoryTotals.transit * curr.rate).toFixed(0)}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/40 text-xs">
                <span className="text-purple-600 font-bold">🎟️ Activities</span>
                <p className="text-sm font-extrabold text-on-surface mt-0.5">
                  {curr.symbol}{(categoryTotals.activities * curr.rate).toFixed(0)}
                </p>
              </div>
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="bg-surface-container-low rounded-2xl p-4 border border-surface-container-high/40">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3 block flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-primary" />
              Log Group Expense
            </span>

            <form onSubmit={handleAddExpenseSubmit} className="flex flex-col gap-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Expense Description</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Marina Grande Boat Fuel & Docking"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-on-surface font-semibold mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="e.g. 180"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ExpenseItem['category'])}
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    <option value="dining">Dining & Drinks</option>
                    <option value="lodging">Lodging & Villa</option>
                    <option value="transit">Transit & Ferries</option>
                    <option value="activities">Activities & Tickets</option>
                    <option value="other">Other / Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-on-surface font-semibold mb-1">Paid By</label>
                  <select
                    value={newPaidBy}
                    onChange={(e) => setNewPaidBy(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    {groupMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold transition-all shadow-sm active:scale-98 mt-1"
              >
                Record & Split Evenly
              </button>
            </form>
          </div>

          {/* Recent Group Transactions Feed */}
          <div>
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 block">
              Recent Group Receipts
            </span>

            <div className="flex flex-col gap-2">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low rounded-xl p-3 border border-surface-container-high/40 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                      <Receipt className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{item.title}</h4>
                      <span className="text-[11px] text-on-surface-variant">
                        Paid by <strong>{item.paidBy}</strong> · {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-on-surface block">
                      {curr.symbol}{(item.amount * curr.rate).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-secondary font-semibold">
                      {curr.symbol}{((item.amount / groupMembers.length) * curr.rate).toFixed(2)} / ea
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
