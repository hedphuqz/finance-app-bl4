/**
 * Yahoo Finance adapter — browser-safe version.
 *
 * All yahoo-finance2 calls happen in server.js (Node.js).
 * This adapter fetches the normalised data from the /api proxy endpoints,
 * which Vite forwards to the proxy server during development.
 */

export class FinanceDataError extends Error {
  constructor(message, symbol) {
    super(message)
    this.name = 'FinanceDataError'
    this.symbol = symbol
  }
}

async function apiFetch(url, symbol) {
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new FinanceDataError(body.error ?? `HTTP ${res.status}`, symbol)
  }
  return res.json()
}

/**
 * Fetch a normalised quote for one symbol via the proxy.
 * @param {string} symbol
 * @returns {Promise<{ symbol, name, price, change, changePercent }>}
 */
export async function fetchQuote(symbol) {
  try {
    return await apiFetch(`/api/quote/${encodeURIComponent(symbol)}`, symbol)
  } catch (err) {
    if (err instanceof FinanceDataError) throw err
    throw new FinanceDataError(`Could not fetch quote for ${symbol}: ${err.message}`, symbol)
  }
}

/**
 * Fetch normalised daily history for one symbol via the proxy.
 * @param {string} symbol
 * @param {Date}   startDate
 * @param {Date}   endDate
 * @returns {Promise<{ date: string, close: number, volume: number }[]>}
 */
export async function fetchHistory(symbol, startDate, endDate) {
  try {
    const params = new URLSearchParams({
      startDate: startDate.toISOString().slice(0, 10),
      endDate:   endDate.toISOString().slice(0, 10),
    })
    return await apiFetch(`/api/history/${encodeURIComponent(symbol)}?${params}`, symbol)
  } catch (err) {
    if (err instanceof FinanceDataError) throw err
    throw new FinanceDataError(`Could not fetch history for ${symbol}: ${err.message}`, symbol)
  }
}
