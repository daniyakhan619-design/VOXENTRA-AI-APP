export type IndustryType = 'restaurant' | 'cafe' | 'salon' | 'clinic' | 'retail';
export type LanguageType = 'en' | 'ur';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  lastInteraction: string;
  status: 'Active' | 'Lead' | 'Pending' | 'Inactive';
  notes?: string;
  avatarColor?: string;
}

export interface CallLog {
  id: string;
  customerName: string;
  phone: string;
  time: string;
  duration: string; // e.g. "2m 14s"
  status: 'Completed' | 'No Answer' | 'Busy' | 'Transfer to Human';
  summary: string;
  recordingUrl?: string; // simulator file
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
}

export interface TextCampaign {
  id: string;
  name: string;
  platform: 'SMS' | 'WhatsApp';
  status: 'Sent' | 'Draft' | 'Scheduled';
  scheduledTime?: string;
  leadsCount: number;
  templateContent: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'customer';
  text: string;
  time: string;
}

export interface EmailMessage {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  body: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Pending';
  category: 'Enquiry' | 'Booking' | 'Complaint' | 'Feedback';
  aiSuggestedReply?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'lead' | 'call' | 'booking' | 'complaint' | 'system';
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Employee';
  email: string;
  status: 'Active' | 'Inactive';
}

export interface AIAgentConfig {
  voiceAgent: {
    name: string;
    greeting: string;
    language: string;
    escalationRules: string;
    voiceType: string; // "Male - Professional" | "Female - Friendly" | "Female - Professional Urdu" etc.
    speechRate: number; // 0.5 to 2.0
  };
  textAgent: {
    tone: 'Professional' | 'Friendly' | 'Empathetic' | 'Assertive' | 'Urdu Mix';
    autoRepliesEnabled: boolean;
    faqFallback: string;
  };
  emailAgent: {
    signature: string;
    followUpDays: number;
    templatesCount: number;
  };
}
