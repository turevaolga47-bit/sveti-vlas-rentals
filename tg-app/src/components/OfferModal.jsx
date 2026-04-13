import { useState } from 'react'
import { useLang } from '../i18n/useLang'
import styles from './OfferModal.module.css'

// TODO: заменить на реальный username бота после создания через @BotFather
const BOT_USERNAME = 'ApartmenRentals_bot'
const STORAGE_KEY  = 'svlas_offer_seen'

function hasSeenOffer() {
  try { return !!localStorage.getItem(STORAGE_KEY) } catch { return true }
}

function markOfferSeen() {
  try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
}

export default function OfferModal() {
  const [visible, setVisible] = useState(() => !hasSeenOffer())
  const { t } = useLang()

  if (!visible) return null

  function handleCTA() {
    markOfferSeen()
    setVisible(false)
    const url = `https://t.me/${BOT_USERNAME}?start=from_app`
    const tg = window.Telegram?.WebApp
    // openTelegramLink — открывает ссылку внутри Telegram без выхода из Mini App
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url)
    } else {
      window.open(url, '_blank')
    }
  }

  function handleSkip() {
    markOfferSeen()
    setVisible(false)
  }

  return (
    // Клик по оверлею = закрыть (как «Пропустить»)
    <div className={styles.overlay} onClick={handleSkip}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>

        <div className={styles.emoji}>{t.offer.emoji}</div>

        <h2 className={styles.title}>{t.offer.title}</h2>
        <p className={styles.subtitle}>{t.offer.subtitle}</p>

        <ul className={styles.bullets}>
          {t.offer.bullets.map((item, i) => (
            <li key={i} className={styles.bullet}>{item}</li>
          ))}
        </ul>

        <button className={styles.cta} onClick={handleCTA}>
          {t.offer.cta}
        </button>

        <button className={styles.skip} onClick={handleSkip}>
          {t.offer.skip}
        </button>
      </div>
    </div>
  )
}
