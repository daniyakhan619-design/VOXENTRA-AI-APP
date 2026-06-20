import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import CustomerManagement from './components/CustomerManagement';
import AICallingCenter from './components/AICallingCenter';
import AITextingCenter from './components/AITextingCenter';
import AIEmailCenter from './components/AIEmailCenter';
import AnalyticsView from './components/AnalyticsView';
import AIAgentBuilder from './components/AIAgentBuilder';
import KnowledgeBase from './components/KnowledgeBase';
import TeamManagement from './components/TeamManagement';
import SettingsPanel from './components/SettingsPanel';
import LoginScreen from './components/LoginScreen';
import AIAssistantWidget from './components/AIAssistantWidget';
import { ToastContainer, ToastMessage } from './components/Toast';

import { 
  Customer, 
  CallLog, 
  EmailMessage, 
  FAQItem, 
  TeamMember, 
  NotificationItem, 
  IndustryType, 
  AIAgentConfig 
} from './types';

import { 
  INITIAL_CUSTOMERS, 
  INITIAL_CALLS, 
  INITIAL_EMAILS, 
  INITIAL_FAQS, 
  INITIAL_NOTIFICATIONS, 
  DEFAULT_AI_AGENT, 
  TEAM_MEMBERS 
} from './data';

export default function App() {
  // Authentication Simulated State
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('voxentra_user_email');
  });

  // Global Settings states
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>(() => {
    return (localStorage.getItem('voxentra_industry') as IndustryType) || 'restaurant';
  });
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('voxentra_dark_mode') === 'true';
  });
  const [language, setLanguage] = useState<string>('en'); // 'en' or 'ur'

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Localized industry data states (swaps automatically on selection)
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [agentConfig, setAgentConfig] = useState<AIAgentConfig>(DEFAULT_AI_AGENT);

  const addToast = (text: string, type: 'success' | 'error' | 'info' | 'notification' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync dark mode class inside overall document
  useEffect(() => {
    localStorage.setItem('voxentra_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle switching selectedIndustry: save current dataset and load next dataset
  useEffect(() => {
    localStorage.setItem('voxentra_industry', selectedIndustry);
    
    // Save current states from old state if user is logged in
    if (userEmail) {
      // 1. Load from localStorage, or return seed defaults
      const cachedCust = localStorage.getItem(`vox_cust_${selectedIndustry}`);
      const cachedCalls = localStorage.getItem(`vox_calls_${selectedIndustry}`);
      const cachedEmails = localStorage.getItem(`vox_emails_${selectedIndustry}`);
      const cachedFAQs = localStorage.getItem(`vox_faqs_${selectedIndustry}`);
      const cachedNotif = localStorage.getItem(`vox_notif_${selectedIndustry}`);

      setCustomers(cachedCust ? JSON.parse(cachedCust) : INITIAL_CUSTOMERS[selectedIndustry]);
      setCalls(cachedCalls ? JSON.parse(cachedCalls) : INITIAL_CALLS[selectedIndustry] || []);
      setEmails(cachedEmails ? JSON.parse(cachedEmails) : INITIAL_EMAILS[selectedIndustry] || []);
      setFaqs(cachedFAQs ? JSON.parse(cachedFAQs) : INITIAL_FAQS[selectedIndustry] || []);
      setNotifications(cachedNotif ? JSON.parse(cachedNotif) : INITIAL_NOTIFICATIONS[selectedIndustry] || []);
      
      addToast(
        language === 'en' 
          ? `Switched profile to ${selectedIndustry.toUpperCase()}`
          : `پروفائل تبدیل ہو گئی ہے: ${selectedIndustry.toUpperCase()}`,
        'info'
      );
    }
  }, [selectedIndustry, userEmail]);

  // Persist dataset updates for the active industry
  useEffect(() => {
    if (!userEmail) return;
    localStorage.setItem(`vox_cust_${selectedIndustry}`, JSON.stringify(customers));
  }, [customers, selectedIndustry, userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    localStorage.setItem(`vox_calls_${selectedIndustry}`, JSON.stringify(calls));
  }, [calls, selectedIndustry, userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    localStorage.setItem(`vox_emails_${selectedIndustry}`, JSON.stringify(emails));
  }, [emails, selectedIndustry, userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    localStorage.setItem(`vox_faqs_${selectedIndustry}`, JSON.stringify(faqs));
  }, [faqs, selectedIndustry, userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    localStorage.setItem(`vox_notif_${selectedIndustry}`, JSON.stringify(notifications));
  }, [notifications, selectedIndustry, userEmail]);

  const handleLoginSuccess = (email: string) => {
    localStorage.setItem('voxentra_user_email', email);
    setUserEmail(email);
    addToast(language === 'en' ? 'Welcome to Voxentra Gated CRM!' : 'ووکسینٹرا سسٹم میں خوش آمدید!', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('voxentra_user_email');
    setUserEmail(null);
    addToast(language === 'en' ? 'Logged out from secure node.' : 'سائن آؤٹ کر دیا گیا ہے', 'info');
  };

  if (!userEmail) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} language={language} />;
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50/50 text-slate-800'} font-sans antialiased transition-colors duration-200 overflow-hidden`}>
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header Block */}
        <Header
          language={language}
          setLanguage={setLanguage}
          selectedIndustry={selectedIndustry}
          notifications={notifications}
          setNotifications={setNotifications}
          onLogout={handleLogout}
          userEmail={userEmail}
        />

        {/* Tab Workspace Scroll container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar bg-white/40 dark:bg-slate-905/20 backdrop-blur-3xl">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              language={language}
              selectedIndustry={selectedIndustry}
              customersCount={customers.length}
              callsCount={calls.length}
              emailsCount={emails.length}
              languageType={language}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerManagement
              language={language}
              customers={customers}
              setCustomers={setCustomers}
              addToast={addToast}
            />
          )}

          {activeTab === 'calling' && (
            <AICallingCenter
              language={language}
              selectedIndustry={selectedIndustry}
              customers={customers}
              calls={calls}
              setCalls={setCalls}
              agentConfig={agentConfig}
              setAgentConfig={setAgentConfig}
              addToast={addToast}
            />
          )}

          {activeTab === 'texting' && (
            <AITextingCenter
              language={language}
              selectedIndustry={selectedIndustry}
              customers={customers}
              addToast={addToast}
            />
          )}

          {activeTab === 'email' && (
            <AIEmailCenter
              language={language}
              selectedIndustry={selectedIndustry}
              emails={emails}
              setEmails={setEmails}
              addToast={addToast}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              language={language}
              selectedIndustry={selectedIndustry}
            />
          )}

          {activeTab === 'agents' && (
            <AIAgentBuilder
              language={language}
              agentConfig={agentConfig}
              setAgentConfig={setAgentConfig}
              addToast={addToast}
            />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeBase
              language={language}
              selectedIndustry={selectedIndustry}
              faqs={faqs}
              setFaqs={setFaqs}
              addToast={addToast}
            />
          )}

          {activeTab === 'team' && (
            <TeamManagement
              language={language}
              team={team}
              setTeam={setTeam}
              addToast={addToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPanel
              language={language}
              setLanguage={setLanguage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              userEmail={userEmail}
              addToast={addToast}
            />
          )}
        </main>
      </div>

      {/* Floating AI chatbot support assistant widget */}
      <AIAssistantWidget
        language={language}
        customersCount={customers.length}
        callsCount={calls.length}
        emailsCount={emails.length}
        addToast={addToast}
      />

      {/* System Toast Alert overlay layer */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
