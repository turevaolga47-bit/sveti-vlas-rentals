import { useState } from 'react'
import { useLang } from '../i18n/useLang'
import styles from './BookingFormModal.module.css'

export default function BookingFormModal({ apt, dateFrom, dateTo, cost, onClose }) {
  const { t, lang } = useLang()
  const f = t.bookingForm

  const tgUser    = window.Telegram?.WebApp?.initDataUnsafe?.user
  const initName  = tgUser ? `${tgUser.first_name ?? ''} ${tgUser.last_name ?? ''}`.trim() : ''
  const initPhone = tgUser?.username ? `@${tgUser.username}` : ''

  const [name,    setName]    = useState(initName)
  const [contact, setContact] = useState(initPhone)
  const [guests,  setGuests]  = useState(2)
  const [comment, setComment] = useState('')
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error

  const locale = lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'ru-RU'
  const fmt = (d) => d ? new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'short' }) : ''

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/notify', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentTitle: apt.titleByLang?.[lang] || apt.title,
          dateFrom,
          dateTo,
          nights:        cost?.nights,
          pricePerNight: cost?.pricePerNight,
          total:         cost?.total,
          guestName:     name.trim(),
          guestContact:  contact.trim(),
          guests,
          comment:       comment.trim(),
          lang,
        }),
      })
      const json = await res.json()
      setStatus(json.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <div className={styles.successEmoji}>✅</div>
          <h2 className={styles.successTitle}>{f.successTitle}</h2>
          <p className={styles.successText}>{f.successText}</p>
          <button className={styles.closeBtn} onClick={onClose}>{f.close}</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>

        <div className={styles.header}>
          <h2 className={styles.title}>{f.title}</h2>
          <button className={styles.closeIcon} onClick={onClose}>✕</button>
        </div>

        {/* Сводка бронирования */}
        <div className={styles.summary}>
          <span className={styles.summaryApt}>{apt.titleByLang?.[lang] || apt.title}</span>
          {dateFrom && dateTo && (
            <span className={styles.summaryDates}>
              {fmt(dateFrom)} — {fmt(dateTo)}
              {cost?.nights ? ` · ${cost.nights} ${f.nightsShort}` : ''}
            </span>
          )}
          {cost?.total && (
            <span className={styles.summaryTotal}>{f.total}: €{cost.total}</span>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Имя */}
          <label className={styles.label}>{f.name} *</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.namePlaceholder}
            required
          />

          {/* Телефон или Telegram */}
          <label className={styles.label}>{f.contact} *</label>
          <input
            className={styles.input}
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={f.contactPlaceholder}
            required
          />

          {/* Количество гостей */}
          <label className={styles.label}>{f.guests}</label>
          <div className={styles.counter}>
            <button type="button" className={styles.counterBtn}
              onClick={() => setGuests(g => Math.max(1, g - 1))}>−</button>
            <span className={styles.counterVal}>{guests}</span>
            <button type="button" className={styles.counterBtn}
              onClick={() => setGuests(g => Math.min(apt.guests, g + 1))}>+</button>
          </div>

          {/* Комментарий */}
          <label className={styles.label}>{f.comment}</label>
          <textarea
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={f.commentPlaceholder}
            rows={3}
          />

          {status === 'error' && (
            <p className={styles.errorMsg}>{f.errorMsg}</p>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'loading' || !name.trim() || !contact.trim()}
          >
            {status === 'loading' ? f.sending : f.submit}
          </button>

        </form>
      </div>
    </div>
  )
}
