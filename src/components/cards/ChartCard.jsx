import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TIME_WINDOWS } from '../../constants/companies.js'
import { useMarketData } from '../../hooks/useMarketData.js'
import ErrorBoundary from './ErrorBoundary.jsx'
import SummaryCard from './SummaryCard.jsx'
import styles from './ChartCard.module.css'

function LoadingSkeleton() {
  return (
    <div className={styles.skeleton} aria-label="Loading chart data">
      <div className={styles.skeletonBar} style={{ width: '60%' }} />
      <div className={styles.skeletonBar} style={{ width: '100%', height: 160 }} />
    </div>
  )
}

function ErrorNotice({ symbol, message }) {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.errorTitle}>Could not load data for <strong>{symbol}</strong></p>
      <p className={styles.errorDetail}>{message}</p>
    </div>
  )
}

function ChartBody({ window, history, quote }) {
  if (window === TIME_WINDOWS.DAY) {
    return <SummaryCard quote={quote} />
  }

  if (!history || history.length === 0) {
    return <p className={styles.empty}>No historical data available.</p>
  }

  const isQuarter = window === TIME_WINDOWS.QUARTER

  if (isQuarter) {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#57606a' }}
            tickFormatter={(v) => v.slice(5)}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#57606a' }}
            tickFormatter={(v) => `$${v}`}
            width={55}
          />
          <Tooltip formatter={(v) => [`$${v}`, 'Close']} />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#3b82d4"
            fill="#dbeafe"
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  // 7-day view — line chart
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#57606a' }}
          tickFormatter={(v) => v.slice(5)}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 10, fill: '#57606a' }}
          tickFormatter={(v) => `$${v}`}
          width={55}
        />
        <Tooltip formatter={(v) => [`$${v}`, 'Close']} />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#3b82d4"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default function ChartCard({ symbol, name, window }) {
  const { status, quote, history, error } = useMarketData(symbol, window)

  return (
    <ErrorBoundary>
      <div className={styles.card} data-testid={`chart-card-${symbol}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardName}>{name}</span>
          <span className={styles.cardSymbol}>{symbol}</span>
        </div>
        <div className={styles.cardBody}>
          {status === 'loading' && <LoadingSkeleton />}
          {status === 'error' && (
            <ErrorNotice symbol={symbol} message={error?.message ?? 'Unknown error'} />
          )}
          {status === 'success' && (
            <ChartBody window={window} history={history} quote={quote} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
