import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulating login without actual API call
    setTimeout(() => {
      setLoading(false);

      // ==========================================
      // TERMINAL DASHBOARD
      // ==========================================
      if (email === "adminparent@gmail.com" && password === "123456") {
        localStorage.setItem("user", "authenticated");
        localStorage.setItem("role", "terminal");
        navigate("/");

        // ==========================================
        // ADMIN DASHBOARD
        // ==========================================
      } else if (email === "adminchild@gmail.com" && password === "123456") {
        localStorage.setItem("user", "authenticated");
        localStorage.setItem("role", "dashboard");
        navigate("/");

      } else {
        setError("Invalid email or password");
      }
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
            KIDPORT ADMIN
          </h2>
          <p className="text-[9px] text-gray-500 tracking-[0.15em] uppercase">
            Wireframe
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSignIn}>
          {error && (
            <div className="mb-4 text-red-500 text-[10px] font-bold tracking-widest uppercase bg-red-50 p-2 border border-red-200">
              {error}
            </div>
          )}
          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-2">
              Email
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

          {/* Password Field */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-semibold text-gray-600 tracking-wider uppercase">
                Password
              </label>
              <Link to="/forgate-password" className="text-[10px] font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 text-sm text-gray-800 placeholder-gray-400 bg-[#f0f0f0] border-none rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-bold text-[11px] tracking-widest uppercase transition-colors focus:outline-none disabled:opacity-70"
            >
              {loading ? "SIGNING IN..." : "LOGIN"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
          <span className="text-[8px] text-gray-500 tracking-widest uppercase">
            V4.2.0-STABLE
          </span>
          <span className="text-[8px] text-gray-500 tracking-widest uppercase">
            Authorized Personnel Only
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
