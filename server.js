/**
 * Proxy server — runs in Node.js, never in the browser.
 *
 * Exposes two endpoints:
 *   GET /api/quote/:symbol        → normalised quote object
 *   GET /api/history/:symbol      → normalised history array
 *                                   query params: startDate, endDate (ISO strings)
 *
 * Vite forwards /api/* to this server during development (see vite.config.js).
 * In production you would run this alongside the static build, or deploy it
 * as a separate service.
 */

import express from 'express'
import { normaliseHistory, normaliseQuote } from './src/utils/normalise.js'

const app = express()
const PORT = process.env.PROXY_PORT || 3001

// Instantiate yahoo-finance2 once — v4 requires new YahooFinance().
const YahooFinance = (await import('yahoo-finance2')).default
const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

// ---------------------------------------------------------------------------
// GET /api/quote/:symbol
// ---------------------------------------------------------------------------
app.get('/api/quote/:symbol', async (req, res) => {
  const { symbol } = req.params
  try {
    const raw = await yf.quote(symbol)
    res.json(normaliseQuote(raw))
  } catch (err) {
    res.status(502).json({ error: err.message, symbol })
  }
})

// ---------------------------------------------------------------------------
// GET /api/history/:symbol?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// ---------------------------------------------------------------------------
app.get('/api/history/:symbol', async (req, res) => {
  const { symbol } = req.params
  const { startDate, endDate } = req.query

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate query params are required' })
  }

  try {
    const raw = await yf.historical(symbol, {
      period1: new Date(startDate),
      period2: new Date(endDate),
      interval: '1d',
    })
    res.json(normaliseHistory(raw))
  } catch (err) {
    res.status(502).json({ error: err.message, symbol })
  }
})

app.listen(PORT, () => {
  console.log(`Finance proxy server listening on http://localhost:${PORT}`)
})
