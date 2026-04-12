import useStore from '../store/useStore'
import styles from './ProfileScreen.module.css'

const OWNER = {
  name: 'Ольга',
  photo: '/photos/photo_2025-11-19_18-52-09.jpg',
  description: 'Хозяйка квартир в Святом Власе. Заселяю лично, всегда на связи.',
}

const CONTACTS = [
  {
    icon: '💬',
    label: 'WhatsApp',
    sub: '+49 176 75765576',
    href: 'https://wa.me/4917675765576',
    color: '#25d366',
  },
  {
    icon: '✈️',
    label: 'Telegram',
    sub: '@OlgaTurevaSv',
    href: 'https://t.me/OlgaTurevaSv',
    color: '#2481cc',
  },
  {
    icon: '🔵',
    label: 'ВКонтакте',
    sub: 'vk.com/club237354896',
    href: 'https://vk.com/club237354896',
    color: '#0077ff',
  },
  {
    icon: '📧',
    label: 'Email',
    sub: 'zaudalenka@gmail.com',
    href: 'mailto:zaudalenka@gmail.com',
    color: '#ea4335',
  },
]

export default function ProfileScreen() {
  const tg = window.Telegram?.WebApp
  const user = tg?.initDataUnsafe?.user
  const { favorites, navigate } = useStore()

  return (
    <div className={styles.wrap}>

      {/* Хозяйка */}
      <div className={styles.ownerCard}>
        <img src={OWNER.photo} alt={OWNER.name} className={styles.ownerPhoto} />
        <div className={styles.ownerInfo}>
          <span className={styles.ownerName}>
            {OWNER.name} <span className={styles.verified}>✓</span>
          </span>
          <span className={styles.ownerDesc}>{OWNER.description}</span>
        </div>
      </div>

      {/* Контакты */}
      <div className={styles.contactsBlock}>
        <p className={styles.contactsTitle}>Как со мной связаться</p>
        <div className={styles.contactsList}>
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className={styles.contactRow}
              target="_blank"
              rel="noreferrer"
              style={{ '--c-color': c.color }}
            >
              <span className={styles.contactDot} />
              <span className={styles.contactIcon}>{c.icon}</span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>{c.label}</span>
                <span className={styles.contactSub}>{c.sub}</span>
              </div>
              <span className={styles.contactArrow}>›</span>
            </a>
          ))}
        </div>
      </div>

      {/* Гость (если Telegram) */}
      {user && (
        <div className={styles.userCard}>
          {user.photo_url
            ? <img src={user.photo_url} alt="" className={styles.avatar} />
            : <div className={styles.avatarPlaceholder}>{user.first_name?.[0] ?? '👤'}</div>
          }
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {`${user.first_name ?? ''} ${user.last_name ?? ''}`.trim()}
            </span>
            {user.username && <span className={styles.userHandle}>@{user.username}</span>}
          </div>
        </div>
      )}

      {/* Меню */}
      <div className={styles.menu}>
        <button className={styles.menuItem} onClick={() => navigate('catalog')}>
          <span className={styles.menuIcon}>❤️</span>
          <span className={styles.menuLabel}>Избранное ({favorites.length})</span>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('bookings')}>
          <span className={styles.menuIcon}>📋</span>
          <span className={styles.menuLabel}>Мои бронирования</span>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('faq')}>
          <span className={styles.menuIcon}>❓</span>
          <span className={styles.menuLabel}>Частые вопросы · Виза · Трансфер</span>
          <span className={styles.menuArrow}>›</span>
        </button>
      </div>

      <p className={styles.appInfo}>
        Святой Влас · Аренда квартир у моря<br />
        <span className={styles.version}>v1.0</span>
      </p>
    </div>
  )
}
