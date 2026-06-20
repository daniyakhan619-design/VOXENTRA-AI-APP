import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Smartphone, 
  CheckCheck, 
  Calendar, 
  Users, 
  RefreshCcw, 
  Filter, 
  Maximize2, 
  Sparkles, 
  SendHorizontal,
  ChevronRight,
  User
} from 'lucide-react';
import { TextCampaign, Customer, IndustryType } from '../types';

interface AITextingCenterProps {
  language: string;
  selectedIndustry: IndustryType;
  customers: Customer[];
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function AITextingCenter({
  language,
  selectedIndustry,
  customers,
  addToast
}: AITextingCenterProps) {
  
  // Custom templates based on Industry
  const getIndustryTemplates = (ind: IndustryType) => {
    switch (ind) {
      case 'cafe':
        return [
          { label: 'Remote Space Booking Alert', content: 'Salam {Name}! Ready for productive vibes? Your co-working glass pod at Voxentra Brew is open. Tap here to lock: vox.is/cafe-work' },
          { label: 'Beans New Batch Alert', content: 'Hey {Name}, we just hand-roasted a limited Costa Rica single-origin batch! Use VIP discount code BREW10 at checkout today: vox.is/brew' }
        ];
      case 'salon':
        return [
          { label: 'Hair and Spa Promo Reminders', content: 'Hi {Name}, treat yourself! Get 20% off all hair styling and organic herbal facials with Jessica this weekend. Book now: vox.is/salon-care' },
          { label: 'Bridal Packages Quotation followup', content: 'Hello {Name}, we loved chatting about your wedding theme! View our consolidated premium makeup options here: vox.is/wed-glow' }
        ];
      case 'clinic':
        return [
          { label: 'Routine Doctor Followup', content: 'Dear Patient {Name}, this is a gentle reminder to schedule your routine cardiac checkout with Dr. Hasan this week. Slots here: vox.is/clinic-slot' },
          { label: 'Lab Reports available', content: 'Hello {Name}, your recent lipid screening reports are ready. View secure analysis via our GDPR portal: vox.is/report' }
        ];
      case 'retail':
        return [
          { label: 'Abandoned Shopping Cart recovery', content: 'Hey {Name}, we held your Cognac Riding Leather Boots Size L at checkout counter 1! Grab 10% off if you finalize online today: vox.is/cart-save' },
          { label: 'Exclusive Stocks drop', content: 'Hi {Name}, our winter shearling coats collection just dropped in brown and black. Very limited stock. Shop here: vox.is/retail' }
        ];
      case 'restaurant':
      default:
        return [
          { label: 'Table Confirmation WhatsApp log', content: 'Salam {Name}! Your table for 4 is confirmed for 8:00 PM tonight at Voxentra Grill. View food menu & premium platters here: vox.is/menu' },
          { label: 'Weekend Biryani Promo campaign', content: 'Salam {Name}, hot supreme mutton handi deals are live at Voxentra Grill this weekend! Order online today for free delivery: vox.is/deal' }
        ];
    }
  };

  const templates = getIndustryTemplates(selectedIndustry);

  // Text state
  const [campaigns, setCampaigns] = useState<TextCampaign[]>([
    { id: 'camp-1', name: 'VIP Weekend Promo Code Blast', platform: 'WhatsApp', status: 'Sent', leadsCount: 450, templateContent: 'Salam {Name}! Hot deals are live at our shop this weekend. Order online now!' },
    { id: 'camp-2', name: 'Abandoned Checkout Auto Follow-Up', platform: 'SMS', status: 'Scheduled', scheduledTime: 'Tomorrow, 10:00 AM', leadsCount: 84, templateContent: 'Hey {Name}, we held your items at the front desk! Code SAVE10 recovers 10% off.' }
  ]);

  const [activeChatCust, setActiveChatCust] = useState<Customer>(customers[0] || {
    id: '1', name: 'Zainab Ahmed', phone: '+92 300 1234567', email: 'zainab@gmail.com', businessType: 'Restaurant', lastInteraction: 'AI Dialogue finished', status: 'Active'
  });

  const [chatMessages, setChatMessages] = useState<Record<string, { sender: 'customer' | 'ai'; text: string; time: string }[]>>({
    'rest-1': [
      { sender: 'customer', text: 'Hi, does the table booked for tonight have outdoor seating?', time: '10:05 AM' },
      { sender: 'ai', text: 'Salam Zainab! Yes, your reserved slot (Table 4) is on our outdoor veranda overlooking the garden waterfall. Shall I add special heater requests?', time: '10:06 AM' },
      { sender: 'customer', text: 'Awesome, heating would be great. Thank you!', time: '10:10 AM' }
    ]
  });

  const [newMsg, setNewMsg] = useState('');
  
  // Campaign Creator states
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campName, setCampName] = useState('');
  const [campPlatform, setCampPlatform] = useState<'SMS' | 'WhatsApp'>('WhatsApp');
  const [campTemplate, setCampTemplate] = useState(templates[0].content);

  const handleSendChatMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const key = activeChatCust.id;
    const userMsg = { sender: 'ai' as const, text: newMsg, time: 'Just Now' };
    
    setChatMessages(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), userMsg]
    }));
    setNewMsg('');

    addToast(language === 'en' ? 'Message sent securely.' : 'پیغام کامیابی سے بھیج دیا گیا۔', 'success');

    // Simulate customer reply in 3 seconds
    setTimeout(() => {
      const replies = [
        'That makes perfect sense! Please finalize that for me.',
        'Sounds good. I will check the link you sent!',
        'Excellent support. I really appreciate your quick response.',
        'Ji bilkul, perfect. Shukriya!'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const custMsg = { sender: 'customer' as const, text: randomReply, time: 'Just Now' };
      setChatMessages(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), custMsg]
      }));
      addToast(language === 'en' ? `New Whatsapp reply from ${activeChatCust.name}` : `صارف ${activeChatCust.name} کا نیا جواب موصول ہوا ہے`, 'notification');
    }, 2500);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName) return;

    const newCamp: TextCampaign = {
      id: `camp-${Date.now()}`,
      name: campName,
      platform: campPlatform,
      status: 'Scheduled',
      scheduledTime: 'In 30 minutes',
      leadsCount: customers.length,
      templateContent: campTemplate
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setCampName('');
    setShowCampaignModal(false);
    addToast(
      language === 'en' ? `Campaign "${campName}" scheduled successfully!` : `مہم "${campName}" کامیابی سے شیڈول کر دی گئی!`,
      'success'
    );
  };

  const activeHistory = chatMessages[activeChatCust.id] || [
    { sender: 'customer', text: 'Hi, can you confirm my account details?', time: 'Yesterday' },
    { sender: 'ai', text: 'Welcome to Voxentra intelligent workspace. I have reviewed your CRM file and all data stands synchronized.', time: 'Yesterday' }
  ];

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
            {language === 'en' ? 'AI Texting, WhatsApp & SMS Campaigns' : 'ایس ایم ایس اور واٹس ایپ مہمات'}
          </h2>
          <p className="text-xs text-slate-455">
            Design promotional broadcasts, handle automated abandoned-cart WhatsApp recovery, and converse live.
          </p>
        </div>
        <button
          onClick={() => setShowCampaignModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition shadow-lg shadow-indigo-600/10"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Create Text Campaign' : 'مہم تشکیل دیں'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live WhatsApp & SMS Chat simulator */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[520px] shadow-sm">
          {/* Chat Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850/60 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 font-bold text-sm text-white flex items-center justify-center uppercase">
                {activeChatCust.name.slice(0, 2)}
              </div>
              <div className="text-left">
                <h3 className="text-xs font-bold text-slate-850 dark:text-slate-105">{activeChatCust.name}</h3>
                <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  WhatsApp (Bilingual Bot Enabled)
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-800 border border-slate-150 dark:border-slate-850 px-2 py-1 rounded-lg">
                ID: {activeChatCust.id}
              </span>
            </div>
          </div>

          {/* Messages stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20 scrollbar text-left">
            {activeHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[70%] ${msg.sender === 'ai' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'ai'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-150 rounded-bl-none border border-slate-150 dark:border-slate-800 shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat input box */}
          <form onSubmit={handleSendChatMsg} className="p-4 border-t border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type your WhatsApp reply (supports Urdu mix)..."
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-850 text-xs text-slate-800 dark:text-slate-150 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer transition shadow-lg shadow-indigo-600/10"
              title="Send automated message"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Mini Client selection list and Text templates */}
        <div className="space-y-6">
          
          {/* Active Campaigns list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono text-left">
              Current Text Broadcast Campaigns
            </h3>

            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div 
                  key={camp.id}
                  className="p-3 bg-slate-50 dark:bg-slate-850/40 rounded-xl border border-slate-150 dark:border-slate-800 text-left flex items-start gap-3 justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-150">{camp.name}</p>
                    <p className="text-[10px] text-slate-400 leading-snug">{camp.templateContent}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded">
                        {camp.platform}
                      </span>
                      <span className="text-[9px] font-mono text-slate-405">
                        <Users className="w-3 h-3 inline mr-0.5" />
                        {camp.leadsCount} contacts
                      </span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    camp.status === 'Sent' 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400' 
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {camp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Templates helper */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono text-left">
              AI Speech Templates Suggested
            </h4>
            <div className="space-y-2">
              {templates.map((temp, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setNewMsg(temp.content.replace('{Name}', activeChatCust.name));
                    addToast(language === 'en' ? 'Template copied to prompt chat input.' : 'ٹیمپلیٹ نیچے ان پٹ میں کاپی کر دیا گیا ہے', 'info');
                  }}
                  className="w-full text-left p-3 bg-indigo-50/30 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl border border-indigo-100/40 dark:border-indigo-900/40 transition block cursor-pointer"
                >
                  <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {temp.label}
                  </p>
                  <p className="text-xs text-slate-550 dark:text-slate-400 truncate-2-lines line-clamp-2 leading-relaxed">
                    {temp.content}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Contacts selection tracker */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono text-left">
              Switch Live CRM Contact
            </h4>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {customers.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChatCust(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                    activeChatCust.id === c.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300 hover:bg-slate-150'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Campaign Creator Overlay Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {language === 'en' ? 'Launch New Automated Text Campaign' : 'نئی ٹیکسٹ مہم شروع کریں'}
              </h3>
              <button onClick={() => setShowCampaignModal(false)} className="text-slate-400 hover:text-slate-650">
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
              <div className="space-y-1 text-left font-sans">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                  placeholder="e.g., Weekend Mutton Platters WhatsApp"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Communication Channel</label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setCampPlatform('WhatsApp')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition ${
                      campPlatform === 'WhatsApp'
                        ? 'border-emerald-500 bg-emerald-50/20 text-emerald-600'
                        : 'border-slate-200 text-slate-605 hover:border-slate-350'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                    WhatsApp Bot Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setCampPlatform('SMS')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition ${
                      campPlatform === 'SMS'
                        ? 'border-indigo-500 bg-indigo-50/25 text-indigo-600'
                        : 'border-slate-200 text-slate-605'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-indigo-500" />
                    SMS Campaign Gate
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SMS Template Body *</label>
                <textarea
                  required
                  rows={4}
                  value={campTemplate}
                  onChange={(e) => setCampTemplate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none resize-none"
                />
                <span className="text-[9px] text-slate-400 leading-normal block">Use variables tags like {`{Name}`} to auto-inject CRM fields during outbound pipelines.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Schedule & Spawn Bot Outbound
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
