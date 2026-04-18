import { useState } from 'react'
import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import { getNightPrice, calcTotal, getMinPrice, getMaxPrice } from '../data/apartments'
import NavHeader from '../components/NavHeader'
import BookingFormModal from '../components/BookingFormModal'
import styles from './ApartmentScreen.module.css'

const WHATSAPP = '4917675765576'
const TELEGRAM = 'OlgaTurevaSv'
const IBAN = 'LT78 3250 0228 7959 0619'
const BIC  = 'REVOLT21'

const AMENITY_KEYS = [
  ['hasAC',       '❄️'],
  ['hasWifi',     '📶'],
  ['hasParking',  '🅿️'],
  ['hasPool',     '🏊'],
  ['hasBalcony',  '🌅'],
  ['hasWasher',   '🫧'],
  ['hasElevator', '🛗'],
]

const RULE_KEYS  = ['noSmoking', 'noPets', 'minChildAge']
const RULE_ICONS = { noSmoking: '🚭', noPets: '🐾', minChildAge: '👶' }

export default function ApartmentScreen() {
  const { selectedApartment: apt, dateFrom, dateTo, navigate, favorites, toggleFavorite } = useStore()
  const { t, lang } = useLang()
  const [photoIdx, setPhotoIdx] = useState(0)
  const [ibanCopied, setIbanCopied] = useState(false)
  const [showForm, setShowForm] = useState(false)

  if (!apt) { navigate('catalog'); return null }

  const locale      = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'ru-RU'
  const aptTitle    = apt.titleByLang?.[lang] || apt.title
  const aptDesc     = apt.descByLang?.[lang]  || apt.description
  const isFav       = favorites.includes(apt.id)
  const price     = getNightPrice(apt, dateFrom)
  const minPrice  = getMinPrice(apt)
  const maxPrice  = getMaxPrice(apt)
  const cost      = calcTotal(apt, dateFrom, dateTo)

  const fromStr = dateFrom ? new Date(dateFrom).toLocaleDateString(locale) : null
  const toStr   = dateTo   ? new Date(dateTo).toLocaleDateString(locale)   : null

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.apt.waMsg(apt.title, fromStr, toStr, cost?.total))}`

  function copyIban() {
    navigator.clipboard.writeText(IBAN).catch(() => {})
    setIbanCopied(true)
    setTimeout(() => setIbanCopied(false), 2000)
  }

  function handleShare() {
    const priceText = price ? `€${price}${t.apt.perNight}` : `€${minPrice}–${maxPrice}${t.apt.perNight}`
    const text = `🏖 ${apt.title}\n${priceText} · ${apt.area} ${t.apt.area} · ${apt.beachMinutes} ${t.apt.beach}`
    const url  = window.location.href
    if (navigator.share) {
      navigator.share({ title: apt.title, text, url }).catch(() => {})
    } else {
      const tg = window.Telegram?.WebApp
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
      tg ? tg.openLink(shareUrl) : window.open(shareUrl, '_blank')
    }
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
        <button className={styles.fav} onClick={() => toggleFavorite(apt.id)} aria-label="favourite">
          {isFav ? '❤️' : '🤍'}
        </button>
        <button className={styles.share} onClick={handleShare} aria-label="share">📤</button>
        <span className={`${styles.badge} ${apt.available ? styles.badgeFree : styles.badgeBusy}`}>
          {apt.available ? t.catalog.free : t.catalog.busy}
        </span>
        {photoIdx > 0 && (
          <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={() => setPhotoIdx(idx => idx - 1)}>‹</button>
        )}
        {photoIdx < apt.photos.length - 1 && (
          <button className={`${styles.navBtn} ${styles.navNext}`} onClick={() => setPhotoIdx(idx => idx + 1)}>›</button>
        )}
      </div>

      <div className={styles.content}>
        {/* УТП — полоска доверия */}
        <div className={styles.utpRow}>
          <span className={styles.utpItem}>{t.apt.utp1}</span>
          <span className={styles.utpDot}>·</span>
          <span className={styles.utpItem}>{t.apt.utp2}</span>
          <span className={styles.utpDot}>·</span>
          <span className={styles.utpItem}>{t.apt.utp3}</span>
        </div>

        {/* Заголовок */}
        <h1 className={styles.title}>{aptTitle}</h1>
        <div className={styles.meta}>
          <span>🏖 {apt.beachMinutes} {t.apt.beach}</span>
          <span>👤 {t.apt.guests.replace('{n}', apt.guests)}</span>
          <span>📐 {apt.area} {t.apt.area}</span>
          <span>🏢 {apt.floor}/{apt.totalFloors} {t.apt.floor}</span>
        </div>

        <p className={styles.desc}>{aptDesc}</p>

        {/* Цены по месяцам */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{t.apt.pricesTitle}</h3>
          <div className={styles.priceGrid}>
            {Object.entries(apt.priceByMonth).map(([month, p]) => (
              <div key={month} className={`${styles.priceCell} ${p >= 90 ? styles.priceCellHigh : p >= 60 ? styles.priceCellMid : styles.priceCellLow}`}>
                <span className={styles.priceCellMonth}>{t.monthsShort[+month - 1]}</span>
                <span className={styles.priceCellPrice}>€{p}</span>
                <span className={styles.priceCellUnit}>{t.apt.perNight}</span>
              </div>
            ))}
          </div>
          <div className={styles.priceExtras}>
            <span>🧹 {t.apt.cleaning}: <b>€{apt.cleaningFee}</b> {t.apt.depositOnce}</span>
            <span>🔐 {t.apt.deposit}: <b>€{apt.deposit}</b> {t.apt.depositReturn}</span>
          </div>
        </section>

        {/* Расчёт по выбранным датам */}
        {cost ? (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.apt.yourBooking}</h3>
            <div className={styles.priceTable}>
              <div className={styles.priceRow}>
                <span>€{cost.pricePerNight} × {t.apt.nightsShort(cost.nights)}</span>
                <span>€{cost.rent}</span>
              </div>
              <div className={styles.priceRow}>
                <span>{t.apt.cleaning}</span>
                <span>€{apt.cleaningFee}</span>
              </div>
              <div className={styles.priceRow}>
                <span>{t.apt.deposit} {t.apt.depositReturn}</span>
                <span>€{apt.deposit}</span>
              </div>
              <div className={`${styles.priceRow} ${styles.priceTotal}`}>
                <span>{t.apt.total}</span>
                <span>€{cost.total}</span>
              </div>
            </div>
            <p className={styles.depositNote}>
              {t.apt.depositNote.replace('{n}', apt.deposit)}
            </p>
          </section>
        ) : (
          <section className={styles.section}>
            <p className={styles.noDates}>{t.apt.noDates}</p>
          </section>
        )}

        {/* Оплата */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{t.apt.payTitle}</h3>
          <div className={styles.paymentBlock}>
            <div className={styles.paymentRow}>
              <span className={styles.paymentIcon}>💳</span>
              <div className={styles.paymentInfo}>
                <span className={styles.paymentName}>{t.apt.revolut}</span>
                <span className={styles.paymentDesc}>{t.apt.revolutDesc}</span>
                <div className={styles.ibanRow}>
                  <span className={styles.ibanNum}>{IBAN}</span>
                  <button className={styles.ibanCopyBtn} onClick={copyIban}>
                    {ibanCopied ? t.apt.ibanCopied : t.apt.ibanCopy}
                  </button>
                </div>
                <span className={styles.ibanBic}>{t.apt.ibanBic}: {BIC}</span>
              </div>
            </div>
            <div className={styles.paymentRow}>
              <span className={styles.paymentIcon}>🏦</span>
              <div className={styles.paymentInfo}>
                <span className={styles.paymentName}>{t.apt.bank}</span>
                <span className={styles.paymentDesc}>{t.apt.bankDesc}</span>
              </div>
              <span className={styles.paymentSoon}>{t.apt.bankSoon}</span>
            </div>
          </div>
        </section>

        {/* Удобства */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{t.apt.amenitiesTitle}</h3>
          <div className={styles.amenities}>
            {AMENITY_KEYS.map(([key, icon]) =>
              apt[key] ? (
                <div key={key} className={styles.amenity}>
                  <span className={styles.amenityIcon}>{icon}</span>
                  <span className={styles.amenityLabel}>{t.amenities[key]}</span>
                </div>
              ) : null
            )}
          </div>
        </section>

        {/* Правила */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{t.apt.rulesTitle}</h3>
          <div className={styles.rules}>
            {RULE_KEYS.map((key) => {
              if (!apt[key]) return null
              const icon = RULE_ICONS[key]
              const text = typeof t.rules[key] === 'function' ? t.rules[key](apt[key]) : t.rules[key]
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
          <h3 className={styles.sectionTitle}>{t.apt.ownerTitle}</h3>
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
              <span className={styles.ownerStats}>
                {apt.owner.bookings} {t.apt.ownerBookings} · ⭐ 5.0
              </span>
              <span className={styles.ownerTagline}>{t.apt.ownerTagline}</span>
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

        {/* Видео-тур */}
        {apt.videos?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.apt.videosTitle}</h3>
            <div className={styles.videoList}>
              {apt.videos.map((v) => (
                <button
                  key={v.id}
                  className={styles.videoCard}
                  onClick={() => {
                    const url = `https://youtube.com/shorts/${v.id}`
                    const tg = window.Telegram?.WebApp
                    tg ? tg.openLink(url) : window.open(url, '_blank')
                  }}
                >
                  <div className={styles.videoThumbWrap}>
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                      className={styles.videoThumb}
                    />
                    <span className={styles.videoPlay}>▶</span>
                  </div>
                  <span className={styles.videoTitle}>{v.title}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Отзывы */}
        {apt.reviews?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {t.apt.reviewsTitle}
              <span className={styles.reviewCount}> ({apt.reviews.length})</span>
            </h3>
            <div className={styles.reviewsList}>
              {apt.reviews.map((r, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewName}>{r.name}</span>
                    <span className={styles.reviewCity}>{r.city}</span>
                    <span className={styles.reviewStars}>{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p className={styles.reviewText}>"{r.text}"</p>
                  <span className={styles.reviewDate}>{r.date}</span>
                </div>
              ))}
            </div>
            <div className={styles.reviewSummary}>
              <span className={styles.reviewRating}>⭐ 5.0 / 5</span>
              <span className={styles.reviewTotal}>{t.apt.reviewSummary.replace('{n}', apt.owner.bookings)}</span>
            </div>
          </section>
        )}

        {/* FAQ ссылка */}
        <button className={styles.faqBtn} onClick={() => navigate('faq')}>
          {t.apt.faqBtn}
        </button>

        <div className={styles.footerSpacer} />
      </div>

      {showForm && (
        <BookingFormModal
          apt={apt}
          dateFrom={dateFrom}
          dateTo={dateTo}
          cost={cost}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Футер: цена + две кнопки оплаты */}
      <div className={styles.footer}>
        <div className={styles.footerPrice}>
          {price
            ? <span className={styles.footerPriceMain}>€{price} <small>{t.apt.perNight}</small></span>
            : <span className={styles.footerPriceMain}>€{minPrice}–{maxPrice} <small>{t.apt.perNight}</small></span>
          }
          {cost && <span className={styles.footerPriceTotal}>{t.apt.total.toLowerCase()} €{cost.total}</span>}
        </div>
        <div className={styles.footerBtns}>
          <button
            className={`${styles.bookBtnRevolut} ${!apt.available ? styles.bookBtnDisabled : ''}`}
            onClick={apt.available ? () => setShowForm(true) : undefined}
            disabled={!apt.available}
          >
            {!apt.available ? t.apt.busyBtn : t.apt.bookBtn}
          </button>
          <button className={styles.bookBtnBank} disabled>
            🏦 {t.apt.bankSoon}
          </button>
        </div>
      </div>
    </div>
  )
}
