import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DashboardPage from '../components/dashboard/DashboardPage.jsx'

// Mock useMarketData so no network calls are made.
vi.mock('../hooks/useMarketData.js', () => ({
  useMarketData: () => ({
    status: 'success',
    quote: {
      symbol: 'IBM',
      name: 'IBM',
      price: 185.42,
      change: 1.23,
      changePercent: 0.67,
    },
    history: [
      { date: '2024-03-01', close: 180, volume: 1000 },
      { date: '2024-03-07', close: 185, volume: 1100 },
    ],
    error: null,
  }),
}))

describe('DashboardPage', () => {
  it('renders a ChartCard for each default company', () => {
    render(<DashboardPage />)

    // DEFAULT_COMPANIES has 5 entries; each ChartCard renders with data-testid
    const cards = screen.getAllByTestId(/^chart-card-/)
    expect(cards).toHaveLength(5)
  })

  it('renders the time window tabs', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('navigation', { name: /time window/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /today/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /last 7 days/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /last quarter/i })).toBeInTheDocument()
  })
})
