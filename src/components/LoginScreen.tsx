import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  language: string;
}

export default function LoginScreen({ onLoginSuccess, language }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onLoginSuccess(email);
  };

  const handleDemoLogin = () => {
    onLoginSuccess('daniyakhan619@gmail.com');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex select-none text-slate-100 flex-col justify-center items-center relative overflow-hidden font-sans">
      
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main card box */}
      <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl max-w-sm w-full shadow-2xl relative z-10 text-center space-y-6 animate-scale-in">
        
        {/* Branding header logo */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="p-3 bg-indigo-600 rounded-2xl inline-flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-display bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              Voxentra AI
            </h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
              Enterprise CRM Gated Console
            </p>
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-405 uppercase tracking-wider block">Email credentials</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="daniyakhan619@gmail.com"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-slate-100 rounded-xl outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-405 uppercase tracking-wider block font-sans">Password codes</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-slate-100 rounded-xl outline-none transition"
              />
            </div>
          </div>

          {/* Remember and links */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-indigo-600 rounded"
              />
              <span>Remember Me</span>
            </label>
            <span className="hover:underline cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/10"
          >
            <span>Access Gated CRM</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Safety watermark / Quick Demo override */}
        <div className="space-y-4 pt-2 border-t border-slate-800/60">
          <p className="text-[10px] text-slate-550 leading-relaxed">
            * Sandbox mode enabled on the client. Click below to instantly trigger automated demo credentials authentication.
          </p>

          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-indigo-400 text-xs font-bold rounded-xl border border-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer transition shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Launch Quick Demo Console</span>
          </button>
        </div>

      </div>

      <div className="text-[10px] text-slate-600 mt-6 font-mono">
        Voxentra Automated CRM Node Block Karachi • SECURE GIFIED WORKSPACE
      </div>
    </div>
  );
}
