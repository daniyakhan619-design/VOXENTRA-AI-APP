import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  ShieldAlert, 
  Check, 
  X, 
  UserCheck, 
  Briefcase 
} from 'lucide-react';
import { TeamMember } from '../types';

interface TeamManagementProps {
  language: string;
  team: TeamMember[];
  setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function TeamManagement({
  language,
  team,
  setTeam,
  addToast
}: TeamManagementProps) {
  
  const [showAddMember, setShowAddMember] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Manager' | 'Employee'>('Employee');

  const permissionsMatrix = {
    Admin: { crm: true, voice: true, campaigns: true, settings: true },
    Manager: { crm: true, voice: true, campaigns: true, settings: false },
    Employee: { crm: true, voice: false, campaigns: false, settings: false }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) {
      addToast(language === 'en' ? 'Fields must not be blank' : 'کوائف درج کریں', 'error');
      return;
    }

    const newMemb: TeamMember = {
      id: `team-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      status: 'Active'
    };

    setTeam(prev => [...prev, newMemb]);
    addToast(language === 'en' ? `Team member ${newName} added.` : `ٹیم ممبر ${newName} رجسٹر ہو گئے۔`, 'success');

    // Reset Form
    setNewName('');
    setNewEmail('');
    setNewRole('Employee');
    setShowAddMember(false);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (confirm(language === 'en' ? `Are you sure you want to remove ${name}?` : `کیا آپ واقعی ${name} کو فارغ کرنا چاہتے ہیں؟`)) {
      setTeam(prev => prev.filter(t => t.id !== id));
      addToast(language === 'en' ? `${name} removed from roster.` : `ٹیم ممبر فارغ کر دیا گیا۔`, 'info');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in select-none text-left">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
            {language === 'en' ? 'Voxentra CRM Team Spaces' : 'ٹیم اور انتظام'}
          </h2>
          <p className="text-xs text-slate-455">
            Add operators, configure role allocations, and track security clearance rules relative to database records.
          </p>
        </div>

        <button
          onClick={() => setShowAddMember(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition shadow-md shadow-indigo-600/10"
        >
          <UserPlus className="w-4 h-4" />
          <span>{language === 'en' ? 'Invite Team Member' : 'ٹیم ممبر سائن آن کریں'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Operators index list */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-150 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <th className="px-6 py-4">Name & Identity</th>
                  <th className="px-6 py-4">Role Assigned</th>
                  <th className="px-6 py-4">Clearance Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-705">
                {team.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/30 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8.5 h-8.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-705 dark:text-slate-300">
                          {member.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{member.name}</p>
                          <p className="text-[10px] text-slate-430">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        member.role === 'Admin'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20'
                          : member.role === 'Manager'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold ${
                        member.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {member.role !== 'Admin' && (
                        <button
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg bg-slate-50 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Permissions Grid Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldAlert className="w-4 h-4 text-indigo-505" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-150">
              Clearance Matrix Map
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            {Object.entries(permissionsMatrix).map(([role, perms]) => (
              <div 
                key={role}
                className="p-3.5 bg-slate-50 dark:bg-slate-850/40 rounded-2xl border border-slate-150 text-left space-y-2"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{role} Clearances</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-505 font-mono pt-1">
                  <div className="flex items-center gap-1.5">
                    {perms.crm ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
                    CRM Write access
                  </div>
                  <div className="flex items-center gap-1.5">
                    {perms.voice ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
                    VoIP Dial triggers
                  </div>
                  <div className="flex items-center gap-1.5">
                    {perms.campaigns ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
                    WhatsApp Blast
                  </div>
                  <div className="flex items-center gap-1.5">
                    {perms.settings ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
                    System Admin Access
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Invite Member Modal Overlay */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {language === 'en' ? 'Invite Outbound Operator' : 'نیا ہینڈلر شامل کریں'}
              </h3>
              <button onClick={() => setShowAddMember(false)} className="text-slate-400 hover:text-slate-650">
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ali Ahmed"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ali.ahmed@voxentra.ai"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-xs border border-slate-150 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role Allocation</label>
                <select
                  value={newRole}
                  onChange={(e: any) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 text-xs border border-slate-205 rounded-xl outline-none"
                >
                  <option value="Employee">Employee (CRM Gated)</option>
                  <option value="Manager">Manager (CRM + WhatsApp Campaigns)</option>
                  <option value="Admin">Admin (Full System clearance)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Dispatch Invitation Watermark
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
