import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import styles from './NavHeader.module.css'

export default function NavHeader({ title }) {
  const goBack = useStore((s) => s.goBack)
  const { t } = useLang()
  return (
    <div className={styles.header}>
      <button className={styles.back} onClick={goBack} aria-label={t.nav.back}>
        ‹
      </button>
      {title && <span className={styles.title}>{title}</span>}
    </div>
  )
}
