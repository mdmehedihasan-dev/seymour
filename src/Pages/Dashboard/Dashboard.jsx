import React from 'react';
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'TOTAL USERS', value: '1,284', trend: '+12%', trendLabel: 'FROM LAST MONTH', isPositive: true },
    { title: 'TOTAL CHILDREN', value: '842', trend: '+5.4%', trendLabel: 'FROM LAST MONTH', isPositive: true },
    { title: 'ACTIVE CARE CIRCLES', value: '312', trend: '+3%', trendLabel: 'FROM LAST MONTH', isPositive: true },
    { title: 'DAILY OBSERVATIONS', value: '4,120', trend: '-2.1%', trendLabel: 'FROM YESTERDAY', isPositive: false }
  ];

  const recentActivity = [
    {
      timestamp: ['2023-10-27', '14:23:45'],
      user: ['Sarah', 'Jenkins'],
      action: 'New Observation: Outdoor play social interaction log.',
      risk: 'LOW'
    },
    {
      timestamp: ['2023-10-27', '14:15:12'],
      user: ['System', 'AI'],
      action: 'Unusual activity detected in Circle 14: Emotional shift.',
      risk: 'MEDIUM'
    },
    {
      timestamp: ['2023-10-27', '13:58:22'],
      user: ['David', 'Miller'],
      action: 'Updated emergency contact info for Child ID: #442.',
      risk: 'LOW'
    },
    {
      timestamp: ['2023-10-27', '13:42:01'],
      user: ['Maria', 'Garcia'],
      action: 'New Observation: Academic achievement milestone (Math).',
      risk: 'LOW'
    }
  ];

  // Dummy data for the bar chart
  const barHeights = [30, 40, 35, 45, 60, 55, 80, 70, 95, 85, 100];

  return (
    <div className="min-h-screen p-8 bg-white font-sans text-[#111]">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
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

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#f4f4f4] p-6 flex flex-col justify-between h-32">
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

        {/* Middle Section: Graphs */}
        <div className="flex gap-6 mb-8 h-[360px]">
          
          {/* User Growth Graph (Left) */}
          <div className="flex-1 bg-[#f4f4f4] p-8 flex flex-col">
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
              {barHeights.map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 ${i < 3 ? 'bg-[#e0e0e0]' : 'bg-black'}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Activity Trend Graph (Right) */}
          <div className="w-[350px] bg-black p-8 text-white flex flex-col justify-between">
            <h2 className="text-sm text-gray-300 font-medium">Activity Trend Graph</h2>
            
            <div className="space-y-6 mt-6">
              <div className="flex justify-between items-end border-b border-[#222] pb-2">
                <span className="text-[11px] text-gray-500">Peak Usage</span>
                <span className="text-xl font-bold">14:00 PM</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#222] pb-2">
                <span className="text-[11px] text-gray-500">Low Usage</span>
                <span className="text-xl font-bold">03:00 AM</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#222] pb-2">
                <span className="text-[11px] text-gray-500">Avg Duration</span>
                <span className="text-xl font-bold">14.2 min</span>
              </div>
            </div>

            <div className="mt-8 bg-[#1f1f1f] h-14 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
              <span className="text-[9px] font-bold text-gray-500 tracking-[0.3em] uppercase relative z-10">PROCESSING...</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Recent Activity List */}
        <div className="bg-[#f4f4f4] p-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-lg font-bold">Recent Activity List</h2>
            <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">LAST 24 HOURS</span>
          </div>

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
              {recentActivity.map((item, i) => (
                <tr key={i} className="border-b border-gray-200/60 last:border-0 hover:bg-gray-50/50 transition-colors">
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

          <div className="flex justify-between items-center mt-8">
            <span className="text-[10px] text-gray-500 font-medium">Showing 4 of 1,284 events</span>
            <div className="flex gap-1.5">
              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-400 hover:bg-gray-300 transition-colors text-[10px] font-bold">&lt;</button>
              <button className="w-6 h-6 flex items-center justify-center bg-black text-white text-[10px] font-bold">1</button>
              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300 transition-colors text-[10px] font-bold">2</button>
              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300 transition-colors text-[10px] font-bold">3</button>
              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300 transition-colors text-[10px] font-bold">&gt;</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
