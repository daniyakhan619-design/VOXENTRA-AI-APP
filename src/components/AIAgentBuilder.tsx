import React, { useState } from 'react';
import { 
  Sliders, 
  Cpu, 
  Sparkles, 
  CheckCircle, 
  Volume2, 
  MessageSquare, 
  Mail, 
  User, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { AIAgentConfig, LanguageType } from '../types';

interface AIAgentBuilderProps {
  language: string;
  agentConfig: AIAgentConfig;
  setAgentConfig: React.Dispatch<React.SetStateAction<AIAgentConfig>>;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function AIAgentBuilder({
  language,
  agentConfig,
  setAgentConfig,
  addToast
}: AIAgentBuilderProps) {
  
  const [activeSubTab, setActiveSubTab] = useState<'voice' | 'text' | 'email'>('voice');
  
  // Local state form values derived from config
  const [voiceName, setVoiceName] = useState(agentConfig.voiceAgent.name);
  const [voiceGreeting, setVoiceGreeting] = useState(agentConfig.voiceAgent.greeting);
  const [voiceLang, setVoiceLang] = useState(agentConfig.voiceAgent.language);
  const [voiceEscalation, setVoiceEscalation] = useState(agentConfig.voiceAgent.escalationRules);
  
  const [textTone, setTextTone] = useState(agentConfig.textAgent.tone);
  const [textFallback, setTextFallback] = useState(agentConfig.textAgent.faqFallback);
  const [textAuto, setTextAuto] = useState(agentConfig.textAgent.autoRepliesEnabled);

  const [emailSig, setEmailSig] = useState(agentConfig.emailAgent.signature);
  const [emailDays, setEmailDays] = useState(agentConfig.emailAgent.followUpDays);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setAgentConfig({
      voiceAgent: {
        name: voiceName,
        greeting: voiceGreeting,
        language: voiceLang,
        escalationRules: voiceEscalation,
        voiceType: agentConfig.voiceAgent.voiceType,
        speechRate: agentConfig.voiceAgent.speechRate
      },
      textAgent: {
        tone: textTone,
        autoRepliesEnabled: textAuto,
        faqFallback: textFallback
      },
      emailAgent: {
        signature: emailSig,
        followUpDays: emailDays,
        templatesCount: agentConfig.emailAgent.templatesCount
      }
    });

    addToast(
      language === 'en' ? 'AI Agent policies updated across channels.' : 'اے آئی ایجنٹ پالیسی ترتیبات کامیابی سے تبدیل ہو گئیں۔',
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-fade-in select-none text-left">
      
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
          {language === 'en' ? 'Voxentra Custom AI Agent Builder Studio' : 'اے آئی ایجنٹ بلڈنگ اسٹوڈیو'}
        </h2>
        <p className="text-xs text-slate-455">
          Configure response characters, fine-tune bilingual phrasing limits, establish safety escalation triggers and auto-reply templates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Editor Settings Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm lg:col-span-2 space-y-6">
          
          {/* Sub menu selectors */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 pb-1.5 gap-4">
            {[
              { id: 'voice', label: 'AI Voice Agent', icon: Volume2 },
              { id: 'text', label: 'AI Text Bot Configs', icon: MessageSquare },
              { id: 'email', label: 'AI Smart Email Agent', icon: Mail }
            ].map((sub) => {
              const Icon = sub.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubTab(sub.id as any)}
                  className={`pb-3 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer relative ${
                    activeSubTab === sub.id
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-450 hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {sub.label}
                  {activeSubTab === sub.id && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600" />
                  )}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            {activeSubTab === 'voice' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Representative Name</label>
                    <input
                      type="text"
                      value={voiceName}
                      onChange={(e) => setVoiceName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border text-xs text-slate-800 dark:text-slate-200 border-slate-205 dark:border-slate-750 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language Support</label>
                    <input
                      type="text"
                      value={voiceLang}
                      onChange={(e) => setVoiceLang(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border text-xs text-slate-800 dark:text-slate-200 border-slate-205 dark:border-slate-755 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Phone Welcome Greeting Script</label>
                  <textarea
                    rows={4}
                    value={voiceGreeting}
                    onChange={(e) => setVoiceGreeting(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border text-xs text-slate-805 dark:text-slate-200 border-slate-205 dark:border-slate-750 rounded-xl resize-none outline-none focus:border-indigo-505"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Safety Escalation & Human Route Rules</label>
                  <textarea
                    rows={3}
                    value={voiceEscalation}
                    onChange={(e) => setVoiceEscalation(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border text-xs text-slate-805 dark:text-slate-200 border-slate-205 dark:border-slate-750 rounded-xl resize-none outline-none focus:border-indigo-505"
                  />
                  <span className="text-[9px] text-slate-400 block leading-snug">
                    Escalation parameters detect angry tones, requests for manager overrides, or complex queries offline, then safely divert to landlines.
                  </span>
                </div>
              </div>
            )}

            {activeSubTab === 'text' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Text Tone Persona</label>
                    <select
                      value={textTone}
                      onChange={(e: any) => setTextTone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border text-xs text-slate-800 dark:text-slate-200 border-slate-205 dark:border-slate-755 rounded-xl"
                    >
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Empathetic</option>
                      <option>Urdu Mix</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI auto replies status</label>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setTextAuto(!textAuto)}
                        className={`w-10 h-6 rounded-full p-0.5 transition cursor-pointer ${textAuto ? 'bg-indigo-600' : 'bg-slate-205'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${textAuto ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">
                        {textAuto ? 'Active Response Loop' : 'Manual validation gating'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Knowledge Base FAQ Fallback Plan</label>
                  <textarea
                    rows={4}
                    value={textFallback}
                    onChange={(e) => setTextFallback(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-850 border text-xs text-slate-800 dark:text-slate-200 border-slate-205 dark:border-slate-750 rounded-xl resize-none focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeSubTab === 'email' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trigger follow up (Days)</label>
                    <input
                      type="number"
                      value={emailDays}
                      onChange={(e) => setEmailDays(parseInt(e.target.value) || 2)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border text-xs text-slate-800 dark:text-slate-200 border-slate-205 dark:border-slate-750 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Email Signature Layout</label>
                  <textarea
                    rows={4}
                    value={emailSig}
                    onChange={(e) => setEmailSig(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border text-xs text-slate-800 dark:text-slate-200 border-slate-205 dark:border-slate-750 rounded-xl resize-none focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Lock Configuration Changes
            </button>
          </form>

        </div>

        {/* Live Model Preview bubbles */}
        <div className="bg-slate-950 text-white border border-slate-850 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
              <Eye className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                Model response mockup preview
              </h3>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed leading-snug">
              This widget renders what key output strings will sound like when queried on line pipelines.
            </p>

            {activeSubTab === 'voice' && (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <span className="text-[9px] font-bold text-indigo-400 font-mono">PHONE OUTBOUND GREETING</span>
                <p className="text-xs text-indigo-100 leading-relaxed italic">
                  "{voiceGreeting || 'Hi! Voxie calling...'}"
                </p>
                <div className="pt-2 border-t border-slate-850 flex items-center gap-1 text-[9px] text-slate-540 font-mono">
                  <span>Representative: <strong>{voiceName}</strong></span>
                  <span>•</span>
                  <span>Lang: {voiceLang}</span>
                </div>
              </div>
            )}

            {activeSubTab === 'text' && (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <span className="text-[9px] font-bold text-emerald-400 font-mono">WHATSAPP AUTO REPLY TONE ({textTone})</span>
                <p className="text-xs text-emerald-50 leading-relaxed italic">
                  "Perfect choice! We locked that immediately. A reminder with our address map is on the way."
                </p>
              </div>
            )}

            {activeSubTab === 'email' && (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <span className="text-[9px] font-bold text-amber-450 font-mono">SIGNATURE WATERMARK</span>
                <pre className="text-[10px] text-amber-100 font-mono leading-relaxed whitespace-pre-wrap">
                  {emailSig}
                </pre>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-850 mt-6 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>Model node: vox-base-l2</span>
            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold rounded">ONLINE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
