import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Loader2, Search, Filter, Mail, Phone, Calendar, Edit, MoreVertical, UserCheck, UserX, X } from 'lucide-react';

const AdminUserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Search, Filter, and Pagination State (Dashboard)
  const [dashSearch, setDashSearch] = useState('');
  const [dashRole, setDashRole] = useState('All Roles');
  const [dashStatus, setDashStatus] = useState('All Status');
  const [dashPage, setDashPage] = useState(1);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setData({
          dashStats: {
            total: "1,247",
            active: "1,089",
            new: "87",
            inactive: "158"
          },
          dashUsers: [
            { id: 1, initials: 'SM', color: 'bg-[#06b6d4]', name: 'Sarah Martinez', email: 'sarah.martinez@email.com', phone: '+1 (555) 123-4567', role: 'Parent', roleColor: 'bg-[#cffafe] text-[#0891b2]', status: 'Active', children: 2, observations: 45, joinDate: 'Jan 15, 2025' },
            { id: 2, initials: 'JD', color: 'bg-[#f97316]', name: 'John Davidson', email: 'john.davidson@email.com', phone: '+1 (555) 234-5678', role: 'Parent', roleColor: 'bg-[#cffafe] text-[#0891b2]', status: 'Active', children: 1, observations: 32, joinDate: 'Feb 3, 2025' },
            { id: 3, initials: 'EC', color: 'bg-[#fca5a5]', name: 'Emily Chen', email: 'emily.chen@email.com', phone: '+1 (555) 345-6789', role: 'Caregiver', roleColor: 'bg-[#fef3c7] text-[#d97706]', status: 'Active', children: 5, observations: 128, joinDate: 'Dec 8, 2024' },
            { id: 4, initials: 'MR', color: 'bg-[#a78bfa]', name: 'Michael Roberts', email: 'michael.roberts@email.com', phone: '+1 (555) 456-7890', role: 'Daycare Provider', roleColor: 'bg-[#ffe4e6] text-[#e11d48]', status: 'Active', children: 15, observations: 342, joinDate: 'Nov 22, 2024' },
            { id: 5, initials: 'JL', color: 'bg-[#fbbf24]', name: 'Jennifer Lee', email: 'jennifer.lee@email.com', phone: '+1 (555) 567-8901', role: 'Parent', roleColor: 'bg-[#cffafe] text-[#0891b2]', status: 'Inactive', children: 1, observations: 12, joinDate: 'Oct 5, 2024' },
            { id: 6, initials: 'DT', color: 'bg-[#15803d]', name: 'David Thompson', email: 'david.thompson@email.com', phone: '+1 (555) 678-9012', role: 'Family Member', roleColor: 'bg-[#d1fae5] text-[#059669]', status: 'Active', children: 2, observations: 18, joinDate: 'Mar 1, 2025' }
          ]
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
  const dashFilteredUsers = useMemo(() => {
    if (!data) return [];
    return data.dashUsers.filter(user => {
      const matchesRole = dashRole === 'All Roles' || user.role === dashRole;
      const matchesStatus = dashStatus === 'All Status' || user.status === dashStatus;
      const searchLower = dashSearch.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [data, dashSearch, dashRole, dashStatus]);

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

  const dashItemsPerPage = 6;
  const dashTotalItems = dashFilteredUsers.length;
  const dashTotalPages = Math.ceil(dashTotalItems / dashItemsPerPage) || 1;
  const dashStartIndex = (dashPage - 1) * dashItemsPerPage;
  const dashEndIndex = dashStartIndex + dashItemsPerPage;
  const currentDashUsers = dashFilteredUsers.slice(dashStartIndex, dashEndIndex);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans text-[#1e293b]">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">

        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-1">User Management</h1>
          <p className="text-[13px] text-[#64748b]">Manage all platform users and their accounts</p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">Total Users</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.total}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#06b6d4]"></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">Active Users</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.active}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#10b981]"></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">New This Month</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.new}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#fbbf24]"></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">Inactive</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.inactive}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#94a3b8]"></div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm flex items-center justify-between gap-4">

          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={dashSearch}
              onChange={(e) => {
                setDashSearch(e.target.value);
                setDashPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-gray-100 rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-200 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={dashRole}
                onChange={(e) => {
                  setDashRole(e.target.value);
                  setDashPage(1);
                }}
                className="pl-4 pr-10 py-2.5 bg-[#f8fafc] border border-gray-100 rounded-full text-[13px] font-medium text-[#475569] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer min-w-[140px]"
              >
                <option value="All Roles">All Roles</option>
                <option value="Parent">Parent</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Daycare Provider">Daycare Provider</option>
                <option value="Family Member">Family Member</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={dashStatus}
                onChange={(e) => {
                  setDashStatus(e.target.value);
                  setDashPage(1);
                }}
                className="pl-4 pr-10 py-2.5 bg-[#f8fafc] border border-gray-100 rounded-full text-[13px] font-medium text-[#475569] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer min-w-[140px]"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
            </div>

            <button className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-6 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-[#f8fafc] text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
            <div className="col-span-3 pl-2">USER</div>
            <div className="col-span-3">CONTACT</div>
            <div className="col-span-2">ROLE</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-1">ACTIVITY</div>
            <div className="col-span-1">JOIN DATE</div>
            <div className="col-span-1 text-right pr-2">ACTIONS</div>
          </div>

          <div className="divide-y divide-gray-100">
            {currentDashUsers.length > 0 ? (
              currentDashUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">

                  {/* User Column */}
                  <div className="col-span-3 flex items-center gap-3 pl-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[13px] ${user.color}`}>
                      {user.initials}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1e293b]">{user.name}</h4>
                      <p className="text-[12px] text-[#94a3b8]">ID: {user.id}</p>
                    </div>
                  </div>

                  {/* Contact Column */}
                  <div className="col-span-3 space-y-1">
                    <div className="flex items-center gap-2 text-[12px] text-[#475569]">
                      <Mail size={12} className="text-[#94a3b8]" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#475569]">
                      <Phone size={12} className="text-[#94a3b8]" />
                      {user.phone}
                    </div>
                  </div>

                  {/* Role Column */}
                  <div className="col-span-2 flex items-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${user.roleColor}`}>
                      {user.role}
                    </span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-1 flex items-center">
                    {user.status === 'Active' ? (
                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#10b981]">
                        <UserCheck size={14} /> Active
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#64748b]">
                        <UserX size={14} /> Inactive
                      </div>
                    )}
                  </div>

                  {/* Activity Column */}
                  <div className="col-span-1">
                    <div className="text-[12px] text-[#1e293b]">{user.children} Children</div>
                    <div className="text-[11px] text-[#94a3b8]">{user.observations} Observations</div>
                  </div>

                  {/* Join Date Column */}
                  <div className="col-span-1 flex items-center gap-2 text-[12px] text-[#475569]">
                    <Calendar size={12} className="text-[#94a3b8]" />
                    {user.joinDate}
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-1 flex items-center justify-end gap-3 pr-2 text-[#94a3b8]">
                    <button onClick={() => handleEditClick(user)} className="hover:text-[#06b6d4] transition-colors"><Edit size={16} /></button>
                    <button className="hover:text-[#1e293b] transition-colors"><MoreVertical size={16} /></button>
                  </div>

                </div>
              ))
            ) : (
              <div className="py-8 text-center text-[13px] font-medium text-[#64748b]">
                No users found matching your search and filter criteria.
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[12px] text-[#64748b]">
              Showing {dashTotalItems > 0 ? dashStartIndex + 1 : 0} to {Math.min(dashEndIndex, dashTotalItems)} of {dashTotalItems} users
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDashPage(prev => Math.max(prev - 1, 1))}
                disabled={dashPage === 1}
                className="px-4 py-1.5 text-[13px] font-medium text-[#64748b] bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: dashTotalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setDashPage(page)}
                  className={`w-8 h-8 rounded-full text-[13px] font-medium flex items-center justify-center transition-colors ${dashPage === page
                    ? 'bg-[#06b6d4] text-white'
                    : 'bg-white border border-gray-200 text-[#475569] hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setDashPage(prev => Math.min(prev + 1, dashTotalPages))}
                disabled={dashPage === dashTotalPages || dashTotalPages === 0}
                className="px-4 py-1.5 text-[13px] font-medium text-[#64748b] bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0f172a]">Edit User</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#475569] mb-1">Name</label>
                <input type="text" defaultValue={editingUser.name} className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 focus:border-[#06b6d4]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#475569] mb-1">Email</label>
                <input type="email" defaultValue={editingUser.email} className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 focus:border-[#06b6d4]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#475569] mb-1">Phone</label>
                <input type="text" defaultValue={editingUser.phone} className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 focus:border-[#06b6d4]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#475569] mb-1">Role</label>
                <select defaultValue={editingUser.role} className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 focus:border-[#06b6d4]">
                  <option value="Parent">Parent</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Daycare Provider">Daycare Provider</option>
                  <option value="Family Member">Family Member</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#475569] mb-1">Status</label>
                <select defaultValue={editingUser.status} className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 focus:border-[#06b6d4]">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-[13px] font-medium text-[#475569] hover:text-[#1e293b] transition-colors">Cancel</button>
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-[13px] font-medium text-white bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
