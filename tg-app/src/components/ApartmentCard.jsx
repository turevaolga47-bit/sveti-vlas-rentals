import { useState } from 'react'
import useStore from '../store/useStore'
import { getNightPrice, calcTotal } from '../data/apartments'
import styles from './ApartmentCard.module.css'

export default function ApartmentCard({ apartment }) {
  const { navigate, setSelectedApartment, favorites, toggleFavorite, dateFrom, dateTo } = useStore()
  const [photoIdx, setPhotoIdx] = useState(0)
  const isFav = favorites.includes(apartment.id)
  const cost = calcTotal(apartment, dateFrom, dateTo)
  const price = getNightPrice(apartment, dateFrom)

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
          alt={apartment.title}
          className={styles.photo}
          loading="lazy"
        />
        {/* Точки-индикаторы */}
        <div className={styles.dots}>
          {apartment.photos.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === photoIdx ? styles.dotActive : ''}`}
              onClick={(e) => { e.stopPropagation(); setPhotoIdx(i) }}
            />
          ))}
        </div>
        {/* Избранное */}
        <button
          className={`${styles.fav} ${isFav ? styles.favActive : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(apartment.id) }}
          aria-label="В избранное"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
        {/* Бейдж доступности */}
        <span className={styles.badge}>
          {apartment.available ? '✓ Свободно' : '✗ Занято'}
        </span>
      </div>

      {/* Информация */}
      <div className={styles.info}>
        <h3 className={styles.title}>{apartment.title}</h3>
        <div className={styles.meta}>
          <span>🏖 {apartment.beachMinutes} мин</span>
          <span>👤 {apartment.guests} места</span>
          <span>📐 {apartment.area} м²</span>
        </div>
        <div className={styles.amenities}>
          {apartment.hasAC      && <span>❄️</span>}
          {apartment.hasParking && <span>🅿️</span>}
          {apartment.hasWifi    && <span>📶</span>}
          {apartment.hasPool    && <span>🏊</span>}
          {apartment.hasBalcony && <span>🌅</span>}
        </div>
        <div className={styles.price}>
          <span className={styles.priceMain}>€{price} / ночь</span>
          {cost && (
            <span className={styles.priceTotal}>
              {cost.nights} ноч. · итого €{cost.rent + cost.cleaning}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
