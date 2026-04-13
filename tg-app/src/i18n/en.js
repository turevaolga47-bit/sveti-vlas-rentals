export default {
  nav: {
    back: '‹ Back',
    catalog: 'Apartments',
    dates: 'Dates',
    profile: 'Profile',
    bookings: 'Booking',
    faq: 'FAQ',
  },

  splash: {
    badge: '🌊 Bulgaria · Black Sea',
    title: 'Sveti Vlas',
    subtitle: 'Seaside apartments — direct from owner',
    cta: 'Spend Summer 2026 in Bulgaria',
    ctaSub: 'New build 2025 · 3 min to beach · Personal welcome',
    utp1: '✓ No agency fees',
    utp2: '✓ Official contract',
    utp3: '✓ Pay via Revolut',
  },

  catalog: {
    title: 'Apartments',
    filters: {
      all: 'All',
      free: 'Available',
      parking: 'Parking',
      ac: 'A/C',
    },
    empty: 'No apartments match this filter',
    free: '✓ Available',
    busy: '✗ Booked',
    perNight: '/ night',
    nights: (n) => `${n} night${n !== 1 ? 's' : ''}`,
    total: 'total',
    bookings: 'bookings',
  },

  dates: {
    title: 'Select dates',
    guests: 'Guests',
    confirm: 'Show apartments',
    skip: 'Skip',
    nights: (n) => `${n} night${n !== 1 ? 's' : ''}`,
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['January','February','March','April','May','June',
             'July','August','September','October','November','December'],
  },

  apt: {
    beach: 'min to beach',
    guests: 'up to {n} guests',
    area: 'm²',
    floor: 'fl.',
    utp1: '✓ Personal welcome',
    utp2: '✓ Official contract',
    utp3: '✓ No middlemen',
    pricesTitle: 'Prices by month',
    perNight: '/night',
    cleaning: 'Cleaning',
    deposit: 'Deposit',
    depositOnce: '(one-time)',
    depositReturn: '(refundable)',
    yourBooking: 'Your booking',
    depositNote: '💡 Deposit €{n} is returned on checkout after inspection',
    noDates: 'Select dates in the catalogue to see the exact price',
    nightsShort: (n) => `${n} night${n !== 1 ? 's' : ''}`,
    total: 'Total',
    payTitle: 'Payment',
    revolut: 'Revolut (IBAN)',
    revolutDesc: 'IBAN transfer · works from any EU country',
    ibanLabel: 'IBAN',
    ibanCopy: 'Copy',
    ibanCopied: '✓ Copied',
    ibanBic: 'BIC',
    bank: 'Bank card',
    bankDesc: 'Bulgarian bank · available from May',
    bankSoon: 'Soon',
    amenitiesTitle: 'What\'s included',
    rulesTitle: 'House rules',
    ownerTitle: 'Host',
    ownerBookings: 'successful bookings',
    ownerTagline: 'I meet every guest personally and sign a contract on arrival',
    reviewsTitle: 'Guest reviews',
    reviewSummary: 'based on {n} bookings',
    faqBtn: '❓ FAQ · Visa · Transfer',
    bookBtn: '💳 Revolut',
    busyBtn: 'Booked',
    waMsg: (title, from, to, total) =>
      `Hello, Olga! 🏖\nInterested in: ${title}\n` +
      (from && to ? `Dates: ${from} — ${to}\n` : '') +
      (total ? `Total: €${total}\n` : '') +
      `Please confirm booking details.`,
    waRevolutMsg: (title, from, to) =>
      `Hello, Olga! 🏖\nI'd like to pay via Revolut.\nApartment: ${title}\n` +
      (from && to ? `Dates: ${from} — ${to}\n` : '') +
      `Please send your Revolut tag.`,
  },

  amenities: {
    hasAC: 'Air conditioning',
    hasWifi: 'Wi-Fi',
    hasParking: 'Parking',
    hasPool: 'Pool',
    hasBalcony: 'Balcony',
    hasWasher: 'Washing machine',
    hasElevator: 'Elevator',
  },

  rules: {
    noSmoking: 'No smoking (fine €100)',
    noPets: 'No pets (fine €100)',
    minChildAge: (n) => `Children from ${n} years`,
  },

  monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],

  bookings: {
    title: 'How to book',
    heading: '4 steps to your holiday',
    steps: [
      { icon: '📅', title: 'Choose apartment & dates', desc: 'Browse the catalogue, select an apartment and tap "Book".' },
      { icon: '💬', title: 'Message Olga', desc: 'WhatsApp opens with a ready-to-send message — just hit send.' },
      { icon: '💳', title: 'Pay via Revolut', desc: 'Olga will send her Revolut tag. Or pay cash on arrival.' },
      { icon: '🤝', title: 'Arrival & check-in', desc: 'Olga meets you personally, hands over the keys and signs an official rental contract.' },
    ],
    payTitle: '💳 Payment options',
    payNote: 'Official rental contract + handover report on checkout',
    waBtn: '💬 Message on WhatsApp',
    tgBtn: '✈️ Message on Telegram',
    catalogBtn: 'Browse apartments →',
    cash: 'Cash',
    cashDesc: 'On arrival, paid directly to the host',
    waMsg: 'Hello, Olga! I would like to book an apartment in Sveti Vlas. Please let me know available dates.',
  },

  profile: {
    ownerTagline: 'I welcome every guest personally ❤️',
    contactsTitle: 'Contact me',
    language: 'Language',
    menu: {
      favorites: 'Favourites',
      bookings: 'My bookings',
      faq: 'FAQ · Visa · Transfer',
    },
    feedbackTitle: '⭐ Leave a review',
    feedbackSub:   'Share your experience — it helps other guests',
    feedbackWaMsg: 'Hello, Olga! I would like to share my feedback about the stay.',
    appInfo: 'Sveti Vlas · Seaside apartments',
  },

  bookingForm: {
    title:              'Send booking request',
    name:               'Your name',
    namePlaceholder:    'John Smith',
    contact:            'Phone or Telegram',
    contactPlaceholder: '+49 … or @username',
    guests:             'Number of guests',
    comment:            'Comment (optional)',
    commentPlaceholder: 'Arrival time, special requests…',
    nightsShort:        'nights',
    total:              'Total',
    submit:             '📩 Send request',
    sending:            'Sending…',
    errorMsg:           'Failed to send. Please try again or contact via WhatsApp.',
    successTitle:       'Request sent!',
    successText:        'Olga received your request and will get back to you shortly.',
    close:              'Great, waiting for reply!',
  },

  onboarding: {
    greeting:     'Welcome! 👋',
    greetingName: 'Hi, {name}! 👋',
    subtitle:     'Seaside apartments in Bulgaria — direct from owner, no agencies, no markups.',
    features: [
      '🏖  3 min to beach · New build 2025',
      '📅  Pick your dates and check prices',
      '💬  Contact Olga directly in one tap',
    ],
    start:     'Browse apartments →',
    share:     '📤 Share with a friend',
    shareText: 'Found great seaside apartments in Bulgaria — check this bot out!',
  },

  offer: {
    emoji: '🎁',
    title: '15% off your first booking',
    subtitle: 'Subscribe to our bot — get a promo code in a private message',
    bullets: [
      '• Check-in reminder the day before',
      '• First to know about available dates',
      '• Exclusive deals for subscribers',
    ],
    cta: 'Get 15% discount',
    skip: 'Skip',
  },

  faq: {
    title: 'FAQ',
    waTitle: 'Ask the host a question',
    waSub: 'WhatsApp · Olga',
    waBtn: '💬 Ask on WhatsApp',
    notFound: "Didn't find an answer?",
    faqs: [
      {
        category: '✈️ Visa & entry',
        items: [
          { q: 'Do I need a visa to enter Bulgaria?', a: 'Bulgaria joined the Schengen Area in 2024 (air and sea borders). A valid Schengen visa (type C or D) or a Bulgarian national visa is required. Entry without a visa is not possible.' },
          { q: 'How do I get a Schengen visa?', a: 'Apply at the visa centre of any Schengen country. Germany, France, or Spain are usually the fastest options. Processing time is 2–4 weeks. We recommend applying well in advance.' },
          { q: 'Does a Schengen visa from another country work?', a: 'Yes. Any valid Schengen visa (type C or D) allows entry into Bulgaria through the airport.' },
        ],
      },
      {
        category: '🚗 Transfer',
        items: [
          { q: 'How do I get from the airport?', a: 'The nearest airport is Burgas (BOJ), 30–40 minutes from Sveti Vlas. We can arrange a transfer on request. Message us on WhatsApp with your flight date and number in advance.' },
          { q: 'How much does the transfer cost?', a: 'Prices vary by season. In peak season from €40 and up. Message us on WhatsApp to agree on a price and time.' },
          { q: 'Can I arrange a taxi myself?', a: 'Yes, Bolt and local taxi services operate in Bulgaria. However, our transfer is more reliable — the driver will meet you with a name sign.' },
        ],
      },
      {
        category: '🏠 Check-in',
        items: [
          { q: 'What are the check-in and check-out times?', a: 'Check-in from 14:00, check-out by 12:00. Early check-in or late check-out is possible by arrangement — please let us know in advance.' },
          { q: 'How does check-in work?', a: 'I personally welcome every guest, show you the apartment and hand over the keys.' },
          { q: 'Is there a rental contract?', a: 'Yes. An official rental contract is signed on arrival. A handover report is signed on checkout.' },
          { q: "What's included in the price?", a: 'Bed linen, towels, Wi-Fi, parking, air conditioning, fully equipped kitchen (cookware, hob, microwave, fridge), washing machine.' },
          { q: 'What is the deposit?', a: 'A €100 refundable deposit is taken on arrival and returned on checkout after a quick inspection.' },
        ],
      },
      {
        category: '🛍 Nearby amenities',
        items: [
          { q: 'Are there shops nearby?', a: 'Yes! A fresh produce market is 50 metres from the building. A supermarket is a 5-minute walk. Everything is on your doorstep.' },
          { q: 'Where can I eat?', a: 'There are many restaurants nearby — for every taste and budget. Bulgarian cuisine, seafood, European food — all within walking distance.' },
          { q: 'Are the apartments new?', a: 'Yes, this is a newly built development. Modern interiors, new furniture and appliances, fully equipped. Made with love.' },
        ],
      },
      {
        category: '📋 House rules',
        items: [
          { q: 'Is smoking allowed?', a: 'Smoking inside the apartment is not permitted. Fine: €100. Smoking is allowed outside.' },
          { q: 'Are pets allowed?', a: 'No, pets are not allowed. Fine: €100.' },
          { q: 'Are children welcome?', a: 'Yes, children from age 7. The apartment is on a floor served by a lift, so it is safe and accessible.' },
          { q: 'What is the minimum stay?', a: 'Minimum 3 nights. In peak season (July–August) — from 7 nights.' },
          { q: 'Can I rent for a month?', a: 'Yes, long-term rentals are available. Terms and price are agreed directly with the host — message on WhatsApp.' },
        ],
      },
    ],
  },
}
