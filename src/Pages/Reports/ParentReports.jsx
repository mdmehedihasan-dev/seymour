import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, X, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';

const ParentReports = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filterStatus, setFilterStatus] = useState('All');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [newReportData, setNewReportData] = useState({ name: '', domains: 'BEHAVIORAL' });

  const handleFilterToggle = () => {
    setFilterStatus(prev => {
      if (prev === 'All') return 'Active';
      if (prev === 'Active') return 'Inactive';
      return 'All';
    });
    setCurrentPage(1);
  };

  const handleGenerateReportSubmit = (e) => {
    e.preventDefault();
    if (!newReportData.name) return;
    
    const newReport = {
      id: data.reports.length > 0 ? Math.max(...data.reports.map(r => r.id)) + 1 : 1,
      name: newReportData.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      domains: [newReportData.domains],
      status: 'active'
    };
    
    setData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalGenerated: (parseInt(prev.stats.totalGenerated.replace(/,/g, '')) + 1).toLocaleString()
      },
      reports: [newReport, ...prev.reports]
    }));
    
    setNewReportData({ name: '', domains: 'BEHAVIORAL' });
    setIsGenerateModalOpen(false);
  };

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setData({
          stats: {
            totalGenerated: '1,284',
            activeNodes: '42',
            anomaliesDetected: '03'
          },
          reports: [
            { id: 1, name: 'Benjamin Harrison', date: 'Oct 24, 2023', domains: ['BEHAVIORAL', 'COGNITIVE'], status: 'active' },
            { id: 2, name: 'Sophia Chen', date: 'Oct 23, 2023', domains: ['SOCIAL-EMOTIONAL'], status: 'inactive' },
            { id: 3, name: 'Lucas Montgomery', date: 'Oct 22, 2023', domains: ['LINGUISTIC', 'MOTOR SKILLS', '+2'], status: 'active' },
            { id: 4, name: 'Elena Rodriguez', date: 'Oct 22, 2023', domains: ['COGNITIVE'], status: 'inactive' },
            { id: 5, name: 'Oliver Smith', date: 'Oct 21, 2023', domains: ['BEHAVIORAL', 'PHYSICAL'], status: 'active' },
            // Extra dummy items for pagination
            { id: 6, name: 'Ava Johnson', date: 'Oct 20, 2023', domains: ['COGNITIVE', 'LINGUISTIC'], status: 'active' },
            { id: 7, name: 'William Davis', date: 'Oct 19, 2023', domains: ['MOTOR SKILLS'], status: 'inactive' },
            { id: 8, name: 'Mia Wilson', date: 'Oct 18, 2023', domains: ['BEHAVIORAL', 'SOCIAL-EMOTIONAL'], status: 'active' }
          ],
          systemStatus: 'OPTIMAL',
          lastSync: '12:04:33 UTC'
        });
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    if (!data) return [];
    return data.reports.filter(r => {
      if (filterStatus === 'All') return true;
      return r.status.toLowerCase() === filterStatus.toLowerCase();
    });
  }, [data, filterStatus]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Reports...</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

  const handleDownload = (report) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text(`Child Report: ${report.name}`, 14, 22);
    
    // Details
    doc.setFontSize(12);
    doc.text(`Date: ${report.date}`, 14, 32);
    doc.text(`Status: ${report.status.toUpperCase()}`, 14, 40);
    doc.text(`Domains Included: ${report.domains.join(', ')}`, 14, 48);
    
    // Divider
    doc.setLineWidth(0.5);
    doc.line(14, 54, 196, 54);
    
    // Summary
    doc.setFontSize(14);
    doc.text("Summary of Findings", 14, 64);
    doc.setFontSize(12);
    
    const summaryText = `This is an automatically generated mock report for ${report.name}. Monitoring indicated normal progress across most domains with some specific observations recorded in the latest sessions.`;
    
    const splitText = doc.splitTextToSize(summaryText, 180);
    doc.text(splitText, 14, 74);
    
    // Footer metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated by: Seymour Parent Terminal`, 14, 270);
    doc.text(`System Status: ${data.systemStatus}`, 14, 276);
    doc.text(`Timestamp: ${new Date().toISOString()}`, 14, 282);
    
    // Save the PDF
    const safeName = report.name.replace(/\s+/g, '_').toLowerCase();
    doc.save(`report_${safeName}_${report.date.replace(/[\s,]+/g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen p-8 bg-[#fdfdfd] font-sans text-[#111]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">OPERATIONAL INTELLIGENCE</p>
            <h1 className="text-6xl font-black tracking-tighter uppercase">Reports</h1>
          </div>
          <div className="flex gap-3 mb-2">
            <button onClick={handleFilterToggle} disabled={!data} className="bg-[#e8e8e8] hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors disabled:opacity-50">
              FILTER VIEW: {filterStatus}
            </button>
            <button onClick={() => setIsGenerateModalOpen(true)} disabled={!data} className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-6 py-3 transition-colors disabled:opacity-50">
              GENERATE NEW REPORT
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-[#f4f4f4] p-10 flex flex-col justify-between h-48">
            <h3 className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">TOTAL GENERATED</h3>
            <div className="text-6xl font-light tracking-tight">{data.stats.totalGenerated}</div>
          </div>
          <div className="bg-[#f4f4f4] p-10 flex flex-col justify-between h-48">
            <h3 className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">ACTIVE MONITORING NODES</h3>
            <div className="text-6xl font-light tracking-tight">{data.stats.activeNodes}</div>
          </div>
          <div className="bg-black p-10 flex flex-col justify-between h-48 text-white">
            <h3 className="text-[9px] font-bold text-[#555] tracking-[0.15em] uppercase">ANOMALIES DETECTED</h3>
            <div className="text-6xl font-light tracking-tight">{data.stats.anomaliesDetected}</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full">
          {/* Table Headers */}
          <div className="bg-[#e8e8e8] px-8 py-5 flex items-center">
            <div className="w-[30%] text-[10px] font-bold text-gray-500 tracking-[0.1em] uppercase">CHILD NAME</div>
            <div className="w-[20%] text-[10px] font-bold text-gray-500 tracking-[0.1em] uppercase">DATE</div>
            <div className="w-[40%] text-[10px] font-bold text-gray-500 tracking-[0.1em] uppercase">DOMAINS INCLUDED</div>
            <div className="w-[10%] text-right text-[10px] font-bold text-gray-500 tracking-[0.1em] uppercase">ACTIONS</div>
          </div>
          
          {/* Table Rows */}
          <div className="flex flex-col min-h-[400px]">
            {currentReports.map((report) => (
              <div key={report.id} className="bg-white px-8 py-7 flex items-center border-b border-[#f4f4f4] hover:bg-[#fafafa] transition-colors">
                <div className="w-[30%] flex items-center gap-4">
                  <div className={`w-1.5 h-1.5 ${report.status === 'active' ? 'bg-black' : 'bg-gray-400'}`}></div>
                  <span className="text-[13px] font-bold">{report.name}</span>
                </div>
                <div className="w-[20%] text-[13px] text-gray-500">
                  {report.date}
                </div>
                <div className="w-[40%] flex gap-2">
                  {report.domains.map((domain, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1.5 tracking-widest uppercase"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
                <div className="w-[10%] flex justify-end">
                  <button onClick={() => handleDownload(report)} className="text-[10px] font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors tracking-widest uppercase">
                    DOWNLOAD
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="mt-8 flex justify-between items-center py-4">
            <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase">
              <span className="text-gray-400">
                SYSTEM STATUS: <span className="text-gray-700">{data.systemStatus}</span>
              </span>
              <span className="text-gray-400">
                LAST SYNC: <span className="text-gray-700">{data.lastSync}</span>
              </span>
            </div>
            
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-[#e8e8e8]"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center transition-colors text-[10px] font-bold border border-[#e8e8e8] ${
                    currentPage === page 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-[#e8e8e8]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Generate Report Modal */}
        {isGenerateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <h2 className="text-[11px] font-bold tracking-widest uppercase">Generate Report</h2>
                <button onClick={() => setIsGenerateModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleGenerateReportSubmit}>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">Subject Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newReportData.name}
                      onChange={(e) => setNewReportData({...newReportData, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8fafc] border-none text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
                      placeholder="e.g. Liam Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">Primary Domain</label>
                    <div className="relative">
                      <select 
                        value={newReportData.domains}
                        onChange={(e) => setNewReportData({...newReportData, domains: e.target.value})}
                        className="w-full px-4 py-2.5 bg-[#f8fafc] border-none text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow cursor-pointer"
                      >
                        <option value="BEHAVIORAL">Behavioral</option>
                        <option value="COGNITIVE">Cognitive</option>
                        <option value="SOCIAL-EMOTIONAL">Social-Emotional</option>
                        <option value="LINGUISTIC">Linguistic</option>
                        <option value="MOTOR SKILLS">Motor Skills</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>
                <div className="bg-[#f4f4f4] p-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsGenerateModalOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                    CANCEL
                  </button>
                  <button type="submit" className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                    GENERATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ParentReports;

