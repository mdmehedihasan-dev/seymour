import React, { useState, useEffect } from 'react';
import { Loader2, Eye, Shield, ListFilter, AlertTriangle } from 'lucide-react';

const ParentObservations = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Observations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#f8fafc] font-sans text-[#1e293b]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="w-1/2">
            <p className="text-[9px] font-bold text-[#64748b] tracking-widest uppercase mb-2">MANAGEMENT TERMINAL</p>
            <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase text-[#1e293b]">Observations</h1>
            <p className="text-sm text-[#64748b] leading-relaxed pr-8">
              Raw system feed of all recorded behavioral and milestone observations across the network.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <button className="bg-white border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#1e293b] text-[10px] font-bold tracking-wider uppercase px-6 py-3 rounded-lg shadow-sm transition-colors">
              EXPORT DATA
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between h-40 border-l-4 border-l-[#06b6d4]">
            <h3 className="text-[9px] font-bold text-[#64748b] tracking-widest uppercase">TOTAL OBSERVATIONS</h3>
            <div className="text-5xl font-light tracking-tight text-[#1e293b]">12,456</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between h-40">
            <h3 className="text-[9px] font-bold text-[#64748b] tracking-widest uppercase">PENDING REVIEW</h3>
            <div className="text-5xl font-light tracking-tight text-[#1e293b]">23</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between h-40">
            <h3 className="text-[9px] font-bold text-[#64748b] tracking-widest uppercase">AI FLAGGED</h3>
            <div className="text-5xl font-light tracking-tight text-red-600">5</div>
          </div>
        </div>

        {/* Registry Records Block */}
        <div className="bg-white mb-8 border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {/* Registry Header */}
          <div className="bg-[#f8fafc] px-8 py-5 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-8">
              <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#1e293b]">OBSERVATION LOGS</h2>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex gap-6 text-[10px] font-semibold">
                <button className="text-[#06b6d4] border-b-2 border-[#06b6d4] pb-0.5">All Entries</button>
                <button className="text-[#64748b] hover:text-[#1e293b] transition-colors">Pending</button>
                <button className="text-[#64748b] hover:text-[#1e293b] transition-colors">Flagged</button>
              </div>
            </div>
            <div className="flex gap-4 text-[#64748b]">
              <ListFilter size={16} className="cursor-pointer hover:text-[#1e293b]" />
            </div>
          </div>

          {/* Table Headers */}
          <div className="px-8 py-4 flex items-center border-b border-gray-100 bg-white">
            <div className="w-[15%] text-[9px] font-bold text-[#64748b] tracking-widest uppercase">TIMESTAMP</div>
            <div className="w-[20%] text-[9px] font-bold text-[#64748b] tracking-widest uppercase">TARGET</div>
            <div className="w-[45%] text-[9px] font-bold text-[#64748b] tracking-widest uppercase">EVENT DETAILS</div>
            <div className="w-[20%] text-right text-[9px] font-bold text-[#64748b] tracking-widest uppercase">STATUS</div>
          </div>

          {/* Table Rows (Mock Data) */}
          {/* Table Rows (Mock Data) */}
          <div className="flex flex-col min-h-[300px]">
            
            <div className="px-8 py-5 flex items-center border-b border-gray-100 last:border-0 hover:bg-[#f1f5f9] transition-colors">
              <div className="w-[15%] text-[11px] text-[#475569] font-medium">2 hours ago</div>
              <div className="w-[20%] text-[13px] font-bold text-[#1e293b]">Emma Johnson</div>
              <div className="w-[45%] text-[13px] text-[#475569]">Playing with blocks: Built tower independently</div>
              <div className="w-[20%] flex justify-end">
                <span className="bg-[#f1f5f9] border border-gray-100 rounded-lg text-[#1e293b] text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PROCESSED</span>
              </div>
            </div>

            <div className="px-8 py-5 flex items-center border-b border-gray-100 last:border-0 hover:bg-[#f1f5f9] transition-colors">
              <div className="w-[15%] text-[11px] text-[#475569] font-medium">3 hours ago</div>
              <div className="w-[20%] text-[13px] font-bold text-[#1e293b]">Liam Smith</div>
              <div className="w-[45%] text-[13px] text-[#475569]">Speaking in sentences: Expressed needs</div>
              <div className="w-[20%] flex justify-end">
                <span className="bg-[#f1f5f9] border border-gray-100 rounded-lg text-[#1e293b] text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PROCESSED</span>
              </div>
            </div>

            <div className="px-8 py-5 flex items-center border-b border-gray-100 last:border-0 hover:bg-[#f1f5f9] transition-colors">
              <div className="w-[15%] text-[11px] text-[#475569] font-medium">5 hours ago</div>
              <div className="w-[20%] text-[13px] font-bold text-[#1e293b]">Olivia Martinez</div>
              <div className="w-[45%] text-[13px] text-[#475569]">Sharing toys: Demonstrated empathy</div>
              <div className="w-[20%] flex justify-end gap-2">
                <span className="bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PENDING</span>
                <span className="bg-red-50 text-red-600 rounded-lg border border-red-200 text-[9px] font-bold px-2 py-1 tracking-widest uppercase">FLAGGED</span>
              </div>
            </div>

            <div className="px-8 py-5 flex items-center border-b border-gray-100 last:border-0 hover:bg-[#f1f5f9] transition-colors">
              <div className="w-[15%] text-[11px] text-[#475569] font-medium">1 day ago</div>
              <div className="w-[20%] text-[13px] font-bold text-[#1e293b]">Noah Brown</div>
              <div className="w-[45%] text-[13px] text-[#475569]">Drawing shapes: Accurate circles and squares</div>
              <div className="w-[20%] flex justify-end">
                <span className="bg-[#f1f5f9] border border-gray-100 rounded-lg text-[#1e293b] text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PROCESSED</span>
              </div>
            </div>

          </div>

          {/* Pagination */}
          <div className="px-8 py-5 flex justify-between items-center border-t border-gray-100">
            <span className="text-[10px] font-medium text-[#64748b]">
              Showing 4 of 12,456 entries
            </span>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f1f5f9] text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border bg-[#06b6d4] text-white border-[#06b6d4] text-[10px] font-bold">1</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border bg-white text-[#1e293b] border-[#e2e8f0] hover:bg-[#f1f5f9] text-[10px] font-bold">2</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f1f5f9] text-[10px] font-bold transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ParentObservations;

