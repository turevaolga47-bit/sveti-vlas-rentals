import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import styles from './SplashScreen.module.css'

export default function SplashScreen() {
  const navigate = useStore((s) => s.navigate)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Показываем экран 3 секунды, потом плавно уходим
    const fadeTimer = setTimeout(() => setFading(true), 2800)
    const navTimer  = setTimeout(() => navigate('catalog'), 3400)
    return () => { clearTimeout(fadeTimer); clearTimeout(navTimer) }
  }, [navigate])

  return (
    <div className={`${styles.wrap} ${fading ? styles.fadeOut : ''}`}>
      {/* Фоновое фото */}
      <img
        src="/photos/photo_2026-04-02_18-16-40.jpg"
        alt="Святой Влас"
        className={styles.bg}
      />

      {/* Тёмный градиент снизу */}
      <div className={styles.overlay} />

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.badge}>🌊 Болгария · Черное море</div>

        <h1 className={styles.title}>Святой Влас</h1>
        <p className={styles.subtitle}>Аренда квартир у моря</p>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Только для вас лето 2026 в Болгарии</p>
          <p className={styles.ctaSub}>
            Уютные квартиры · 3 минуты до пляжа · Новостройка
          </p>
        </div>

        {/* Пульсирующий индикатор загрузки */}
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  )
}
