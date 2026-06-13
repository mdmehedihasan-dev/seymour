import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, CheckCircle2, X, AlertTriangle } from 'lucide-react';

const ParentAIMonitoring = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  // Filters and Pagination State
  const [severityFilter, setSeverityFilter] = useState('All'); // All, High, Medium, Low
  const [statusFilter, setStatusFilter] = useState('Unresolved'); // All, Unresolved, Resolved
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(null);

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedArchiveFlag, setSelectedArchiveFlag] = useState(null);

  const handleReviewClick = (flag) => {
    setSelectedFlag(flag);
    setIsModalOpen(true);
  };

  const handleArchiveClick = (flag) => {
    setSelectedArchiveFlag(flag);
    setIsArchiveModalOpen(true);
  };

  const handleExportLog = () => {
    if (!data) return;
    const headers = ["ID", "Child Name", "Domain", "Severity", "Status", "Description"];
    const csvContent = [
      headers.join(","),
      ...data.flags.map(f => `"${f.id}","${f.childName}","${f.domain}","${f.severity}","${f.status}","${f.description.replace(/"/g, '""')}"`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ai_monitoring_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setData({
          stats: {
            totalFlags: '1,284',
            highSeverity: '12',
            unresolved: '48'
          },
          flags: [
            {
              id: 1,
              childName: 'Liam Peterson',
              domain: 'LANGUAGE',
              severity: 'HIGH',
              description: 'Persistent regression in expressive vocabulary over 3 consecutive sessions. Phonemic awareness declining.',
              status: 'UNRESOLVED'
            },
            {
              id: 2,
              childName: 'Sophia Chen',
              domain: 'MOTOR SKILLS',
              severity: 'MEDIUM',
              description: 'Avoidance of pincer-grip activities noted in creative module. Possible fine motor delay.',
              status: 'UNRESOLVED'
            },
            {
              id: 3,
              childName: 'Marcus Thorne',
              domain: 'COGNITIVE',
              severity: 'LOW',
              description: 'Minor delay in pattern recognition during logic assessment. Improved in follow-up.',
              status: 'RESOLVED'
            },
            {
              id: 4,
              childName: 'Elena Rodriguez',
              domain: 'SOCIAL/EMOTIONAL',
              severity: 'HIGH',
              description: 'Sudden withdrawal from peer interaction. Flags for acute social anxiety indicators.',
              status: 'UNRESOLVED'
            },
            {
              id: 5,
              childName: 'Oliver Smith',
              domain: 'LANGUAGE',
              severity: 'LOW',
              description: 'Slight delay in response time during reading comprehension. Noted for observation.',
              status: 'RESOLVED'
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching AI monitoring data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter Logic
  const filteredFlags = useMemo(() => {
    if (!data) return [];
    
    return data.flags.filter(flag => {
      const matchesSeverity = severityFilter === 'All' || flag.severity.toLowerCase() === severityFilter.toLowerCase();
      const matchesStatus = statusFilter === 'All' || flag.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSeverity && matchesStatus;
    });
  }, [data, severityFilter, statusFilter]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [severityFilter, statusFilter]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Initializing Neural Net...</p>
        </div>
      </div>
    );
  }

  // Pagination calculation
  const totalItems = filteredFlags.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFlags = filteredFlags.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-8 bg-[#fdfdfd] font-sans text-[#111]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Top Header Split */}
        <div className="flex gap-6 mb-8 h-[220px]">
          {/* Left Stats Panel */}
          <div className="flex-1 bg-[#f4f4f4] p-10 flex flex-col justify-between">
            <div>
              <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-3">REAL-TIME ANALYSIS</p>
              <h1 className="text-5xl font-light tracking-tight">AI Monitoring</h1>
            </div>
            
            <div className="flex gap-16 mt-auto">
              <div>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">TOTAL FLAGS</p>
                <div className="text-3xl font-bold tracking-tight">{data.stats.totalFlags}</div>
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">HIGH SEVERITY</p>
                <div className="text-3xl font-bold tracking-tight">{data.stats.highSeverity}</div>
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">UNRESOLVED</p>
                <div className="text-3xl font-bold tracking-tight">{data.stats.unresolved}</div>
              </div>
            </div>
          </div>

          {/* Right Status Panel */}
          <div className="w-[400px] bg-black p-10 flex flex-col relative overflow-hidden">
            <h2 className="text-white text-xl font-medium tracking-tight mb-4 relative z-10">System Status</h2>
            <p className="text-gray-400 text-sm leading-relaxed pr-8 relative z-10">
              Neural processing active. Precision tracking at 98.4%.
            </p>
            {/* Dark abstract gradient effect at bottom */}
            <div className="absolute bottom-4 left-4 right-4 h-24 bg-gradient-to-t from-[#111] via-[#222] to-transparent opacity-80 pointer-events-none rounded border border-[#333]"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-[#f4f4f4] px-8 py-6 flex justify-between items-end mb-8">
          <div className="flex gap-16">
            {/* Severity Filter */}
            <div>
              <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-3">SEVERITY LEVEL</p>
              <div className="flex bg-[#e8e8e8] p-1 gap-1 text-[10px] font-bold">
                {['All', 'High', 'Medium', 'Low'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setSeverityFilter(level)}
                    className={`px-6 py-2 transition-colors ${severityFilter === level ? 'bg-black text-white' : 'hover:bg-gray-200 text-gray-600'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-3">STATUS</p>
              <div className="flex bg-[#e8e8e8] p-1 gap-1 text-[10px] font-bold">
                {['All', 'Unresolved', 'Resolved'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-6 py-2 transition-colors ${statusFilter === status ? 'bg-black text-white' : 'hover:bg-gray-200 text-gray-600'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleExportLog} disabled={!data} className="bg-[#e8e8e8] hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors h-[40px] flex items-center justify-center disabled:opacity-50">
            EXPORT LOG
          </button>
        </div>

        {/* Table Section */}
        <div className="w-full mb-8">
          {/* Table Headers */}
          <div className="bg-[#e8e8e8] px-8 py-4 flex items-center mb-4">
            <div className="w-[20%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">CHILD NAME</div>
            <div className="w-[15%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">DOMAIN</div>
            <div className="w-[10%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">SEVERITY</div>
            <div className="w-[35%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">DESCRIPTION</div>
            <div className="w-[12%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">STATUS</div>
            <div className="w-[8%] text-right text-[9px] font-bold text-gray-500 tracking-widest uppercase">ACTION</div>
          </div>
          
          {/* Table Rows */}
          <div className="flex flex-col gap-4 min-h-[400px]">
            {currentFlags.length > 0 ? (
              currentFlags.map((flag) => (
                <div key={flag.id} className="bg-[#fbfbfb] px-8 py-6 flex flex-row items-center hover:bg-[#f4f4f4] transition-colors border border-transparent hover:border-gray-200">
                  <div className="w-[20%] flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#e8e8e8]"></div>
                    <span className="text-[12px] font-bold leading-tight w-24">{flag.childName}</span>
                  </div>
                  <div className="w-[15%]">
                    <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                      {flag.domain}
                    </span>
                  </div>
                  <div className="w-[10%]">
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${
                      flag.severity === 'HIGH' ? 'text-red-600' : 
                      flag.severity === 'MEDIUM' ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {flag.severity}
                    </span>
                  </div>
                  <div className="w-[35%] text-[12px] text-gray-600 leading-relaxed pr-8">
                    {flag.description}
                  </div>
                  <div className="w-[12%] flex items-center gap-2">
                    {flag.status === 'UNRESOLVED' ? (
                      <>
                        <div className="w-1.5 h-1.5 bg-red-600"></div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-black">UNRESOLVED</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={12} className="text-gray-400" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">RESOLVED</span>
                      </>
                    )}
                  </div>
                  <div className="w-[8%] flex justify-end">
                    {flag.status === 'UNRESOLVED' ? (
                      <button onClick={() => handleReviewClick(flag)} className="text-[11px] font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 transition-colors">
                        Review
                      </button>
                    ) : (
                      <button onClick={() => handleArchiveClick(flag)} className="text-[11px] font-bold text-gray-400 border-b border-gray-400 pb-0.5 hover:text-black transition-colors">
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
               <div className="flex flex-1 items-center justify-center bg-[#fbfbfb] text-sm text-gray-400 font-medium py-10">
                No flags matching the current filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center py-4 px-2">
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">
            SHOWING {totalItems > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} OF {totalItems} FLAGS
          </span>
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
            >
              Previous
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 flex items-center justify-center transition-colors ${
                    currentPage === page 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="text-black hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
            >
              Next
            </button>
          </div>
        </div>

        {/* Review Modal */}
        {isModalOpen && selectedFlag && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 border-t-4 border-black">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">Review Flag</h2>
                    <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      ID: #{selectedFlag.id} &bull; {selectedFlag.childName}
                    </p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#f4f4f4] p-4 flex gap-4 items-start">
                    {selectedFlag.severity === 'HIGH' && <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                          {selectedFlag.domain}
                        </span>
                        <span className={`text-[10px] font-bold tracking-widest uppercase ${
                          selectedFlag.severity === 'HIGH' ? 'text-red-600' : 
                          selectedFlag.severity === 'MEDIUM' ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {selectedFlag.severity} SEVERITY
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                        {selectedFlag.description}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-3">ACTION REQUIRED</p>
                    <textarea 
                      placeholder="Enter review notes or resolution details..." 
                      className="w-full h-24 border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <button onClick={() => setIsModalOpen(false)} className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors">
                    CANCEL
                  </button>
                  <div className="flex gap-3">
                    <button className="bg-[#e8e8e8] hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors">
                      ESCALATE
                    </button>
                    <button className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors" onClick={() => setIsModalOpen(false)}>
                      MARK RESOLVED
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Archive Modal */}
        {isArchiveModalOpen && selectedArchiveFlag && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 border-t-4 border-gray-400">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter mb-1">Archive Flag</h2>
                    <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      ID: #{selectedArchiveFlag.id}
                    </p>
                  </div>
                  <button onClick={() => setIsArchiveModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Are you sure you want to archive this resolved flag for <span className="font-bold text-black">{selectedArchiveFlag.childName}</span>? 
                  This will remove it from the active view.
                </p>
                
                <div className="flex justify-end items-center gap-3">
                  <button onClick={() => setIsArchiveModalOpen(false)} className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors px-4 py-2">
                    CANCEL
                  </button>
                  <button className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-6 py-2.5 transition-colors" onClick={() => setIsArchiveModalOpen(false)}>
                    CONFIRM ARCHIVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ParentAIMonitoring;

