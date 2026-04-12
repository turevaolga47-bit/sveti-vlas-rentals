import { useState } from 'react'
import useStore from '../store/useStore'
import { getNightPrice, calcTotal } from '../data/apartments'
import NavHeader from '../components/NavHeader'
import styles from './ApartmentScreen.module.css'

const WHATSAPP = '4917675765576'
const TELEGRAM = 'OlgaTurevaSv'

const MONTH_NAMES = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']

const AMENITY_LABELS = [
  ['hasAC',       '❄️', 'Кондиционер'],
  ['hasWifi',     '📶', 'Wi-Fi'],
  ['hasParking',  '🅿️', 'Парковка'],
  ['hasPool',     '🏊', 'Бассейн'],
  ['hasBalcony',  '🌅', 'Балкон'],
  ['hasWasher',   '🫧', 'Стиральная машина'],
  ['hasElevator', '🛗', 'Лифт'],
]

const RULE_LABELS = [
  ['noSmoking',   '🚭', 'Не курить (штраф €100)'],
  ['noPets',      '🐾', 'Без животных (штраф €100)'],
  ['minChildAge', '👶', (val) => `Дети от ${val} лет`],
]

export default function ApartmentScreen() {
  const { selectedApartment: apt, dateFrom, dateTo, navigate, favorites, toggleFavorite } = useStore()
  const [photoIdx, setPhotoIdx] = useState(0)

  if (!apt) { navigate('catalog'); return null }

  const isFav = favorites.includes(apt.id)
  const price = getNightPrice(apt, dateFrom)
  const cost  = calcTotal(apt, dateFrom, dateTo)

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Здравствуйте, Ольга! Интересует ${apt.title} в Святом Власе.`)}`

  function handleBook() {
    window.open(waLink, '_blank')
  }

  function handleShare() {
    const tg = window.Telegram?.WebApp
    const text = `🏖 *${apt.title}*\n€${price}/ночь · ${apt.area} м² · ${apt.beachMinutes} мин до моря\nСвятой Влас, Болгария`
    tg?.shareMessage?.(text)
  }

  return (
    <div className={styles.wrap}>
      <NavHeader />
      {/* Фото галерея */}
      <div className={styles.gallery}>
        <img src={apt.photos[photoIdx]} alt={apt.title} className={styles.photo} />
        <div className={styles.dots}>
          {apt.photos.map((_, i) => (
            <span key={i}
              className={`${styles.dot} ${i === photoIdx ? styles.dotActive : ''}`}
              onClick={() => setPhotoIdx(i)}
            />
          ))}
        </div>
        <button className={styles.fav} onClick={() => toggleFavorite(apt.id)} aria-label="В избранное">
          {isFav ? '❤️' : '🤍'}
        </button>
        <button className={styles.share} onClick={handleShare} aria-label="Поделиться">📤</button>
        <span className={`${styles.badge} ${apt.available ? styles.badgeFree : styles.badgeBusy}`}>
          {apt.available ? '✓ Свободно' : '✗ Занято'}
        </span>
        {photoIdx > 0 && (
          <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={() => setPhotoIdx(i => i - 1)}>‹</button>
        )}
        {photoIdx < apt.photos.length - 1 && (
          <button className={`${styles.navBtn} ${styles.navNext}`} onClick={() => setPhotoIdx(i => i + 1)}>›</button>
        )}
      </div>

      <div className={styles.content}>
        {/* Заголовок */}
        <h1 className={styles.title}>{apt.title}</h1>
        <div className={styles.meta}>
          <span>🏖 {apt.beachMinutes} мин до моря</span>
          <span>👤 до {apt.guests} гостей</span>
          <span>📐 {apt.area} м²</span>
          <span>🏢 {apt.floor}/{apt.totalFloors} эт.</span>
        </div>

        <p className={styles.desc}>{apt.description}</p>

        {/* Цены по месяцам */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Цены по месяцам</h3>
          <div className={styles.priceGrid}>
            {Object.entries(apt.priceByMonth).map(([month, p]) => (
              <div key={month} className={`${styles.priceCell} ${p >= 90 ? styles.priceCellHigh : p >= 60 ? styles.priceCellMid : styles.priceCellLow}`}>
                <span className={styles.priceCellMonth}>{MONTH_NAMES[+month - 1]}</span>
                <span className={styles.priceCellPrice}>€{p}</span>
                <span className={styles.priceCellUnit}>/ночь</span>
              </div>
            ))}
          </div>
          <div className={styles.priceExtras}>
            <span>🧹 Уборка: <b>€{apt.cleaningFee}</b> (разово)</span>
            <span>🔐 Депозит: <b>€{apt.deposit}</b> (возвратный)</span>
          </div>
        </section>

        {/* Расчёт по выбранным датам */}
        {cost && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Ваша бронь</h3>
            <div className={styles.priceTable}>
              <div className={styles.priceRow}>
                <span>€{cost.pricePerNight} × {cost.nights} {cost.nights === 1 ? 'ночь' : cost.nights < 5 ? 'ночи' : 'ночей'}</span>
                <span>€{cost.rent}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Уборка</span>
                <span>€{apt.cleaningFee}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Депозит (возвратный)</span>
                <span>€{apt.deposit}</span>
              </div>
              <div className={`${styles.priceRow} ${styles.priceTotal}`}>
                <span>Итого</span>
                <span>€{cost.total}</span>
              </div>
            </div>
          </section>
        )}

        {/* Удобства */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Удобства</h3>
          <div className={styles.amenities}>
            {AMENITY_LABELS.map(([key, icon, label]) =>
              apt[key] ? (
                <div key={key} className={styles.amenity}>
                  <span className={styles.amenityIcon}>{icon}</span>
                  <span className={styles.amenityLabel}>{label}</span>
                </div>
              ) : null
            )}
          </div>
        </section>

        {/* Правила */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Правила</h3>
          <div className={styles.rules}>
            {RULE_LABELS.map(([key, icon, label]) => {
              if (!apt[key]) return null
              const text = typeof label === 'function' ? label(apt[key]) : label
              return (
                <div key={key} className={styles.rule}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Хозяйка + контакты */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Хозяйка</h3>
          <div className={styles.owner}>
            {apt.owner.photo
              ? <img src={apt.owner.photo} alt={apt.owner.name} className={styles.ownerPhoto} />
              : <div className={styles.ownerAvatar}>{apt.owner.name[0]}</div>
            }
            <div className={styles.ownerInfo}>
              <span className={styles.ownerName}>
                {apt.owner.name}
                {apt.owner.verified && <span className={styles.verified}> ✓</span>}
              </span>
              <span className={styles.ownerStats}>{apt.owner.bookings} бронирований</span>
            </div>
          </div>
          <div className={styles.contacts}>
            <a href={waLink} className={styles.contactBtn} target="_blank" rel="noreferrer">
              <span>💬</span> WhatsApp
            </a>
            <a href={`https://t.me/${TELEGRAM}`} className={styles.contactBtn} target="_blank" rel="noreferrer">
              <span>✈️</span> Telegram
            </a>
          </div>
        </section>

        {/* FAQ ссылка */}
        <button className={styles.faqBtn} onClick={() => navigate('faq')}>
          ❓ Частые вопросы · Виза · Трансфер
        </button>

        <div className={styles.footerSpacer} />
      </div>

      {/* Кнопка бронирования */}
      <div className={styles.footer}>
        <div className={styles.footerPrice}>
          <span className={styles.footerPriceMain}>€{price} <small>/ночь</small></span>
          {cost && <span className={styles.footerPriceTotal}>итого €{cost.total}</span>}
        </div>
        <button className={styles.bookBtn} disabled={!apt.available} onClick={handleBook}>
          {apt.available ? '💬 Забронировать' : 'Занято'}
        </button>
      </div>
    </div>
  )
}
