'use client'
import { type MovieInfo } from '@/types'
import { Button } from '@/components/ui/button'
export default function Controls ({ data }: { data: MovieInfo }) {
  if (localStorage.getItem('series') === null) localStorage.setItem('series', JSON.stringify([]))
  const storedData = JSON.parse(localStorage.getItem('series') ?? '') ?? [] as MovieInfo[]
  console.log(storedData)
  const storeData = () => {
    if (storeData !== null) {
      const index = storedData.findIndex((item: MovieInfo) => item.id === data.id)
      if (index === -1) {
        storedData.push(data)
      } else {
        storedData.splice(index, 1)
      }
    }
    localStorage.setItem('series', JSON.stringify(storedData))
  }
  return (
        <div className="p-5 w-2/4 flex items-center gap-3">
            <Button className='text-white' onClick={storeData}>Seguir</Button>
            <svg width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 2.011a3.2 3.2 0 0 1 2.113.797l.154.145.698.698c.192.19.442.31.71.341L15.82 4h1a3.2 3.2 0 0 1 3.195 3.018l.005.182v1c0 .27.092.533.258.743l.09.1.697.698a3.2 3.2 0 0 1 .147 4.382l-.145.154-.698.698a1.2 1.2 0 0 0-.341.71l-.008.135v1a3.2 3.2 0 0 1-3.018 3.195l-.182.005h-1a1.2 1.2 0 0 0-.743.258l-.1.09-.698.697a3.2 3.2 0 0 1-4.382.147l-.154-.145-.698-.698a1.2 1.2 0 0 0-.71-.341L8.2 20.02h-1a3.2 3.2 0 0 1-3.195-3.018L4 16.82v-1a1.2 1.2 0 0 0-.258-.743l-.09-.1-.697-.698a3.2 3.2 0 0 1-.147-4.382l.145-.154.698-.698a1.2 1.2 0 0 0 .341-.71L4 8.2v-1l.005-.182a3.2 3.2 0 0 1 3.013-3.013L7.2 4h1a1.2 1.2 0 0 0 .743-.258l.1-.09.698-.697a3.2 3.2 0 0 1 2.269-.944Zm3.697 7.282a1 1 0 0 0-1.414 0L11 12.585l-1.293-1.292-.094-.083a1 1 0 0 0-1.32 1.497l2 2 .094.083a1 1 0 0 0 1.32-.083l4-4 .083-.094a1 1 0 0 0-.083-1.32Z"/></svg>
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#9B4CFF"><path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/><path d="M11.102 17.957C7.898 17.65 5.198 15.663 3 12c2.4-4 5.4-6 9-6 3.6 0 6.6 2 9 6-.21.35-.431.695-.663 1.032M15 19l2 2 4-4"/></g></svg>
            <p className='text-white'>S.1 Ep.12</p>
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" fill="#9B4CFF"/><path fillRule="evenodd" clipRule="evenodd" d="M13 7a1 1 0 0 0-2 0v4H7a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4V7Z" fill="#9B4CFF"/></svg>
        </div>
  )
}
