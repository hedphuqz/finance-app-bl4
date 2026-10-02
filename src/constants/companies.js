export const DEFAULT_COMPANIES = [
  { symbol: 'IBM',  name: 'IBM' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'ORCL', name: 'Oracle' },
  { symbol: 'SAP',  name: 'SAP' },
  { symbol: 'CRM',  name: 'Salesforce' },
]

export const TIME_WINDOWS = {
  DAY:     'day',
  WEEK:    '7d',
  QUARTER: 'quarter',
}

export const TIME_WINDOW_LABELS = {
  [TIME_WINDOWS.DAY]:     'Today',
  [TIME_WINDOWS.WEEK]:    'Last 7 Days',
  [TIME_WINDOWS.QUARTER]: 'Last Quarter',
}
