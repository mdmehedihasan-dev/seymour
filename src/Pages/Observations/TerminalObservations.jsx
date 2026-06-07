import React, { useState, useEffect } from 'react';
import { Loader2, Eye, Shield, ListFilter, AlertTriangle } from 'lucide-react';

const TerminalObservations = () => {
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
    <div className="min-h-screen p-8 bg-[#fdfdfd] font-sans text-[#111]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="w-1/2">
            <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">MANAGEMENT TERMINAL</p>
            <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">Observations</h1>
            <p className="text-sm text-gray-600 leading-relaxed pr-8">
              Raw system feed of all recorded behavioral and milestone observations across the network.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <button className="bg-[#e8e8e8] hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors">
              EXPORT DATA
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#f4f4f4] p-8 flex flex-col justify-between h-40 border-l-4 border-black">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">TOTAL OBSERVATIONS</h3>
            <div className="text-5xl font-light tracking-tight">12,456</div>
          </div>
          <div className="bg-[#f4f4f4] p-8 flex flex-col justify-between h-40">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">PENDING REVIEW</h3>
            <div className="text-5xl font-light tracking-tight">23</div>
          </div>
          <div className="bg-[#f4f4f4] p-8 flex flex-col justify-between h-40">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">AI FLAGGED</h3>
            <div className="text-5xl font-light tracking-tight text-red-600">5</div>
          </div>
        </div>

        {/* Registry Records Block */}
        <div className="bg-white mb-8 border border-[#e8e8e8] shadow-sm">
          {/* Registry Header */}
          <div className="bg-[#f4f4f4] px-8 py-5 flex justify-between items-center border-b border-[#e8e8e8]">
            <div className="flex items-center gap-8">
              <h2 className="text-[11px] font-bold tracking-widest uppercase">OBSERVATION LOGS</h2>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex gap-6 text-[10px] font-semibold">
                <button className="text-black border-b border-black pb-0.5">All Entries</button>
                <button className="text-gray-500 hover:text-black transition-colors">Pending</button>
                <button className="text-gray-500 hover:text-black transition-colors">Flagged</button>
              </div>
            </div>
            <div className="flex gap-4 text-gray-500">
              <ListFilter size={16} className="cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* Table Headers */}
          <div className="px-8 py-4 flex items-center border-b border-[#e8e8e8] bg-[#fbfbfb]">
            <div className="w-[15%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">TIMESTAMP</div>
            <div className="w-[20%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">TARGET</div>
            <div className="w-[45%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">EVENT DETAILS</div>
            <div className="w-[20%] text-right text-[9px] font-bold text-gray-500 tracking-widest uppercase">STATUS</div>
          </div>

          {/* Table Rows (Mock Data) */}
          <div className="flex flex-col min-h-[300px]">
            
            <div className="px-8 py-5 flex items-center border-b border-[#e8e8e8] last:border-0 hover:bg-[#fafafa] transition-colors">
              <div className="w-[15%] text-[11px] text-gray-600 font-medium">2 hours ago</div>
              <div className="w-[20%] text-[13px] font-bold text-black">Emma Johnson</div>
              <div className="w-[45%] text-[13px] text-gray-600">Playing with blocks: Built tower independently</div>
              <div className="w-[20%] flex justify-end">
                <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PROCESSED</span>
              </div>
            </div>

            <div className="px-8 py-5 flex items-center border-b border-[#e8e8e8] last:border-0 hover:bg-[#fafafa] transition-colors">
              <div className="w-[15%] text-[11px] text-gray-600 font-medium">3 hours ago</div>
              <div className="w-[20%] text-[13px] font-bold text-black">Liam Smith</div>
              <div className="w-[45%] text-[13px] text-gray-600">Speaking in sentences: Expressed needs</div>
              <div className="w-[20%] flex justify-end">
                <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PROCESSED</span>
              </div>
            </div>

            <div className="px-8 py-5 flex items-center border-b border-[#e8e8e8] last:border-0 hover:bg-[#fafafa] transition-colors">
              <div className="w-[15%] text-[11px] text-gray-600 font-medium">5 hours ago</div>
              <div className="w-[20%] text-[13px] font-bold text-black">Olivia Martinez</div>
              <div className="w-[45%] text-[13px] text-gray-600">Sharing toys: Demonstrated empathy</div>
              <div className="w-[20%] flex justify-end gap-2">
                <span className="bg-[#f4f4f4] border border-gray-300 text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PENDING</span>
                <span className="bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">FLAGGED</span>
              </div>
            </div>

            <div className="px-8 py-5 flex items-center border-b border-[#e8e8e8] last:border-0 hover:bg-[#fafafa] transition-colors">
              <div className="w-[15%] text-[11px] text-gray-600 font-medium">1 day ago</div>
              <div className="w-[20%] text-[13px] font-bold text-black">Noah Brown</div>
              <div className="w-[45%] text-[13px] text-gray-600">Drawing shapes: Accurate circles and squares</div>
              <div className="w-[20%] flex justify-end">
                <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">PROCESSED</span>
              </div>
            </div>

          </div>

          {/* Pagination */}
          <div className="px-8 py-5 flex justify-between items-center border-t border-[#e8e8e8]">
            <span className="text-[10px] font-medium text-gray-500">
              Showing 4 of 12,456 entries
            </span>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center border bg-black text-white border-black text-[10px] font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center border bg-white text-gray-500 border-gray-200 hover:bg-gray-50 text-[10px] font-bold">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 text-[10px] font-bold transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TerminalObservations;
