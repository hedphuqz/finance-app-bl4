/**
 * Public data service contract.
 *
 * Components and hooks import from here — never from yahooAdapter directly.
 * Set USE_MOCK=true in the environment to use fixture data (tests, demos).
 */

import { MOCK_HISTORY, MOCK_QUOTES } from './mockData.js'
import { fetchHistory, fetchQuote } from './yahooAdapter.js'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * Returns a normalised quote for the given symbol.
 * @param {string} symbol
 * @returns {Promise<{ symbol, name, price, change, changePercent }>}
 */
export async function getQuote(symbol) {
  if (useMock) {
    const data = MOCK_QUOTES[symbol]
    if (!data) throw new Error(`No mock quote for symbol: ${symbol}`)
    return data
  }
  return fetchQuote(symbol)
}

/**
 * Returns normalised daily history for the given symbol and date range.
 * @param {string} symbol
 * @param {Date}   startDate
 * @param {Date}   endDate
 * @returns {Promise<{ date: string, close: number, volume: number }[]>}
 */
export async function getHistory(symbol, startDate, endDate) {
  if (useMock) {
    const history = MOCK_HISTORY[symbol] ?? []
    return history.filter(
      h => h.date >= startDate.toISOString().slice(0, 10) &&
           h.date <= endDate.toISOString().slice(0, 10),
    )
  }
  return fetchHistory(symbol, startDate, endDate)
}
