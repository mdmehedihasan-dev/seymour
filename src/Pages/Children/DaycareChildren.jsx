import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, MoreVertical, Calendar, Heart, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';

const DaycareChildren = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Search, Filter, and Pagination State
  const [search, setSearch] = useState('');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // To match the screenshot which shows 5 cards, but 6 per page is usually better for a 3-col grid. The screenshot shows 5 items on page 1. We will use 5 items. Wait, the screenshot says "Showing 1 to 5 of 823 children". We'll use 5.

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setData({
          stats: {
            total: "823",
            active: "789",
            observations: "12,456",
            avgAge: "2.6 yrs"
          },
          children: [
            { 
              id: 1, 
              initials: 'EJ', color: 'bg-[#06b6d4]', 
              name: 'Emma Johnson', age: '2 years 4 months', 
              born: 'Dec 15, 2022', 
              parents: 'Sarah & Michael Johnson',
              observations: 145, milestones: 32, careCircle: 4,
              lastActivity: '2 hours ago'
            },
            { 
              id: 2, 
              initials: 'LS', color: 'bg-[#f97316]', 
              name: 'Liam Smith', age: '3 years 2 months', 
              born: 'Feb 8, 2022', 
              parents: 'Emily & David Smith',
              observations: 203, milestones: 45, careCircle: 5,
              lastActivity: '1 hour ago'
            },
            { 
              id: 3, 
              initials: 'OM', color: 'bg-[#fca5a5]', 
              name: 'Olivia Martinez', age: '1 year 8 months', 
              born: 'Aug 22, 2023', 
              parents: 'Carlos & Ana Martinez',
              observations: 98, milestones: 18, careCircle: 3,
              lastActivity: '5 hours ago'
            },
            { 
              id: 4, 
              initials: 'NB', color: 'bg-[#a855f7]', 
              name: 'Noah Brown', age: '4 years 1 month', 
              born: 'Mar 10, 2021', 
              parents: 'Jennifer & Robert Brown',
              observations: 287, milestones: 58, careCircle: 6,
              lastActivity: '30 min ago'
            },
            { 
              id: 5, 
              initials: 'SD', color: 'bg-[#fbbf24]', 
              name: 'Sophia Davis', age: '2 years 9 months', 
              born: 'Jul 5, 2022', 
              parents: 'Amanda Davis',
              observations: 167, milestones: 38, careCircle: 3,
              lastActivity: '3 days ago'
            }
          ],
          totalChildren: 823
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredChildren = useMemo(() => {
    if (!data) return [];
    return data.children.filter(child => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        child.name.toLowerCase().includes(searchLower) || 
        child.parents.toLowerCase().includes(searchLower);
      return matchesSearch;
    });
  }, [data, search]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Child Profiles...</p>
        </div>
      </div>
    );
  }

  // To simulate the 823 total children from the screenshot
  const displayTotal = data.totalChildren;
  const totalPages = Math.ceil(displayTotal / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, displayTotal);
  
  // For demonstration, we just show the 5 mocked items if page is 1
  const currentChildren = page === 1 ? filteredChildren : [];

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-6 lg:p-10 font-sans text-[#1e293b]">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#0f172a] mb-1 leading-tight">Child Profiles</h1>
          <p className="text-[13px] text-[#64748b]">Monitor all children and their development progress</p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] mb-4">
              <RefreshCw size={20} strokeWidth={2} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Total Children</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">{data.stats.total}</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a] mb-4">
              <TrendingUp size={20} strokeWidth={2} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Active Profiles</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">{data.stats.active}</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#fee2e2] flex items-center justify-center text-[#ef4444] mb-4">
              <Heart size={20} strokeWidth={2} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Total Observations</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">{data.stats.observations}</h3>
          </div>

          <div className="bg-white rounded-[14px] border border-gray-100 p-6 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706] mb-4">
              <Calendar size={20} strokeWidth={2} />
            </div>
            <p className="text-[12px] font-medium text-[#64748b] mb-1">Avg. Age</p>
            <h3 className="text-[28px] font-bold text-[#0f172a] leading-none">{data.stats.avgAge}</h3>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-[14px] border border-gray-100 p-3 mb-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4">
          
          <div className="flex-1 relative pl-2">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} strokeWidth={2.5} />
            <input 
              type="text"
              placeholder="Search by child name, parent name, or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-transparent rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-gray-100 focus:bg-white transition-all placeholder:text-[#94a3b8]"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={ageFilter}
                onChange={(e) => {
                  setAgeFilter(e.target.value);
                  setPage(1);
                }}
                className="pl-4 pr-10 py-2.5 bg-white text-[13px] font-semibold text-[#475569] appearance-none focus:outline-none cursor-pointer min-w-[120px]"
              >
                <option value="All Ages">All Ages</option>
                <option value="0-2">0 - 2 years</option>
                <option value="3-4">3 - 4 years</option>
                <option value="5+">5+ years</option>
              </select>
              <ChevronDown size={14} strokeWidth={3} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
            </div>

            <button className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-7 py-2.5 rounded-full text-[13px] font-semibold transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentChildren.length > 0 ? (
            currentChildren.map((child) => (
              <div key={child.id} className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] transition-shadow">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-bold text-[15px] shadow-sm ${child.color}`}>
                      {child.initials}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0f172a] leading-tight mb-0.5">{child.name}</h3>
                      <p className="text-[12px] text-[#64748b] font-medium">{child.age}</p>
                    </div>
                  </div>
                  <button className="text-[#94a3b8] hover:text-[#475569] transition-colors p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[#475569]">
                    <Calendar size={14} className="text-[#94a3b8]" />
                    Born: {child.born}
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-semibold text-[#94a3b8] tracking-wide uppercase mb-1">Parents</p>
                    <p className="text-[13px] font-semibold text-[#1e293b]">{child.parents}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#f0fdfa] rounded-xl p-3 flex flex-col items-center justify-center border border-[#ccfbf1]">
                    <p className="text-[9px] font-semibold text-[#64748b] mb-1">Observations</p>
                    <span className="text-[18px] font-bold text-[#0d9488]">{child.observations}</span>
                  </div>
                  <div className="bg-[#fffbeb] rounded-xl p-3 flex flex-col items-center justify-center border border-[#fef3c7]">
                    <p className="text-[9px] font-semibold text-[#64748b] mb-1">Milestones</p>
                    <span className="text-[18px] font-bold text-[#d97706]">{child.milestones}</span>
                  </div>
                  <div className="bg-[#fef2f2] rounded-xl p-3 flex flex-col items-center justify-center border border-[#fee2e2]">
                    <p className="text-[9px] font-semibold text-[#64748b] mb-1">Care Circle</p>
                    <span className="text-[18px] font-bold text-[#e11d48]">{child.careCircle}</span>
                  </div>
                </div>

                {/* Development Focus Bars */}
                <div className="mb-6">
                  <p className="text-[11px] font-semibold text-[#64748b] mb-3">Development Focus</p>
                  <div className="flex gap-2">
                    <div className="h-1.5 flex-1 bg-[#06b6d4] rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-[#fbbf24] rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-[#fca5a5] rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-[#a855f7] rounded-full"></div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-[11px] font-medium text-[#94a3b8] pt-4 border-t border-gray-100">
                  <span>Last activity</span>
                  <span className="text-[#1e293b] font-semibold">{child.lastActivity}</span>
                </div>

              </div>
            ))
          ) : (
             <div className="col-span-full py-16 text-center text-[14px] font-medium text-[#64748b]">
               No child profiles found matching your criteria.
             </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="bg-white rounded-[14px] border border-gray-100 p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[#64748b] pl-2">
            Showing {currentChildren.length > 0 ? startIndex + 1 : 0} to {endIndex} of {displayTotal} children
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1.5 text-[13px] font-semibold text-[#475569] bg-white border border-transparent rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: 3 }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-[34px] h-[34px] rounded-full text-[13px] font-bold flex items-center justify-center transition-colors ${
                  page === p 
                    ? 'bg-[#06b6d4] text-white shadow-md' 
                    : 'bg-white text-[#475569] hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}

            <button 
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
              className="px-4 py-1.5 text-[13px] font-semibold text-[#475569] bg-white border border-transparent rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DaycareChildren;

