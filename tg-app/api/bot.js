/**
 * Vercel Serverless Function — Telegram Bot webhook
 * URL: https://tg-app-gold.vercel.app/api/bot
 *
 * Обрабатывает команды /start и /help от пользователей бота.
 * BOT_TOKEN берётся из переменных окружения Vercel.
 */

const APP_URL   = 'https://tg-app-gold.vercel.app'
const PHOTO_URL = `${APP_URL}/photos/photo_2026-04-02_18-16-47.jpg`

export default async function handler(req, res) {
  // Vercel ping / проверка работоспособности
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
  const firstName = message.from?.first_name || 'друг'
  const text      = message.text || ''

  // /start — приветствие с фото
  if (text === '/start' || text.startsWith('/start ')) {
    await call('sendPhoto', {
      chat_id:    chatId,
      photo:      PHOTO_URL,
      caption:
        `Привет, ${firstName}! 🌊\n\n` +
        `Добро пожаловать в *Святой Влас* — солнечный курорт на Чёрном море в Болгарии.\n\n` +
        `🏖 *3 минуты до пляжа* · Новостройка 2025\n` +
        `👤 Напрямую от хозяйки, без посредников\n` +
        `📄 Официальный договор при заселении\n` +
        `💳 Оплата через Revolut\n\n` +
        `Нажми кнопку ниже — посмотри квартиры и выбери даты 👇`,
      parse_mode:   'Markdown',
      reply_markup: {
        inline_keyboard: [[
          {
            text:    '🏖 Смотреть квартиры',
            web_app: { url: APP_URL },
          },
        ]],
      },
    })
    return res.status(200).json({ ok: true })
  }

  // /help — справка
  if (text === '/help') {
    await call('sendMessage', {
      chat_id:    chatId,
      text:
        `❓ *Как арендовать квартиру*\n\n` +
        `1️⃣ Нажми кнопку ниже — открой каталог\n` +
        `2️⃣ Выбери квартиру и даты\n` +
        `3️⃣ Напиши Ольге — она ответит быстро\n` +
        `4️⃣ Оплати через Revolut или наличными\n\n` +
        `*Связь с хозяйкой:*\n` +
        `💬 WhatsApp: +49 176 75765576\n` +
        `✈️ Telegram: @OlgaTurevaSv`,
      parse_mode:   'Markdown',
      reply_markup: {
        inline_keyboard: [[
          {
            text:    '🏖 Открыть каталог',
            web_app: { url: APP_URL },
          },
        ]],
      },
    })
    return res.status(200).json({ ok: true })
  }

  // Любое другое сообщение — подсказка
  await call('sendMessage', {
    chat_id:    chatId,
    text:       `Привет! Нажми кнопку *🏖 Квартиры* внизу экрана, чтобы открыть каталог. Или напиши /help если нужна помощь.`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        {
          text:    '🏖 Смотреть квартиры',
          web_app: { url: APP_URL },
        },
      ]],
    },
  })

  return res.status(200).json({ ok: true })
}
