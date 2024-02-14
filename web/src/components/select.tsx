'use client'
import {
  SelectDayItem,
  SelectHourItem,
  SelectMonthItem,
  SelectYearItem,
} from '@/components/selectItem'
import { DAYS, HOURS, MONTHS, YEARS } from '@/lib/constants'
import { Content, Time } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  type: Content
  time: Time
  setTime: Dispatch<SetStateAction<Time>>
}

export const Select = ({ type, time, setTime }: Props) => {
  return (
    <div className='border-gray-200 px-4 py-3 sm:px-6'>
      {/*年表示*/}
      <SelectYearItem time={time} setTime={setTime} data={YEARS} suffix='年' />

      {/*月表示*/}
      {type === '月' || type === '日' || type === '時' ? (
        <SelectMonthItem
          time={time}
          setTime={setTime}
          data={MONTHS}
          suffix='月'
        />
      ) : (
        <></>
      )}

      {/*日表示*/}
      {type === '日' || type === '時' ? (
        <SelectDayItem time={time} setTime={setTime} data={DAYS} suffix='日' />
      ) : (
        <></>
      )}

      {/*時表示*/}
      {type === '時' ? (
        <SelectHourItem
          time={time}
          setTime={setTime}
          data={HOURS}
          suffix='時'
        />
      ) : (
        <></>
      )}
    </div>
  )
}
