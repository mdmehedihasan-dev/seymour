import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2 } from 'lucide-react';

const ParentSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('Parent Profile');
  const [darkMode, setDarkMode] = useState(true);
  const [autoArchive, setAutoArchive] = useState(false);
  const [archiveDays, setArchiveDays] = useState('30');

  // Form State
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [signature, setSignature] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Alerts State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState('All Events');

  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    'Parent Profile',
    'Security & Access',
    'Global Alerts'
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockData = {
          uid: 'KP-992-X-PARENT',
          name: 'Parent Zero',
          email: 'parent@kidport.internal',
          signature: '',
          darkMode: true,
          ipAddress: '192.168.1.104',
          sessionId: 'CID_8841_998'
        };

        setData(mockData);
        setParentName(mockData.name);
        setParentEmail(mockData.email);
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

            {activeTab === 'Parent Profile' && (
              <>
                {/* Parent Profile Section */}
                <div className="mb-16 animate-in fade-in duration-300">
                  <div className="flex justify-between items-end border-b border-gray-300 pb-3 mb-8">
                    <h2 className="text-xl font-bold tracking-tight">Parent Profile Information</h2>
                    <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
                      UID: {data.uid}
                    </span>
                  </div>

                  <div className="mb-8">
                    <label className="block text-[9px] font-bold text-gray-500 tracking-[0.1em] uppercase mb-3">
                      PROFILE PICTURE
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-[#e8e8e8] border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 tracking-widest">NONE</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-[11px] text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:border-0 file:text-[10px] file:font-bold file:tracking-widest file:uppercase file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer transition-colors"
                        />
                        <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-wide">
                          Recommended size: 256x256px. Max 2MB. JPG or PNG.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mb-8">
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-gray-500 tracking-[0.1em] uppercase mb-3">
                        FULL PARENT NAME
                      </label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full bg-white p-4 text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-sm border border-transparent focus:border-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-gray-500 tracking-[0.1em] uppercase mb-3">
                        MASTER EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
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

                    {/* Auto-Archive Reports Toggle */}
                    <div className="flex justify-between items-center pb-8 border-b border-gray-200 mb-6">
                      <div>
                        <h3 className="text-[12px] font-bold text-black mb-1">Auto-Archive Reports</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-[11px] text-gray-600">Automatically move</p>
                          {autoArchive ? (
                            <select 
                              value={archiveDays}
                              onChange={(e) => setArchiveDays(e.target.value)}
                              className="text-[11px] font-bold text-black bg-white border border-gray-300 px-2 py-0.5 outline-none focus:border-black cursor-pointer"
                            >
                              <option value="30">30-day</option>
                              <option value="60">60-day</option>
                              <option value="90">90-day</option>
                            </select>
                          ) : (
                            <span className="text-[11px] text-gray-600">30-day</span>
                          )}
                          <p className="text-[11px] text-gray-600">old reports to deep storage.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setAutoArchive(!autoArchive)}
                        className={`w-11 h-6 relative flex items-center px-1 border transition-colors duration-300 ${autoArchive ? 'bg-black border-black' : 'bg-[#e8e8e8] border-gray-300'}`}
                      >
                        <div className={`w-4 h-4 bg-white transition-transform duration-300 shadow-sm ${autoArchive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
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

            {/* Security & Access Section */}
            {activeTab === 'Security & Access' && (
              <div className="animate-in fade-in duration-300">
                <div className="border-b border-gray-300 pb-3 mb-8">
                  <h2 className="text-xl font-bold tracking-tight">Security & Access Control</h2>
                </div>

                <div className="bg-[#f4f4f4] p-8 shadow-sm mb-12">
                  <h3 className="text-[12px] font-bold text-black mb-6 uppercase tracking-wider">Change Password</h3>
                  <div className="space-y-4 mb-6">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-white p-4 text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black transition-all border border-transparent focus:border-gray-200"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white p-4 text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black transition-all border border-transparent focus:border-gray-200"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white p-4 text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black transition-all border border-transparent focus:border-gray-200"
                    />
                  </div>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isSaving}
                    className="bg-black hover:bg-gray-800 text-white text-[11px] font-bold px-6 py-3 transition-colors tracking-wide disabled:bg-gray-500 flex items-center justify-center min-w-[140px]"
                  >
                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : 'Update Password'}
                  </button>
                </div>

                <div className="bg-[#f4f4f4] p-8 shadow-sm mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-[12px] font-bold text-black mb-1 uppercase tracking-wider">Two-Factor Authentication (2FA)</h3>
                      <p className="text-[11px] text-gray-600">Require an extra security code when logging in.</p>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`w-11 h-6 relative flex items-center px-1 border transition-colors duration-300 ${twoFactorEnabled ? 'bg-black border-black' : 'bg-[#e8e8e8] border-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white transition-transform duration-300 shadow-sm ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="bg-[#f4f4f4] p-8 shadow-sm">
                  <h3 className="text-[12px] font-bold text-black mb-6 uppercase tracking-wider">Active Sessions</h3>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                    <div>
                      <p className="text-[12px] font-bold text-black">Windows PC - Chrome</p>
                      <p className="text-[10px] text-gray-500">IP: {data.ipAddress} &bull; Current Session</p>
                    </div>
                    <span className="text-[9px] font-bold text-green-600 bg-green-100 px-2 py-1 uppercase tracking-widest">Active</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 mb-4">
                    <div>
                      <p className="text-[12px] font-bold text-gray-600">iPhone 14 - Safari</p>
                      <p className="text-[10px] text-gray-500">IP: 192.168.1.108 &bull; Last seen 2 hours ago</p>
                    </div>
                    <button className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest border-b border-red-500 pb-0.5">Revoke</button>
                  </div>
                  <button className="text-[10px] font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 transition-colors tracking-widest uppercase mt-4">
                    Revoke All Other Sessions
                  </button>
                </div>
              </div>
            )}

            {/* Global Alerts Section */}
            {activeTab === 'Global Alerts' && (
              <div className="animate-in fade-in duration-300">
                <div className="border-b border-gray-300 pb-3 mb-8">
                  <h2 className="text-xl font-bold tracking-tight">Global Alerts & Notifications</h2>
                </div>

                <div className="bg-[#f4f4f4] p-8 shadow-sm mb-12">
                  <h3 className="text-[12px] font-bold text-black mb-6 uppercase tracking-wider">Notification Channels</h3>

                  <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                    <div>
                      <p className="text-[12px] font-bold text-black mb-1">Email Notifications</p>
                      <p className="text-[11px] text-gray-600">Receive alerts directly to {parentEmail || data.email}</p>
                    </div>
                    <button
                      onClick={() => setEmailAlerts(!emailAlerts)}
                      className={`w-11 h-6 relative flex items-center px-1 border transition-colors duration-300 ${emailAlerts ? 'bg-black border-black' : 'bg-[#e8e8e8] border-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white transition-transform duration-300 shadow-sm ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                    <div>
                      <p className="text-[12px] font-bold text-black mb-1">Push Notifications</p>
                      <p className="text-[11px] text-gray-600">Receive alerts on your active devices.</p>
                    </div>
                    <button
                      onClick={() => setPushAlerts(!pushAlerts)}
                      className={`w-11 h-6 relative flex items-center px-1 border transition-colors duration-300 ${pushAlerts ? 'bg-black border-black' : 'bg-[#e8e8e8] border-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white transition-transform duration-300 shadow-sm ${pushAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[12px] font-bold text-black mb-1">Weekly Digest</p>
                      <p className="text-[11px] text-gray-600">Get a weekly summary of all monitoring activity.</p>
                    </div>
                    <button
                      onClick={() => setWeeklyDigest(!weeklyDigest)}
                      className={`w-11 h-6 relative flex items-center px-1 border transition-colors duration-300 ${weeklyDigest ? 'bg-black border-black' : 'bg-[#e8e8e8] border-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white transition-transform duration-300 shadow-sm ${weeklyDigest ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="bg-[#f4f4f4] p-8 shadow-sm">
                  <h3 className="text-[12px] font-bold text-black mb-6 uppercase tracking-wider">Alert Threshold</h3>
                  <div className="space-y-4">
                    {['All Events', 'High Severity Only', 'Critical Events Only'].map(threshold => (
                      <label key={threshold} className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${alertThreshold === threshold ? 'border-black' : 'border-gray-400'}`}>
                          {alertThreshold === threshold && <div className="w-2 h-2 rounded-full bg-black"></div>}
                        </div>
                        <span className="text-[12px] font-medium text-black">{threshold}</span>
                        <input
                          type="radio"
                          name="threshold"
                          value={threshold}
                          checked={alertThreshold === threshold}
                          onChange={(e) => setAlertThreshold(e.target.value)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      className="bg-black hover:bg-gray-800 text-white text-[11px] font-bold px-6 py-3 transition-colors tracking-wide disabled:bg-gray-500 flex items-center justify-center min-w-[140px]"
                    >
                      {isSaving ? <Loader2 className="animate-spin" size={16} /> : 'Save Preferences'}
                    </button>
                  </div>
                </div>
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

export default ParentSettings;

