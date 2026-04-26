const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Converts a YYYY-MM string to "Month YYYY" (e.g. "2024-09" -> "September 2024"). */
export function formatYearMonth(ym: string): string {
  const [year, month] = ym.split('-')
  const name = MONTHS[parseInt(month, 10) - 1]
  return name ? `${name} ${year}` : ym
}
