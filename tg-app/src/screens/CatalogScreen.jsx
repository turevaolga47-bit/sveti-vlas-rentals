import { useState } from 'react'
import useStore from '../store/useStore'
import { APARTMENTS } from '../data/apartments'
import ApartmentCard from '../components/ApartmentCard'
import styles from './CatalogScreen.module.css'

const FILTERS = [
  { id: 'all',   label: 'Все' },
  { id: 'free',  label: '✓ Свободно' },
  { id: 'park',  label: '🅿️ Паркинг' },
  { id: 'ac',    label: '❄️ Кондиционер' },
]

export default function CatalogScreen() {
  const { dateFrom, dateTo, navigate } = useStore()
  const [filter, setFilter] = useState('all')

  const filtered = APARTMENTS.filter((a) => {
    if (filter === 'free') return a.available
    if (filter === 'park') return a.hasParking
    if (filter === 'ac')   return a.hasAC
    return true
  })

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Квартиры</h2>
        <button className={styles.datesBtn} onClick={() => navigate('dates')}>
          {dateFrom && dateTo
            ? `${new Date(dateFrom).toLocaleDateString('ru-RU', { day:'numeric', month:'short' })} — ${new Date(dateTo).toLocaleDateString('ru-RU', { day:'numeric', month:'short' })}`
            : '📅 Выбрать даты'}
        </button>
      </div>

      {/* Filter chips */}
      <div className={styles.chips}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`${styles.chip} ${filter === f.id ? styles.chipActive : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>Нет квартир по выбранному фильтру</p>
        ) : (
          filtered.map((apt) => (
            <ApartmentCard key={apt.id} apartment={apt} />
          ))
        )}
      </div>

    </div>
  )
}
