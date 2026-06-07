import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoContext } from '../../context/VideoContext';
import { Sparkles, CloudUpload, ChevronDown, Info, FileVideo, X } from 'lucide-react';

const UploadVideo = () => {
  const navigate = useNavigate();
  const { addVideo, videos } = useContext(VideoContext);

  const [formData, setFormData] = useState({
    name: 'e.g. Supine Pelvic Clocks',
    cues: 'Provide biomechanical cues for patients executing this movement. These cues will display inside the patient tracker app...'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const nextId = `EX-26${(videos.length + 1).toString().padStart(4, '0')}`;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.includes('video/')) {
        setSelectedFile(file);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.includes('video/')) {
        setSelectedFile(file);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePublish = () => {
    if (!selectedFile) return;
    addVideo({ 
      name: formData.name,
      fileSize: formatFileSize(selectedFile.size)
    });
    navigate('/video-manager');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-8 bg-[#0A0D14] text-white">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span 
              className="cursor-pointer hover:text-white transition-colors flex items-center gap-1"
              onClick={() => navigate('/video-manager')}
            >
              &larr; VIDEO MANAGER
            </span> 
            <span className="text-[#1E293B]">&gt;</span> 
            <span className="text-white">UPLOAD NEW VIDEO</span>
          </p>
          <h1 className="text-[28px] font-bold tracking-tight flex items-center gap-2 mb-2">
            Upload Video Asset <Sparkles className="text-[#38BDF8]" size={24} />
          </h1>
          <p className="text-[#94A3B8] text-[13px] font-medium">Configure and index biomechanical video assets for performance protocols.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Drag & Drop */}
          <div className="bg-[#131B2F] border border-[#1E293B] rounded-2xl p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <CloudUpload className="text-[#38BDF8]" size={18} />
              <h2 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em]">DRAG & DROP VIDEO</h2>
            </div>
            
            <div 
              className={`border border-dashed rounded-2xl h-[320px] flex flex-col items-center justify-center transition-all group ${
                isDragging ? 'border-[#38BDF8] bg-[#38BDF8]/10' : 'border-[#1E293B] bg-[#0A0D14]/50 hover:border-[#38BDF8]/50 hover:bg-[#0A0D14]'
              } ${selectedFile ? 'cursor-default' : 'cursor-pointer'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !selectedFile && fileInputRef.current.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleFileChange}
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#34D399]/20 flex items-center justify-center mb-4">
                    <FileVideo className="text-[#34D399]" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-[14px] mb-2">{selectedFile.name}</h3>
                  <p className="text-[#34D399] text-[12px] font-bold mb-6">{formatFileSize(selectedFile.size)}</p>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                    className="flex items-center gap-2 text-[11px] font-bold text-[#EF4444] hover:bg-[#EF4444]/10 px-4 py-2 rounded-lg transition-colors uppercase tracking-widest"
                  >
                    <X size={14} /> Remove File
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-[#1E293B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CloudUpload className="text-[#38BDF8]" size={24} />
                  </div>
                  <h3 className="text-white font-bold text-[14px] mb-1">Drag and drop video file</h3>
                  <p className="text-[#64748B] text-[12px] font-medium mb-6">Or click to browse from device files</p>
                  
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest bg-[#131B2F] px-4 py-1.5 rounded-full border border-[#1E293B]">
                    <span>MP4, MOV, WEBM</span>
                    <span className="w-1 h-1 rounded-full bg-[#475569]"></span>
                    <span>MAX 500 MB</span>
                  </div>
                </>
              )}
            </div>

            <p className="text-center text-[#475569] text-[9px] font-bold uppercase tracking-[0.15em] mt-6">
              BIOMECHANICAL INDEXING AND MOVEMENT SCANNING AUTOMATICALLY CONFIGURED ON SUBMISSION.
            </p>
          </div>

          {/* Right Column: Asset Specifications */}
          <div className="bg-[#131B2F] border border-[#1E293B] rounded-2xl p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-[#38BDF8]" size={18} />
              <h2 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em]">ASSET SPECIFICATIONS</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">EXERCISE ID</label>
                <input 
                  type="text" 
                  value={nextId}
                  readOnly
                  className="w-full bg-[#0A0D14] border border-[#1E293B] rounded-xl px-4 py-3 text-[13px] text-[#64748B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">EXERCISE NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0A0D14] border border-[#1E293B] rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-[#38BDF8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">TARGET AREA</label>
                <div className="relative">
                  <select className="w-full bg-[#0A0D14] border border-[#1E293B] rounded-xl px-4 py-3 text-[13px] text-white outline-none appearance-none cursor-pointer focus:border-[#38BDF8] transition-colors">
                    <option>Lower Back</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">COACHING CUES / DESCRIPTION</label>
                <textarea 
                  name="cues"
                  value={formData.cues}
                  onChange={handleChange}
                  className="w-full h-[120px] bg-[#0A0D14] border border-[#1E293B] rounded-xl px-4 py-3 text-[13px] text-[#475569] outline-none focus:border-[#38BDF8] transition-colors resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="flex items-start gap-3 bg-[#1E3A8A]/10 border border-[#1E3A8A]/30 rounded-xl p-4 mt-2">
                <Info size={16} className="text-[#38BDF8] shrink-0 mt-0.5" />
                <p className="text-[12px] font-medium text-[#94A3B8] leading-relaxed">
                  You must select or drop a valid video asset and wait for processing to finish before publishing is unlocked.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button 
                  onClick={handlePublish}
                  disabled={!selectedFile}
                  className={`w-full py-3.5 transition-colors rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)] ${
                    selectedFile 
                      ? 'bg-[#3B82F6] hover:bg-blue-600 text-white cursor-pointer' 
                      : 'bg-[#1E293B]/50 text-[#64748B] cursor-not-allowed shadow-none'
                  }`}
                >
                  PUBLISH ASSET CATALOG
                </button>
                <button 
                  onClick={() => navigate('/video-manager')}
                  className="w-full py-3.5 bg-transparent border border-[#1E293B] hover:bg-[#1E293B] transition-colors text-white rounded-xl text-[12px] font-bold uppercase tracking-widest"
                >
                  CANCEL
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadVideo;
