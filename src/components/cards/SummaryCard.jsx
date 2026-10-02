import styles from './SummaryCard.module.css'

export default function SummaryCard({ quote }) {
  if (!quote) return null

  const { name, symbol, price, change, changePercent } = quote
  const positive = change >= 0
  const sign = positive ? '+' : ''

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.symbol}>{symbol}</span>
      </div>
      <div className={styles.price}>
        {price != null ? `$${price.toFixed(2)}` : '—'}
      </div>
      {change != null && (
        <div className={`${styles.change} ${positive ? styles.positive : styles.negative}`}>
          {sign}{change.toFixed(2)} ({sign}{changePercent?.toFixed(2)}%)
        </div>
      )}
    </div>
  )
}
