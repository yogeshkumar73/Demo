
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// Fix: Added CartesianGrid to imports to fix "Cannot find name 'CartesianGrid'" error
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const SECTOR_DATA = [
  { name: 'Technology', value: 45, color: '#3b82f6' },
  { name: 'Finance', value: 20, color: '#10b981' },
  { name: 'Healthcare', value: 15, color: '#f59e0b' },
  { name: 'Energy', value: 10, color: '#6366f1' },
  { name: 'Others', value: 10, color: '#94a3b8' },
];

const PERFORMANCE_DATA = [
  { name: 'Mon', profit: 2400, loss: 400 },
  { name: 'Tue', profit: 1398, loss: 3000 },
  { name: 'Wed', profit: 9800, loss: 2000 },
  { name: 'Thu', profit: 3908, loss: 2780 },
  { name: 'Fri', profit: 4800, loss: 1890 },
];

const AnalyticsPage: React.FC = () => {
  const d3Container = useRef(null);

  // Example D3 Bubble Chart logic (simplified)
  useEffect(() => {
    if (d3Container.current) {
      d3.select(d3Container.current).selectAll("*").remove();
      
      const width = 600;
      const height = 400;
      const svg = d3.select(d3Container.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

      const data = [
        { label: "AI", size: 80, x: 100, y: 150, color: "#3b82f6" },
        { label: "Crypto", size: 60, x: 250, y: 250, color: "#ef4444" },
        { label: "SaaS", size: 90, x: 400, y: 100, color: "#10b981" },
        { label: "EV", size: 40, x: 500, y: 300, color: "#f59e0b" }
      ];

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 0)
        .attr("fill", d => d.color)
        .attr("opacity", 0.7)
        .transition()
        .duration(1000)
        .attr("r", d => d.size);

      svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .text(d => d.label)
        .style("fill", "white")
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .style("opacity", 0)
        .transition()
        .delay(1000)
        .style("opacity", 1);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Advanced Analytics</h1>
          <p className="text-slate-500">Deep dive into market trends and portfolio metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
            <Calendar size={16} /> 2024 Year
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sector Allocation */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Sector Allocation</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SECTOR_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SECTOR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit vs Loss */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Profit vs Loss Analysis</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* D3 visualization */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Market Trend Cluster</h2>
          <p className="text-sm text-slate-500 mb-8">Visualizing the relative weight of emerging markets</p>
          <div ref={d3Container} className="bg-slate-50 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
