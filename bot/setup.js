/**
 * Одноразовый скрипт настройки бота через Telegram Bot API.
 *
 * Запуск:
 *   node bot/setup.js
 *
 * Требования:
 *   - Node.js 18+ (встроенный fetch)
 *   - Заполненный .env в корне проекта (BOT_TOKEN=...)
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// --- Загрузка .env вручную (без сторонних пакетов) ---
const __dir = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dir, '../.env')
const envVars = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=').map(s => s.trim()))
    .filter(([k]) => k)
)

const TOKEN = envVars.BOT_TOKEN

if (!TOKEN || TOKEN === 'вставьте_токен_сюда') {
  console.error('❌  Сначала вставь токен в файл .env: BOT_TOKEN=123456:ABC...')
  process.exit(1)
}

const API = `https://api.telegram.org/bot${TOKEN}`

async function call(method, body) {
  const res  = await fetch(`${API}/${method}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })
  const json = await res.json()
  if (json.ok) {
    console.log(`✅  ${method}`)
  } else {
    console.error(`❌  ${method}: ${json.description}`)
  }
  return json
}

// --- Проверяем токен ---
const me = await call('getMe', {})
if (!me.ok) process.exit(1)
console.log(`\n🤖  Бот: @${me.result.username} (${me.result.first_name})\n`)

// 1. Полное описание (показывается в профиле бота)
await call('setMyDescription', {
  description:
    'Аренда квартир в Святом Власе, Болгария — напрямую от хозяйки Ольги. ' +
    'Новостройка 2025, 3 минуты до пляжа, официальный договор, оплата через Revolut. ' +
    'Нажмите кнопку ниже, чтобы открыть каталог квартир.',
  language_code: 'ru',
})

await call('setMyDescription', {
  description:
    'Apartment rentals in Sveti Vlas, Bulgaria — direct from owner Olga. ' +
    'New build 2025, 3 min to beach, official contract, pay via Revolut. ' +
    'Tap the button below to browse apartments.',
  language_code: 'en',
})

await call('setMyDescription', {
  description:
    'Ferienwohnungen in Sveti Vlas, Bulgarien — direkt von Eigentümerin Olga. ' +
    'Neubau 2025, 3 Min zum Strand, offizieller Mietvertrag, Zahlung per Revolut. ' +
    'Tippen Sie auf die Schaltfläche unten, um den Katalog zu öffnen.',
  language_code: 'de',
})

// 2. Краткое описание (показывается в списке ботов при поиске)
await call('setMyShortDescription', {
  short_description: 'Квартиры у моря в Болгарии — напрямую от хозяйки, без посредников.',
  language_code: 'ru',
})
await call('setMyShortDescription', {
  short_description: 'Seaside apartments in Bulgaria — direct from owner, no middlemen.',
  language_code: 'en',
})
await call('setMyShortDescription', {
  short_description: 'Ferienwohnungen am Meer in Bulgarien — direkt vom Eigentümer.',
  language_code: 'de',
})

// 3. Команды бота
await call('setMyCommands', {
  commands: [
    { command: 'start', description: '🏖 Открыть каталог квартир' },
    { command: 'help',  description: '❓ Частые вопросы и помощь'  },
  ],
  language_code: 'ru',
})
await call('setMyCommands', {
  commands: [
    { command: 'start', description: '🏖 Browse apartments'    },
    { command: 'help',  description: '❓ FAQ and help'          },
  ],
  language_code: 'en',
})
await call('setMyCommands', {
  commands: [
    { command: 'start', description: '🏖 Wohnungskatalog öffnen' },
    { command: 'help',  description: '❓ Häufige Fragen und Hilfe' },
  ],
  language_code: 'de',
})

console.log('\n✅  Бот настроен! Проверь в Telegram: @' + me.result.username)
console.log('⚠️   Не забудь:')
console.log('     1. Зайти в @BotFather → выбрать бота → Menu Button → настроить ссылку на Mini App')
console.log('     2. Вставить реальный username бота в tg-app/src/components/OfferModal.jsx')
console.log('     3. Вставить реальный username бота в tg-app/src/components/OnboardingModal.jsx')
