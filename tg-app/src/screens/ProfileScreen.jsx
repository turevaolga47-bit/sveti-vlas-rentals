import useStore from '../store/useStore'
import { useLang } from '../i18n/useLang'
import styles from './ProfileScreen.module.css'

const OWNER = {
  name: 'Ольга Турева',
  photo: '/photos/photo_2025-11-19_18-52-09.jpg',
  stats: [
    { value: '23', labelKey: 'bookings' },
    { value: '⭐ 5.0', labelKey: 'rating' },
    { value: '2025', labelKey: 'newbuild' },
  ],
}

const STAT_LABELS = {
  ru: { bookings: 'бронирования', rating: 'рейтинг', newbuild: 'новостройка' },
  en: { bookings: 'bookings',     rating: 'rating',  newbuild: 'new build'   },
  de: { bookings: 'Buchungen',    rating: 'Bewertung', newbuild: 'Neubau'    },
}

const OWNER_DESC = {
  ru: 'Хозяйка двух квартир в Святом Власе. Встречаю каждого гостя лично, передаю ключи в руки и подписываю официальный договор. Всегда на связи.',
  en: 'Owner of two apartments in Sveti Vlas. I meet every guest personally, hand over the keys and sign an official contract. Always available.',
  de: 'Eigentümerin zweier Wohnungen in Sveti Vlas. Ich begrüße jeden Gast persönlich, übergebe die Schlüssel und unterzeichne einen offiziellen Vertrag. Immer erreichbar.',
}

const CONTACTS = [
  { icon: '💬', label: 'WhatsApp',   sub: '+49 176 75765576',    href: 'https://wa.me/4917675765576',         color: '#25d366' },
  { icon: '✈️', label: 'Telegram',   sub: '@OlgaTurevaSv',       href: 'https://t.me/OlgaTurevaSv',           color: '#2481cc' },
  { icon: '💳', label: 'Revolut',    sub: 'revolut.me',          href: `https://wa.me/4917675765576?text=${encodeURIComponent('Hello Olga! I would like to pay via Revolut. Please send your Revolut tag.')}`, color: '#191c1f' },
  { icon: '🔵', label: 'ВКонтакте', sub: 'vk.com/club237354896', href: 'https://vk.com/club237354896',        color: '#0077ff' },
  { icon: '📧', label: 'Email',      sub: 'zaudalenka@gmail.com', href: 'mailto:zaudalenka@gmail.com',         color: '#ea4335' },
]

export default function ProfileScreen() {
  const tg = window.Telegram?.WebApp
  const user = tg?.initDataUnsafe?.user
  const { favorites, navigate } = useStore()
  const { lang, setLang, t, LANG_META } = useLang()

  const statLabels = STAT_LABELS[lang] || STAT_LABELS.ru

  return (
    <div className={styles.wrap}>

      {/* Хозяйка */}
      <div className={styles.ownerCard}>
        <div className={styles.ownerTop}>
          <img src={OWNER.photo} alt={OWNER.name} className={styles.ownerPhoto} />
          <div className={styles.ownerInfo}>
            <span className={styles.ownerName}>
              {OWNER.name} <span className={styles.verified}>✓</span>
            </span>
            <span className={styles.ownerDesc}>{OWNER_DESC[lang] || OWNER_DESC.ru}</span>
          </div>
        </div>
        <div className={styles.ownerStats}>
          {OWNER.stats.map((s) => (
            <div key={s.labelKey} className={styles.ownerStat}>
              <span className={styles.ownerStatVal}>{s.value}</span>
              <span className={styles.ownerStatLabel}>{statLabels[s.labelKey]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Переключатель языка */}
      <div className={styles.langBlock}>
        <span className={styles.langTitle}>{t.profile.language}</span>
        <div className={styles.langBtns}>
          {Object.entries(LANG_META).map(([code, meta]) => (
            <button
              key={code}
              className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`}
              onClick={() => setLang(code)}
            >
              {meta.flag} {meta.label}
            </button>
          ))}
        </div>
      </div>

      {/* Контакты */}
      <div className={styles.contactsBlock}>
        <p className={styles.contactsTitle}>{t.profile.contactsTitle}</p>
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
          <span className={styles.menuLabel}>{t.profile.menu.favorites} ({favorites.length})</span>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('bookings')}>
          <span className={styles.menuIcon}>📋</span>
          <span className={styles.menuLabel}>{t.profile.menu.bookings}</span>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('faq')}>
          <span className={styles.menuIcon}>❓</span>
          <span className={styles.menuLabel}>{t.profile.menu.faq}</span>
          <span className={styles.menuArrow}>›</span>
        </button>
      </div>

      {/* Отзыв */}
      <div className={styles.feedbackBlock}>
        <p className={styles.feedbackTitle}>{t.profile.feedbackTitle}</p>
        <p className={styles.feedbackSub}>{t.profile.feedbackSub}</p>
        <div className={styles.feedbackBtns}>
          <a
            href={`https://wa.me/4917675765576?text=${encodeURIComponent(t.profile.feedbackWaMsg)}`}
            className={styles.feedbackBtn}
            target="_blank" rel="noreferrer"
          >
            💬 WhatsApp
          </a>
          <a
            href={`https://t.me/OlgaTurevaSv?text=${encodeURIComponent(t.profile.feedbackWaMsg)}`}
            className={styles.feedbackBtn}
            target="_blank" rel="noreferrer"
          >
            ✈️ Telegram
          </a>
        </div>
      </div>

      <p className={styles.appInfo}>
        {t.profile.appInfo}<br />
        <span className={styles.version}>v1.1</span>
      </p>
    </div>
  )
}
