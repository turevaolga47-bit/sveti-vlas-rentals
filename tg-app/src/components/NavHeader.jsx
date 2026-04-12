import useStore from '../store/useStore'
import styles from './NavHeader.module.css'

export default function NavHeader({ title }) {
  const goBack = useStore((s) => s.goBack)
  return (
    <div className={styles.header}>
      <button className={styles.back} onClick={goBack} aria-label="Назад">
        ‹
      </button>
      {title && <span className={styles.title}>{title}</span>}
    </div>
  )
}
