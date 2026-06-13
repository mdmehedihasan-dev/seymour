import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgatePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      navigate("/verify-code");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f4] flex items-center justify-center font-sans">
      <div className="bg-white p-10 md:p-12 shadow-sm w-full max-w-[400px]">
        {/* Header section */}
        <div className="mb-10">
          <div className="w-8 h-8 bg-black flex items-center justify-center mb-6">
            <span className="text-white font-bold text-lg leading-none">K</span>
          </div>
          <h2 className="text-[20px] font-medium text-[#111] leading-none mb-2">
            PASSWORD RECOVERY
          </h2>
          <p className="text-[9px] text-gray-500 tracking-[0.15em] uppercase">
            Kidport Admin Wireframe
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-8">
            <label className="block text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-2">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 text-sm text-gray-800 placeholder-gray-400 bg-[#f0f0f0] border-none rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all"
              placeholder="admin@kidport.internal"
            />
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-bold text-[11px] tracking-widest uppercase transition-colors focus:outline-none disabled:opacity-70"
            >
              {loading ? "SENDING..." : "SEND CODE"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <Link to="/sign-in" className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-black transition-colors tracking-widest uppercase">
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgatePassword;
