import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/new-password");
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
            VERIFY ACCESS
          </h2>
          <p className="text-[9px] text-gray-500 tracking-[0.15em] uppercase">
            Terminal Access System
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={handleVerify}>
          <div className="mb-8">
            <label className="block text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-3">
              5-Digit Code
            </label>
            <div className="flex justify-between gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={code[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-lg font-bold text-center text-gray-800 bg-[#f0f0f0] border-none rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mb-6">
            <button
              type="submit"
              disabled={loading || code.some(c => !c)}
              className="w-full h-11 bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-bold text-[11px] tracking-widest uppercase transition-colors focus:outline-none disabled:opacity-70"
            >
              {loading ? "VERIFYING..." : "VERIFY CODE"}
            </button>
          </div>

          <div className="mb-8 text-center">
            <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">
              Didn't receive the email?{" "}
              <button type="button" className="text-black hover:underline ml-1">RESEND CODE</button>
            </p>
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

export default VerifyCode;
