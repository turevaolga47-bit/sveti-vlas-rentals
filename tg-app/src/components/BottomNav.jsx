import useStore from '../store/useStore'
import styles from './BottomNav.module.css'

const TABS = [
  { id: 'catalog', label: 'Квартиры',  icon: '🏠' },
  { id: 'bookings', label: 'Мои брони', icon: '📋' },
  { id: 'profile',  label: 'Профиль',   icon: '👤' },
]

export default function BottomNav() {
  const { screen, navigate } = useStore()

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
