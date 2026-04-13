import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import styles from './BottomNav.module.css'

export default function BottomNav() {
  const { screen, navigate } = useStore()
  const { t } = useLang()

  const TABS = [
    { id: 'catalog',  label: t.nav.catalog,   icon: '🏠' },
    { id: 'bookings', label: t.nav.bookings,   icon: '📋' },
    { id: 'profile',  label: t.nav.profile,    icon: '👤' },
  ]

  return (
    <nav className={styles.nav}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${screen === tab.id ? styles.active : ''}`}
          onClick={() => navigate(tab.id)}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
