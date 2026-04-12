import { useState } from 'react'
import useStore from '../store/useStore'
import NavHeader from '../components/NavHeader'
import styles from './DatePickerScreen.module.css'

const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь',
                 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
const DAYS   = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function startDayOfMonth(year, month) {
  // 0=Sun → convert to Mon=0
  return (new Date(year, month, 1).getDay() + 6) % 7
}

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

export default function DatePickerScreen() {
  const { setDates, navigate, guests, setGuests } = useStore()

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [hovering, setHovering] = useState(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const startDay    = startDayOfMonth(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function handleDay(day) {
    const d = new Date(viewYear, viewMonth, day)
    if (d < today) return // past dates disabled

    if (!from || (from && to)) {
      setFrom(d); setTo(null)
    } else {
      if (d <= from) { setFrom(d); setTo(null) }
      else setTo(d)
    }
  }

  function isInRange(day) {
    const d = new Date(viewYear, viewMonth, day)
    const end = to || hovering
    if (from && end) return d > from && d < end
    return false
  }

  function isFrom(day) {
    if (!from) return false
    const d = new Date(viewYear, viewMonth, day)
    return toISO(d) === toISO(from)
  }

  function isTo(day) {
    if (!to) return false
    const d = new Date(viewYear, viewMonth, day)
    return toISO(d) === toISO(to)
  }

  function isPast(day) {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0,0,0,0)
    const t = new Date(); t.setHours(0,0,0,0)
    return d < t
  }

  function handleConfirm() {
    if (!from || !to) return
    setDates(toISO(from), toISO(to))
    navigate('catalog')
  }

  const nights = from && to
    ? Math.round((to - from) / 86400000)
    : null

  return (
    <div className={styles.outerWrap}>
      <NavHeader title="Выберите даты" />
      <div className={styles.wrap}>

      {/* Month nav */}
      <div className={styles.monthNav}>
        <button className={styles.arrow} onClick={prevMonth}>‹</button>
        <span className={styles.monthLabel}>{MONTHS[viewMonth]} {viewYear}</span>
        <button className={styles.arrow} onClick={nextMonth}>›</button>
      </div>

      {/* Day names */}
      <div className={styles.grid7}>
        {DAYS.map(d => (
          <span key={d} className={styles.dayName}>{d}</span>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.grid7}>
        {Array.from({ length: startDay }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const past = isPast(day)
          const fromSel = isFrom(day)
          const toSel = isTo(day)
          const inRange = isInRange(day)
          return (
            <button
              key={day}
              className={[
                styles.day,
                past       ? styles.past    : '',
                fromSel    ? styles.fromDay : '',
                toSel      ? styles.toDay   : '',
                inRange    ? styles.range   : '',
              ].join(' ')}
              disabled={past}
              onClick={() => handleDay(day)}
              onMouseEnter={() => !to && from && setHovering(new Date(viewYear, viewMonth, day))}
              onMouseLeave={() => setHovering(null)}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Guests */}
      <div className={styles.guestsRow}>
        <span className={styles.guestsLabel}>Гостей</span>
        <div className={styles.guestsCtrl}>
          <button className={styles.guestBtn} onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
          <span className={styles.guestsCount}>{guests}</span>
          <button className={styles.guestBtn} onClick={() => setGuests(Math.min(8, guests + 1))}>+</button>
        </div>
      </div>

      {/* Summary + confirm */}
      <div className={styles.footer}>
        {from && to ? (
          <p className={styles.summary}>
            {from.toLocaleDateString('ru-RU')} — {to.toLocaleDateString('ru-RU')} · {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
          </p>
        ) : (
          <p className={styles.summary}>{from ? 'Выберите дату выезда' : 'Выберите дату заезда'}</p>
        )}
        <button
          className={styles.btn}
          onClick={from && to ? handleConfirm : () => navigate('catalog')}
        >
          Показать квартиры
        </button>
      </div>
    </div>
    </div>
  )
}
