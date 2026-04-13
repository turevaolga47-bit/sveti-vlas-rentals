/**
 * POST /api/notify
 * Принимает данные заявки из Mini App и отправляет уведомление Ольге в Telegram.
 * BOT_TOKEN и ADMIN_CHAT_ID берутся из переменных окружения Vercel.
 */

export default async function handler(req, res) {
  // CORS — Mini App на том же домене, но на всякий случай
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token       = process.env.BOT_TOKEN
  const adminChatId = process.env.ADMIN_CHAT_ID

  if (!token || !adminChatId) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  const {
    apartmentTitle,
    dateFrom,
    dateTo,
    nights,
    pricePerNight,
    total,
    guestName,
    guestContact,
    guests,
    comment,
    lang,
  } = req.body || {}

  // Форматируем дату
  const locale = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'ru-RU'
  const fmt = (d) => d ? new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'long' }) : '—'

  const now = new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const text =
    `🏠 *Новая заявка на бронирование!*\n\n` +
    `*Квартира:* ${apartmentTitle || '—'}\n` +
    `📅 *Даты:* ${fmt(dateFrom)} — ${fmt(dateTo)}` +
      (nights ? ` (${nights} ${nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'})` : '') + `\n` +
    (pricePerNight ? `💶 *Цена:* €${pricePerNight}/ночь\n` : '') +
    (total ? `💰 *Итого:* €${total}\n` : '') +
    `\n*Гость:*\n` +
    `👤 ${guestName || '—'}\n` +
    `📞 ${guestContact || '—'}\n` +
    `👥 Гостей: ${guests || '—'}\n` +
    (comment ? `\n💬 *Комментарий:*\n${comment}\n` : '') +
    `\n🕐 ${now}`

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:    adminChatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: `💬 Ответить в WhatsApp`, url: `https://wa.me/4917675765576` },
        ]],
      },
    }),
  })

  const json = await r.json()
  if (!json.ok) {
    return res.status(500).json({ error: json.description })
  }

  return res.status(200).json({ ok: true })
}
