
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Sparkles } from 'lucide-react';
import { User } from '../types';
import { getMarketInsights } from '../services/geminiService';

const MOCK_CHART_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const MOCK_HOLDINGS = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, price: 189.45, change: 1.25 },
  { symbol: 'MSFT', name: 'Microsoft', shares: 5, price: 415.10, change: -0.82 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 15, price: 175.40, change: 3.45 },
  { symbol: 'NVDA', name: 'Nvidia Corp.', shares: 2, price: 890.20, change: 2.15 },
];

interface DashboardPageProps {
  user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [insights, setInsights] = useState('Generating AI insights...');

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await getMarketInsights(['AAPL', 'MSFT', 'TSLA', 'NVDA']);
      setInsights(res || 'No insights available.');
    };
    fetchInsights();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}</h1>
          <p className="text-slate-500">Your portfolio is performing well today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Deposit</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">Withdraw</button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Balance" value="$45,231.89" change="+12.5%" isUp icon={<DollarSign size={20} className="text-blue-600" />} />
        <StatCard title="Total Gain" value="+$5,410.12" change="+3.2%" isUp icon={<Activity size={20} className="text-emerald-600" />} />
        <StatCard title="Active Trades" value="12" change="-2" isUp={false} icon={<TrendingUp size={20} className="text-indigo-600" />} />
        <StatCard title="Buying Power" value="$2,100.00" change="No change" isUp icon={<PieChart size={20} className="text-amber-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800">Portfolio Performance</h2>
            <select className="bg-slate-50 border-none text-xs font-semibold rounded-md py-1 px-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 1 Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} />
              <h2 className="font-bold text-lg">AI Market Insight</h2>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              {insights}
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="text-xs text-indigo-200 mb-1">Top Recommendation</p>
                <p className="font-bold">Hold Tech Assets</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="text-xs text-indigo-200 mb-1">Market Sentiment</p>
                <p className="font-bold">Bullish (+82%)</p>
              </div>
            </div>
            <button className="mt-8 w-full py-3 bg-white text-blue-700 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              Read Detailed Report
            </button>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Your Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Shares</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Change</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_HOLDINGS.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{asset.symbol}</p>
                        <p className="text-xs text-slate-500">{asset.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{asset.shares}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">${asset.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      asset.change > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {asset.change > 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                      {Math.abs(asset.change)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">${(asset.shares * asset.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Trade</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string, value: string, change: string, isUp: boolean, icon: React.ReactNode }> = ({ title, value, change, isUp, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {change}
      </span>
    </div>
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

export default DashboardPage;
