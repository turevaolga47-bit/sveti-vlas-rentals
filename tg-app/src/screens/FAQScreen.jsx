import { useLang } from '../i18n/useLang'
import NavHeader from '../components/NavHeader'
import styles from './FAQScreen.module.css'

const WHATSAPP = '4917675765576'

export default function FAQScreen() {
  const { t } = useLang()

  return (
    <div className={styles.wrap}>
      <NavHeader title={t.faq.title} />
      <div className={styles.inner}>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${WHATSAPP}`}
          className={styles.waCta}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.waIcon}>💬</span>
          <div className={styles.waText}>
            <span className={styles.waTitle}>{t.faq.waTitle}</span>
            <span className={styles.waSub}>{t.faq.waSub}</span>
          </div>
          <span className={styles.waArrow}>›</span>
        </a>

        {/* FAQ groups */}
        {t.faq.faqs.map((group) => (
          <section key={group.category} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.category}</h3>
            <div className={styles.items}>
              {group.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        {/* Bottom contact */}
        <div className={styles.bottomContact}>
          <p>{t.faq.notFound}</p>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            className={styles.waBtn}
            target="_blank"
            rel="noreferrer"
          >
            {t.faq.waBtn}
          </a>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  return (
    <details className={styles.item}>
      <summary className={styles.question}>{q}</summary>
      <p className={styles.answer}>{a}</p>
    </details>
  )
}
