import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8  p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-[1.01]">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-700 mb-2">Welcome Back</h2>
          <p className="text-gray-400">Continue your strength journey</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-gray-700 text-sm font-medium mb-1 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent text-black rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-gray-700 text-sm font-medium mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full bg-transparent text-black rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-blue-500 text-sm hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="relative w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 
              transform hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-blue-600
              group flex items-center justify-center space-x-2 overflow-hidden"
          >
            <div className="relative flex items-center justify-center space-x-2">
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
          </button>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
