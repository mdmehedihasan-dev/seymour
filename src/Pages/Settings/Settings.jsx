import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2 } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('Admin Profile');
  const [darkMode, setDarkMode] = useState(true);

  // Form State
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [signature, setSignature] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    'Admin Profile',
    'System Preferences',
    'Security & Access',
    'Global Alerts'
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockData = {
          uid: 'KP-992-X-ADMIN',
          name: 'System Administrator Zero',
          email: 'admin@kidport.internal',
          signature: '',
          darkMode: true,
          ipAddress: '192.168.1.104',
          sessionId: 'CID_8841_998'
        };

        setData(mockData);
        setAdminName(mockData.name);
        setAdminEmail(mockData.email);
        setSignature(mockData.signature);
        setDarkMode(mockData.darkMode);

      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleUpdateProfile = () => {
    setIsSaving(true);
    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you would show a toast notification here
      alert("Profile updated successfully!");
    }, 1000);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Initializing Settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-12 bg-[#fafafa] font-sans text-[#111]">
      <div className="mx-auto max-w-6xl animate-in fade-in zoom-in duration-500">

        {/* Header Section */}
        <div className="mb-12">
          <p className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">SYSTEM MANAGEMENT</p>
          <h1 className="text-4xl font-light tracking-tight">Settings</h1>
        </div>

        <div className="flex gap-16">
          {/* Left Navigation */}
          <div className="w-56 flex-shrink-0">
            <nav className="flex flex-col relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200 pl-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left py-3 text-[13px] transition-all relative ${activeTab === tab
                      ? 'font-bold text-black'
                      : 'font-medium text-gray-500 hover:text-black'
                    }`}
                >
                  {/* Active Indicator Line */}
                  {activeTab === tab && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-black"></div>
                  )}
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 max-w-3xl">

            {activeTab === 'Admin Profile' && (
              <>
                {/* Admin Profile Section */}
                <div className="mb-16 animate-in fade-in duration-300">
                  <div className="flex justify-between items-end border-b border-gray-300 pb-3 mb-8">
                    <h2 className="text-xl font-bold tracking-tight">Admin Profile Information</h2>
                    <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
                      UID: {data.uid}
                    </span>
                  </div>

                  <div className="flex gap-6 mb-8">
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-gray-500 tracking-[0.1em] uppercase mb-3">
                        FULL ADMINISTRATIVE NAME
                      </label>
                      <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        className="w-full bg-white p-4 text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-sm border border-transparent focus:border-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-gray-500 tracking-[0.1em] uppercase mb-3">
                        MASTER EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full bg-white p-4 text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-sm border border-transparent focus:border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-[9px] font-bold text-gray-500 tracking-[0.1em] uppercase mb-3">
                      TERMINAL SIGNATURE (PLACEHOLDER)
                    </label>
                    <textarea
                      placeholder="Enter administrative signature used for reports..."
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="w-full bg-white p-4 h-28 text-[13px] text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none shadow-sm border border-transparent focus:border-gray-200"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      className="bg-black hover:bg-gray-800 text-white text-[11px] font-bold px-8 py-3.5 transition-colors tracking-wide disabled:bg-gray-500 flex items-center justify-center min-w-[160px]"
                    >
                      {isSaving ? <Loader2 className="animate-spin" size={16} /> : 'Update Profile'}
                    </button>
                  </div>
                </div>

                {/* System Preferences Section */}
                <div className="mb-16 animate-in fade-in duration-300 delay-100">
                  <div className="border-b border-gray-300 pb-3 mb-8">
                    <h2 className="text-xl font-bold tracking-tight">System Preferences</h2>
                  </div>

                  <div className="bg-[#f4f4f4] p-8 shadow-sm">
                    {/* Dark Mode Toggle */}
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-[12px] font-bold text-black mb-1">Dark Mode Activation</h3>
                        <p className="text-[11px] text-gray-600">Toggle system-wide terminal interface theme.</p>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-11 h-6 bg-[#333] relative flex items-center px-1 border border-[#333]"
                      >
                        <div className={`w-4 h-4 bg-white transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0 bg-gray-400'}`}></div>
                      </button>
                    </div>

                    {/* Auto-Archive Reports Toggle (Disabled) */}
                    <div className="flex justify-between items-center pb-8 border-b border-gray-200 mb-6">
                      <div className="opacity-50">
                        <h3 className="text-[12px] font-bold text-gray-500 mb-1">Auto-Archive Reports</h3>
                        <p className="text-[11px] text-gray-400">Automatically move 30-day old reports to deep storage.</p>
                      </div>
                      <div className="w-11 h-6 bg-gray-200 relative flex items-center px-1 opacity-50 cursor-not-allowed">
                        <div className="w-4 h-4 bg-gray-400"></div>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 italic leading-relaxed">
                      Placeholder: Additional system-level configurations including API key management, webhook integrations, and regional monitoring parameters will be populated here during the final integration phase.
                    </p>
                  </div>
                </div>

                {/* Session Management Section */}
                <div className="mb-16 animate-in fade-in duration-300 delay-200">
                  <div className="h-1 w-full bg-black mb-8 mt-12"></div>

                  <div className="bg-[#f4f4f4] p-8 flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="text-[10px] font-bold tracking-[0.1em] uppercase text-black mb-1.5">SESSION MANAGEMENT</h3>
                      <p className="text-[11px] text-gray-600">End your current administrative session and lock the terminal.</p>
                    </div>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/sign-in');
                      }}
                      className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-[0.15em] uppercase px-6 py-3 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={14} />
                      LOGOUT
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Empty State for other tabs */}
            {activeTab !== 'Admin Profile' && (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 animate-in fade-in duration-300">
                <p className="text-[11px] font-bold tracking-widest uppercase mb-2">RESTRICTED AREA</p>
                <p className="text-[13px] text-gray-500 text-center max-w-sm">
                  The {activeTab} panel is currently locked or under development in this phase.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200 mt-8">
              <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
                IP: {data.ipAddress} | SESSION_ID: {data.sessionId}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
