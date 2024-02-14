// 年の配列
export const YEARS = Array.from(
  { length: new Date().getFullYear() - 1999 },
  (_, i) => 2000 + i,
)
YEARS.sort((a, b) => b - a)

// 月の配列
export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)

// 日の配列
export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

// 時の配列
export const HOURS = Array.from({ length: 24 }, (_, i) => i)

export const FETCH_URL = ''
