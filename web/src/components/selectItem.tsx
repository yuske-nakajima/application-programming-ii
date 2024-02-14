import { Time } from '@/lib/types'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

type SelectItemProps = {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
  value: number
  data: number[]
  suffix: string
}

const SelectItem = ({ handleChange, value, data, suffix }: SelectItemProps) => {
  return (
    <div className='relative inline-block'>
      <select
        className='block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline w-32'
        onChange={handleChange}
        value={value}
      >
        {data.map((item) => {
          return <option key={`${suffix}:${item}`}>{item}</option>
        })}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        {suffix}
      </div>
    </div>
  )
}

type SelectChildProps = {
  time: Time
  setTime: Dispatch<SetStateAction<Time>>
  data: number[]
  suffix: string
}

export const SelectYearItem = ({
  time,
  setTime,
  data,
  suffix,
}: SelectChildProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = { ...time }
    t.year = parseInt(e.target.value)
    setTime(t)
  }

  return (
    <SelectItem
      handleChange={handleChange}
      value={time.year}
      data={data}
      suffix={suffix}
    />
  )
}

export const SelectMonthItem = ({
  time,
  setTime,
  data,
  suffix,
}: SelectChildProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = { ...time }
    t.month = parseInt(e.target.value)
    setTime(t)
  }

  return (
    <SelectItem
      handleChange={handleChange}
      value={time.month}
      data={data}
      suffix={suffix}
    />
  )
}

export const SelectDayItem = ({
  time,
  setTime,
  data,
  suffix,
}: SelectChildProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = { ...time }
    t.day = parseInt(e.target.value)
    setTime(t)
  }

  return (
    <SelectItem
      handleChange={handleChange}
      value={time.day}
      data={data}
      suffix={suffix}
    />
  )
}

export const SelectHourItem = ({
  time,
  setTime,
  data,
  suffix,
}: SelectChildProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = { ...time }
    t.hour = parseInt(e.target.value)
    setTime(t)
  }

  return (
    <SelectItem
      handleChange={handleChange}
      value={time.hour}
      data={data}
      suffix={suffix}
    />
  )
}
