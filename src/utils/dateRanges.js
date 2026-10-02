/**
 * Returns { startDate, endDate } as Date objects for the given time window.
 * @param {'day'|'7d'|'quarter'} window
 * @returns {{ startDate: Date, endDate: Date }}
 */
export function getDateRange(window) {
  const end = new Date()
  const start = new Date()

  if (window === 'day') {
    start.setHours(0, 0, 0, 0)
  } else if (window === '7d') {
    start.setDate(start.getDate() - 7)
  } else if (window === 'quarter') {
    start.setDate(start.getDate() - 90)
  }

  return { startDate: start, endDate: end }
}
