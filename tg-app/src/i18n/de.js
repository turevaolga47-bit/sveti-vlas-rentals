export default {
  nav: {
    back: '‹ Zurück',
    catalog: 'Wohnungen',
    dates: 'Daten',
    profile: 'Profil',
    bookings: 'Buchung',
    faq: 'FAQ',
  },

  splash: {
    badge: '🌊 Bulgarien · Schwarzes Meer',
    title: 'Sveti Vlas',
    subtitle: 'Ferienwohnungen am Meer — direkt vom Eigentümer',
    cta: 'Verbringen Sie den Sommer 2026 in Bulgarien',
    ctaSub: 'Neubau 2025 · 3 Min zum Strand · Persönliche Begrüßung',
    utp1: '✓ Keine Agenturgebühren',
    utp2: '✓ Offizieller Mietvertrag',
    utp3: '✓ Zahlung per Revolut',
  },

  catalog: {
    title: 'Wohnungen',
    filters: {
      all: 'Alle',
      free: 'Verfügbar',
      parking: 'Parkplatz',
      ac: 'Klimaanlage',
    },
    empty: 'Keine Wohnungen für diesen Filter',
    free: '✓ Verfügbar',
    busy: '✗ Gebucht',
    perNight: '/ Nacht',
    nights: (n) => `${n} Nacht${n !== 1 ? 'ä' + 'e' : ''}`,
    total: 'gesamt',
    bookings: 'Buchungen',
  },

  dates: {
    title: 'Daten auswählen',
    guests: 'Gäste',
    confirm: 'Wohnungen anzeigen',
    skip: 'Überspringen',
    nights: (n) => `${n} Nacht${n !== 1 ? 'ä' + 'e' : ''}`,
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    months: ['Januar','Februar','März','April','Mai','Juni',
             'Juli','August','September','Oktober','November','Dezember'],
  },

  apt: {
    beach: 'Min zum Strand',
    guests: 'bis {n} Gäste',
    area: 'm²',
    floor: 'Etage',
    utp1: '✓ Persönliche Begrüßung',
    utp2: '✓ Offizieller Mietvertrag',
    utp3: '✓ Keine Zwischenhändler',
    pricesTitle: 'Preise nach Monat',
    perNight: '/Nacht',
    cleaning: 'Reinigung',
    deposit: 'Kaution',
    depositOnce: '(einmalig)',
    depositReturn: '(rückerstattbar)',
    yourBooking: 'Ihre Buchung',
    depositNote: '💡 Kaution €{n} wird nach der Abreisekontrolle zurückgegeben',
    noDates: 'Wählen Sie Daten im Katalog, um den genauen Preis zu sehen',
    nightsShort: (n) => `${n} Nacht${n !== 1 ? 'ä' + 'e' : ''}`,
    total: 'Gesamt',
    payTitle: 'Zahlung',
    revolut: 'Revolut (IBAN)',
    revolutDesc: 'IBAN-Überweisung · funktioniert aus jedem EU-Land',
    ibanLabel: 'IBAN',
    ibanCopy: 'Kopieren',
    ibanCopied: '✓ Kopiert',
    ibanBic: 'BIC',
    bank: 'Bankkarte',
    bankDesc: 'Bulgarische Bank · verfügbar ab Mai',
    bankSoon: 'Bald',
    amenitiesTitle: 'Ausstattung',
    rulesTitle: 'Hausregeln',
    ownerTitle: 'Gastgeberin',
    ownerBookings: 'erfolgreiche Buchungen',
    ownerTagline: 'Ich begrüße jeden Gast persönlich und unterzeichne einen Mietvertrag',
    reviewsTitle: 'Gästebewertungen',
    reviewSummary: 'basierend auf {n} Buchungen',
    faqBtn: '❓ FAQ · Visum · Transfer',
    bookBtn: '💳 Revolut',
    busyBtn: 'Gebucht',
    waMsg: (title, from, to, total) =>
      `Hallo Olga! 🏖\nIch interessiere mich für: ${title}\n` +
      (from && to ? `Zeitraum: ${from} — ${to}\n` : '') +
      (total ? `Gesamt: €${total}\n` : '') +
      `Bitte bestätigen Sie die Buchungsdetails.`,
    waRevolutMsg: (title, from, to) =>
      `Hallo Olga! 🏖\nIch möchte per Revolut bezahlen.\nWohnung: ${title}\n` +
      (from && to ? `Zeitraum: ${from} — ${to}\n` : '') +
      `Bitte senden Sie mir Ihren Revolut-Tag.`,
  },

  amenities: {
    hasAC: 'Klimaanlage',
    hasWifi: 'Wi-Fi',
    hasParking: 'Parkplatz',
    hasPool: 'Pool',
    hasBalcony: 'Balkon',
    hasWasher: 'Waschmaschine',
    hasElevator: 'Aufzug',
  },

  rules: {
    noSmoking: 'Rauchen verboten (Strafe €100)',
    noPets: 'Keine Haustiere (Strafe €100)',
    minChildAge: (n) => `Kinder ab ${n} Jahren`,
  },

  monthsShort: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],

  bookings: {
    title: 'So buchen Sie',
    heading: '4 Schritte zu Ihrem Urlaub',
    steps: [
      { icon: '📅', title: 'Wohnung & Daten wählen', desc: 'Durchsuchen Sie den Katalog, wählen Sie eine Wohnung und tippen Sie auf „Buchen".' },
      { icon: '💬', title: 'Olga schreiben', desc: 'WhatsApp öffnet sich mit einer fertigen Nachricht — einfach absenden.' },
      { icon: '💳', title: 'Per Revolut bezahlen', desc: 'Olga schickt Ihnen ihren Revolut-Tag. Oder Barzahlung bei der Ankunft.' },
      { icon: '🤝', title: 'Ankunft & Check-in', desc: 'Olga empfängt Sie persönlich, übergibt die Schlüssel und unterzeichnet einen offiziellen Mietvertrag.' },
    ],
    payTitle: '💳 Zahlungsoptionen',
    payNote: 'Offizieller Mietvertrag + Übergabeprotokoll bei Abreise',
    waBtn: '💬 WhatsApp schreiben',
    tgBtn: '✈️ Telegram schreiben',
    catalogBtn: 'Wohnungen ansehen →',
    cash: 'Barzahlung',
    cashDesc: 'Bei Ankunft, direkt an die Gastgeberin',
    waMsg: 'Hallo Olga! Ich möchte eine Wohnung in Sveti Vlas buchen. Bitte teilen Sie mir verfügbare Termine mit.',
  },

  profile: {
    ownerTagline: 'Ich begrüße jeden Gast persönlich ❤️',
    contactsTitle: 'Kontakt',
    language: 'Sprache',
    menu: {
      favorites: 'Favoriten',
      bookings: 'Meine Buchungen',
      faq: 'FAQ · Visum · Transfer',
    },
    appInfo: 'Sveti Vlas · Ferienwohnungen am Meer',
  },

  bookingForm: {
    title:              'Buchungsanfrage senden',
    name:               'Ihr Name',
    namePlaceholder:    'Max Mustermann',
    contact:            'Telefon oder Telegram',
    contactPlaceholder: '+49 … oder @username',
    guests:             'Anzahl der Gäste',
    comment:            'Kommentar (optional)',
    commentPlaceholder: 'Ankunftszeit, besondere Wünsche…',
    nightsShort:        'Nächte',
    total:              'Gesamt',
    submit:             '📩 Anfrage senden',
    sending:            'Wird gesendet…',
    errorMsg:           'Fehler beim Senden. Bitte erneut versuchen oder per WhatsApp kontaktieren.',
    successTitle:       'Anfrage gesendet!',
    successText:        'Olga hat Ihre Anfrage erhalten und meldet sich in Kürze.',
    close:              'Prima, ich warte auf Antwort!',
  },

  onboarding: {
    greeting:     'Willkommen! 👋',
    greetingName: 'Hallo, {name}! 👋',
    subtitle:     'Ferienwohnungen am Meer in Bulgarien — direkt vom Eigentümer, ohne Agenturen.',
    features: [
      '🏖  3 Min zum Strand · Neubau 2025',
      '📅  Wählen Sie Daten und prüfen Sie Preise',
      '💬  Olga direkt in einem Tap kontaktieren',
    ],
    start:     'Wohnungen ansehen →',
    share:     '📤 Mit einem Freund teilen',
    shareText: 'Tolle Ferienwohnungen am Meer in Bulgarien — schau mal in diesen Bot!',
  },

  offer: {
    emoji: '🎁',
    title: '15 % Rabatt auf die erste Buchung',
    subtitle: 'Abonnieren Sie unseren Bot — erhalten Sie einen Promo-Code per Privatnachricht',
    bullets: [
      '• Erinnerung am Tag vor dem Check-in',
      '• Erste Informationen über freie Termine',
      '• Exklusive Angebote für Abonnenten',
    ],
    cta: '15 % Rabatt erhalten',
    skip: 'Überspringen',
  },

  faq: {
    title: 'Häufige Fragen',
    waTitle: 'Frage an die Gastgeberin',
    waSub: 'WhatsApp · Olga',
    waBtn: '💬 Per WhatsApp fragen',
    notFound: 'Keine Antwort gefunden?',
    faqs: [
      {
        category: '✈️ Visum & Einreise',
        items: [
          { q: 'Brauche ich ein Visum für Bulgarien?', a: 'Bulgarien ist seit 2024 Teil des Schengen-Raums (Luft- und Seegrenzen). Ein gültiges Schengen-Visum (Typ C oder D) oder ein nationales bulgarisches Visum ist erforderlich. Die Einreise ohne Visum ist nicht möglich.' },
          { q: 'Wie erhalte ich ein Schengen-Visum?', a: 'Beantragen Sie es bei der Visastelle eines Schengen-Landes. Deutschland, Frankreich oder Spanien sind oft die schnellsten Optionen. Bearbeitungszeit: 2–4 Wochen. Wir empfehlen, rechtzeitig zu beantragen.' },
          { q: 'Gilt ein Schengen-Visum eines anderen Landes?', a: 'Ja. Jedes gültige Schengen-Visum der Kategorie C oder D ermöglicht die Einreise nach Bulgarien über den Flughafen.' },
        ],
      },
      {
        category: '🚗 Transfer',
        items: [
          { q: 'Wie komme ich vom Flughafen?', a: 'Der nächste Flughafen ist Burgas (BOJ), 30–40 Minuten von Sveti Vlas entfernt. Wir können auf Anfrage einen Transfer organisieren. Schreiben Sie uns vorab per WhatsApp mit Datum und Flugnummer.' },
          { q: 'Was kostet der Transfer?', a: 'Die Preise variieren je nach Saison. In der Hochsaison ab €40. Schreiben Sie uns per WhatsApp, um Preis und Zeit zu vereinbaren.' },
          { q: 'Kann ich selbst ein Taxi buchen?', a: 'Ja, Bolt und lokale Taxidienste sind in Bulgarien verfügbar. Unser Transfer ist jedoch zuverlässiger — der Fahrer erwartet Sie mit einem Namensschild.' },
        ],
      },
      {
        category: '🏠 Check-in',
        items: [
          { q: 'Wann ist Check-in und Check-out?', a: 'Check-in ab 14:00 Uhr, Check-out bis 12:00 Uhr. Früher Check-in oder später Check-out ist nach Absprache möglich — bitte im Voraus anfragen.' },
          { q: 'Wie läuft das Check-in ab?', a: 'Ich begrüße jeden Gast persönlich, zeige die Wohnung und übergebe die Schlüssel.' },
          { q: 'Gibt es einen Mietvertrag?', a: 'Ja. Beim Check-in wird ein offizieller Mietvertrag unterzeichnet. Beim Check-out ein Übergabeprotokoll.' },
          { q: 'Was ist im Preis enthalten?', a: 'Bettwäsche, Handtücher, WLAN, Parkplatz, Klimaanlage, voll ausgestattete Küche (Kochgeschirr, Herd, Mikrowelle, Kühlschrank), Waschmaschine.' },
          { q: 'Was ist die Kaution?', a: 'Eine rückerstattbare Kaution von €100 wird beim Check-in erhoben und nach der Abreisekontrolle zurückgegeben.' },
        ],
      },
      {
        category: '🛍 Nahegelegene Einrichtungen',
        items: [
          { q: 'Gibt es Einkaufsmöglichkeiten in der Nähe?', a: 'Ja! Ein Frischemarkt ist 50 Meter vom Haus entfernt. Ein Supermarkt ist 5 Minuten zu Fuß entfernt. Alles ist in Reichweite.' },
          { q: 'Wo kann ich essen?', a: 'Es gibt viele Restaurants in der Nähe — für jeden Geschmack und jedes Budget. Bulgarische Küche, Meeresfrüchte, europäische Küche — alles in Gehweite.' },
          { q: 'Sind die Wohnungen neu?', a: 'Ja, es handelt sich um einen Neubau. Modernes Interieur, neue Möbel und Geräte, komplett eingerichtet. Mit Liebe gestaltet.' },
        ],
      },
      {
        category: '📋 Hausregeln',
        items: [
          { q: 'Ist Rauchen erlaubt?', a: 'Rauchen in der Wohnung ist nicht gestattet. Strafe: €100. Rauchen ist im Freien erlaubt.' },
          { q: 'Sind Haustiere erlaubt?', a: 'Nein, Haustiere sind nicht erlaubt. Strafe: €100.' },
          { q: 'Sind Kinder willkommen?', a: 'Ja, Kinder ab 7 Jahren. Die Wohnung liegt in einem Stockwerk mit Aufzug und ist sicher zugänglich.' },
          { q: 'Was ist die Mindestmietdauer?', a: 'Mindestens 3 Nächte. In der Hochsaison (Juli–August) ab 7 Nächte.' },
          { q: 'Kann ich für einen Monat mieten?', a: 'Ja, Langzeitmiete ist möglich. Konditionen und Preis werden direkt mit der Gastgeberin vereinbart — schreiben Sie per WhatsApp.' },
        ],
      },
    ],
  },
}
