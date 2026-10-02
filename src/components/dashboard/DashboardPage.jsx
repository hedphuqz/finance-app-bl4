import { DEFAULT_COMPANIES } from '../../constants/companies.js'
import { useTimeWindow } from '../../hooks/useTimeWindow.js'
import CompanyGrid from './CompanyGrid.jsx'
import TimeWindowTabs from './TimeWindowTabs.jsx'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const { window, selectWindow } = useTimeWindow()

  return (
    <div>
      <div className={styles.toolbar}>
        <TimeWindowTabs active={window} onChange={selectWindow} />
      </div>
      <CompanyGrid companies={DEFAULT_COMPANIES} window={window} />
    </div>
  )
}
