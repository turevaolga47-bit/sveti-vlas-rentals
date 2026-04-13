/**
 * Vercel Serverless Function — Telegram Bot webhook
 * URL: https://tg-app-gold.vercel.app/api/bot
 *
 * Обрабатывает команды /start и /help от пользователей бота.
 * BOT_TOKEN берётся из переменных окружения Vercel.
 */

const APP_URL   = 'https://tg-app-gold.vercel.app'
const PHOTO_URL = `${APP_URL}/photos/photo_2026-04-02_18-16-47.jpg`

// Тексты на трёх языках
const COPY = {
  ru: {
    start: (name) =>
      `${name}, мечтаете об отдыхе у тёплого моря? 🌊\n\n` +
      `*Святой Влас* — уютный болгарский курорт на Чёрном море. ` +
      `Чистый пляж, тёплая вода, свежие фрукты прямо у дома.\n\n` +
      `Предлагаю квартиру напрямую — без посредников:\n\n` +
      `🏖 *3 минуты до пляжа пешком*\n` +
      `🏢 Новостройка 2025 — всё новое и чистое\n` +
      `📄 Официальный договор при заселении\n` +
      `💳 Оплата через Revolut из любой страны\n` +
      `🤝 Встречаю лично, передаю ключи в руки\n\n` +
      `Посмотрите квартиры и выберите даты 👇`,
    startBtn: '🏖 Смотреть квартиры',
    help:
      `❓ *Как арендовать квартиру*\n\n` +
      `1️⃣ Нажмите кнопку ниже — откройте каталог\n` +
      `2️⃣ Выберите квартиру и даты\n` +
      `3️⃣ Напишите Ольге — она ответит быстро\n` +
      `4️⃣ Оплатите через Revolut или наличными\n\n` +
      `*Связь с хозяйкой:*\n` +
      `💬 WhatsApp: +49 176 75765576\n` +
      `✈️ Telegram: @OlgaTurevaSv`,
    helpBtn: '🏖 Открыть каталог',
    fallback: `Нажмите кнопку *🏖 Квартиры* внизу, чтобы открыть каталог. Или напишите /help.`,
    fallbackBtn: '🏖 Смотреть квартиры',
  },
  en: {
    start: (name) =>
      `${name}, dreaming of a warm sea holiday? 🌊\n\n` +
      `*Sveti Vlas* — a charming Bulgarian resort on the Black Sea. ` +
      `Sandy beach, warm water, fresh fruit market right outside.\n\n` +
      `I offer apartments direct from the owner — no middlemen:\n\n` +
      `🏖 *3 min walk to the beach*\n` +
      `🏢 New build 2025 — everything brand new\n` +
      `📄 Official rental contract on arrival\n` +
      `💳 Pay via Revolut from any country\n` +
      `🤝 Personal welcome, keys handed over in person\n\n` +
      `Browse apartments and pick your dates 👇`,
    startBtn: '🏖 Browse apartments',
    help:
      `❓ *How to book*\n\n` +
      `1️⃣ Tap the button below — open the catalogue\n` +
      `2️⃣ Choose an apartment and dates\n` +
      `3️⃣ Message Olga — she replies fast\n` +
      `4️⃣ Pay via Revolut or cash on arrival\n\n` +
      `*Contact the host:*\n` +
      `💬 WhatsApp: +49 176 75765576\n` +
      `✈️ Telegram: @OlgaTurevaSv`,
    helpBtn: '🏖 Open catalogue',
    fallback: `Tap the *🏖 Apartments* button below to open the catalogue. Or type /help.`,
    fallbackBtn: '🏖 Browse apartments',
  },
  de: {
    start: (name) =>
      `${name}, träumen Sie von einem Urlaub am warmen Meer? 🌊\n\n` +
      `*Sveti Vlas* — ein charmanter bulgarischer Ferienort am Schwarzen Meer. ` +
      `Sandstrand, warmes Wasser, frischer Markt direkt vor der Tür.\n\n` +
      `Ich biete Wohnungen direkt vom Eigentümer — ohne Vermittler:\n\n` +
      `🏖 *3 Minuten zum Strand zu Fuß*\n` +
      `🏢 Neubau 2025 — alles brandneu\n` +
      `📄 Offizieller Mietvertrag beim Check-in\n` +
      `💳 Zahlung per Revolut aus jedem Land\n` +
      `🤝 Persönliche Begrüßung, Schlüssel direkt in die Hand\n\n` +
      `Wohnungen ansehen und Daten wählen 👇`,
    startBtn: '🏖 Wohnungen ansehen',
    help:
      `❓ *Wie buchen*\n\n` +
      `1️⃣ Tippen Sie auf die Schaltfläche unten\n` +
      `2️⃣ Wählen Sie eine Wohnung und Daten\n` +
      `3️⃣ Schreiben Sie Olga — sie antwortet schnell\n` +
      `4️⃣ Zahlen Sie per Revolut oder bar\n\n` +
      `*Kontakt zur Gastgeberin:*\n` +
      `💬 WhatsApp: +49 176 75765576\n` +
      `✈️ Telegram: @OlgaTurevaSv`,
    helpBtn: '🏖 Katalog öffnen',
    fallback: `Tippen Sie auf *🏖 Wohnungen* unten, um den Katalog zu öffnen. Oder schreiben Sie /help.`,
    fallbackBtn: '🏖 Wohnungen ansehen',
  },
}

function getLang(langCode) {
  if (!langCode) return 'ru'
  if (langCode.startsWith('de')) return 'de'
  if (langCode.startsWith('en')) return 'en'
  return 'ru'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('🤖 ApartmenRentals bot is running')
  }

  const token = process.env.BOT_TOKEN
  if (!token) return res.status(500).json({ error: 'BOT_TOKEN not set' })

  const API = `https://api.telegram.org/bot${token}`

  async function call(method, body) {
    const r = await fetch(`${API}/${method}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    return r.json()
  }

  const update  = req.body
  const message = update?.message
  if (!message) return res.status(200).json({ ok: true })

  const chatId    = message.chat.id
  const firstName = message.from?.first_name || '👋'
  const lang      = getLang(message.from?.language_code)
  const copy      = COPY[lang]
  const text      = message.text || ''

  // /start — приветствие с фото
  if (text === '/start' || text.startsWith('/start ')) {
    await call('sendPhoto', {
      chat_id:      chatId,
      photo:        PHOTO_URL,
      caption:      copy.start(firstName),
      parse_mode:   'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: copy.startBtn, web_app: { url: APP_URL } },
        ]],
      },
    })
    return res.status(200).json({ ok: true })
  }

  // /myid и /admin — панель владельца
  if (text === '/myid' || text === '/admin') {
    await call('sendMessage', {
      chat_id: chatId,
      text:
        `🏠 *Панель владельца — ApartmenRentals*\n\n` +

        `*Что разработано:*\n` +
        `✅ Mini App — каталог 2 квартир с фото, ценами, отзывами\n` +
        `✅ Выбор дат и расчёт стоимости по месяцам\n` +
        `✅ Форма заявки → уведомление вам в Telegram\n` +
        `✅ Мультиязычность: 🇷🇺 🇬🇧 🇩🇪\n` +
        `✅ Онбординг и оффер (скидка 15%) — по одному разу\n` +
        `✅ Страница оплаты: Revolut IBAN + болгарский банк\n` +
        `✅ FAQ: виза, трансфер, заселение, правила\n` +
        `✅ Профиль хозяйки с контактами и отзывами\n` +
        `✅ Блок «Оставьте отзыв» в профиле\n` +
        `✅ Бот: /start с фото, /help, мультиязык\n\n` +

        `*Ссылки:*\n` +
        `🌐 Mini App: https://tg-app-gold.vercel.app\n` +
        `💻 GitHub: github.com/turevaolga47-bit/sveti-vlas-rentals\n\n` +

        `*Ваш Chat ID:* \`${chatId}\``,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '🏖 Открыть Mini App', web_app: { url: 'https://tg-app-gold.vercel.app' } }
        ]]
      }
    })
    return res.status(200).json({ ok: true })
  }

  // /help
  if (text === '/help') {
    await call('sendMessage', {
      chat_id:      chatId,
      text:         copy.help,
      parse_mode:   'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: copy.helpBtn, web_app: { url: APP_URL } },
        ]],
      },
    })
    return res.status(200).json({ ok: true })
  }

  // Любое другое сообщение
  await call('sendMessage', {
    chat_id:      chatId,
    text:         copy.fallback,
    parse_mode:   'Markdown',
    reply_markup: {
      inline_keyboard: [[
        { text: copy.fallbackBtn, web_app: { url: APP_URL } },
      ]],
    },
  })

  return res.status(200).json({ ok: true })
}
