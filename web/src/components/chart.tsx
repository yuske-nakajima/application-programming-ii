import { fetchTemperature } from '@/lib/fetcher'
import { Content, Time } from '@/lib/types'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useQuery } from 'react-query'

type Props = {
  type: Content
  time: Time
}

const loading = () => {
  return (
    <div className='flex justify-center mt-20'>
      <div className='animate-ping h-4 w-4 bg-gray-600 rounded-full'></div>
    </div>
  )
}

export const Chart = ({ type, time }: Props) => {
  const { data, isLoading } = useQuery(
    ['chart', type, time],
    () => fetchTemperature(type, time),
    {
      refetchInterval: 60 * 1000, // 1分ごとに再取得
    },
  )

  if (isLoading || !data) return loading()

  return (
    <>
      <div>
        <Line data={data} />
      </div>
    </>
  )
}
