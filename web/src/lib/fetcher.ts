import { ChartDataType, Content, Time } from '@/lib/types'
import { ChartDataset } from 'chart.js'

const temperatureDefaultDataset: ChartDataset<'line', number[]> = {
  label: '温度',
  data: [],
  backgroundColor: ['rgba(200, 200, 200, 0.2)'],
  borderColor: ['rgba(100, 100, 100, 1)'],
  borderWidth: 5,
  borderJoinStyle: 'round',
}

export const fetchTemperature = async (
  content: Content,
  time: Time,
): Promise<ChartDataType> => {
  const res = await fetch(
    `/api/proxy/${content}/${time.year}/${time.month}/${time.day}/${time.hour}`,
  )
  const { labels, data } = await res.json()

  const datasets = [{ ...temperatureDefaultDataset, data }]

  return {
    labels,
    datasets,
  }
}
