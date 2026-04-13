import { useState } from 'react'
import { useLang } from '../i18n/useLang'
import styles from './OnboardingModal.module.css'

// TODO: заменить на реальный username бота после создания через @BotFather
const BOT_USERNAME = 'ApartmenRentals_bot'
const STORAGE_KEY  = 'svlas_onboarding_seen'

function hasSeenOnboarding() {
  try { return !!localStorage.getItem(STORAGE_KEY) } catch { return true }
}
function markOnboardingSeen() {
  try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
}

export default function OnboardingModal() {
  const [visible, setVisible] = useState(() => !hasSeenOnboarding())
  const { t } = useLang()

  if (!visible) return null

  // Имя из Telegram — или «Гость» если открыто в браузере
  const tgUser   = window.Telegram?.WebApp?.initDataUnsafe?.user
  const firstName = tgUser?.first_name?.trim() || null

  function handleStart() {
    markOnboardingSeen()
    setVisible(false)
  }

  function handleShare() {
    const url  = `https://t.me/${BOT_USERNAME}`
    const text = t.onboarding.shareText
    const tg = window.Telegram?.WebApp
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
    } else {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>

        {/* Аватар из Telegram или эмодзи */}
        {tgUser?.photo_url
          ? <img src={tgUser.photo_url} alt="" className={styles.avatar} />
          : <div className={styles.avatarEmoji}>🏖</div>
        }

        {/* Приветствие */}
        <h2 className={styles.title}>
          {firstName
            ? t.onboarding.greetingName.replace('{name}', firstName)
            : t.onboarding.greeting}
        </h2>

        <p className={styles.subtitle}>{t.onboarding.subtitle}</p>

        {/* Что можно сделать */}
        <ul className={styles.features}>
          {t.onboarding.features.map((item, i) => (
            <li key={i} className={styles.feature}>{item}</li>
          ))}
        </ul>

        {/* Кнопка старта */}
        <button className={styles.startBtn} onClick={handleStart}>
          {t.onboarding.start}
        </button>

        {/* Поделиться */}
        <button className={styles.shareBtn} onClick={handleShare}>
          {t.onboarding.share}
        </button>

      </div>
    </div>
  )
}
