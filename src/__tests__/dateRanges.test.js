import { describe, expect, it } from 'vitest'
import { getDateRange } from '../utils/dateRanges.js'

describe('getDateRange', () => {
  it('returns startDate at midnight today for "day"', () => {
    const { startDate, endDate } = getDateRange('day')
    const today = new Date()
    expect(startDate.getHours()).toBe(0)
    expect(startDate.getMinutes()).toBe(0)
    expect(startDate.getDate()).toBe(today.getDate())
    expect(endDate).toBeInstanceOf(Date)
  })

  it('returns startDate 7 days ago for "7d"', () => {
    const { startDate, endDate } = getDateRange('7d')
    const diffMs = endDate - startDate
    const diffDays = diffMs / (1000 * 60 * 60 * 24)
    expect(diffDays).toBeGreaterThanOrEqual(6.9)
    expect(diffDays).toBeLessThanOrEqual(7.1)
  })

  it('returns startDate 90 days ago for "quarter"', () => {
    const { startDate, endDate } = getDateRange('quarter')
    const diffMs = endDate - startDate
    const diffDays = diffMs / (1000 * 60 * 60 * 24)
    expect(diffDays).toBeGreaterThanOrEqual(89.9)
    expect(diffDays).toBeLessThanOrEqual(90.1)
  })
})
