import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import styles from './SplashScreen.module.css'

export default function SplashScreen() {
  const navigate = useStore((s) => s.navigate)
  const { t } = useLang()
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2800)
    const navTimer  = setTimeout(() => navigate('catalog'), 3400)
    return () => { clearTimeout(fadeTimer); clearTimeout(navTimer) }
  }, [navigate])

  return (
    <div className={`${styles.wrap} ${fading ? styles.fadeOut : ''}`}>
      <img
        src="/photos/photo_2026-04-02_18-16-40.jpg"
        alt="Sveti Vlas"
        className={styles.bg}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.badge}>{t.splash.badge}</div>
        <h1 className={styles.title}>{t.splash.title}</h1>
        <p className={styles.subtitle}>{t.splash.subtitle}</p>

        <div className={styles.cta}>
          <p className={styles.ctaText}>{t.splash.cta}</p>
          <p className={styles.ctaSub}>{t.splash.ctaSub}</p>
          <div className={styles.utpList}>
            <span>{t.splash.utp1}</span>
            <span>{t.splash.utp2}</span>
            <span>{t.splash.utp3}</span>
          </div>
        </div>

        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  )
}
