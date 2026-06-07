import React, { useState } from 'react';
import { 
  Globe, Bell, Shield, Sparkles, Database, ChevronDown 
} from 'lucide-react';

// Reusable Toggle Component
const Toggle = ({ enabled, setEnabled }) => (
  <button 
    onClick={() => setEnabled(!enabled)}
    className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${enabled ? 'bg-[#06b6d4]' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const AdminSettings = () => {
  // Notification State
  const [emailNotif, setEmailNotif] = useState(true);
  const [alertFlagged, setAlertFlagged] = useState(true);
  const [dailyActivity, setDailyActivity] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);

  // Security State
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginLimit, setLoginLimit] = useState(true);

  // AI State
  const [autoFlag, setAutoFlag] = useState(true);

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-6 lg:p-10 font-sans text-[#1e293b] pb-32">
      <div className="max-w-[900px] mx-auto animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#0f172a] mb-1 leading-tight">Settings</h1>
          <p className="text-[13px] text-[#64748b]">Manage platform configuration and preferences</p>
        </div>

        <div className="space-y-6">

          {/* General Settings */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[42px] h-[42px] rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#06b6d4] shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1e293b]">General Settings</h3>
                <p className="text-[12px] text-[#64748b]">Configure basic platform settings</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-2">Platform Name</label>
                <input 
                  type="text" 
                  defaultValue="KIDport"
                  className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-2">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="support@kidport.com"
                  className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-2">Time Zone</label>
                <div className="relative">
                  <select className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none appearance-none cursor-pointer transition-all">
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="cst">Central Standard Time (CST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                    <option value="utc">Coordinated Universal Time (UTC)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[42px] h-[42px] rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1e293b]">Notification Settings</h3>
                <p className="text-[12px] text-[#64748b]">Configure system notifications and alerts</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#334155]">Email notifications for new users</span>
                <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#334155]">Alert for flagged observations</span>
                <Toggle enabled={alertFlagged} setEnabled={setAlertFlagged} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#334155]">Daily activity summary</span>
                <Toggle enabled={dailyActivity} setEnabled={setDailyActivity} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#334155]">Weekly reports</span>
                <Toggle enabled={weeklyReports} setEnabled={setWeeklyReports} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#334155]">Critical system alerts</span>
                <Toggle enabled={criticalAlerts} setEnabled={setCriticalAlerts} />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[42px] h-[42px] rounded-full bg-[#fee2e2] flex items-center justify-center text-[#ef4444] shrink-0">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1e293b]">Security Settings</h3>
                <p className="text-[12px] text-[#64748b]">Manage security and access controls</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-2">Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  defaultValue="30"
                  className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none transition-all"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="block text-[13px] font-medium text-[#334155] mb-0.5">Two-Factor Authentication</span>
                  <span className="text-[11px] text-[#94a3b8]">Require 2FA for all admin users</span>
                </div>
                <Toggle enabled={twoFactor} setEnabled={setTwoFactor} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="block text-[13px] font-medium text-[#334155] mb-0.5">Login Attempt Limit</span>
                  <span className="text-[11px] text-[#94a3b8]">Lock account after failed attempts</span>
                </div>
                <Toggle enabled={loginLimit} setEnabled={setLoginLimit} />
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[42px] h-[42px] rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#a855f7] shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1e293b]">AI Configuration</h3>
                <p className="text-[12px] text-[#64748b]">Configure AI processing settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-2">AI Processing Priority</label>
                <div className="relative">
                  <select className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none appearance-none cursor-pointer transition-all">
                    <option value="realtime">Real-time Processing</option>
                    <option value="batch">Batch Processing (Nightly)</option>
                    <option value="hybrid">Hybrid (Priority first)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-2">Confidence Threshold (%)</label>
                <input 
                  type="number" 
                  defaultValue="85"
                  className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none transition-all mb-1"
                />
                <p className="text-[11px] text-[#94a3b8]">Minimum confidence level for AI Insights</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="block text-[13px] font-medium text-[#334155] mb-0.5">Auto-flag Low Confidence</span>
                  <span className="text-[11px] text-[#94a3b8]">Automatically flag observations below threshold</span>
                </div>
                <Toggle enabled={autoFlag} setEnabled={setAutoFlag} />
              </div>
            </div>
          </div>

          {/* Database & Storage */}
          <div className="bg-white rounded-[14px] border border-gray-100 p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[42px] h-[42px] rounded-full bg-[#dcfce7] flex items-center justify-center text-[#22c55e] shrink-0">
                <Database size={20} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1e293b]">Database & Storage</h3>
                <p className="text-[12px] text-[#64748b]">Manage data storage and backups</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#f8fafc] rounded-xl p-4">
                <p className="text-[11px] text-[#64748b] mb-1">Total Storage</p>
                <p className="text-[16px] font-bold text-[#0f172a]">1.2 TB</p>
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-4">
                <p className="text-[11px] text-[#64748b] mb-1">Used Storage</p>
                <p className="text-[16px] font-bold text-[#0f172a]">847 GB</p>
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-4">
                <p className="text-[11px] text-[#64748b] mb-1">Available</p>
                <p className="text-[16px] font-bold text-[#0f172a]">353 GB</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-[#475569] mb-2">Backup Frequency</label>
              <div className="relative">
                <select className="w-full bg-[#f8fafc] border border-transparent focus:border-gray-200 focus:bg-white rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1e293b] outline-none appearance-none cursor-pointer transition-all">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
              </div>
            </div>

            <button className="w-full border-2 border-[#06b6d4] text-[#06b6d4] hover:bg-[#ecfeff] font-semibold rounded-lg px-4 py-2.5 text-[13px] transition-colors">
              Run Manual Backup Now
            </button>

          </div>

        </div>

      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-6 md:pl-64 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-[900px] mx-auto flex justify-end gap-3">
          <button className="px-5 py-2.5 text-[13px] font-semibold text-[#64748b] hover:text-[#1e293b] hover:bg-gray-50 rounded-full transition-colors border border-gray-200">
            Cancel
          </button>
          <button className="px-5 py-2.5 text-[13px] font-semibold text-white bg-[#06b6d4] hover:bg-[#0891b2] rounded-full transition-colors">
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminSettings;
