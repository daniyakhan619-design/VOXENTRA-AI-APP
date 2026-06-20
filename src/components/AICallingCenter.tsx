import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Settings, 
  Volume2, 
  Clock, 
  Sliders, 
  PhoneOff, 
  Headphones
} from 'lucide-react';
import { CallLog, Customer, IndustryType, AIAgentConfig } from '../types';

interface AICallingCenterProps {
  language: string;
  selectedIndustry: IndustryType;
  customers: Customer[];
  calls: CallLog[];
  setCalls: React.Dispatch<React.SetStateAction<CallLog[]>>;
  agentConfig: AIAgentConfig;
  setAgentConfig: React.Dispatch<React.SetStateAction<AIAgentConfig>>;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function AICallingCenter({
  language,
  selectedIndustry,
  customers,
  calls,
  setCalls,
  agentConfig,
  setAgentConfig,
  addToast
}: AICallingCenterProps) {
  
  // Simulated conversation transcript for live call center based on industry
  const getCallScript = (industry: IndustryType, customerName: string) => {
    switch (industry) {
      case 'cafe':
        return [
          { sender: 'AI', text: `Hi! Thank you for calling Voxentra Brew Café. I am Voxie, your smart virtual assistant. How can I assist you today?` },
          { sender: 'Customer', text: `Hey, I want to book the remote working conference box for 4 hours today. Is it free?` },
          { sender: 'AI', text: `Let me check real-time seats... Yes! Our 'Synergy Glass Pod' is open from 1 PM to 5 PM today. The rate is PKR 1,500 including high-speed fiber internet & complimentary green teas. Shall I book this slot for ${customerName}?` },
          { sender: 'Customer', text: `That fits perfect, register it under my name and send me the booking ticket.` },
          { sender: 'AI', text: `Done! I have safely locked the reservation. You will receive the booking voucher with directions via SMS. Looking forward to welcoming you!` }
        ];
      case 'salon':
        return [
          { sender: 'AI', text: `Salam! Thank you for contacting Voxentra Beauty Salon & Spa. This is Voxie. How can I pamper you today?` },
          { sender: 'Customer', text: `Hi, I need a luxury hair styling and facial booking with Jessica today.` },
          { sender: 'AI', text: `Let me consult Jessica's schedule... She is free at 3:00 PM and 5:00 PM today. Our facial spa uses 100% natural organic tea extracts. Which slot works best?` },
          { sender: 'Customer', text: `Let's go for 3:00 PM.` },
          { sender: 'AI', text: `Perfect! Appointment confirmed with Jessica at 3:00 PM. I am dispatching a custom WhatsApp reminder map now. Have an amazing day!` }
        ];
      case 'clinic':
        return [
          { sender: 'AI', text: `Hello, you have reached Voxentra Medical Family Clinic Support Desk. I am Voxie. How can I assist with your appointment today?` },
          { sender: 'Customer', text: `I need to schedule a consultation with Cardiologist Dr. Hasan on Friday.` },
          { sender: 'AI', text: `Let me cross-reference the roster... Dr. Hasan has open slots on Friday at 2:15 PM and 4:30 PM. Shall I lock the 4:30 PM slot?` },
          { sender: 'Customer', text: `Yes, 4:30 PM works. My name is ${customerName}.` },
          { sender: 'AI', text: `I have found your profile in our patient registry. Your cardiology session is successfully scheduled for Friday at 4:30 PM in Room 12. Have a healthy day!` }
        ];
      case 'retail':
        return [
          { sender: 'AI', text: `Hi there! Thank you for reaching Voxentra Premium Retail Bot. I am Voxie. How can I help with your inventory request?` },
          { sender: 'Customer', text: `Hey, is the cognac leather winter boots size Large currently in stock at the front counter?` },
          { sender: 'AI', text: `Scanning retail POS system... Yes! We have exactly 2 pairs left of the Cognac Leather Riding Boots in size Large. I have reserved one pair under your name for 24 hours. Would you like a delivery checkout instead?` },
          { sender: 'Customer', text: `No, holding it at the counter is great. I'll pick it up in an hour.` },
          { sender: 'AI', text: `Excellent! Your item is reserved and placed behind counter 1. See you soon!` }
        ];
      case 'restaurant':
      default:
        return [
          { sender: 'AI', text: `Salam! Thank you for calling Voxentra Restaurant. I am Voxie, your virtual dining concierge. Looking for a table reservation or placing an order today?` },
          { sender: 'Customer', text: `Hello, I'd like to book a table for 4 tonight around 8:00 PM.` },
          { sender: 'AI', text: `Analyzing floor chart... Yes, I have a gorgeous windows view table open at 8:00 PM. It features comfortable lounge seating. Shall I lock this under your profile?` },
          { sender: 'Customer', text: `Yes please, that sounds great.` },
          { sender: 'AI', text: `Reservation confirmed for 4 guests under ${customerName} tonight at 8:00 PM. See you soon!` }
        ];
    }
  };

  const [activeCallCust, setActiveCallCust] = useState<Customer | null>(null);
  const [callState, setCallState] = useState<'idle' | 'dialing' | 'connected' | 'completed'>('idle');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [simulatedTrans, setSimulatedTrans] = useState<{ sender: string; text: string }[]>([]);
  const [voiceType, setVoiceType] = useState(agentConfig.voiceAgent.voiceType);

  // Greeting Message override state
  const [greeting, setGreeting] = useState(agentConfig.voiceAgent.greeting);

  useEffect(() => {
    // Reset greeting to default config when industry changes
    setGreeting(agentConfig.voiceAgent.greeting);
  }, [selectedIndustry, agentConfig.voiceAgent.greeting]);

  // Handle simulation ticker
  useEffect(() => {
    if (callState !== 'connected' || !activeCallCust) return;
    
    const script = getCallScript(selectedIndustry, activeCallCust.name);
    if (scriptIndex < script.length) {
      const timer = setTimeout(() => {
        // Append dialogue line
        const relativeLine = script[scriptIndex];
        // If it's the AI first line, we inject the customized greeting!
        if (scriptIndex === 0) {
          relativeLine.text = greeting || relativeLine.text;
        }

        setSimulatedTrans(prev => [...prev, relativeLine]);
        setScriptIndex(prev => prev + 1);
      }, 3300); // dialogue transition timer
      return () => clearTimeout(timer);
    } else {
      // Script completed, safely wrap up call
      const timer = setTimeout(() => {
        handleEndCall(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [callState, scriptIndex, activeCallCust, selectedIndustry, greeting]);

  const startCallSimulation = (customer: Customer) => {
    setActiveCallCust(customer);
    setCallState('dialing');
    setScriptIndex(0);
    setSimulatedTrans([]);
    addToast(language === 'en' ? `Dialing ${customer.name}...` : `${customer.name} کو کال ملائی جا رہی ہے...`, 'info');

    // Simulate connection after 2 seconds
    setTimeout(() => {
      setCallState('connected');
      addToast(language === 'en' ? 'AI Voice Agent connected.' : 'اے آئی وائس ایجنٹ منسلک ہو گیا ہے گرافکس۔', 'success');
    }, 2200);
  };

  const handleEndCall = (success = false) => {
    if (!activeCallCust) return;
    
    setCallState('completed');
    
    // Add call log to root calls state
    const newLog: CallLog = {
      id: `call-${Date.now()}`,
      customerName: activeCallCust.name,
      phone: activeCallCust.phone,
      time: 'Just Now',
      duration: '1m 45s',
      status: 'Completed',
      sentiment: 'Positive',
      summary: `Automated simulation call completed successfully. Greeting configured was: "${greeting.slice(0, 45)}...". Customer confirmed details.`
    };
    
    setCalls(prev => [newLog, ...prev]);
    addToast(language === 'en' ? 'AI call summarized & saved in CRM.' : 'کال کا خلاصہ محفوظ کر لیا گیا ہے۔', 'success');

    setTimeout(() => {
      setCallState('idle');
      setActiveCallCust(null);
    }, 1500);
  };

  const saveGreeting = () => {
    setAgentConfig(prev => ({
      ...prev,
      voiceAgent: {
        ...prev.voiceAgent,
        greeting,
        voiceType
      }
    }));
    addToast(language === 'en' ? 'AI Voice settings locked.' : 'اے آئی وائس ترتیبات محفوظ ہو گئیں۔', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Title Banner */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
          {language === 'en' ? 'AI Calling Agent Command Center & Dialers' : 'کلائنٹ وائس کالز خودکار نظام'}
        </h2>
        <p className="text-xs text-slate-455">
          Take automated inbound or outbound VoIP campaigns, fine-tune voice speech models, and watch live calling waves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Interface: Call logs or Live calling panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm col-span-2 space-y-6">
          
          {callState !== 'idle' ? (
            /* ACTIVE VOIP SIMULATION PANEL */
            <div className="p-6 bg-slate-950 text-white rounded-2xl border border-slate-800 flex flex-col justify-between min-h-[420px] relative overflow-hidden animate-scale-in">
              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-[9px] font-bold rounded border border-rose-500/30 animate-pulse">
                    {callState === 'dialing' ? 'ESTABLISHING HANDSHAKE' : 'LIVE VOIP LINK'}
                  </span>
                  <h3 className="text-lg font-bold font-display mt-2">{activeCallCust?.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{activeCallCust?.phone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">VOICE SYNTH ACCENT</p>
                    <p className="text-xs font-semibold text-indigo-400">{voiceType}</p>
                  </div>
                  <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
                    <Headphones className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Animated Central Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-32 my-6">
                {callState === 'connected' ? (
                  <>
                    <div className="w-1 bg-emerald-450 rounded-full animate-wave-1"></div>
                    <div className="w-1 bg-emerald-400 rounded-full animate-wave-2"></div>
                    <div className="w-1 bg-teal-400 rounded-full animate-wave-3"></div>
                    <div className="w-1 bg-indigo-500 rounded-full animate-wave-4"></div>
                    <div className="w-1 bg-indigo-405 rounded-full animate-wave-5"></div>
                    <div className="w-1 bg-emerald-400 rounded-full animate-wave-6"></div>
                    <div className="w-1 bg-emerald-450 rounded-full animate-wave-2"></div>
                    <div className="w-1 bg-teal-400 rounded-full animate-wave-1"></div>
                  </>
                ) : (
                  <div className="text-xs text-slate-500 font-mono animate-pulse">
                    Connecting SIP trunk multiplexers...
                  </div>
                )}
              </div>

              {/* Dialogue Transcript Stream */}
              <div className="flex-1 bg-slate-900/60 rounded-xl p-4 border border-slate-800 max-h-48 overflow-y-auto space-y-3 mb-6 scrollbar">
                {simulatedTrans.length === 0 ? (
                  <div className="text-center text-[11px] text-slate-500 italic py-4">
                    Awaiting conversational audio packets...
                  </div>
                ) : (
                  simulatedTrans.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                        line.sender === 'AI' 
                          ? 'bg-indigo-950/60 border border-indigo-900/50 mr-auto text-indigo-200' 
                          : 'bg-slate-800/80 ml-auto text-slate-300'
                      }`}
                    >
                      <span className="block text-[8px] font-bold font-mono tracking-wider opacity-60 mb-0.5">
                        {line.sender === 'AI' ? 'VOXENTRA AGENT' : 'CUSTOMER DIALOGUE'}
                      </span>
                      {line.text}
                    </div>
                  ))
                )}
              </div>

              {/* Controls Footer */}
              <div className="flex justify-between items-center bg-slate-900 -mx-6 -mb-6 p-4 border-t border-slate-800 rounded-b-2xl">
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Local Host G-711 Line Codec
                </span>
                
                <button
                  onClick={() => handleEndCall(false)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition shadow-lg shadow-rose-600/25"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>{language === 'en' ? 'Terminate Stream' : 'کال ختم کریں'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Call Log Workspace */
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {language === 'en' ? 'CRM Registry Outbound Dialer' : 'باہر بھیجی جانے والی کالز'}
                </h3>
                <span className="text-[10px] text-slate-400">Select any client to prompt AI Call simulation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map((cust) => (
                  <div 
                    key={cust.id}
                    className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center justify-between hover:border-indigo-400 group transition duration-150"
                  >
                    <div className="space-y-1 text-left">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{cust.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{cust.phone}</p>
                      <span className="inline-block px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold rounded">
                        {cust.businessType}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => startCallSimulation(cust)}
                      className="p-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-indigo-600 hover:text-white transition group-hover:scale-105 cursor-pointer shadow-sm"
                      title="Initiate AI Voice call outbound"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Call History list */}
              <div className="mt-8 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  {language === 'en' ? 'Recent Audio call history logs' : 'حالیہ کال تفصیلات'}
                </h4>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden">
                  {calls.map((c) => (
                    <div key={c.id} className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50/40 dark:hover:bg-slate-805 transition flex items-start gap-4 justify-between">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{c.customerName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.phone}</span>
                          <span className="text-[10px] text-slate-450 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {c.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                          <span className="font-bold text-indigo-500">AI Summary: </span>
                          {c.summary}
                        </p>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full">
                          {c.sentiment || 'Positive'} Key
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1 font-mono">{c.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* AI Voice Agent fine tuning settings card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-150">
              {language === 'en' ? 'Fine-Tuning Configuration' : 'ایجنٹ ٹیوننگ ترتیبات'}
            </h3>
          </div>

          <div className="space-y-4 text-left">
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Voice Profile Accent</label>
              <select
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-705 dark:text-slate-200 rounded-xl px-3 py-2.5 outline-none"
              >
                <option value="Female - Friendly Bilingual">Female - Friendly (Urdu/English Mix)</option>
                <option value="Male - Professional English">Male - Professional Accent (English)</option>
                <option value="Female - Urdu Soft Tone">Female - Urdu Soft Tone (اردو)</option>
                <option value="Male - Energetic Business">Male - Energetic Business (Bilingual)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VoIP SIP Greeting Message</label>
              <textarea
                rows={5}
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-xs text-slate-700 dark:text-slate-200 rounded-xl p-3 outline-none resize-none"
              />
              <span className="text-[9px] text-slate-430 leading-snug block">
                Greeting message supports dynamic tags. Leave variables to let AI contextuate CRM fields dynamically.
              </span>
            </div>

            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-150 dark:border-indigo-900/50 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                Speech Synthesis rate
              </h4>
              <p className="text-[10px] text-slate-500 leading-snug">
                Manage the pace of pronunciation for English-Urdu phonetic mixes.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <span className="text-[10px] text-slate-400 font-mono font-medium">0.8x Slow</span>
                <input 
                  type="range" 
                  min="0.8" 
                  max="1.8" 
                  step="0.1" 
                  defaultValue="1.0"
                  className="flex-1 accent-indigo-650 h-1 bg-slate-200 rounded"
                />
                <span className="text-[10px] text-slate-400 font-mono font-medium">1.8x Fast</span>
              </div>
            </div>

            <button
              onClick={saveGreeting}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition"
            >
              Update AI Speech Synthesis
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
