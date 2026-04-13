import { useState } from 'react'
import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import { getNightPrice, calcTotal, getMinPrice, getMaxPrice } from '../data/apartments'
import styles from './ApartmentCard.module.css'

export default function ApartmentCard({ apartment }) {
  const { navigate, setSelectedApartment, favorites, toggleFavorite, dateFrom, dateTo } = useStore()
  const { t, lang } = useLang()
  const [photoIdx, setPhotoIdx] = useState(0)
  const isFav  = favorites.includes(apartment.id)
  const cost   = calcTotal(apartment, dateFrom, dateTo)
  const price  = getNightPrice(apartment, dateFrom)
  const minPrice = getMinPrice(apartment)
  const maxPrice = getMaxPrice(apartment)

  const title = apartment.titleByLang?.[lang] || apartment.title

  function openDetail() {
    setSelectedApartment(apartment)
    navigate('apartment')
  }

  return (
    <article className={styles.card} onClick={openDetail}>
      {/* Фото-карусель */}
      <div className={styles.photos}>
        <img
          src={apartment.photos[photoIdx]}
          alt={title}
          className={styles.photo}
          loading="lazy"
        />
        <div className={styles.dots}>
          {apartment.photos.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === photoIdx ? styles.dotActive : ''}`}
              onClick={(e) => { e.stopPropagation(); setPhotoIdx(i) }}
            />
          ))}
        </div>
        <button
          className={`${styles.fav} ${isFav ? styles.favActive : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(apartment.id) }}
          aria-label="favourite"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
        <span className={`${styles.badge} ${apartment.available ? styles.badgeFree : styles.badgeBusy}`}>
          {apartment.available ? t.catalog.free : t.catalog.busy}
        </span>
      </div>

      {/* Информация */}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span>🏖 {apartment.beachMinutes} {t.apt.beach}</span>
          <span>👤 {t.apt.guests.replace('{n}', apartment.guests)}</span>
          <span>📐 {apartment.area} {t.apt.area}</span>
        </div>
        <div className={styles.amenities}>
          {apartment.hasAC      && <span>❄️</span>}
          {apartment.hasParking && <span>🅿️</span>}
          {apartment.hasWifi    && <span>📶</span>}
          {apartment.hasPool    && <span>🏊</span>}
          {apartment.hasBalcony && <span>🌅</span>}
        </div>

        {/* Хозяйка */}
        <div className={styles.ownerRow}>
          <img src={apartment.owner.photo} alt={apartment.owner.name} className={styles.ownerAvatar} />
          <span className={styles.ownerName}>{apartment.owner.name} ✓</span>
          <span className={styles.ownerBookings}>· {apartment.owner.bookings} {t.catalog.bookings}</span>
          <span className={styles.ownerStars}>⭐ 5.0</span>
        </div>

        <div className={styles.price}>
          {price
            ? <span className={styles.priceMain}>€{price} {t.catalog.perNight}</span>
            : <span className={styles.priceMain}>€{minPrice}–{maxPrice} {t.catalog.perNight}</span>
          }
          {cost && (
            <span className={styles.priceTotal}>
              {t.catalog.nights(cost.nights)} · {t.catalog.total} €{cost.rent + cost.cleaning}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
