import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Download, BarChart2, TrendingUp, 
  FileCheck, FileDigit, BarChart3, Loader2, DownloadCloud
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const DaycareReports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (reportName, fileType) => {
    const content = `This is a sample ${fileType} report for: ${reportName}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const extension = fileType === 'Excel' ? 'xlsx' : 'pdf';
    link.download = `${reportName.replace(/\s+/g, '_').toLowerCase()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const areaData = [
    { name: 'Oct', current: 880, previous: 640 },
    { name: 'Nov', current: 950, previous: 700 },
    { name: 'Dec', current: 1020, previous: 750 },
    { name: 'Jan', current: 1090, previous: 790 },
    { name: 'Feb', current: 1150, previous: 810 },
    { name: 'Mar', current: 1210, previous: 820 },
  ];

  const barData = [
    { name: 'Mon', active: 720, inactive: 1230 },
    { name: 'Tue', active: 780, inactive: 1350 },
    { name: 'Wed', active: 750, inactive: 1280 },
    { name: 'Thu', active: 810, inactive: 1470 },
    { name: 'Fri', active: 820, inactive: 1550 },
    { name: 'Sat', active: 560, inactive: 980 },
    { name: 'Sun', active: 500, inactive: 870 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Analytics Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-6 lg:p-10 font-sans text-[#1e293b]">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#0f172a] mb-1 leading-tight">Reports & Analytics</h1>
          <p className="text-[13px] text-[#64748b]">Generate and download comprehensive platform reports</p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#06b6d4] mb-4">
              <FileText size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Total Reports</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">127</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#06b6d4] mb-4">
              <Calendar size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Generated This Month</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">12</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#06b6d4] mb-4">
              <DownloadCloud size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Downloads</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">1,234</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#06b6d4] mb-4">
              <BarChart2 size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Avg. Size</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">2.1 MB</h3>
          </div>
        </div>

        {/* Platform Growth Chart */}
        <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-8">
          <h3 className="text-[15px] font-bold text-[#1e293b] mb-6">Platform Growth (6 Months)</h3>
          <div className="w-full h-[320px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} domain={[0, 1400]} ticks={[0, 350, 700, 1050, 1400]} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="current" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" />
                <Area type="monotone" dataKey="previous" stroke="#a3e635" strokeWidth={2} fillOpacity={1} fill="url(#colorPrev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement Chart */}
        <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-10">
          <h3 className="text-[15px] font-bold text-[#1e293b] mb-6">User Engagement (This Week)</h3>
          <div className="w-full h-[320px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2} barSize={38}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} domain={[0, 1600]} ticks={[0, 400, 800, 1200, 1600]} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="active" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inactive" fill="#ff8a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Available Reports */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-[#0f172a]">Available Reports</h2>
          <button className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors">
            Generate New Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-5 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="w-[46px] h-[46px] rounded-full bg-[#06b6d4] flex items-center justify-center text-white shrink-0">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-bold text-[#1e293b]">Monthly Platform Report</h4>
                <button onClick={() => handleDownload('Monthly Platform Report', 'PDF')} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#64748b] hover:text-[#06b6d4] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#06b6d4]">
                  <Download size={14} /> Download
                </button>
              </div>
              <p className="text-[12px] text-[#64748b] mb-4">Comprehensive overview of all platform activities</p>
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#94a3b8]">
                <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">PDF</span>
                <span>Mar 1, 2025</span>
                <span>2.4 MB</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-5 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="w-[46px] h-[46px] rounded-full bg-[#22c55e] flex items-center justify-center text-white shrink-0">
              <TrendingUp size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-bold text-[#1e293b]">User Growth Analytics</h4>
                <button onClick={() => handleDownload('User Growth Analytics', 'Excel')} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#64748b] hover:text-[#06b6d4] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#06b6d4]">
                  <Download size={14} /> Download
                </button>
              </div>
              <p className="text-[12px] text-[#64748b] mb-4">User acquisition and retention metrics</p>
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#94a3b8]">
                <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">Excel</span>
                <span>Mar 1, 2025</span>
                <span>1.8 MB</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-5 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="w-[46px] h-[46px] rounded-full bg-[#a855f7] flex items-center justify-center text-white shrink-0">
              <BarChart3 size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-bold text-[#1e293b]">Observations Summary</h4>
                <button onClick={() => handleDownload('Observations Summary', 'PDF')} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#64748b] hover:text-[#06b6d4] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#06b6d4]">
                  <Download size={14} /> Download
                </button>
              </div>
              <p className="text-[12px] text-[#64748b] mb-4">Detailed breakdown of observation data</p>
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#94a3b8]">
                <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">PDF</span>
                <span>Feb 28, 2025</span>
                <span>3.1 MB</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-5 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="w-[46px] h-[46px] rounded-full bg-[#ff8a8a] flex items-center justify-center text-white shrink-0">
              <FileDigit size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-bold text-[#1e293b]">AI Performance Report</h4>
                <button onClick={() => handleDownload('AI Performance Report', 'PDF')} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#64748b] hover:text-[#06b6d4] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#06b6d4]">
                  <Download size={14} /> Download
                </button>
              </div>
              <p className="text-[12px] text-[#64748b] mb-4">AI processing accuracy and insights</p>
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#94a3b8]">
                <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">PDF</span>
                <span>Feb 28, 2025</span>
                <span>1.5 MB</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DaycareReports;

