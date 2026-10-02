import { useEffect, useReducer } from 'react'
import { getDateRange } from '../utils/dateRanges.js'
import { getHistory, getQuote } from '../services/financeService.js'

const initialState = { status: 'idle', quote: null, history: [], error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { status: 'loading', quote: null, history: [], error: null }
    case 'success':
      return { status: 'success', quote: action.quote, history: action.history, error: null }
    case 'error':
      return { status: 'error', quote: null, history: [], error: action.error }
    default:
      return state
  }
}

/**
 * Fetches quote and history for a single company symbol for the given
 * time window. Re-fetches automatically when symbol or window changes.
 *
 * @param {string} symbol
 * @param {'day'|'7d'|'quarter'} window
 * @returns {{ status: 'idle'|'loading'|'success'|'error', quote, history, error }}
 */
export function useMarketData(symbol, window) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!symbol) return

    let cancelled = false
    const { startDate, endDate } = getDateRange(window)

    function run() {
      dispatch({ type: 'loading' })
      Promise.all([
        getQuote(symbol),
        getHistory(symbol, startDate, endDate),
      ])
        .then(([quote, history]) => {
          if (!cancelled) dispatch({ type: 'success', quote, history })
        })
        .catch((err) => {
          if (!cancelled) dispatch({ type: 'error', error: err })
        })
    }

    run()
    return () => { cancelled = true }
  }, [symbol, window])

  return state
}
