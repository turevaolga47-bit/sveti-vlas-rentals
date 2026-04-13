import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import NavHeader from '../components/NavHeader'
import styles from './BookingsScreen.module.css'

const WHATSAPP = '4917675765576'
const TELEGRAM = 'OlgaTurevaSv'

export default function BookingsScreen() {
  const { navigate } = useStore()
  const { t } = useLang()

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.bookings.waMsg)}`

  return (
    <div className={styles.wrap}>
      <NavHeader title={t.bookings.title} />

      <h2 className={styles.heading}>{t.bookings.heading}</h2>

      <div className={styles.steps}>
        {t.bookings.steps.map((s, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>
                <span className={styles.stepIcon}>{s.icon}</span>
                {s.title}
              </div>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Способы оплаты */}
      <div className={styles.payBlock}>
        <div className={styles.payTitle}>{t.bookings.payTitle}</div>
        <div className={styles.payRow}>
          <span className={styles.payIcon}>💳</span>
          <div className={styles.payInfo}>
            <span className={styles.payName}>Revolut</span>
            <span className={styles.payDesc}>{t.apt.revolutDesc}</span>
          </div>
        </div>
        <div className={styles.payRow}>
          <span className={styles.payIcon}>💵</span>
          <div className={styles.payInfo}>
            <span className={styles.payName}>{t.bookings.cash}</span>
            <span className={styles.payDesc}>{t.bookings.cashDesc}</span>
          </div>
        </div>
        <p className={styles.payNote}>{t.bookings.payNote}</p>
      </div>

      {/* Кнопки связи */}
      <div className={styles.contactBtns}>
        <a href={waLink} className={styles.btnWa} target="_blank" rel="noreferrer">
          {t.bookings.waBtn}
        </a>
        <a href={`https://t.me/${TELEGRAM}`} className={styles.btnTg} target="_blank" rel="noreferrer">
          {t.bookings.tgBtn}
        </a>
      </div>

      <button className={styles.catalogBtn} onClick={() => navigate('catalog')}>
        {t.bookings.catalogBtn}
      </button>
    </div>
  )
}
