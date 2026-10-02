/**
 * Static fixture data used in tests and when USE_MOCK=true.
 * Each entry mirrors the normalised shapes from normalise.js.
 */

export const MOCK_QUOTES = {
  IBM: {
    symbol: 'IBM', name: 'IBM', price: 185.42, change: 1.23, changePercent: 0.67,
  },
  MSFT: {
    symbol: 'MSFT', name: 'Microsoft', price: 415.30, change: -2.10, changePercent: -0.50,
  },
  ORCL: {
    symbol: 'ORCL', name: 'Oracle', price: 128.75, change: 0.85, changePercent: 0.66,
  },
  SAP: {
    symbol: 'SAP', name: 'SAP', price: 220.10, change: 3.40, changePercent: 1.57,
  },
  CRM: {
    symbol: 'CRM', name: 'Salesforce', price: 290.60, change: -1.50, changePercent: -0.51,
  },
}

function generateHistory(basePrice, days) {
  const history = []
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const noise = (Math.sin(i * 0.7) * basePrice * 0.02)
    history.push({
      date:   d.toISOString().slice(0, 10),
      close:  parseFloat((basePrice + noise).toFixed(2)),
      volume: 3000000 + Math.floor(Math.random() * 1000000),
    })
  }
  return history
}

export const MOCK_HISTORY = {
  IBM:  generateHistory(185, 90),
  MSFT: generateHistory(415, 90),
  ORCL: generateHistory(128, 90),
  SAP:  generateHistory(220, 90),
  CRM:  generateHistory(290, 90),
}
