import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  HelpCircle, 
  Bell, 
  Volume2, 
  ShieldAlert, 
  Check, 
  RefreshCw,
  Globe
} from 'lucide-react';
import { LanguageType } from '../types';

interface SettingsPanelProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (b: boolean) => void;
  userEmail: string;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function SettingsPanel({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  userEmail,
  addToast
}: SettingsPanelProps) {
  
  const [bizName, setBizName] = useState('Voxentra Group of Industries');
  const [bizLoc, setBizLoc] = useState('Karachi, Pakistan');
  const [voipSound, setVoipSound] = useState(true);
  const [bilingTrigger, setBilingTrigger] = useState('Urdu - English Professional Mix');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(language === 'en' ? 'SaaS settings locked.' : 'ترتیبات محفوظ ہو گئیں۔', 'success');
  };

  const clearCache = () => {
    if (confirm(language === 'en' ? 'Do you want to reset CRM tables to initial states?' : 'کیا آپ معلومات کو دوبارہ لاگ آؤٹ کرنا چاہتے ہیں؟')) {
      localStorage.clear();
      addToast(language === 'en' ? 'CRM memory wiped. Reloading...' : 'لوکل سٹوریج ریسیٹ ہو گئی۔', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left select-none">
      
      {/* Banner */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
          {language === 'en' ? 'Voxentra Global SaaS Settings' : 'سسٹم ترتیبات مینیو'}
        </h2>
        <p className="text-xs text-slate-455">
          Configure physical business locations, language profiles (English / Urdu), notification sound indicators, and wipe sandbox partitions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main controls column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveSettings} className="space-y-5">
            
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              SME Metadata Settings
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Venture Name *</label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border text-xs text-slate-800 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Physical headquarters</label>
                <input
                  type="text"
                  value={bizLoc}
                  onChange={(e) => setBizLoc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border text-xs text-slate-800 rounded-xl"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Operator Panel Options
              </h3>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="text-left space-y-0.5">
                  <span className="text-xs font-bold text-slate-800">Bilingual translation triggers</span>
                  <p className="text-[10px] text-slate-400">Forces bot models to prefer Urdu vocabulary when calling customers speaking Urdu.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                  className="px-3 py-1.5 bg-white border rounded-xl text-xs font-semibold text-slate-705 flex items-center gap-1.5 transition hover:bg-slate-105"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'English (EN)' : 'Urdu (اردو)'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="text-left space-y-0.5">
                  <span className="text-xs font-bold text-slate-800">Live sound alerts on outbound VoIP call simulation</span>
                  <p className="text-[10px] text-slate-400">Play visual sound alerts when connecting dialer channels.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setVoipSound(!voipSound)}
                  className={`w-10 h-6 rounded-full p-0.5 transition cursor-pointer ${voipSound ? 'bg-indigo-650' : 'bg-slate-205'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${voipSound ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-indigo-600/10"
            >
              Lock SaaS Settings
            </button>
          </form>
        </div>

        {/* Wipe storage column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Memory & Developer cache partitioning
            </h3>
            <p className="text-xs text-slate-455 leading-relaxed">
              If client data slots or custom campaigns look saturated, wipe storage partitions to reset to initial mock levels.
            </p>
            <button
              onClick={clearCache}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl border border-rose-200 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset CRM Sandbox Tables
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
