import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  UserPlus, 
  Phone, 
  Mail, 
  Tag, 
  Briefcase 
} from 'lucide-react';
import { Customer } from '../types';

interface CustomerManagementProps {
  language: string;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  addToast: (text: string, type: 'success' | 'error' | 'info' | 'notification') => void;
}

export default function CustomerManagement({
  language,
  customers,
  setCustomers,
  addToast
}: CustomerManagementProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Modals / Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  
  // Add Form Inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant');
  const [status, setStatus] = useState<'Active' | 'Lead' | 'Pending' | 'Inactive'>('Active');
  const [notes, setNotes] = useState('');

  // Handle Add Customer
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      addToast(language === 'en' ? 'Please fill in all required fields' : 'براہ کرم تمام لازمی فیلڈز پُر کریں', 'error');
      return;
    }
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name,
      phone,
      email,
      businessType,
      lastInteraction: 'New Customer Registered',
      status,
      notes,
    };
    setCustomers(prev => [newCustomer, ...prev]);
    addToast(
      language === 'en' ? `Customer ${name} added successfully!` : `صارف ${name} کامیابی سے رجسٹر ہو گیا!`,
      'success'
    );
    // Reset Form
    setName('');
    setPhone('');
    setEmail('');
    setBusinessType('Restaurant');
    setStatus('Active');
    setNotes('');
    setShowAddForm(false);
  };

  // Handle Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    
    setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? editingCustomer : c));
    addToast(
      language === 'en' ? `Customer ${editingCustomer.name} updated successfully!` : `صارف ${editingCustomer.name} کے کوائف تبدیل ہو گئے!`,
      'success'
    );
    setEditingCustomer(null);
  };

  // Handle Delete Customer
  const handleDelete = (id: string, customerName: string) => {
    if (confirm(language === 'en' ? `Are you sure you want to delete ${customerName}?` : `کیا آپ واقعی ${customerName} کو حذف کرنا چاہتے ہیں؟`)) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      addToast(
        language === 'en' ? `Customer ${customerName} deleted.` : `صارف ${customerName} حذف ہو گیا۔`,
        'info'
      );
    }
  };

  // Filtered customer list
  const filteredCustomers = customers.filter(c => {
    const query = search.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(query) || 
                          c.phone.includes(query) || 
                          c.email.toLowerCase().includes(query) ||
                          (c.notes && c.notes.toLowerCase().includes(query));
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (st: string) => {
    switch (st) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-250';
      case 'Lead': return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-250';
      case 'Pending': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-250';
      case 'Inactive': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150">
            {language === 'en' ? 'Customer Relationship Management' : 'صارفین کی فہرست'}
          </h2>
          <p className="text-xs text-slate-455">
            {language === 'en' ? 'Add customers, inspect communication history logs, and manage CRM contacts.' : 'صارفین کے کوائف کا اندراج، ترمیم اور حذف کریں۔'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-600/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add New Customer' : 'نیا صارف پلس کریں'}</span>
        </button>
      </div>

      {/* CRM Actions Search Bar / Filter Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/65 dark:border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-405">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'en' ? 'Search customers by name, email, or details...' : 'صارفین کو تلاش کریں...'}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-850/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto shrink-0">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            <Filter className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
            {language === 'en' ? 'Filter status:' : 'فلٹر کریں:'}
          </span>
          {['All', 'Active', 'Lead', 'Pending', 'Inactive'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Registry Grid / Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-205/60 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/20 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <th className="px-6 py-4">{language === 'en' ? 'Name' : 'نام'}</th>
                <th className="px-6 py-4">{language === 'en' ? 'Contact Information' : 'رابطہ نمبر'}</th>
                <th className="px-6 py-4">{language === 'en' ? 'Business Industry' : 'کاروبار'}</th>
                <th className="px-6 py-4">{language === 'en' ? 'Last AI Interaction' : 'آخری اے آئی رابطہ'}</th>
                <th className="px-6 py-4">{language === 'en' ? 'Status' : 'حیثیت'}</th>
                <th className="px-6 py-4 text-right">{language === 'en' ? 'Actions' : 'عمل'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    {language === 'en' ? 'No customers found matching current filters.' : 'کوئی مماثل صارفین نہیں ملے۔'}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">
                          {customer.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-150">{customer.name}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-xs">{customer.notes || (language === 'en' ? 'No special instruction notes.' : 'کوئی نوٹس درج نہیں')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-y-0.5">
                      <p className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {customer.phone}
                      </p>
                      <p className="text-slate-400 text-[10px] flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {customer.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-lg text-[10px] border border-slate-200/40 dark:border-slate-800">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        {customer.businessType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">{customer.lastInteraction}</p>
                      <p className="text-[10px] text-slate-400">Recorded by Bot</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingCustomer(customer)}
                          className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-600 hover:text-indigo-600 cursor-pointer transition"
                          title="Edit Customer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id, customer.name)}
                          className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-600 hover:text-rose-650 cursor-pointer transition"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Customer Overlay Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {language === 'en' ? 'Register New Customer Contact' : 'صارف کا فوری اندراج'}
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Zainab Ahmed"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="zainab@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Industry</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none"
                  >
                    <option>Restaurant</option>
                    <option>Café</option>
                    <option>Salon</option>
                    <option>Clinic</option>
                    <option>Retail Store</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Badge</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none"
                  >
                    <option>Active</option>
                    <option>Lead</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Special instruction notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Allergic to specific items, or requested bespoke scheduling."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                {language === 'en' ? 'Create Contact Record' : 'ریکارڈ فائل کریں'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal Overlay */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {language === 'en' ? `Edit Customer: ${editingCustomer.name}` : `تبدیلی کوائف: ${editingCustomer.name}`}
              </h3>
              <button onClick={() => setEditingCustomer(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-1 text-left font-sans">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone number *</label>
                  <input
                    type="tel"
                    required
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email address *</label>
                  <input
                    type="email"
                    required
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Industry</label>
                  <select
                    value={editingCustomer.businessType}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, businessType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none"
                  >
                    <option>Restaurant</option>
                    <option>Café</option>
                    <option>Salon</option>
                    <option>Clinic</option>
                    <option>Retail Store</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Badge</label>
                  <select
                    value={editingCustomer.status}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none"
                  >
                    <option>Active</option>
                    <option>Lead</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Special instruction notes</label>
                <textarea
                  rows={2}
                  value={editingCustomer.notes || ''}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                {language === 'en' ? 'Save Changes' : 'تبدیلیاں محفوظ کریں'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
