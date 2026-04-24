
import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Minus, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { User } from '../types';

const CHART_DATA = Array.from({ length: 20 }).map((_, i) => ({
  time: `${i}:00`,
  price: 150 + Math.random() * 20
}));

interface TradingPageProps {
  user: User;
}

const TradingPage: React.FC<TradingPageProps> = ({ user }) => {
  const [amount, setAmount] = useState(1);
  const [selectedStock, setSelectedStock] = useState({ symbol: 'AAPL', name: 'Apple Inc.', price: 189.45 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Left Side: Chart & Info */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                  {selectedStock.symbol[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{selectedStock.name}</h1>
                  <p className="text-slate-500 font-medium">{selectedStock.symbol} • NASDAQ</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">${selectedStock.price.toFixed(2)}</p>
                <p className="text-emerald-500 font-bold text-sm">+2.45 (1.23%) Today</p>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['dataMin', 'dataMax']} hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-2 mt-6">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(t => (
                <button key={t} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${t === '1D' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <DataPoint label="Open" value="187.20" />
            <DataPoint label="High" value="190.15" />
            <DataPoint label="Low" value="186.40" />
            <DataPoint label="Mkt Cap" value="2.95T" />
          </div>
        </div>

        {/* Right Side: Order Panel */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
            <div className="flex divide-x divide-slate-100 border-b border-slate-100">
              <button className="flex-1 py-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600">Buy</button>
              <button className="flex-1 py-4 text-sm font-bold text-slate-500 hover:text-slate-700">Sell</button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Order Type</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Market Order</option>
                    <option>Limit Order</option>
                    <option>Stop Loss</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (Shares)</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setAmount(Math.max(1, amount - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <Minus size={20} className="text-slate-600" />
                  </button>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={() => setAmount(amount + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <Plus size={20} className="text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Est. Price</span>
                  <span className="font-bold text-slate-800">${selectedStock.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Commission</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base">
                  <span className="font-bold text-slate-900">Total Cost</span>
                  <span className="font-extrabold text-blue-600">${(amount * selectedStock.price).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                Confirm Purchase
              </button>

              <div className="flex items-center gap-2 justify-center text-xs text-slate-400">
                <Info size={14} />
                <span>Market is open. Execution is immediate.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataPoint: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200">
    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-lg font-bold text-slate-900">{value}</p>
  </div>
);

export default TradingPage;
