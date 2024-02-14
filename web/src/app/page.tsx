'use client'
import { Chart } from '@/components/chart'
import { Header } from '@/components/header'
import { Navigation } from '@/components/navigation'
import { Select } from '@/components/select'
import { Content, Time } from '@/lib/types'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default () => {
  const queryClient = new QueryClient()

  const [drill, setDrill] = useState<Content>('時')

  const now = new Date()

  const [time, setTime] = useState<Time>({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className='bg-white max-w-screen-lg mx-auto'>
          <div className='flex justify-center'>
            <Navigation type={drill} setType={setDrill} />
          </div>
          <div className='flex justify-center'>
            <Select time={time} setTime={setTime} type={drill} />
          </div>
          <Chart type={drill} time={time} />
        </main>
      </QueryClientProvider>
    </>
  )
}
