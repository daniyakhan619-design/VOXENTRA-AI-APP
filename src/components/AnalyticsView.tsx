import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ChevronRight, 
  Clock, 
  Cpu, 
  DollarSign, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Calculator,
  UserCheck
} from 'lucide-react';
import { IndustryType } from '../types';

interface AnalyticsViewProps {
  language: string;
  selectedIndustry: IndustryType;
}

export default function AnalyticsView({
  language,
  selectedIndustry
}: AnalyticsViewProps) {
  
  const getIndustryAnalytics = (ind: IndustryType) => {
    switch (ind) {
      case 'cafe':
        return {
          metric1: '8,420 cups', metric1Title: 'Peak coffees facilitated',
          metric2: '412 hours', metric2Title: 'Seats reservation uptime',
          savings: 'PKR 45,000 /mo',
          staffCount: 'Reduced from 2 to 1 receptionist'
        };
      case 'salon':
        return {
          metric1: '542 guests', metric1Title: 'Hair cuts scheduled',
          metric2: '1,240 mins', metric2Title: 'Booking discussion saved',
          savings: 'PKR 85,000 /mo',
          staffCount: 'Saved cost equivalent to 1 operator'
        };
      case 'clinic':
        return {
          metric1: '1,420 patients', metric1Title: 'OPD checks scheduled',
          metric2: '4,500 mins', metric2Title: 'Awaiting checks processing',
          savings: 'PKR 120,000 /mo',
          staffCount: 'Saves 2 admin shift allocations'
        };
      case 'retail':
        return {
          metric1: 'PKR 450K items', metric1Title: 'Total checkout values',
          metric2: '342 checkouts', metric2Title: 'Auto cart notifications',
          savings: 'PKR 85,000 /mo',
          staffCount: 'Avoids 1 manual checkout operator'
        };
      case 'restaurant':
      default:
        return {
          metric1: '1,840 tables', metric1Title: 'Tables checked out',
          metric2: '5,420 mins', metric2Title: 'Calls time saved',
          savings: 'PKR 95,000 /mo',
          staffCount: 'Substitutes dedicated phone operator'
        };
    }
  };

  const analytics = getIndustryAnalytics(selectedIndustry);

  return (
    <div className="space-y-6 animate-fade-in select-none text-left">
      
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
          {language === 'en' ? 'Voxentra Business Intelligence & Analytics Reports' : 'کاروباری تجزیہ اور رپورٹنگ'}
        </h2>
        <p className="text-xs text-slate-455">
          Track ROI benchmarks, communication metrics, and calculated financial savings driven by Voxentra CRM automations.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">{analytics.metric1Title}</p>
            <p className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">{analytics.metric1}</p>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +14% this month
            </span>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl text-indigo-650">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">{analytics.metric2Title}</p>
            <p className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">{analytics.metric2}</p>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              92% AI answered
            </span>
          </div>
          <div className="p-3 bg-teal-50 dark:bg-teal-950/20 rounded-xl text-teal-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">CALCULATED FINANCIAL SAVINGS</p>
            <p className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">{analytics.savings}</p>
            <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" />
              {analytics.staffCount}
            </span>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl text-rose-505">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Visual Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Conversion rate index (Monthly trends)</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Measures how many AI interactions result in successful CRM check-outs</p>
            </div>
            <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg text-indigo-650 dark:text-indigo-400 font-semibold">94.2% Peak</span>
          </div>

          <div className="h-56 flex items-end">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="4"
                points="0,170 100,140 200,90 300,105 400,60 550,40"
                strokeLinecap="round"
              />
              {/* Reference dots */}
              <circle cx="100" cy="140" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
              <circle cx="200" cy="90" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
              <circle cx="300" cy="105" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
              <circle cx="400" cy="60" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-slate-400 mt-3 pt-3 border-t border-slate-50">
            <span>Jan 2026</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Bar Chart representing ROI breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Communication Channels Handled</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Bifurcation between Calling, WhatsApp SMS, and Email automation</p>
            </div>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-650 px-2.5 py-1 rounded-lg font-semibold">Active Bots</span>
          </div>

          <div className="h-56 flex items-end justify-around pt-6">
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-indigo-600 rounded-t-lg h-36 relative group cursor-pointer hover:bg-indigo-700 transition">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-650 opacity-0 group-hover:opacity-100 transition">62%</span>
              </div>
              <span className="text-[10px] font-bold text-slate-650">Voice Center</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-emerald-500 rounded-t-lg h-44 relative group cursor-pointer hover:bg-emerald-600 transition">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">82%</span>
              </div>
              <span className="text-[10px] font-bold text-slate-650">SMS & WhatsApp</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-amber-500 rounded-t-lg h-24 relative group cursor-pointer hover:bg-amber-600 transition">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-amber-650 opacity-0 group-hover:opacity-100 transition">42%</span>
              </div>
              <span className="text-[10px] font-bold text-slate-650">Email Automation</span>
            </div>

          </div>
          <div className="border-t border-slate-50 pt-2.5 mt-3 text-center">
            <span className="text-[10px] text-slate-400 leading-snug">Average automation rate: <strong>62% workloads resolved human-free</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}
