import { Content } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  type: Content
  setType: Dispatch<SetStateAction<Content>>
}

const selected =
  'z-10 inline-flex items-center bg-gray-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer w-32'
const normal =
  'inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer w-32'
const naviItem = ['年', '月', '日', '時']

export const Navigation = ({ type, setType }: Props) => {
  return (
    <div className='flex items-center border-gray-200 px-4 py-3 sm:px-6'>
      <div className='sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <nav className='inline-flex -space-x-px shadow-sm bg-white'>
            {naviItem.map((item) => (
              <span
                key={item}
                className={item === type ? selected : normal}
                onClick={() => setType(item as Content)}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
