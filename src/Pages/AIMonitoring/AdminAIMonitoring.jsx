import React, { useState, useEffect } from 'react';
import { Target, Brain, CheckCircle, AlertCircle, Zap, PieChart as PieChartIcon, LayoutGrid, Loader2 } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

const AdminAIMonitoring = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const lineData = [
    { name: 'Mon', processed: 230, milestones: 180 },
    { name: 'Tue', processed: 260, milestones: 200 },
    { name: 'Wed', processed: 190, milestones: 160 },
    { name: 'Thu', processed: 310, milestones: 270 },
    { name: 'Fri', processed: 280, milestones: 230 },
    { name: 'Sat', processed: 150, milestones: 130 },
    { name: 'Sun', processed: 140, milestones: 120 },
  ];

  const pieData = [
    { name: 'Accurate', value: 87, color: '#10b981' },
    { name: 'Reviewed', value: 10, color: '#f59e0b' },
    { name: 'Corrected', value: 3, color: '#ef4444' }
  ];

  const barData = [
    { name: 'Language', achieved: 234, pending: 89 },
    { name: 'Motor', achieved: 198, pending: 76 },
    { name: 'Social', achieved: 167, pending: 54 },
    { name: 'Cognitive', achieved: 145, pending: 67 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-6 lg:p-10 font-sans text-[#1e293b]">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#0f172a] mb-1 leading-tight">Milestones & AI Analytics</h1>
          <p className="text-[13px] text-[#64748b]">Monitor milestone tracking and AI processing performance</p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#06b6d4] flex items-center justify-center text-white mb-4">
              <Target size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Total Milestones</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">3,892</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#a855f7] flex items-center justify-center text-white mb-4">
              <Brain size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">AI Processed</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">3,456</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#10b981] flex items-center justify-center text-white mb-4">
              <CheckCircle size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Accuracy Rate</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">94.2%</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#ef4444] flex items-center justify-center text-white mb-4">
              <AlertCircle size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Flagged for Review</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">23</h3>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Line Chart */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-[#a855f7]" />
              <h3 className="text-[14px] font-bold text-[#1e293b]">AI Processing Activity</h3>
            </div>
            <div className="flex-1 min-h-[250px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="processed" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="milestones" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <PieChartIcon size={18} className="text-[#10b981]" />
              <h3 className="text-[14px] font-bold text-[#1e293b]">AI Accuracy Distribution</h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center min-h-[250px]">
              <div className="h-[200px] w-full relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="w-full space-y-2.5 px-4">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[13px] text-[#64748b]">{item.name}</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#1e293b]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* Charts Row 2 - Bar Chart */}
        <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-6">
          <div className="flex items-center gap-2 mb-6">
            <LayoutGrid size={18} className="text-[#06b6d4]" />
            <h3 className="text-[14px] font-bold text-[#1e293b]">Milestones by Development Domain</h3>
          </div>
          <div className="w-full h-[250px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="achieved" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={45} />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Detail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h4 className="text-[14px] font-bold text-[#0f172a] mb-5">Language</h4>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Achieved</span>
                <span className="font-bold text-[#1e293b]">234</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#06b6d4] rounded-full" style={{ width: '72.4%' }}></div>
              </div>
              
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Pending</span>
                <span className="font-bold text-[#1e293b]">89</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Total</span>
                <span className="font-bold text-[#1e293b]">323</span>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#06b6d4] mb-0.5">72.4%</p>
              <p className="text-[11px] text-[#94a3b8]">Completion Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h4 className="text-[14px] font-bold text-[#0f172a] mb-5">Motor</h4>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Achieved</span>
                <span className="font-bold text-[#1e293b]">198</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#fbbf24] rounded-full" style={{ width: '72.3%' }}></div>
              </div>
              
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Pending</span>
                <span className="font-bold text-[#1e293b]">76</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Total</span>
                <span className="font-bold text-[#1e293b]">274</span>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#fbbf24] mb-0.5">72.3%</p>
              <p className="text-[11px] text-[#94a3b8]">Completion Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h4 className="text-[14px] font-bold text-[#0f172a] mb-5">Social</h4>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Achieved</span>
                <span className="font-bold text-[#1e293b]">167</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#fca5a5] rounded-full" style={{ width: '75.6%' }}></div>
              </div>
              
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Pending</span>
                <span className="font-bold text-[#1e293b]">54</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Total</span>
                <span className="font-bold text-[#1e293b]">221</span>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#fca5a5] mb-0.5">75.6%</p>
              <p className="text-[11px] text-[#94a3b8]">Completion Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h4 className="text-[14px] font-bold text-[#0f172a] mb-5">Cognitive</h4>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Achieved</span>
                <span className="font-bold text-[#1e293b]">145</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#a855f7] rounded-full" style={{ width: '68.4%' }}></div>
              </div>
              
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Pending</span>
                <span className="font-bold text-[#1e293b]">67</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#64748b]">Total</span>
                <span className="font-bold text-[#1e293b]">212</span>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#a855f7] mb-0.5">68.4%</p>
              <p className="text-[11px] text-[#94a3b8]">Completion Rate</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminAIMonitoring;
