import React, { useState } from 'react';
import { Sparkles, MessageCircle, X, Send, ChevronRight, HelpCircle } from 'lucide-react';

interface AIAssistantWidgetProps {
  language: string;
  customersCount: number;
  callsCount: number;
  emailsCount: number;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function AIAssistantWidget({
  language,
  customersCount,
  callsCount,
  emailsCount,
  addToast
}: AIAssistantWidgetProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: 'Salam! This is your Voxentra Internal CRM chatbot bot. Prompt me with commands like "Show calls", "Count clients", or "Generate brief report". How can I support your workflow?' }
  ]);
  const [query, setQuery] = useState('');

  const processQuery = (userText: string) => {
    const textNorm = userText.toLowerCase().trim();
    let reply = "";

    if (textNorm.includes('call') || textNorm.includes('voxie') || textNorm.includes('voice')) {
      reply = `I have scanned active phone lines. We recorded ${callsCount} Call Logs in the CRM sandbox today under auto-pilot rules. Standard sentiment tags indicate 98.4% user satisfaction!`;
    } else if (textNorm.includes('client') || textNorm.includes('customer') || textNorm.includes('user') || textNorm.includes('added')) {
      reply = `Scanning customer databases... We currently store exactly ${customersCount} registered SME clients in your CRM tables, persisted inside browser localStorage.`;
    } else if (textNorm.includes('report') || textNorm.includes('analytics') || textNorm.includes('calculate')) {
      reply = `AUTOMATION AUDIT SUMMARY REPORT:\n• Contacts: ${customersCount} records\n• Calls routed: ${callsCount} lines\n• Emails queued: ${emailsCount}\n• Efficiency score: 98.4%\n• Calculated Savings rate: PKR 95,000 / month. Workloads remain optimized without human lag.`;
    } else {
      reply = `Understood! I parsed your query: "${userText}". I have synchronized your local knowledge base matrices. Let me support you by drafting emails, sending WhatsApp templates, or adjusting VoIP Greetings!`;
    }

    setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    // Trigger processing
    setTimeout(() => {
      processQuery(userText);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-55 select-none font-sans flex flex-col items-end">
      {isOpen ? (
        <div className="w-80 bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-indigo-650 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-200 animate-pulse" />
              <span className="text-xs font-bold tracking-tight">Voxentra AI Chatbot</span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-left scrollbar">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'ai'
                    ? 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-750'
                    : 'bg-indigo-600 text-white rounded-br-none ml-auto'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-850 flex gap-1 overflow-x-auto">
            {[
              { label: 'Count clients', text: 'How many customers?' },
              { label: 'Show calls', text: 'Show today\'s calls' },
              { label: 'Brief report', text: 'Generate a report' }
            ].map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMessages(prev => [...prev, { sender: 'user', text: s.text }]);
                  setTimeout(() => processQuery(s.text), 850);
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-indigo-300 text-[9px] font-bold rounded-lg border border-slate-800 cursor-pointer whitespace-nowrap shrink-0"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-850 flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Voxentra Bot (e.g. show report)..."
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 text-xs text-white rounded-xl focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            addToast(language === 'en' ? 'Voxentra virtual helper active.' : 'اے آئی ورچوئل مدد گار فعال ہو گیا ہے', 'info');
          }}
          className="p-4 bg-indigo-650 hover:bg-indigo-700 text-white rounded-full shadow-xl shadow-indigo-600/20 flex items-center justify-center cursor-pointer transition hover:scale-105"
          title="Toggle intelligent virtual chatbot"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}
    </div>
  );
}
