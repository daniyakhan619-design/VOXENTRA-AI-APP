import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  BarChart3, 
  Cpu, 
  BookOpen, 
  UsersRound, 
  Settings, 
  Sparkles,
  Sun,
  Moon,
  Store,
  Coffee,
  Scissors,
  Stethoscope,
  ShoppingBag
} from 'lucide-react';
import { IndustryType } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedIndustry: IndustryType;
  setSelectedIndustry: (industry: IndustryType) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: string;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedIndustry,
  setSelectedIndustry,
  darkMode,
  setDarkMode,
  language
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: language === 'en' ? 'Overview' : 'جائزہ', icon: LayoutDashboard },
    { id: 'customers', label: language === 'en' ? 'Customers' : 'صارفین', icon: Users },
    { id: 'calling', label: language === 'en' ? 'AI Voice Center' : 'وائس سینٹر', icon: PhoneCall },
    { id: 'texting', label: language === 'en' ? 'AI Texting' : 'ایس ایم ایس مہم', icon: MessageSquare },
    { id: 'email', label: language === 'en' ? 'AI Email Center' : 'ای میل سینٹر', icon: Mail },
    { id: 'analytics', label: language === 'en' ? 'Analytics' : 'رپورٹس', icon: BarChart3 },
    { id: 'agents', label: language === 'en' ? 'Agent Builder' : 'ایجنٹ بلڈر', icon: Cpu },
    { id: 'knowledge', label: language === 'en' ? 'Knowledge Base' : 'معلومات', icon: BookOpen },
    { id: 'team', label: language === 'en' ? 'Team Space' : 'ٹیم سپیس', icon: UsersRound },
    { id: 'settings', label: language === 'en' ? 'Settings' : 'ترتیبات', icon: Settings }
  ];

  const industries: { id: IndustryType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'restaurant', label: language === 'en' ? 'Restaurant' : 'ریسٹورنٹ', icon: Store },
    { id: 'cafe', label: language === 'en' ? 'Café' : 'کیفے', icon: Coffee },
    { id: 'salon', label: language === 'en' ? 'Salon & Spa' : 'سیلون', icon: Scissors },
    { id: 'clinic', label: language === 'en' ? 'Medical Clinic' : 'کلینک', icon: Stethoscope },
    { id: 'retail', label: language === 'en' ? 'Retail Store' : 'ریٹیل سٹور', icon: ShoppingBag }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen overflow-y-auto border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight font-display bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            Voxentra AI
          </h1>
          <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
            {language === 'en' ? 'CRM AUTOMATION' : 'سمارٹ کسٹمر کیئر'}
          </p>
        </div>
      </div>

      {/* Industry Switcher */}
      <div className="px-4 py-4 border-b border-slate-800 bg-slate-950/40">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
          {language === 'en' ? 'Industry Profile' : 'صنعت کا انتخاب'}
        </p>
        <div className="relative">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value as IndustryType)}
            className="w-full bg-slate-900 border border-slate-800 text-sm text-slate-200 rounded-xl px-3 py-2.5 outline-none hover:border-slate-700 transition cursor-pointer appearance-none pr-8"
          >
            {industries.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {React.createElement(industries.find(i => i.id === selectedIndustry)?.icon || Store, { className: 'w-4 h-4 text-indigo-400' })}
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
          {language === 'en' ? 'Main Menu' : 'مینیو'}
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition duration-200 group text-left ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/90 to-indigo-700/80 text-white shadow-md shadow-indigo-600/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/20 space-y-3">
        {/* Toggle Theme */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 border border-slate-805/50 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition"
        >
          <span className="flex items-center gap-2">
            {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            {darkMode ? (language === 'en' ? 'Dark Mode' : 'ڈارک تھیم') : (language === 'en' ? 'Light Mode' : 'لائٹ تھیم')}
          </span>
          <div className={`w-7 h-4 rounded-full p-0.5 transition ${darkMode ? 'bg-indigo-600' : 'bg-slate-705'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-3' : 'translate-x-0'}`} />
          </div>
        </button>

        {/* Brand Version */}
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            Voxentra AI Hub v2.1.0-TS
          </p>
        </div>
      </div>
    </aside>
  );
}
