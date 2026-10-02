import styles from './AppShell.module.css'

export default function AppShell({ children }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.logo}>📊</span>
        <h1 className={styles.title}>Market Dashboard</h1>
        <span className={styles.subtitle}>IBM &amp; Competitors</span>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
