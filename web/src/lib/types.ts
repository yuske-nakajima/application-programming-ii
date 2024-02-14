import { ChartData } from 'chart.js'

export type Content = '年' | '月' | '日' | '時'

export type ChartDataType = ChartData<'line', number[], string> | undefined

export type Time = { year: number; month: number; day: number; hour: number }
