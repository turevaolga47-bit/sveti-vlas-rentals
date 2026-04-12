import NavHeader from '../components/NavHeader'
import styles from './BookingsScreen.module.css'

export default function BookingsScreen() {
  return (
    <div className={styles.wrap}>
      <NavHeader title="Мои бронирования" />
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📋</span>
        <p className={styles.emptyText}>У вас пока нет бронирований</p>
        <p className={styles.emptyHint}>
          Бронирование через Telegram Payments появится в следующей версии
        </p>
      </div>
    </div>
  )
}
