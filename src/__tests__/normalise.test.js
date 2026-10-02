import { describe, expect, it } from 'vitest'
import { normaliseHistory, normaliseQuote } from '../utils/normalise.js'

describe('normaliseQuote', () => {
  it('returns a complete shape from a well-formed raw quote', () => {
    const raw = {
      symbol: 'IBM',
      shortName: 'International Business Machines',
      regularMarketPrice: 185.42,
      regularMarketChange: 1.23,
      regularMarketChangePercent: 0.67,
    }
    const result = normaliseQuote(raw)
    expect(result.symbol).toBe('IBM')
    expect(result.name).toBe('International Business Machines')
    expect(result.price).toBe(185.42)
    expect(result.change).toBe(1.23)
    expect(result.changePercent).toBe(0.67)
  })

  it('fills null for missing price fields', () => {
    const result = normaliseQuote({ symbol: 'IBM' })
    expect(result.price).toBeNull()
    expect(result.change).toBeNull()
    expect(result.changePercent).toBeNull()
  })

  it('returns empty defaults for a null input', () => {
    const result = normaliseQuote(null)
    expect(result.symbol).toBe('')
    expect(result.price).toBeNull()
  })

  it('falls back to longName when shortName is absent', () => {
    const result = normaliseQuote({ symbol: 'FOO', longName: 'Foo Corp' })
    expect(result.name).toBe('Foo Corp')
  })
})

describe('normaliseHistory', () => {
  it('returns an ascending-sorted array of close entries', () => {
    const raw = [
      { date: new Date('2024-03-03'), close: 180, volume: 1000 },
      { date: new Date('2024-03-01'), close: 178, volume: 900 },
      { date: new Date('2024-03-02'), close: 179, volume: 950 },
    ]
    const result = normaliseHistory(raw)
    expect(result).toHaveLength(3)
    expect(result[0].date).toBe('2024-03-01')
    expect(result[2].date).toBe('2024-03-03')
  })

  it('filters out entries with null close values', () => {
    const raw = [
      { date: new Date('2024-03-01'), close: 178, volume: 900 },
      { date: new Date('2024-03-02'), close: null, volume: 0 },
    ]
    const result = normaliseHistory(raw)
    expect(result).toHaveLength(1)
    expect(result[0].close).toBe(178)
  })

  it('returns an empty array for a null input', () => {
    expect(normaliseHistory(null)).toEqual([])
  })

  it('returns an empty array for an empty array input', () => {
    expect(normaliseHistory([])).toEqual([])
  })

  it('defaults volume to 0 when absent', () => {
    const raw = [{ date: new Date('2024-03-01'), close: 178 }]
    const result = normaliseHistory(raw)
    expect(result[0].volume).toBe(0)
  })
})
