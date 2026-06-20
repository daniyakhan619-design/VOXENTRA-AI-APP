import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  Send, 
  Check, 
  Inbox, 
  Clock, 
  AlertCircle, 
  User, 
  ChevronRight, 
  Calendar, 
  FileText,
  UserCheck
} from 'lucide-react';
import { EmailMessage, IndustryType } from '../types';
import { INITIAL_EMAILS } from '../data';

interface AIEmailCenterProps {
  language: string;
  selectedIndustry: IndustryType;
  emails: EmailMessage[];
  setEmails: React.Dispatch<React.SetStateAction<EmailMessage[]>>;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function AIEmailCenter({
  language,
  selectedIndustry,
  emails,
  setEmails,
  addToast
}: AIEmailCenterProps) {
  
  const [selectedId, setSelectedId] = useState<string>(
    emails[0]?.id || 'email-1'
  );

  const [draftReply, setDraftReply] = useState<string>('');
  const [isAIGenerating, setIsAIGenerating] = useState<boolean>(false);

  const selectedEmail = emails.find(e => e.id === selectedId) || emails[0];

  const handleGenerateReply = () => {
    if (!selectedEmail) return;
    setIsAIGenerating(true);
    addToast(language === 'en' ? 'AI reviewing customer history and drafting response...' : 'اے آئی تاریخچہ کا جائزہ لے رہا ہے...', 'info');

    setTimeout(() => {
      setDraftReply(selectedEmail.aiSuggestedReply || 'Hello, thank you for reaching out to Voxentra. We have recorded your request in our database and our customer success director will follow up with you within 2 business hours.');
      setIsAIGenerating(false);
      addToast(language === 'en' ? 'Bilingual AI reply formulated!' : 'اے آئی جواب تیار کر لیا گیا ہے!', 'success');
    }, 1500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail) return;

    if (!draftReply.trim()) {
      addToast(language === 'en' ? 'Please generate or write a draft first' : 'براہ کرم پہلے جواب لکھیں یا اے آئی جواب تیار کریں', 'error');
      return;
    }

    // Update status to Replied
    setEmails(prev => prev.map(m => m.id === selectedEmail.id ? { ...m, status: 'Replied' } : m));
    addToast(language === 'en' ? `Reply sent securely to ${selectedEmail.fromEmail}` : `جواب ${selectedEmail.fromEmail} پر ارسال کر دیا گیا`, 'success');
    setDraftReply('');
  };

  const getCategoryClass = (cat: string) => {
    switch (cat) {
      case 'Complaint': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-100';
      case 'Booking': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100';
      case 'Enquiry': return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 border border-indigo-100';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* Title Banner */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
          {language === 'en' ? 'AI Smart Email Concierge & Inbox' : 'خودکار ای میل ان باکس مینیجر'}
        </h2>
        <p className="text-xs text-slate-455">
          Leverage LLM contextual suggestions to resolve booking changes, complaints, sales requests, and draft replies instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Email list index */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-4 shadow-sm h-[580px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2 text-left">
                <Inbox className="w-4 h-4 text-indigo-500" />
                SME Customer Inbox ({emails.filter(e => e.status !== 'Replied').length} Pending)
              </h3>
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto scrollbar">
              {emails.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  All customer queries processed!
                </div>
              ) : (
                emails.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedId(m.id);
                      setDraftReply('');
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl flex flex-col gap-1.5 border hover:border-indigo-400 select-none block transition ${
                      selectedId === m.id
                        ? 'bg-indigo-550/15 border-indigo-500 dark:bg-indigo-950/40'
                        : 'bg-slate-50/50 dark:bg-slate-850/40 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1 overflow-hidden">
                      <span className="font-bold text-xs text-slate-850 dark:text-slate-105 truncate">{m.fromName}</span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{m.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{m.subject}</p>
                    <p className="text-[10px] text-slate-450 truncate line-clamp-1">{m.body}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getCategoryClass(m.category)}`}>
                        {m.category}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        m.status === 'Replied'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Email Reading pane & Custom suggestion engine */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[580px]">
          
          {selectedEmail ? (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              
              {/* Header Info */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-705 dark:text-slate-300 flex items-center justify-center font-bold text-sm uppercase">
                      {selectedEmail.fromName.slice(0, 2)}
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-slate-850 dark:text-slate-105">{selectedEmail.fromName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{selectedEmail.fromEmail}</p>
                    </div>
                  </div>
                  
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryClass(selectedEmail.category)}`}>
                    {selectedEmail.category} Case Profile
                  </span>
                </div>

                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider">Email Subject</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-150 mt-1">{selectedEmail.subject}</p>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-850/30 border border-slate-150/40 dark:border-slate-850 rounded-2xl overflow-y-auto scrollbar text-left text-xs leading-relaxed text-slate-705 dark:text-slate-300">
                {selectedEmail.body}
              </div>

              {/* Suggestions / Draft Action block */}
              <div className="space-y-3 bg-indigo-50/20 dark:bg-indigo-950/20 border border-indigo-150/40 dark:border-indigo-900/40 rounded-2xl p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-505 animate-pulse" />
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Voxentra Suggested CRM Auto-Response
                    </span>
                  </div>
                  
                  <button
                    onClick={handleGenerateReply}
                    disabled={isAIGenerating}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg cursor-pointer transition flex items-center gap-1 shadow-sm shadow-indigo-600/10"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isAIGenerating ? 'Analyzing History...' : 'Generate AI Response'}</span>
                  </button>
                </div>

                <form onSubmit={handleSendEmail} className="space-y-3 text-left">
                  <textarea
                    rows={4}
                    value={draftReply}
                    onChange={(e) => setDraftReply(e.target.value)}
                    placeholder="Click 'Generate AI Response' above to fetch suggested reply instantly, or write your own manual reply..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-700 dark:text-slate-200 focus:outline-none resize-none font-sans"
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="text-[9px] text-slate-430 max-w-sm">
                      * Sending will automatically update CRM ticket state to <strong>Replied</strong> and index the customer conversation.
                    </div>
                    
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-650/10"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Transmit Email Draft' : 'ای میل بھیجیں'}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Mail className="w-12 h-12 text-slate-300 mb-3" />
              <span>Select an email on the left panel to load active conversations</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
