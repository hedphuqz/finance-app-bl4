import { TIME_WINDOW_LABELS, TIME_WINDOWS } from '../../constants/companies.js'
import styles from './TimeWindowTabs.module.css'

export default function TimeWindowTabs({ active, onChange }) {
  return (
    <nav className={styles.tabs} aria-label="Time window">
      {Object.values(TIME_WINDOWS).map((w) => (
        <button
          key={w}
          className={`${styles.tab} ${active === w ? styles.active : ''}`}
          onClick={() => onChange(w)}
          aria-pressed={active === w}
        >
          {TIME_WINDOW_LABELS[w]}
        </button>
      ))}
    </nav>
  )
}
