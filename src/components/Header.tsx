import React, { useState, useEffect } from 'react';
import { Bell, Search, Globe, LogOut, Shield, ChevronDown, Check, Trash2 } from 'lucide-react';
import { NotificationItem, IndustryType } from '../types';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  selectedIndustry: IndustryType;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  onLogout: () => void;
  userEmail: string;
}

export default function Header({
  language,
  setLanguage,
  selectedIndustry,
  notifications,
  setNotifications,
  onLogout,
  userEmail
}: HeaderProps) {
  const [time, setTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(language === 'en' ? 'en-US' : 'ur-PK', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const industryNames: Record<IndustryType, string> = {
    restaurant: 'Restaurant & Dining Profile',
    cafe: 'Artisanal Cafe Profile',
    salon: 'Salon, Spa & Styling Profile',
    clinic: 'Medical Diagnostic Clinic',
    retail: 'Premium Retail Boutique'
  };

  return (
    <header className="h-16 border-b border-slate-205/60 dark:border-slate-800 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-40 relative select-none">
      {/* Search Bar / Context Info */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-xs hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="search"
            placeholder={language === 'en' ? 'Search anything...' : 'کچھ بھی تلاش کریں...'}
            className="pl-9 pr-4 py-1.5 w-64 bg-slate-100/80 dark:bg-slate-800/80 border border-transparent rounded-xl text-xs text-slate-705 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition duration-150"
          />
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full font-mono uppercase tracking-wider hidden md:block">
          {industryNames[selectedIndustry]}
        </div>
      </div>

      {/* Dynamic Time, Language Toggle, Notification Bell, User profile */}
      <div className="flex items-center gap-4">
        {/* Dynamic Clock */}
        <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl hidden xl:block">
          {time || '12:00:00 PM'} (PKT)
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-150 dark:hover:bg-slate-700/80 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 transition"
            title="Toggle English/Urdu"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'EN' : 'اردو'}</span>
          </button>
        </div>

        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-150 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition focus:outline-none relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top-right">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {language === 'en' ? 'Notifications' : 'اعلانات'}
                </h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {language === 'en' ? 'Mark all read' : 'سب پڑھیں'}
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    {language === 'en' ? 'No recent notifications.' : 'کوئی نیا اعلان نہیں ہے۔'}
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 flex flex-col gap-1 transition ${
                        notif.read ? 'bg-white dark:bg-slate-900 opacity-70' : 'bg-indigo-50/50 dark:bg-indigo-950/20'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-xs font-bold text-slate-800 dark:text-slate-200`}>
                          {notif.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-slate-405 font-mono">{notif.time}</span>
                          <button
                            onClick={(e) => deleteNotification(notif.id, e)}
                            className="text-slate-400 hover:text-rose-500 rounded p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {notif.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Info */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 uppercase">
              {userEmail ? userEmail.slice(0, 2) : 'DX'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none">
                Daniyal Khan
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                {language === 'en' ? 'Owner Account' : 'ایڈمنسٹریٹر'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 tracking-wider font-mono">AUTHORIZED AS</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{userEmail}</p>
              </div>
              
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>{language === 'en' ? 'Log Out of Console' : 'سائن آؤٹ کریں'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
