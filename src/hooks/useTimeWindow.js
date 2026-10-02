import { useCallback, useState } from 'react'
import { TIME_WINDOWS } from '../constants/companies.js'

/**
 * Manages the active time window selection.
 * Returns the current window value and a stable setter.
 */
export function useTimeWindow(initial = TIME_WINDOWS.WEEK) {
  const [window, setWindow] = useState(initial)

  const selectWindow = useCallback((value) => {
    setWindow(value)
  }, [])

  return { window, selectWindow }
}
