import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, TrendingDown, Loader2, Users, Smile, Eye, Brain, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  const role = localStorage.getItem("role") || "terminal";

  // Pagination State (Terminal)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setData({
          stats: [
            { title: 'TOTAL USERS', value: '1,284', trend: '+12%', trendLabel: 'FROM LAST MONTH', isPositive: true },
            { title: 'TOTAL CHILDREN', value: '842', trend: '+5.4%', trendLabel: 'FROM LAST MONTH', isPositive: true },
            { title: 'ACTIVE CARE CIRCLES', value: '312', trend: '+3%', trendLabel: 'FROM LAST MONTH', isPositive: true },
            { title: 'DAILY OBSERVATIONS', value: '4,120', trend: '-2.1%', trendLabel: 'FROM YESTERDAY', isPositive: false }
          ],
          activityTrend: {
            peakUsage: '14:00 PM',
            lowUsage: '03:00 AM',
            avgDuration: '14.2 min'
          },
          userGrowthBars: [30, 40, 35, 45, 60, 55, 80, 70, 95, 85, 100],
          recentActivity: [
            { id: 1, timestamp: ['2023-10-27', '14:23:45'], user: ['Sarah', 'Jenkins'], action: 'New Observation: Outdoor play social interaction log.', risk: 'LOW' },
            { id: 2, timestamp: ['2023-10-27', '14:15:12'], user: ['System', 'AI'], action: 'Unusual activity detected in Circle 14: Emotional shift.', risk: 'MEDIUM' },
            { id: 3, timestamp: ['2023-10-27', '13:58:22'], user: ['David', 'Miller'], action: 'Updated emergency contact info for Child ID: #442.', risk: 'LOW' },
            { id: 4, timestamp: ['2023-10-27', '13:42:01'], user: ['Maria', 'Garcia'], action: 'New Observation: Academic achievement milestone (Math).', risk: 'LOW' },
            { id: 5, timestamp: ['2023-10-27', '12:10:05'], user: ['Alex', 'Sterling'], action: 'Approved new care circle request.', risk: 'LOW' },
            { id: 6, timestamp: ['2023-10-27', '11:45:30'], user: ['System', 'Admin'], action: 'Weekly system backup completed.', risk: 'LOW' },
            { id: 7, timestamp: ['2023-10-27', '10:12:11'], user: ['Jane', 'Doe'], action: 'Failed login attempt detected from new IP.', risk: 'MEDIUM' },
            { id: 8, timestamp: ['2023-10-27', '09:05:44'], user: ['System', 'AI'], action: 'Generated monthly user growth report.', risk: 'LOW' }
          ],
          totalEvents: 1284,

          // Dashboard Theme Mock Data
          userActivityData: [
            { name: 'Apr 1', value: 140 },
            { name: 'Apr 2', value: 180 },
            { name: 'Apr 3', value: 160 },
            { name: 'Apr 4', value: 200 },
            { name: 'Apr 5', value: 190 },
            { name: 'Apr 6', value: 220 },
            { name: 'Apr 7', value: 240 }
          ],
          rolesData: [
            { name: 'Parents', value: 456, color: '#00b4d8' },
            { name: 'Caregivers', value: 189, color: '#ffd166' },
            { name: 'Daycare', value: 87, color: '#ff9f1c' },
            { name: 'Family', value: 234, color: '#06d6a0' }
          ],
          observationsData: [
            { name: 'Mon', value: 45 },
            { name: 'Tue', value: 52 },
            { name: 'Wed', value: 38 },
            { name: 'Thu', value: 61 },
            { name: 'Fri', value: 48 },
            { name: 'Sat', value: 34 },
            { name: 'Sun', value: 28 }
          ]
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading System Data...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // TERMINAL DASHBOARD
  // ==========================================
  if (role === "terminal") {
    const totalItems = data.recentActivity.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentActivityList = data.recentActivity.slice(startIndex, endIndex);

    const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const handlePageClick = (page) => { setCurrentPage(page); };

    return (
      <div className="min-h-screen p-8 bg-white font-sans text-[#111]">
        <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
          
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-1.5">
                SYSTEM OVERVIEW
              </p>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-200 hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                GENERATE REPORT
              </button>
              <button className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                SYSTEM SCAN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {data.stats.map((stat, i) => (
              <div key={i} className="bg-[#f4f4f4] p-6 flex flex-col justify-between h-32 hover:shadow-sm transition-all duration-300">
                <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">{stat.title}</h3>
                <div className="text-4xl font-light tracking-tight">{stat.value}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  {stat.isPositive ? (
                    <TrendingUp size={10} className="text-black" strokeWidth={3} />
                  ) : (
                    <TrendingDown size={10} className="text-black" strokeWidth={3} />
                  )}
                  <span className="text-[8px] font-bold text-black tracking-wider uppercase">
                    {stat.trend} {stat.trendLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 mb-8 h-[360px]">
            <div className="flex-1 bg-[#f4f4f4] p-8 flex flex-col group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-lg font-bold">User Growth Graph</h2>
                  <p className="text-xs text-gray-500 mt-1">Historical data over the last 30 days</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-black"></div>
                  <span className="text-[9px] font-bold tracking-widest uppercase">ACTIVE</span>
                </div>
              </div>
              <div className="flex-1 flex items-end gap-1.5 mt-auto">
                {data.userGrowthBars.map((h, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 transition-all duration-500 hover:opacity-80 ${i < 3 ? 'bg-[#e0e0e0]' : 'bg-black'}`}
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="w-[350px] bg-black p-8 text-white flex flex-col justify-between">
              <h2 className="text-sm text-gray-300 font-medium">Activity Trend Graph</h2>
              <div className="space-y-6 mt-6">
                <div className="flex justify-between items-end border-b border-[#222] pb-2">
                  <span className="text-[11px] text-gray-500">Peak Usage</span>
                  <span className="text-xl font-bold">{data.activityTrend.peakUsage}</span>
                </div>
                <div className="flex justify-between items-end border-b border-[#222] pb-2">
                  <span className="text-[11px] text-gray-500">Low Usage</span>
                  <span className="text-xl font-bold">{data.activityTrend.lowUsage}</span>
                </div>
                <div className="flex justify-between items-end border-b border-[#222] pb-2">
                  <span className="text-[11px] text-gray-500">Avg Duration</span>
                  <span className="text-xl font-bold">{data.activityTrend.avgDuration}</span>
                </div>
              </div>
              <div className="mt-8 bg-[#1f1f1f] h-14 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
                <span className="text-[9px] font-bold text-gray-500 tracking-[0.3em] uppercase relative z-10">PROCESSING...</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f4f4f4] p-8">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-lg font-bold">Recent Activity List</h2>
              <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">LAST 24 HOURS</span>
            </div>

            <div className="min-h-[350px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-[9px] font-bold text-gray-500 tracking-widest uppercase w-[15%]">TIMESTAMP</th>
                    <th className="pb-3 text-[9px] font-bold text-gray-500 tracking-widest uppercase w-[20%]">USER / ACTOR</th>
                    <th className="pb-3 text-[9px] font-bold text-gray-500 tracking-widest uppercase w-[45%]">ACTION DETAILS</th>
                    <th className="pb-3 text-[9px] font-bold text-gray-500 tracking-widest uppercase w-[10%]">RISK LEVEL</th>
                    <th className="pb-3 text-[9px] font-bold text-gray-500 tracking-widest uppercase text-right w-[10%]">VIEW</th>
                  </tr>
                </thead>
                <tbody>
                  {currentActivityList.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200/60 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-5 align-top">
                        <div className="text-[11px] text-gray-500">{item.timestamp[0]}</div>
                        <div className="text-[11px] text-gray-500">{item.timestamp[1]}</div>
                      </td>
                      <td className="py-5 align-top font-bold text-[13px] leading-tight">
                        <div>{item.user[0]}</div>
                        <div>{item.user[1]}</div>
                      </td>
                      <td className="py-5 align-top text-[13px] text-gray-700 pr-8">
                        {item.action}
                      </td>
                      <td className="py-5 align-top">
                        {item.risk === 'LOW' ? (
                          <span className="bg-[#e0e0e0] text-black text-[9px] font-bold px-2 py-1 tracking-wider uppercase">LOW</span>
                        ) : (
                          <span className="bg-black text-white text-[9px] font-bold px-2 py-1 tracking-wider uppercase">MEDIUM</span>
                        )}
                      </td>
                      <td className="py-5 align-top text-right">
                        <button className="text-gray-400 hover:text-black transition-colors inline-block">
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-8">
              <span className="text-[10px] text-gray-500 font-medium">
                Showing {currentActivityList.length} of {data.totalEvents.toLocaleString()} events
              </span>
              <div className="flex gap-1.5">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-6 h-6 flex items-center justify-center transition-colors text-[10px] font-bold ${
                      currentPage === page 
                        ? 'bg-black text-white' 
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================
  
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans text-[#1e293b]">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-1">Dashboard Overview</h1>
          <p className="text-[13px] text-[#64748b]">Monitor and manage your KIDport platform</p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                <Users size={20} strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#10b981] bg-[#ecfdf5] px-2 py-1 rounded-md">
                <TrendingUp size={12} strokeWidth={3} />
                +12.5%
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#64748b] mb-1">Total Users</p>
              <h3 className="text-2xl font-bold text-[#0f172a]">1,247</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
                <Smile size={20} strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#10b981] bg-[#ecfdf5] px-2 py-1 rounded-md">
                <TrendingUp size={12} strokeWidth={3} />
                +8.2%
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#64748b] mb-1">Total Children</p>
              <h3 className="text-2xl font-bold text-[#0f172a]">823</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center text-[#e11d48]">
                <Eye size={20} strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#ef4444] bg-[#fef2f2] px-2 py-1 rounded-md">
                <TrendingDown size={12} strokeWidth={3} />
                -2.1%
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#64748b] mb-1">Daily Observations</p>
              <h3 className="text-2xl font-bold text-[#0f172a]">3,892</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#d1fae5] flex items-center justify-center text-[#059669]">
                <Brain size={20} strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#10b981] bg-[#ecfdf5] px-2 py-1 rounded-md">
                <TrendingUp size={12} strokeWidth={3} />
                +15.2%
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#64748b] mb-1">Active Care Circle</p>
              <h3 className="text-2xl font-bold text-[#0f172a]">1456</h3>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Line Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
            <h3 className="text-[14px] font-bold text-[#1e293b] mb-6">User Activity</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.userActivityData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11 }} 
                    ticks={[0, 60, 120, 180, 240]}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    strokeWidth={3} 
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4, stroke: 'white' }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-[14px] font-bold text-[#1e293b] mb-2">User Roles</h3>
            <div className="flex-1 flex flex-col justify-center">
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.rolesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.rolesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="mt-4 space-y-3">
                {data.rolesData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[12px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[#4a5568]">{item.name}</span>
                    </div>
                    <span className="font-bold text-[#1e293b]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 - Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
          <h3 className="text-[14px] font-bold text-[#1e293b] mb-6">Observations Per Day</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.observationsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                  ticks={[0, 20, 40, 60, 80]}
                />
                <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#fcd34d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity List */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-bold text-[#1e293b]">Recent Activity</h3>
              <button className="text-[12px] font-bold text-[#06b6d4] hover:text-[#0891b2] transition-colors">View All</button>
            </div>
            <div className="space-y-6">
              {[
                { initial: 'SM', color: 'bg-[#bbf7d0] text-[#166534]', name: 'Sarah Martinez', desc: 'Added observation for Emma', time: '2 min ago' },
                { initial: 'JD', color: 'bg-[#bbf7d0] text-[#166534]', name: 'John Davidson', desc: 'Marked milestone achieved', time: '8 min ago' },
                { initial: 'EC', color: 'bg-[#bbf7d0] text-[#166534]', name: 'Emily Chen', desc: 'Uploaded video observation', time: '15 min ago', flag: true },
                { initial: 'MR', color: 'bg-[#bbf7d0] text-[#166534]', name: 'Michael Roberts', desc: 'Joined care circle', time: '23 min ago' },
                { initial: 'JL', color: 'bg-[#bbf7d0] text-[#166534]', name: 'Jennifer Lee', desc: 'Updated child profile', time: '35 min ago' }
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] ${act.color}`}>
                      {act.initial}
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#1e293b]">{act.name}</h4>
                      <p className="text-[12px] text-[#64748b]">{act.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {act.flag && (
                      <span className="text-[10px] font-bold text-[#ef4444] bg-[#fef2f2] px-2 py-1 rounded">Flagged</span>
                    )}
                    <div className="flex items-center gap-1.5 text-[#94a3b8]">
                      <Clock size={12} />
                      <span className="text-[11px]">{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-[#1e293b] mb-6">System Alerts</h3>
            <div className="space-y-4">
              
              <div className="p-4 rounded-xl border border-[#fde68a] bg-[#fffbeb] flex items-start gap-3">
                <AlertTriangle size={18} className="text-[#d97706] mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#92400e]">3 support tickets need attention</h4>
                  <p className="text-[11px] text-[#b45309] mt-0.5">10 min ago</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#fecaca] bg-[#fef2f2] flex items-start gap-3">
                <AlertTriangle size={18} className="text-[#e11d48] mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#9f1239]">AI flagged 2 observations for review</h4>
                  <p className="text-[11px] text-[#be123c] mt-0.5">25 min ago</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] flex items-start gap-3">
                <CheckCircle size={18} className="text-[#2563eb] mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#1e40af]">System backup completed successfully</h4>
                  <p className="text-[11px] text-[#1d4ed8] mt-0.5">1 hour ago</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
