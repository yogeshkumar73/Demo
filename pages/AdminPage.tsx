
import React from 'react';
import { Users, ShieldCheck, AlertCircle, FileText, Settings, Search, Download } from 'lucide-react';

const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active', volume: '$1.2M', registered: '2024-01-15' },
  { id: '2', name: 'Alice Smith', email: 'alice@invest.com', status: 'Pending', volume: '$450K', registered: '2024-03-22' },
  { id: '3', name: 'Bob Johnson', email: 'bob.j@gmail.com', status: 'Suspended', volume: '$0', registered: '2023-11-05' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena@trading.io', status: 'Active', volume: '$5.6M', registered: '2024-02-10' },
];

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-slate-500">System overview and user management</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Download size={16} />
            Export Audit Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <AdminStatCard icon={<Users className="text-blue-600" />} label="Total Users" value="12,543" />
        <AdminStatCard icon={<ShieldCheck className="text-emerald-600" />} label="Verified Accounts" value="9,102" />
        <AdminStatCard icon={<AlertCircle className="text-amber-600" />} label="System Alerts" value="4 Active" />
        <AdminStatCard icon={<FileText className="text-indigo-600" />} label="Total Volume (24h)" value="$245.8M" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-bold text-slate-800">User Management</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Volume</th>
                <th className="px-6 py-4">Joined On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                      user.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{user.volume}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{user.registered}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                      <Settings size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 4 of 12,543 users</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-sm disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminStatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="mb-4">{icon}</div>
    <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

export default AdminPage;
