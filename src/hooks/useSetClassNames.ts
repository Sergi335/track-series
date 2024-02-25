import { type MovieInfo, type Movies } from '@/types'
import { useState } from 'react'

export default function useSetClassNames ({ series, id, completed, itemsInListIds, completedIds }: { series: Movies[] | MovieInfo[], id: number, completed: boolean, itemsInListIds: number[], completedIds: number[] }) {
  const [className, setClassName] = useState('')
  series?.map(movie => {
    if (itemsInListIds.includes(movie.id) && completedIds.includes(movie.id)) {
      setClassName('border-red-600')
    } else if (itemsInListIds.includes(movie.id)) {
      setClassName('border-blue-600')
    } else {
      setClassName('border-white')
    }
    return null
  })
  return { className, setClassName }
}
