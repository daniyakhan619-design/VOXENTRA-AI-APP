import { Customer, CallLog, TextCampaign, EmailMessage, FAQItem, TeamMember, NotificationItem, AIAgentConfig } from './types';

export const INITIAL_CUSTOMERS: Record<string, Customer[]> = {
  restaurant: [
    { id: 'rest-1', name: 'Zainab Ahmed', phone: '+92 300 1234567', email: 'zainab.a@gmail.com', businessType: 'Restaurant', lastInteraction: 'AI Call: Table Booking', status: 'Active', notes: 'Allergic to nuts. Prefers window seat.' },
    { id: 'rest-2', name: 'John Doe', phone: '+1 555 0199222', email: 'johndoe@yahoo.com', businessType: 'Restaurant', lastInteraction: 'WhatsApp: Menu Query', status: 'Pending', notes: 'Looking to book a corporate lunch for 20.' },
    { id: 'rest-3', name: 'Mustafa Ali', phone: '+92 321 9876543', email: 'mustafa_ali@hotmail.com', businessType: 'Restaurant', lastInteraction: 'Email: Catering Quote', status: 'Lead', notes: 'Needs pricing info for wedding event.' },
    { id: 'rest-4', name: 'Saira Bano', phone: '+92 312 4567890', email: 'saira.bano@outlook.com', businessType: 'Restaurant', lastInteraction: 'AI Text: Order Status', status: 'Active', notes: 'Regular weekend patron. Enjoys hot food.' },
    { id: 'rest-5', name: 'Kamran Khan', phone: '+92 333 8881234', email: 'kamran_rest@gmail.com', businessType: 'Restaurant', lastInteraction: 'Missed Call Alert', status: 'Inactive', notes: 'No responses to SMS promotions recently.' }
  ],
  cafe: [
    { id: 'cafe-1', name: 'Amna Shah', phone: '+92 301 2345678', email: 'amna.shah@gmail.com', businessType: 'Café', lastInteraction: 'WhatsApp: Opening hours', status: 'Active', notes: 'Freelancer, works from café. Drinks Espresso.' },
    { id: 'cafe-2', name: 'Robert Smith', phone: '+1 555 4321098', email: 'rob.smith@gmail.com', businessType: 'Café', lastInteraction: 'AI Call: Event Booking', status: 'Lead', notes: 'Intended to rent out space for book club.' },
    { id: 'cafe-3', name: 'Bilal Farooqi', phone: '+92 322 7776655', email: 'bilal_cafe_enjoyer@gmail.com', businessType: 'Café', lastInteraction: 'AI Text: Reward Points', status: 'Active', notes: 'Loyal customer. Eligible for VIP tier discount.' },
    { id: 'cafe-4', name: 'Fatima Malik', phone: '+92 315 1112223', email: 'fatima_malik@outlook.com', businessType: 'Café', lastInteraction: 'Email: Job Application', status: 'Pending', notes: 'Inquired about part-time barista vacancy.' }
  ],
  salon: [
    { id: 'salon-1', name: 'Maya Lin', phone: '+1 555 9876543', email: 'maya.lin@gmail.com', businessType: 'Salon', lastInteraction: 'AI Call: Hair Coloring', status: 'Active', notes: 'Prefers stylist Jessica. Highlights consultation needed.' },
    { id: 'salon-2', name: 'Ayesha Omer', phone: '+92 302 5554433', email: 'ayesha_salon@hotmail.com', businessType: 'Salon', lastInteraction: 'WhatsApp: Cancel Booking', status: 'Inactive', notes: 'Cancelled original appointment. Need follow-up.' },
    { id: 'salon-3', name: 'Farhan Saeed', phone: '+92 345 6667788', email: 'farhan_grooming@gmail.com', businessType: 'Salon', lastInteraction: 'AI Text: Promo Offer', status: 'Lead', notes: 'Inquired about executive massage packages.' },
    { id: 'salon-4', name: 'Mariam Sajid', phone: '+92 316 4443322', email: 'mariam_saj@gmail.com', businessType: 'Salon', lastInteraction: 'AI Call: Bridal Makeup', status: 'Active', notes: 'Full bridal package deposit paid for July 25th.' }
  ],
  clinic: [
    { id: 'clin-1', name: 'Dr. Usman Ahmed', phone: '+92 300 9998887', email: 'usman.ahmed@yahoo.com', businessType: 'Clinic', lastInteraction: 'AI Call: Schedule MRI', status: 'Active', notes: 'Chronic back pain patient. Needs wheelchair access.' },
    { id: 'clin-2', name: 'George Vance', phone: '+1 555 7773322', email: 'george_vance@gmail.com', businessType: 'Clinic', lastInteraction: 'Email: Lab Reports', status: 'Pending', notes: 'Waiting for cholesterol panel verification.' },
    { id: 'clin-3', name: 'Sadia Khan', phone: '+92 311 5556667', email: 'sadia_k@gmail.com', businessType: 'Clinic', lastInteraction: 'WhatsApp: Appointment Confirmed', status: 'Active', notes: 'Pediatric consultation for her 3-year old daughter.' },
    { id: 'clin-4', name: 'Waleed Sheikh', phone: '+92 334 2221199', email: 'waleed_s@outlook.com', businessType: 'Clinic', lastInteraction: 'AI Call: Prescription refill', status: 'Lead', notes: 'Inquired about dental implants payment plan options.' }
  ],
  retail: [
    { id: 'ret-1', name: 'Saira Jamil', phone: '+92 304 3331112', email: 'saira.jamil@gmail.com', businessType: 'Retail Store', lastInteraction: 'AI Text: Order Refund', status: 'Pending', notes: 'Received medium size jacket but requested large.' },
    { id: 'ret-2', name: 'Ahsan Raza', phone: '+92 321 4445556', email: 'ahsan_clothing@gmail.com', businessType: 'Retail Store', lastInteraction: 'WhatsApp: Stock query', status: 'Lead', notes: 'Looking for winter shearling leather coats in brown.' },
    { id: 'ret-3', name: 'Chloe Miller', phone: '+1 555 8887711', email: 'chloe.m@gmail.com', businessType: 'Retail Store', lastInteraction: 'AI Call: Order Booking', status: 'Active', notes: 'VIP customer, pre-ordered limited holiday bag.' },
    { id: 'ret-4', name: 'Hamza Baig', phone: '+92 336 9993335', email: 'hamzabaig@gmail.com', businessType: 'Retail Store', lastInteraction: 'Email: Wholesale Order', status: 'Active', notes: 'Purchased 50 items for corporate client gifting.' }
  ]
};

export const INITIAL_CALLS: Record<string, CallLog[]> = {
  restaurant: [
    { id: 'call-1', customerName: 'Zainab Ahmed', phone: '+92 300 1234567', time: '10:15 AM', duration: '2m 14s', status: 'Completed', sentiment: 'Positive', summary: 'Called to book a table for 4 tonight. The AI verified table openings and confirmed a window seat at 8:00 PM.' },
    { id: 'call-2', customerName: 'Ali Raza', phone: '+92 321 5556667', time: '09:40 AM', duration: '1m 02s', status: 'No Answer', sentiment: 'Neutral', summary: 'Attempted outreach regarding abandoned online food order checkout. Customer did not pick up.' },
    { id: 'call-3', customerName: 'Sara Qureshi', phone: '+92 312 8889990', time: '08:30 AM', duration: '3m 45s', status: 'Completed', sentiment: 'Positive', summary: 'Inquired if gluten-free options are cooked separately. AI assured separate preparation zone and emailed gluten-free menu.' },
    { id: 'call-4', customerName: 'Imran Malik', phone: '+92 333 4445551', time: 'Yesterday', duration: '4m 20s', status: 'Transfer to Human', sentiment: 'Negative', summary: 'Upset about delayed delivery from last week. Automated script tried offering 20% discount but customer insisted on speaking to manager.' }
  ],
  cafe: [
    { id: 'call-1', customerName: 'Amna Shah', phone: '+92 301 2345678', time: '11:05 AM', duration: '1m 50s', status: 'Completed', sentiment: 'Positive', summary: 'Asked if the cafe has high-speed Wi-Fi and electrical outlets. AI confirmed power plugs at communal tables.' },
    { id: 'call-2', customerName: 'Tariq Javed', phone: '+92 322 8881112', time: '09:12 AM', duration: '2m 05s', status: 'Completed', sentiment: 'Neutral', summary: 'Asked for prices of espresso beans bulk packs. AI provided prices and took customer email for invoice.' }
  ],
  salon: [
    { id: 'call-1', customerName: 'Maya Lin', phone: '+1 555 9876543', time: '10:30 AM', duration: '3m 15s', status: 'Completed', sentiment: 'Positive', summary: 'Booked hair styling and deep conditioning treatment with Jessica. AI confirmed cost and calendar slot of 3:00 PM today.' },
    { id: 'call-2', customerName: 'Sana Khan', phone: '+92 331 4443332', time: 'Yesterday', duration: '1m 40s', status: 'Busy', sentiment: 'Neutral', summary: 'Automated call to remind about tomorrow\'s bridal consultation. Phone returned busy; system sent SMS follow-up.' }
  ],
  clinic: [
    { id: 'call-1', customerName: 'Dr. Usman Ahmed', phone: '+92 300 9998887', time: '08:45 AM', duration: '4m 10s', status: 'Completed', sentiment: 'Positive', summary: 'Inquired about booking orthopedic MRI. AI validated doctor reference, fetched availability, and scheduled on Tuesday at 10 AM.' },
    { id: 'call-2', customerName: 'Sidra Bashir', phone: '+92 312 7778889', time: 'Yesterday', duration: '2m 55s', status: 'Transfer to Human', sentiment: 'Neutral', summary: 'Patient feeling mild fatigue after starting new script. AI cross-checked patient logs and safely routed to nurse on call.' }
  ],
  retail: [
    { id: 'call-1', customerName: 'Chloe Miller', phone: '+1 555 8887711', time: '01:10 PM', duration: '1m 58s', status: 'Completed', sentiment: 'Positive', summary: 'Checked if the limited edition winter shearling jacket is held at the counter. AI cross-examined POS and confirmed reserve list.' }
  ]
};

export const INITIAL_EMAILS: Record<string, EmailMessage[]> = {
  restaurant: [
    {
      id: 'email-1',
      fromName: 'Fatima Hasan',
      fromEmail: 'fati.hasan@yahoo.com',
      subject: 'Catering query for birthday party (50 guests)',
      body: 'Hi Voxentra team, I would like to order a buffet catering plan for next Sunday for my son\'s first birthday. We expect about 50 people. Could you please send us your standard and special packages with pricing per head, as well as vegetarian alternatives?',
      date: '10:20 AM',
      status: 'Unread',
      category: 'Enquiry',
      aiSuggestedReply: 'Hello Fatima,\n\nThank you for reaching out to Voxentra Restaurant! We would love to cater for your son\'s first birthday celebration next Sunday.\n\nFor 50 guests, we highly recommend our Sapphire Buffet Package which is PKR 1,850/head, or our Premium Diamond Buffet at PKR 2,400/head. Both packages include 3 main courses, salad bars, and various dessert arrays. We have amazing vegetarian alternatives like Paneer Handi and Roasted Charcoal Veggies included at no extra cost.\n\nWould you like me to send over our complete brochure and schedule a call with our catering director?'
    },
    {
      id: 'email-2',
      fromName: 'Michael Corleone',
      fromEmail: 'mickey_c@godfather.com',
      subject: 'Private room booking request for Friday',
      body: 'Looking to host an important business dinner this coming Friday evening at 7:30 PM. We require the private cellar room for 12 individuals. Prompt responses regarding availability and set-menu pricing is highly required.',
      date: 'Yesterday',
      status: 'Replied',
      category: 'Booking',
      aiSuggestedReply: 'Hello Michael, thank you for writing to us. We have successfully locked the private cellar room for you for Friday, June 26th at 7:30 PM for 12 guests. We have attached our special corporate menus (pkrs 3,000 & 4,500 options) for your review.'
    },
    {
      id: 'email-3',
      fromName: 'Yasir Bilal',
      fromEmail: 'yaso.bilal@gmail.com',
      subject: 'Cold food delivered - Order #9910',
      body: 'I ordered the supreme hot deal platter tonight and it took 1.5 hours to arrive. When it did, the grilled chicken pizza was cold and soggy, and the fries were limp. This is very unprofessional, I spent 2,500 rupees.',
      date: 'June 17',
      status: 'Pending',
      category: 'Complaint',
      aiSuggestedReply: 'Dear Yasir,\n\nI am sincerely sorry for the poor experience with Order #9910. We take pride in hot, fresh deliveries and completely failed you here. I have generated a full credit voucher of PKR 2,500 for your next visit, and we are investigating the rider dispatch delay. Please forgive us.'
    }
  ],
  cafe: [
    {
      id: 'email-1',
      fromName: 'Sarah Jenkins',
      fromEmail: 's.jenkins@gmail.com',
      subject: 'Weekly remote tutoring tables reservation',
      body: 'Hi, I tutor high schoolers on Tuesdays and Thursdays from 3 PM to 6 PM. Can we occupy the large back table routinely? We will always buy coffees and pastries.',
      date: '09:30 AM',
      status: 'Unread',
      category: 'Booking',
      aiSuggestedReply: 'Hi Sarah, thank you for choosing our Café! We would love to host your tutoring sessions. We have reserved the back quiet table for you on Tuesdays and Thursdays from 3 PM to 6 PM starting next week. Welcome aboard!'
    }
  ],
  salon: [
    {
      id: 'email-1',
      fromName: 'Nimra Khan',
      fromEmail: 'nim.grooming@gmail.com',
      subject: 'Do you offer Japanese Straightening or Keratin?',
      body: 'Hello, looking for a treatment to tame my extremely frizzy curly hair. Do you offer Keratin, or Japanese hair straightening treatment? What are the starting price brackets?',
      date: '08:15 AM',
      status: 'Unread',
      category: 'Enquiry',
      aiSuggestedReply: 'Hi Nimra! Yes, we offer premium hair therapies! Our Keratin Treatment starts at PKR 12,000 depending on length, and our permanent Japanese Thermal Straightening starts at PKR 18,000. Under our custom AI analysis booking, stylist Jessica can inspect your scalp condition first. Would you like to schedule an assessment?'
    }
  ],
  clinic: [
    {
      id: 'email-1',
      fromName: 'Ibrahim Lodi',
      fromEmail: 'lodi.ibrahim@outlook.com',
      subject: 'Reschedule Dr. Hasan Consultation',
      body: 'My appointment is booked for tomorrow at 2:00 PM with Cardiologist Dr. Hasan. However, I have an urgent business trip out of town. Can I postpone this to Friday afternoon at 4:00 PM?',
      date: 'June 18',
      status: 'Pending',
      category: 'Booking',
      aiSuggestedReply: 'Hello Ibrahim,\n\nWe would be happy to accommodate this! Dr. Hasan has an open slot this coming Friday at 4:15 PM. I can move your reservation to this slot immediately. Please confirm if this works.'
    }
  ],
  retail: [
    {
      id: 'email-1',
      fromName: 'Kanza Fatima',
      fromEmail: 'kanza_f@gmail.com',
      subject: 'Damaged packaging on leather boot arrival',
      body: 'Hi there, I ordered the cognac brown riding boots which arrived this morning. Unfortunately, the box was completely shattered and torn. The boots themselves seem fine but for a luxury purchase, the packaging counts.',
      date: '01:05 AM',
      status: 'Unread',
      category: 'Complaint',
      aiSuggestedReply: 'Dear Kanza, thank you for alerting us. We apologize deeply for the damaged shipment box. We aim for outstanding premium arrivals. We will ship a premium collector storage box with custom shoe cream as a complimentary apology gift tomorrow. Thank you for your feedback!'
    }
  ]
};

export const INITIAL_FAQS: Record<string, FAQItem[]> = {
  restaurant: [
    { id: 'faq-1', question: 'What are your operating hours?', answer: 'We are open Monday to Sunday from 12:00 PM to 12:00 AM midnight. Outdoor dining and takeaway are available throughout the day.', category: 'Timing', tags: ['Hours', 'Timing'] },
    { id: 'faq-2', question: 'Do you have gluten-free or vegan options?', answer: 'Yes! Our menu features clear GF and Vegan indicators. We have a dedicated prep counter to avoid cross-contamination for gluten allergies.', category: 'Dietary', tags: ['Vegan', 'Gluten-Free'] },
    { id: 'faq-3', question: 'What is the table booking reservation policy?', answer: 'We hold tables for a maximum of 15 minutes after the reservation time. No pre-payment is required unless booking for groups larger than 10 people.', category: 'Bookings', tags: ['Policy', 'Reservation'] }
  ],
  cafe: [
    { id: 'faq-1', question: 'Do you offer high-speed Wi-Fi?', answer: 'Yes! We have unlimited high-speed fiber internet for customers. Just ask for the password on your order receipt.', category: 'Amenities', tags: ['Internet', 'WiFi'] },
    { id: 'faq-2', question: 'Do you roast your own coffee beans?', answer: 'We source single-origin specialty beans and roast them in-house small batches every Wednesday to maintain premium notes.', category: 'Quality', tags: ['Beans', 'Roast'] }
  ],
  salon: [
    { id: 'faq-1', question: 'What is your cancellation policy for wedding makeup?', answer: 'Cancellations for bridal services must be made at least 14 days in advance for a full refund of deposit. Cancellations after that forfeit 50% of the deposit.', category: 'Policies', tags: ['Bridal', 'Refund'] }
  ],
  clinic: [
    { id: 'faq-1', question: 'Which health insurance policies do you accept?', answer: 'We are paneled with Jubilee Life, State Life, Alfalah Insurance, and Adamjee. Please bring your insurance card and doctor prescription for check-in.', category: 'Billing', tags: ['Insurance', 'Panel'] }
  ],
  retail: [
    { id: 'faq-1', question: 'What is your return and exchange policy?', answer: 'You can exchange or return any unworn goods with original tags intact within 14 days of purchase. Sale items are final sales and only eligible for store credit.', category: 'Support', tags: ['Exchange', 'Return'] }
  ]
};

export const INITIAL_NOTIFICATIONS: Record<string, NotificationItem[]> = {
  restaurant: [
    { id: 'not-1', title: 'New Customer Lead', description: 'Yasmin Tariq requested corporate catering brochure via WhatsApp bot.', time: '5m ago', type: 'lead', read: false },
    { id: 'not-2', title: 'Table Booking Made', description: 'Table for 6 reserved for tonight at 9:00 PM by AI Voice Agent.', time: '12m ago', type: 'booking', read: false },
    { id: 'not-3', title: 'Customer Complaint Filed', description: 'Yasir Bilal sent an email complaining about cold supreme food delivery.', time: '1h ago', type: 'complaint', read: false },
    { id: 'not-4', title: 'AI Assistant Summary', description: 'Weekly performance audit compiled. Customer response rate peaked at 98.4%.', time: '3h ago', type: 'system', read: true }
  ],
  cafe: [
    { id: 'not-1', title: 'Supply Alert', description: 'Espresso bean stock level falling below critical threshold (2kg left).', time: '10m ago', type: 'system', read: false },
    { id: 'not-2', title: 'Cafe Rental Lead', description: 'Marcus Hughes inquired about renting space for indie film screening.', time: '40m ago', type: 'lead', read: false }
  ],
  salon: [
    { id: 'not-1', title: 'Appointment Booking', description: 'Ayesha Omer booked a Luxury Facial & Pedicure for Friday at 5:00 PM.', time: '8m ago', type: 'booking', read: false }
  ],
  clinic: [
    { id: 'not-1', title: 'Appointment Booking', description: 'Waleed Sheikh confirmed cardiology consult via Voice assistant.', time: '2m ago', type: 'booking', read: false },
    { id: 'not-2', title: 'Lab Report Received', description: 'Lab panel uploaded for George Vance. AI notified patient via SMS.', time: '25m ago', type: 'system', read: false }
  ],
  retail: [
    { id: 'not-1', title: 'Refund Requested', description: 'Order #4421 requested return label for damage leather boots.', time: '12m ago', type: 'complaint', read: false },
    { id: 'not-2', title: 'VIP Customer Lead', description: 'Chloe Miller saved "Luxe Winter Coat" into cart. Text agent followed up.', time: '1h ago', type: 'lead', read: true }
  ]
};

export const INDUSTRY_CONFIGS = {
  restaurant: {
    kpi1Label: 'Reservations Today',
    kpi1Value: '18 Tables',
    kpi1Sub: '+3 vs yesterday',
    kpi2Label: 'Food Orders Handled',
    kpi2Value: '142 Orders',
    kpi2Sub: '84% through AI text/web',
    chartLabel1: 'Tables Booked',
    chartLabel2: 'Delivery Requests',
    customWidgetTitle: 'Live Restaurant Reservation Status',
    customWidgetData: [
      { field1: 'Table 4', field2: '8:00 PM (Confirmed)', field3: '4 Guests', field4: 'Zainab Ahmed' },
      { field1: 'Table 14', field2: '8:30 PM (AI Calling)', field3: '2 Guests', field4: 'Zeeshan Khan' },
      { field1: 'Table 2 (VIP)', field2: '9:15 PM (Confirmed)', field3: '6 Guests', field4: 'Anila Baig' }
    ],
    agentGreetingDefault: 'Salam! Welcome to Voxentra Grill, this is your AI dining assistant. Would you like me to book a table, handle an food order, or tell you about our specials tonight?'
  },
  cafe: {
    kpi1Label: 'Peak Seats Booked',
    kpi1Value: '24 Bookings',
    kpi1Sub: 'Corporate spaces',
    kpi2Label: 'Loyalty Sign-ups AI',
    kpi2Value: '48 Users',
    kpi2Sub: '+12% this week',
    chartLabel1: 'Specialty Shakes Sold',
    chartLabel2: 'Co-working space rentals',
    customWidgetTitle: 'Remote Desktop & Space bookings',
    customWidgetData: [
      { field1: 'Co-work Box A', field2: '10:00 AM - 4:00 PM', field3: '1 Seat', field4: 'Amna Shah' },
      { field1: 'Conference Room', field2: '3:00 PM (Scheduled)', field3: '10 Seats', field4: 'Tech Pakistan' }
    ],
    agentGreetingDefault: 'Thank you for calling Voxentra Brew Café! I can help you reserve a remote working desk, book our meeting room, or give you details about our roasting schedule. What can I do for you?'
  },
  salon: {
    kpi1Label: 'Stylists Appointed',
    kpi1Value: '34 Sessions',
    kpi1Sub: '92% occupancy rate',
    kpi2Label: 'Bridal Leads Active',
    kpi2Value: '12 Quotes',
    kpi2Sub: 'Avg revenue: PKR 45,000',
    chartLabel1: 'Coloring appointments',
    chartLabel2: 'Spa therapy confirmations',
    customWidgetTitle: 'Stylist Chair Schedule Status',
    customWidgetData: [
      { field1: 'Chair 1 - Jessica', field2: '3:00 PM (Coloring)', field3: 'Confirmed', field4: 'Maya Lin' },
      { field1: 'Room 3 - SPA', field2: '4:30 PM (Facial)', field3: 'Pending Deposit', field4: 'Salma Khan' }
    ],
    agentGreetingDefault: 'Hello! This is Voxentra Beauty Salon & Spa calling dashboard. I can help you book an appointment with our master stylists, customize a skin routine quote, or query details. How may I help?'
  },
  clinic: {
    kpi1Label: 'Clinicians Scheduled',
    kpi1Value: '56 Visits',
    kpi1Sub: '9.2 mins avg wait time',
    kpi2Label: 'Prescription Refills',
    kpi2Value: '28 Patients',
    kpi2Sub: 'AI verification checked',
    chartLabel1: 'OPD Registrations',
    chartLabel2: 'Lab report requests',
    customWidgetTitle: 'Doctor Schedule & MRI Status',
    customWidgetData: [
      { field1: 'Dr. Hasan (Cardiac)', field2: '2:15 PM (Consultation)', field3: 'Confirmed', field4: 'Ibrahim Lodi' },
      { field1: 'MRI Bay 1', field2: '4:00 PM (Scheduled)', field3: 'Referral Checked', field4: 'Usman Ahmed' }
    ],
    agentGreetingDefault: 'Good day, you have reached Voxentra Family Clinic Service Desk. This is your medical AI assistant. I can help you schedule consultation slots, process prescription refills, or send lab updates.'
  },
  retail: {
    kpi1Label: 'Stock Level Alerts',
    kpi1Value: '2 Critical',
    kpi1Sub: 'Leather Boots (Low)',
    kpi2Label: 'Carts Automated Recovery',
    kpi2Value: 'PKR 85K Recvrd',
    kpi2Sub: '24% response on WhatsApp',
    chartLabel1: 'Promo Code click-through',
    chartLabel2: 'Refund cases processed',
    customWidgetTitle: 'Active Order Fulfillment Queue',
    customWidgetData: [
      { field1: 'Order #4459', field2: 'Cognac Boots L', field3: 'Reserved Counter', field4: 'Chloe Miller' },
      { field1: 'Order #4421', field2: 'Shearling Coat M', field3: 'Exchange Processed', field4: 'Saira Jamil' }
    ],
    agentGreetingDefault: 'Thank you for calling Voxentra Premium Retail Store! I can help you look up item stock, track your shipment delivery, register an exchange or refund request. What are you looking for?'
  }
};

export const DEFAULT_AI_AGENT: AIAgentConfig = {
  voiceAgent: {
    name: 'Voxie-1',
    greeting: 'Salam! Welcome to Voxentra Grill, this is your AI dining assistant. Would you like me to book a table, handle an food order, or tell you about our specials tonight?',
    language: 'English (US Accent) + Urdu Mix',
    escalationRules: 'Route to main manager on duty if customer mentions refund, speaks angrily, or asks for manual override three times.',
    voiceType: 'Female - Friendly Bilingual',
    speechRate: 1.0
  },
  textAgent: {
    tone: 'Urdu Mix',
    autoRepliesEnabled: true,
    faqFallback: 'I will consult my knowledge base and provide details immediately. If I am unsure, I will request our support team to verify.'
  },
  emailAgent: {
    signature: 'Warm regards,\nVoxentra Intelligent Business Assistant\nVoxentra AI System Client Hub',
    followUpDays: 2,
    templatesCount: 4
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'team-1', name: 'Daniyal Khan', role: 'Admin', email: 'daniyakhan619@gmail.com', status: 'Active' },
  { id: 'team-2', name: 'Sana Fatima', role: 'Manager', email: 'sana.f@voxentra.ai', status: 'Active' },
  { id: 'team-3', name: 'Irfan Junejo', role: 'Employee', email: 'irfan.j@voxentra.ai', status: 'Active' },
  { id: 'team-4', name: 'Zeeshan Ali', role: 'Employee', email: 'zeesh@voxentra.ai', status: 'Inactive' }
];
