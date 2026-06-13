import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, UserPlus, Check, MessageSquare, Loader2, Info } from 'lucide-react';

const DaycareNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setNotifications([
          { id: 1, type: 'alert', title: 'Behavioral Flag Raised', message: 'A new behavioral flag was raised for Lucas Montgomery.', time: '10:42 AM', date: 'Today', read: false },
          { id: 2, type: 'message', title: 'New Parent Message', message: 'Elena Rodriguez sent a new message regarding pickup.', time: '08:15 AM', date: 'Today', read: false },
          { id: 3, type: 'user', title: 'Child Registration', message: 'Julianna Abrams was successfully registered.', time: '03:22 PM', date: 'Yesterday', read: true },
          { id: 4, type: 'info', title: 'Daily Report Generated', message: 'All daily reports for Pre-K class have been generated.', time: '11:05 AM', date: 'Yesterday', read: true },
          { id: 5, type: 'alert', title: 'Missing Documentation', message: 'Medical forms missing for Oliver Smith.', time: '09:30 AM', date: 'Oct 24', read: true },
          { id: 6, type: 'info', title: 'System Maintenance', message: 'Scheduled maintenance completed.', time: '02:00 AM', date: 'Oct 24', read: true },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#64748b]">
          <Loader2 className="animate-spin text-[#00a99d]" size={32} />
          <p className="text-[14px] font-medium">Loading notifications...</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(notifications.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = notifications.slice(startIndex, startIndex + itemsPerPage);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={20} className="text-[#ef4444]" />;
      case 'message': return <MessageSquare size={20} className="text-[#3b82f6]" />;
      case 'user': return <UserPlus size={20} className="text-[#10b981]" />;
      case 'info': return <Info size={20} className="text-[#8b5cf6]" />;
      default: return <Bell size={20} className="text-[#64748b]" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'alert': return 'bg-red-50 border-red-100';
      case 'message': return 'bg-blue-50 border-blue-100';
      case 'user': return 'bg-emerald-50 border-emerald-100';
      case 'info': return 'bg-purple-50 border-purple-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#f8fafc] font-sans">
      <div className="mx-auto max-w-5xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e293b] flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-[#00a99d] text-white text-[12px] font-bold px-2.5 py-1 rounded-full align-middle">
                  {unreadCount} New
                </span>
              )}
            </h1>
            <p className="text-[#64748b] mt-2 text-[14px]">Manage your alerts and system messages.</p>
          </div>
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-white border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#1e293b] text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          <div className="flex flex-col min-h-[450px]">
            {currentItems.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-5 flex items-start gap-4 border-b border-[#e2e8f0] transition-colors group relative ${
                  notification.read 
                    ? 'hover:bg-[#f8fafc]' 
                    : 'bg-[#f0fdfa] hover:bg-[#ccfbf1]'
                }`}
              >
                {!notification.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00a99d]"></div>
                )}
                <div className={`mt-0.5 p-2.5 rounded-xl border ${getIconBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-[14px] ${notification.read ? 'text-[#334155] font-semibold' : 'text-[#0f172a] font-bold'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-[12px] text-[#94a3b8] font-medium">
                      {notification.date} &bull; {notification.time}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${notification.read ? 'text-[#64748b]' : 'text-[#334155] font-medium'}`}>
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[#94a3b8] hover:text-[#0f172a] hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-[#e2e8f0]"
                    title="Mark as read"
                  >
                    <Check size={18} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-[#f8fafc] px-6 py-4 flex justify-between items-center border-t border-[#e2e8f0]">
            <span className="text-[12px] font-medium text-[#64748b]">
              Showing {notifications.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, notifications.length)} of {notifications.length} events
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center bg-white text-[#64748b] hover:bg-[#f1f5f9] transition-colors text-[13px] font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-[#e2e8f0] rounded-lg"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center transition-colors text-[13px] font-bold rounded-lg border ${
                    currentPage === page 
                      ? 'bg-[#00a99d] text-white border-[#00a99d] shadow-sm' 
                      : 'bg-white text-[#64748b] hover:bg-[#f1f5f9] border-[#e2e8f0]'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center bg-white text-[#64748b] hover:bg-[#f1f5f9] transition-colors text-[13px] font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-[#e2e8f0] rounded-lg"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DaycareNotifications;
