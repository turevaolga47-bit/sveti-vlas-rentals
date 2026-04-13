import { useState } from 'react'
import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import { APARTMENTS } from '../data/apartments'
import ApartmentCard from '../components/ApartmentCard'
import styles from './CatalogScreen.module.css'

export default function CatalogScreen() {
  const { dateFrom, dateTo, navigate } = useStore()
  const { t, lang, setLang, LANG_META } = useLang()
  const [filter, setFilter] = useState('all')

  const FILTERS = [
    { id: 'all',  label: t.catalog.filters.all },
    { id: 'free', label: `✓ ${t.catalog.filters.free}` },
    { id: 'park', label: `🅿️ ${t.catalog.filters.parking}` },
    { id: 'ac',   label: `❄️ ${t.catalog.filters.ac}` },
  ]

  const locale = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'ru-RU'

  const filtered = APARTMENTS.filter((a) => {
    if (filter === 'free') return a.available
    if (filter === 'park') return a.hasParking
    if (filter === 'ac')   return a.hasAC
    return true
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t.catalog.title}</h2>
        <div className={styles.headerRight}>
          <div className={styles.langBtns}>
            {Object.entries(LANG_META).map(([code, meta]) => (
              <button
                key={code}
                className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`}
                onClick={() => setLang(code)}
              >
                {meta.flag}
              </button>
            ))}
          </div>
          <button className={styles.datesBtn} onClick={() => navigate('dates')}>
            {dateFrom && dateTo
              ? `${new Date(dateFrom).toLocaleDateString(locale, { day:'numeric', month:'short' })} — ${new Date(dateTo).toLocaleDateString(locale, { day:'numeric', month:'short' })}`
              : '📅 ' + t.dates.title}
          </button>
        </div>
      </div>

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

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>{t.catalog.empty}</p>
        ) : (
          filtered.map((apt) => (
            <ApartmentCard key={apt.id} apartment={apt} />
          ))
        )}
      </div>
    </div>
  )
}
