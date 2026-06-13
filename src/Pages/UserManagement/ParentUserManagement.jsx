import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Loader2, X } from 'lucide-react';

const ParentUserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  // Search, Filter, and Pagination State (Terminal)
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // View Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  const handleViewClick = (user) => {
    setViewingUser(user);
    setIsViewModalOpen(true);
  };

  const handleToggleStatus = (userId) => {
    setData(prevData => ({
      ...prevData,
      users: prevData.users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : user
      )
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setData({
          totalUsers: 1284,
          growthPct: '+12%',
          users: [
            { id: 1, initials: 'JA', name: 'Julianna Abrams', email: 'j.abrams@example.com', role: 'PARENT', status: 'ACTIVE' },
            { id: 2, initials: 'MT', name: 'Marcus Thorne', email: 'm.thorne@careset.io', role: 'PROVIDER', status: 'SUSPENDED' },
            { id: 3, initials: 'SL', name: 'Sarah Lin', email: 'lin.sarah@gmail.com', role: 'SITTER', status: 'ACTIVE' },
            { id: 4, initials: 'WK', name: 'William Kessler', email: 'w.kessler@family.org', role: 'FAMILY', status: 'ACTIVE' }
          ],
          rolesDistribution: [
            { label: 'Parents', percentage: 40 },
            { label: 'Sitters', percentage: 30 },
            { label: 'Providers', percentage: 25 }
          ],
          auditLogs: [
            { time: '12:44 PM', text: <>User <span className="font-bold">j.abrams</span> updated profile security settings</> },
            { time: '11:02 AM', text: <>New registration: <span className="font-bold">linda.v@care.com</span> (Provider)</> }
          ],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Filter and Search Logic
  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.users.filter(user => {
      const matchesRole = selectedRole === 'All Roles' || user.role.toLowerCase() === selectedRole.toLowerCase();
      const searchLower = globalSearch.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) ||
        user.initials.toLowerCase().includes(searchLower);
      return matchesRole && matchesSearch;
    });
  }, [data, globalSearch, selectedRole]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Directory...</p>
        </div>
      </div>
    );
  }

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-8 bg-white font-sans text-[#111]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">User Management</h1>
            <p className="text-xs text-gray-500">
              Directory of all ecosystem participants and access levels.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-200 hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
              EXPORT CSV
            </button>
            <button className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
              CREATE NEW USER
            </button>
          </div>
        </div>

        <div className="bg-[#f4f4f4] p-6 flex justify-between items-start mb-6">
          <div className="flex gap-8 w-2/3">
            <div className="flex-1">
              <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                SEARCH DIRECTORY
              </label>
              <input
                type="text"
                placeholder="Name, email, or unique ID..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border-none text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow"
              />
            </div>
            <div className="w-48">
              <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                ROLE
              </label>
              <div className="relative">
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-none text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow cursor-pointer"
                >
                  <option value="All Roles">All Roles</option>
                  <option value="PARENT">Parent</option>
                  <option value="PROVIDER">Provider</option>
                  <option value="SITTER">Sitter</option>
                  <option value="FAMILY">Family</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-end justify-end gap-6 mb-2">
              <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">TOTAL USERS</span>
              <span className="text-3xl font-bold tracking-tight">{data.totalUsers.toLocaleString()}</span>
            </div>
            <div className="h-1 w-full bg-black mb-1"></div>
            <p className="text-[9px] text-gray-500">{data.growthPct} growth this month</p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e8e8e8] px-6 py-4 flex items-center">
            <div className="w-1/4 text-[9px] font-bold text-gray-500 tracking-widest uppercase">NAME</div>
            <div className="w-1/4 text-[9px] font-bold text-gray-500 tracking-widest uppercase">EMAIL</div>
            <div className="w-[15%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">ROLE</div>
            <div className="w-1/4 text-[9px] font-bold text-gray-500 tracking-widest uppercase">STATUS</div>
            <div className="w-[10%] text-right text-[9px] font-bold text-gray-500 tracking-widest uppercase">ACTIONS</div>
          </div>
          
          <div className="flex flex-col min-h-[280px]">
            {currentUsers.length > 0 ? (
              currentUsers.map((user, i) => (
                <div key={user.id} className={`px-6 py-5 flex items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#fbfbfb]'} hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0`}>
                  <div className="w-1/4 flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#e8e8e8] flex items-center justify-center text-[11px] font-bold tracking-wider">
                      {user.initials}
                    </div>
                    <span className="text-[13px] font-bold">{user.name}</span>
                  </div>
                  <div className="w-1/4 text-[13px] text-gray-600 truncate pr-4">
                    {user.email}
                  </div>
                  <div className="w-[15%]">
                    <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                      {user.role}
                    </span>
                  </div>
                  <div className="w-1/4 flex items-center gap-2">
                    {user.status === 'ACTIVE' ? (
                      <>
                        <div className="w-1.5 h-1.5 bg-black"></div>
                        <span className="text-[10px] font-bold tracking-widest uppercase">ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 border border-gray-400"></div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">SUSPENDED</span>
                      </>
                    )}
                  </div>
                  <div className="w-[10%] flex justify-end gap-3 text-[9px] font-bold tracking-widest uppercase">
                    <button onClick={() => handleViewClick(user)} className="text-gray-400 hover:text-black hover:underline transition-all">VIEW</button>
                    <button 
                      onClick={() => handleToggleStatus(user.id)}
                      className={`${user.status === 'ACTIVE' ? 'text-red-400 hover:text-red-600' : 'text-green-500 hover:text-green-700'} transition-colors`}
                    >
                      {user.status === 'ACTIVE' ? 'DISABLE' : 'ENABLE'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-1 items-center justify-center bg-white text-sm text-gray-400 font-medium">
                No users found matching your criteria.
              </div>
            )}
          </div>

          <div className="bg-[#f4f4f4] px-6 py-4 flex justify-between items-center mt-2">
            <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">
              SHOWING {totalItems > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} OF {totalItems} USERS
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center transition-colors text-[10px] font-bold ${
                    currentPage === page 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* View Modal */}
        {isViewModalOpen && viewingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <h2 className="text-[11px] font-bold tracking-widest uppercase">User Details</h2>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e8e8e8] flex items-center justify-center text-[14px] font-bold tracking-wider">
                    {viewingUser.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{viewingUser.name}</h3>
                    <p className="text-[12px] text-gray-500">{viewingUser.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">Unique ID</label>
                    <p className="text-[13px] font-medium">#{viewingUser.id}</p>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">Role</label>
                    <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase inline-block mt-1">
                      {viewingUser.role}
                    </span>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      {viewingUser.status === 'ACTIVE' ? (
                        <>
                          <div className="w-1.5 h-1.5 bg-black"></div>
                          <span className="text-[10px] font-bold tracking-widest uppercase">ACTIVE</span>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 border border-gray-400"></div>
                          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">SUSPENDED</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">Last Login</label>
                    <p className="text-[13px] font-medium">Today, 09:41 AM</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f4f4f4] p-4 flex justify-end">
                <button onClick={() => setIsViewModalOpen(false)} className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentUserManagement;

