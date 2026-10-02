import ChartCard from '../cards/ChartCard.jsx'
import styles from './CompanyGrid.module.css'

export default function CompanyGrid({ companies, window }) {
  return (
    <div className={styles.grid}>
      {companies.map((company) => (
        <ChartCard
          key={company.symbol}
          symbol={company.symbol}
          name={company.name}
          window={window}
        />
      ))}
    </div>
  )
}
