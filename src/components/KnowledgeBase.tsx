import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Trash2, 
  FileText, 
  Cpu, 
  Check, 
  Sliders, 
  Tags, 
  SearchCode, 
  Zap,
  Tag
} from 'lucide-react';
import { FAQItem, IndustryType } from '../types';

interface KnowledgeBaseProps {
  language: string;
  selectedIndustry: IndustryType;
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function KnowledgeBase({
  language,
  selectedIndustry,
  faqs,
  setFaqs,
  addToast
}: KnowledgeBaseProps) {
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Create FAQ states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCat, setNewCat] = useState('Amenities');
  const [newTagsStr, setNewTagsStr] = useState('');

  // AI Learning State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProg, setSyncProg] = useState(0);

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

  const handleCreateFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) {
      addToast(language === 'en' ? 'Fields must not be blank' : 'کوائف خالی نہیں چھوڑ سکتے', 'error');
      return;
    }

    const tagsArr = newTagsStr.split(',').map(s => s.trim()).filter(Boolean);
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
      category: newCat,
      tags: tagsArr.length > 0 ? tagsArr : ['Support']
    };

    setFaqs(prev => [newItem, ...prev]);
    addToast(language === 'en' ? 'FAQ stored in memory.' : 'معلومات لاگ رجسٹر ہو گئی۔', 'success');

    // Reset fields
    setNewQuestion('');
    setNewAnswer('');
    setNewTagsStr('');
    setShowAddForm(false);

    // Trigger simulated learning sync progress bar!
    triggerAISync();
  };

  const triggerAISync = () => {
    setIsSyncing(true);
    setSyncProg(0);
    addToast(language === 'en' ? 'AI beginning learning sync on raw text updates!' : 'اے آئی نئی معلومات سیکھ رہا ہے...', 'info');

    const interval = setInterval(() => {
      setSyncProg((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSyncing(false);
            addToast(language === 'en' ? 'AI semantic alignment finalized! 14 items synced.' : 'اے آئی لرننگ الائنمنٹ مکمل ہو گئی ہے!', 'success');
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const handleDeleteFAQ = (id: string, name: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    addToast(language === 'en' ? `FAQ deleted from knowledge index.` : `معلومات کامیابی سے خارج کر دی گئیں۔`, 'info');
  };

  const filteredFAQs = faqs.filter(f => {
    const query = search.toLowerCase();
    const matchesSearch = f.question.toLowerCase().includes(query) || 
                          f.answer.toLowerCase().includes(query) ||
                          f.tags.some(t => t.toLowerCase().includes(query));
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in text-left select-none">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
            {language === 'en' ? 'AI Knowledge Base Management' : 'اے آئی معلومات کا مرکز'}
          </h2>
          <p className="text-xs text-slate-455">
            Store FAQs, cancellation policies, and details. Your Calling agent references this index to respond accurately.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={triggerAISync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <RefreshCwIcon className={`w-3.5 h-3.5 text-indigo-505 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>AI Learn Sync</span>
          </button>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer shadow shadow-indigo-600/10"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'en' ? 'Add Knowledge Item' : 'نیا ریکارڈ شامل کریں'}</span>
          </button>
        </div>
      </div>

      {/* AI Embedding learning bar */}
      {isSyncing && (
        <div className="p-5 bg-indigo-950 text-white rounded-2xl space-y-2 animate-scale-in border border-indigo-900">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400 animate-spin" />
              Voxentra AI Indexer fine-tuning text embeddings...
            </span>
            <span className="font-mono font-bold text-indigo-300">{syncProg}% Complete</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-500 h-1.5 transition-all duration-300 rounded-full" style={{ width: `${syncProg}%` }}></div>
          </div>
        </div>
      )}

      {/* Search and Categories bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-150 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'en' ? 'Search FAQs, policy topics...' : 'معلومات کی تلاش...'}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border rounded-xl text-xs text-slate-800"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto shrink-0 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-whiteShadow text-white'
                  : 'bg-slate-50 text-slate-650 hover:bg-slate-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List and Learning preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFAQs.map((faq) => (
            <div 
              key={faq.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-150/80 shadow-sm space-y-3 relative group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-lg font-mono tracking-wider uppercase">
                    {faq.category}
                  </span>
                  <h3 className="text-xs font-bold text-slate-850 dark:text-slate-105">{faq.question}</h3>
                </div>

                <button
                  onClick={() => handleDeleteFAQ(faq.id, faq.question)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-350">
                {faq.answer}
              </p>

              <div className="flex gap-1.5 pt-1 flex-wrap">
                {faq.tags.map(t => (
                  <span key={t} className="text-[9px] text-slate-405 font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="p-12 text-center text-slate-400 bg-white border border-slate-150 rounded-2xl">
              No matching knowledge items indexed.
            </div>
          )}
        </div>

        {/* Sidebar help / Status card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-3xl p-5 shadow-sm space-y-4 text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
              Real-Time indexing triggers
            </h4>
            <p className="text-xs text-slate-550 leading-relaxed">
              When calls connect, the AI agent matches user intents against this indexed catalog. For instance, if an incoming customer asks a timing question, the AI parses the timing FAQ category and synthesizes speech responses instantly.
            </p>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span className="text-[10px] text-indigo-700 font-bold">100% Matching Comprehension</span>
            </div>
          </div>
        </div>

      </div>

      {/* Add Modal Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-white border-slate-150 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {language === 'en' ? 'Add FAQ to AI Memory Index' : 'نئی معلومات فائل کریں'}
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-650">
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateFAQ} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question / Intent Topic *</label>
                <input
                  type="text"
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. Do you accept cards?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Detailed Answer / AI Synthesis *</label>
                <textarea
                  required
                  rows={4}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Yes, we accept Visa, Mastercard, and digital wallets. Payments can be authorized upon dining."
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-xs border border-slate-202 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 text-xs border border-slate-205 rounded-xl"
                  >
                    <option>Policies</option>
                    <option>Amenities</option>
                    <option>Timing</option>
                    <option>Dietary</option>
                    <option>Billing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTagsStr}
                    onChange={(e) => setNewTagsStr(e.target.value)}
                    placeholder="cards, visa, pay"
                    className="w-full px-3 py-2 bg-slate-50 text-xs border border-slate-202 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Index with Semantic Router
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline custom refresh icon
function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
      <path d="M16 16h5v5"/>
    </svg>
  );
}
