import React from 'react';
import { 
  Users, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { Customer, IndustryType } from '../types';
import { INDUSTRY_CONFIGS } from '../data';

interface DashboardOverviewProps {
  language: string;
  selectedIndustry: IndustryType;
  customersCount: number;
  callsCount: number;
  emailsCount: number;
  languageType: string;
}

export default function DashboardOverview({
  language,
  selectedIndustry,
  customersCount,
  callsCount,
  emailsCount
}: DashboardOverviewProps) {
  
  const config = INDUSTRY_CONFIGS[selectedIndustry] || INDUSTRY_CONFIGS.restaurant;

  // Let's create beautiful metric stats objects based on selected industry
  const getStats = () => {
    switch (selectedIndustry) {
      case 'cafe':
        return [
          { id: '1', title: language === 'en' ? 'Total Customers' : 'کل صارفین', value: `${customersCount}`, sub: '+18% this month', icon: Users, color: 'bg-indigo-500' },
          { id: '2', title: config.kpi1Label, value: config.kpi1Value, sub: config.kpi1Sub, icon: Calendar, color: 'bg-emerald-500' },
          { id: '3', title: config.kpi2Label, value: config.kpi2Value, sub: config.kpi2Sub, icon: MessageSquare, color: 'bg-amber-500' },
          { id: '4', title: language === 'en' ? 'Monthly Savings' : 'ماہانہ بچت', value: 'PKR 45,000', sub: 'Staff hours reduced', icon: DollarSign, color: 'bg-rose-500' }
        ];
      case 'salon':
        return [
          { id: '1', title: language === 'en' ? 'Total Customers' : 'کل صارفین', value: `${customersCount}`, sub: '+24% this month', icon: Users, color: 'bg-indigo-500' },
          { id: '2', title: config.kpi1Label, value: config.kpi1Value, sub: config.kpi1Sub, icon: Calendar, color: 'bg-emerald-500' },
          { id: '3', title: config.kpi2Label, value: config.kpi2Value, sub: config.kpi2Sub, icon: PhoneCall, color: 'bg-blue-500' },
          { id: '4', title: language === 'en' ? 'Monthly Savings' : 'ماہانہ بچت', value: 'PKR 85,000', sub: 'No missed inquiries', icon: DollarSign, color: 'bg-rose-500' }
        ];
      case 'clinic':
        return [
          { id: '1', title: language === 'en' ? 'Patients Enrolled' : 'مریضوں کی تعداد', value: `${customersCount}`, sub: 'Active patient list', icon: Users, color: 'bg-teal-500' },
          { id: '2', title: config.kpi1Label, value: config.kpi1Value, sub: config.kpi1Sub, icon: Calendar, color: 'bg-emerald-500' },
          { id: '3', title: config.kpi2Label, value: config.kpi2Value, sub: config.kpi2Sub, icon: Mail, color: 'bg-indigo-500' },
          { id: '4', title: language === 'en' ? 'Staff Relief Savings' : 'اسٹاف ریلیف بچت', value: 'PKR 120,000', sub: 'Auto check-outs', icon: ShieldCheck, color: 'bg-rose-500' }
        ];
      case 'retail':
        return [
          { id: '1', title: language === 'en' ? 'Active Buyers' : 'کل خریدار', value: `${customersCount}`, sub: '+12% repeat rate', icon: Users, color: 'bg-purple-500' },
          { id: '2', title: config.kpi1Label, value: config.kpi1Value, sub: config.kpi1Sub, icon: Clock, color: 'bg-amber-500' },
          { id: '3', title: config.kpi2Label, value: config.kpi2Value, sub: config.kpi2Sub, icon: MessageSquare, color: 'bg-emerald-500' },
          { id: '4', title: language === 'en' ? 'Recovd Abandon Carts' : 'ریکور شدہ کارٹس', value: 'PKR 85,000', sub: '92% AI conversation rate', icon: DollarSign, color: 'bg-indigo-500' }
        ];
      case 'restaurant':
      default:
        return [
          { id: '1', title: language === 'en' ? 'Total Customers' : 'کل صارفین', value: `${customersCount}`, sub: 'Stored in CRM', icon: Users, color: 'bg-indigo-500' },
          { id: '2', title: config.kpi1Label, value: config.kpi1Value, sub: config.kpi1Sub, icon: Calendar, color: 'bg-emerald-500' },
          { id: '3', title: config.kpi2Label, value: config.kpi2Value, sub: config.kpi2Sub, icon: MessageSquare, color: 'bg-amber-500' },
          { id: '4', title: language === 'en' ? 'Monthly Savings' : 'ماہانہ بچت', value: 'PKR 95,000', sub: 'Catering booking automation', icon: DollarSign, color: 'bg-violet-500' }
        ];
    }
  };

  const metricStats = getStats();

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Intro Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900 text-white rounded-3xl overflow-hidden relative shadow-xl shadow-slate-900/10">
        <div className="space-y-1 z-10">
          <h2 className="text-2xl font-bold font-display tracking-tight flex items-center gap-2">
            Voxentra Auto-Pilot Engine{' '}
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-mono tracking-wider font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
              LIVE & MONITORING
            </span>
          </h2>
          <p className="text-slate-350 text-xs max-w-xl leading-relaxed">
            {language === 'en' 
              ? 'Your Voxentra AI staff members are currently executing calling agents, WhatsApp messaging loops, and inbox monitoring 24/7 with a 98.4% success rate.'
              : 'آپ کا ووکسینٹرا اے آئی اسٹاف اس وقت وائس ایجنٹس، واٹس ایپ مہمات اور ای میل ان باکس مانیٹرنگ کی خدمات چوبیس گھنٹے انجام دے رہا ہے۔'}
          </p>
        </div>
        <div className="flex items-center gap-6 z-10">
          <div className="text-left bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI CALL ACCURACY</p>
            <p className="text-3xl font-extrabold font-display text-emerald-400 mt-1">98.4%</p>
          </div>
          <div className="text-left bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CUSTOMER SATISFACTION</p>
            <p className="text-3xl font-extrabold font-display text-indigo-400 mt-1">4.9/5</p>
          </div>
        </div>
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg shadow-black/5`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-[11px] text-slate-500 dark:text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold text-emerald-500">{stat.sub}</span>
                <span>{language === 'en' ? 'vs baseline' : 'پچھلے ہفتے سے'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytical Visual Row (Custom SVG graphs to assure responsive precision without loading lag) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Call and SMS Automation Analytics Ring */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-150">
                {language === 'en' ? 'Communication Performance (Processed hourly)' : 'کمیونیکیشن کارکردگی'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'en' ? 'Metrics for automated AI operations vs traditional limits' : 'ووکسینٹرا بمقابلہ روایتی ہیلپ ڈیسک'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                AI Handled
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-450" />
                Manual Escalation
              </span>
            </div>
          </div>
          
          {/* Custom SVG Responsive Area Line Chart */}
          <div className="h-56 w-full mt-4 flex items-end">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gradient-ai" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.30"/>
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.00"/>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
              {/* Chart paths */}
              <path
                d="M 0,160 Q 80,110 160,115 T 320,55 T 500,45"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 0,160 Q 80,110 160,115 T 320,55 T 500,45 L 500,200 L 0,200 Z"
                fill="url(#gradient-ai)"
              />
              <path
                d="M 0,180 Q 80,168 160,172 T 320,185 T 500,192"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4,4"
              />
              {/* Tooltip dots on peak */}
              <circle cx="320" cy="55" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
              <text x="320" y="32" fill="#4f46e5" className="text-[10px] font-mono font-bold" textAnchor="middle">92.1% Success Rate</text>
            </svg>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2 font-mono text-[9px] text-slate-400">
            <span>08:00 AM</span>
            <span>10:00 AM</span>
            <span>12:00 PM</span>
            <span>02:00 PM</span>
            <span>04:00 PM (Peak)</span>
            <span>06:00 PM (Now)</span>
          </div>
        </div>

        {/* Industry Focus Dynamic Widget Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-150 mb-1">
              {config.customWidgetTitle}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {language === 'en' ? 'Live queue updating through automated AI check-outs.' : 'اے آئی لائیو مانیٹرنگ کیو۔'}
            </p>
            
            <div className="space-y-3">
              {config.customWidgetData.map((dataItem, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-800 transition"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{dataItem.field1}</p>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      {dataItem.field2}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-350">{dataItem.field4}</p>
                    <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded mt-0.5">
                      {dataItem.field3}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Powered by Voxentra Engine</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Savings Card (Bento Grid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-550/90 to-indigo-700/80 text-white flex flex-col justify-between shadow-lg shadow-indigo-600/10">
          <div className="space-y-2">
            <div className="inline-block p-2 bg-white/20 rounded-xl">
              <TrendingUp className="w-5 h-5 text-indigo-100" />
            </div>
            <h4 className="text-lg font-bold font-display tracking-tight mt-3">
              {language === 'en' ? 'Calculated Business Automation Value' : 'حاصل کردہ مالی بچت'}
            </h4>
            <p className="text-xs text-indigo-100 max-w-sm">
              {language === 'en'
                ? 'By substituting simple customer receptionist workloads with Voxentra AI Calling, businesses experience an average staff time recovery of 32 hours weekly.'
                : 'ووکسینٹرا کے روزانہ خودکار ورک فلو کے باعث ہفتہ وار 32 گھنٹے سے زائد وقت کی بچت ریکارڈ کی گئی ہے۔'}
            </p>
          </div>
          <div className="pt-6 flex justify-between items-end border-t border-white/10 mt-6 md:mt-12">
            <div>
              <p className="text-[10px] text-indigo-200 font-mono uppercase font-bold tracking-widest">ANNUAL SAVINGS RATE</p>
              <p className="text-3xl font-extrabold font-display text-white mt-1">PKR 1,140,000</p>
            </div>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-lg">
              92.3% Efficiency
            </span>
          </div>
        </div>

        {/* FAQ knowledge indexing overview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-150">
                {language === 'en' ? 'Knowledge Learning Matrix' : 'اے آئی نالج انڈیکسنگ'}
              </h3>
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                Synched
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Voxentra AI Calling and Texting layers continuously index your company FAQs, operational items, and services list.
            </p>
            
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">FAQ database size</span>
                <span className="font-bold text-slate-705 dark:text-slate-200">14 Indexed items</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>

              <div className="flex justify-between text-xs mt-3">
                <span className="text-slate-500 font-medium">Customer intent comprehension (NLP)</span>
                <span className="font-bold text-slate-705 dark:text-slate-200">99.1% Confidence</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '99%' }}></div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            Last model alignment check: 3m ago via local knowledge base files
          </div>
        </div>
      </div>
    </div>
  );
}
