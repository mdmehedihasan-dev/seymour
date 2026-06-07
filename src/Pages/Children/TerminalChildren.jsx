import React, { useState, useEffect } from 'react';
import { Shield, Mail, QrCode, TrendingUp, AlertTriangle, Loader2, Filter, ListFilter } from 'lucide-react';

const TerminalChildren = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setData({
          stats: {
            managed: { value: '1,284', trend: '+12% from last month' },
            circles: { value: '3,902', trend: 'Avg 3.1 circles per child' },
            alert: { value: '0.04%', trend: 'System healthy' }
          },
          registry: [
            { id: 'KP-2938-X', initials: 'AM', name: 'Aria Miller', age: 6, parent: 'Sarah Miller', circles: 4 },
            { id: 'KP-1102-Y', initials: 'LW', name: 'Liam Watson', age: 8, parent: 'David Watson', circles: 2 },
            { id: 'KP-5542-Z', initials: 'EC', name: 'Elena Chen', age: 5, parent: 'Michael Chen', circles: 5 },
            { id: 'KP-0081-B', initials: 'JB', name: 'Julian Brooks', age: 11, parent: 'Amanda Brooks', circles: 3 },
            { id: 'KP-9982-A', initials: 'MR', name: 'Mia Robinson', age: 7, parent: 'Chloe Robinson', circles: 2 },
            { id: 'KP-3321-C', initials: 'NS', name: 'Noah Smith', age: 9, parent: 'James Smith', circles: 4 }
          ],
          totalEntries: 1284,
          registryHealth: 94
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Registry...</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.registry.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEntries = data.registry.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen p-8 bg-[#fdfdfd] font-sans text-[#111]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="w-1/2">
            <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">MANAGEMENT TERMINAL</p>
            <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">Children</h1>
            <p className="text-sm text-gray-600 leading-relaxed pr-8">
              Comprehensive database of all registered minors. Manage care circles, monitor AI safety scores, and review parental permissions.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <button className="bg-[#e8e8e8] hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors">
              EXPORT CSV
            </button>
            <button className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors">
              + REGISTER CHILD
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#f4f4f4] p-8 flex flex-col justify-between h-40 border-l-4 border-black">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">TOTAL MANAGED</h3>
            <div className="text-5xl font-light tracking-tight">{data.stats.managed.value}</div>
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp size={12} strokeWidth={3} />
              <span className="text-[9px] font-medium tracking-wide">{data.stats.managed.trend}</span>
            </div>
          </div>
          <div className="bg-[#f4f4f4] p-8 flex flex-col justify-between h-40">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">ACTIVE CIRCLES</h3>
            <div className="text-5xl font-light tracking-tight">{data.stats.circles.value}</div>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-3 h-3 flex items-center justify-center">
                 <span className="text-xs">⊛</span>
              </div>
              <span className="text-[9px] font-medium tracking-wide">{data.stats.circles.trend}</span>
            </div>
          </div>
          <div className="bg-[#f4f4f4] p-8 flex flex-col justify-between h-40">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">AI ALERT INDEX</h3>
            <div className="text-5xl font-light tracking-tight">{data.stats.alert.value}</div>
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle size={12} strokeWidth={3} />
              <span className="text-[9px] font-medium tracking-wide text-gray-500">{data.stats.alert.trend}</span>
            </div>
          </div>
        </div>

        {/* Registry Records Block */}
        <div className="bg-white mb-8 border border-[#e8e8e8] shadow-sm">
          {/* Registry Header */}
          <div className="bg-[#f4f4f4] px-8 py-5 flex justify-between items-center border-b border-[#e8e8e8]">
            <div className="flex items-center gap-8">
              <h2 className="text-[11px] font-bold tracking-widest uppercase">REGISTRY RECORDS</h2>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex gap-6 text-[10px] font-semibold">
                <button className="text-black border-b border-black pb-0.5">All Entries</button>
                <button className="text-gray-500 hover:text-black transition-colors">Alerts Only</button>
                <button className="text-gray-500 hover:text-black transition-colors">Pending Review</button>
              </div>
            </div>
            <div className="flex gap-4 text-gray-500">
              <Filter size={16} className="cursor-pointer hover:text-black" />
              <ListFilter size={16} className="cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* Table Headers */}
          <div className="px-8 py-4 flex items-center border-b border-[#e8e8e8] bg-[#fbfbfb]">
            <div className="w-[30%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">CHILD NAME</div>
            <div className="w-[15%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">AGE</div>
            <div className="w-[25%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">PARENT NAME</div>
            <div className="w-[15%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">CARE CIRCLES</div>
            <div className="w-[15%] text-right text-[9px] font-bold text-gray-500 tracking-widest uppercase">ACTIONS</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col min-h-[300px]">
            {currentEntries.map((child, i) => (
              <div key={i} className="px-8 py-5 flex items-center border-b border-[#e8e8e8] last:border-0 hover:bg-[#fafafa] transition-colors">
                <div className="w-[30%] flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#e8e8e8] flex items-center justify-center text-[11px] font-bold tracking-wider">
                    {child.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold">{child.name}</span>
                    <span className="text-[9px] text-gray-500 mt-0.5 tracking-wider">ID: {child.id}</span>
                  </div>
                </div>
                <div className="w-[15%] text-[13px] text-gray-600 font-medium">
                  {child.age}
                </div>
                <div className="w-[25%] text-[13px] text-gray-600">
                  {child.parent}
                </div>
                <div className="w-[15%]">
                  <span className="bg-[#f4f4f4] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase border border-gray-200">
                    {child.circles} Circles
                  </span>
                </div>
                <div className="w-[15%] flex justify-end">
                  <button className="text-[9px] font-bold tracking-widest uppercase border border-gray-300 px-3 py-1.5 hover:bg-black hover:text-white hover:border-black transition-all">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-8 py-5 flex justify-between items-center border-t border-[#e8e8e8]">
            <span className="text-[10px] font-medium text-gray-500">
              Showing {currentEntries.length} of {data.totalEntries.toLocaleString()} entries
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center border transition-colors text-[10px] font-bold ${
                    currentPage === page 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex gap-6">
          {/* Quick Actions */}
          <div className="w-[60%] bg-[#f4f4f4] p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background design element */}
            <div className="absolute -bottom-16 -right-16 text-gray-200/50">
              <Shield size={250} strokeWidth={1} />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-medium tracking-tight mb-8">QUICK ACTIONS</h2>
              <div className="flex gap-6">
                <div className="flex-1 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <Shield size={18} className="mb-4 text-black" />
                  <h3 className="text-[11px] font-bold mb-2">Audit Safety Logs</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Review behavioral patterns identified by AI for all minors.
                  </p>
                </div>
                <div className="flex-1 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <Mail size={18} className="mb-4 text-black" />
                  <h3 className="text-[11px] font-bold mb-2">Broadcast to Parents</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Send global notifications to all primary guardians.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stack */}
          <div className="w-[40%] flex flex-col gap-6">
            <div className="bg-black text-white p-8 flex-1 flex flex-col justify-center">
              <h3 className="text-[9px] font-bold tracking-widest uppercase mb-6 text-gray-400">REGISTRY HEALTH</h3>
              <div className="w-full bg-[#333] h-1 mb-6">
                <div className="bg-white h-1" style={{ width: `${data.registryHealth}%` }}></div>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {data.registryHealth}% of data entries are verified with primary ID documentation. 76 records require immediate manual validation.
              </p>
            </div>
            
            <div className="bg-[#e8e8e8] p-8 flex-1 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-300 transition-colors">
              <QrCode size={24} className="mb-4" />
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-2">GENERATE BATCH ID</h3>
              <p className="text-[10px] text-gray-500">
                Printable identification for local care circles.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TerminalChildren;
