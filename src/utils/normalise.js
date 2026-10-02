/**
 * Normalises a raw yahoo-finance2 quote into a consistent shape.
 * Handles missing or null fields gracefully.
 *
 * @param {object} raw - Raw quote result from yahoo-finance2
 * @returns {{ symbol: string, name: string, price: number|null, change: number|null, changePercent: number|null }}
 */
export function normaliseQuote(raw) {
  if (!raw) return { symbol: '', name: '', price: null, change: null, changePercent: null }

  return {
    symbol:        raw.symbol        ?? '',
    name:          raw.shortName     ?? raw.longName ?? raw.symbol ?? '',
    price:         raw.regularMarketPrice        ?? null,
    change:        raw.regularMarketChange       ?? null,
    changePercent: raw.regularMarketChangePercent ?? null,
  }
}

/**
 * Normalises a raw yahoo-finance2 historical array into a consistent shape.
 * Filters out entries with null close values and sorts ascending by date.
 *
 * @param {object[]} raw - Array of historical result objects from yahoo-finance2
 * @returns {{ date: string, close: number, volume: number }[]}
 */
export function normaliseHistory(raw) {
  if (!Array.isArray(raw)) return []

  return raw
    .filter(entry => entry && entry.close != null)
    .map(entry => ({
      date:   entry.date instanceof Date
                ? entry.date.toISOString().slice(0, 10)
                : String(entry.date ?? ''),
      close:  entry.close,
      volume: entry.volume ?? 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
