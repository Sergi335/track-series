import { Skeleton } from './ui/skeleton'

export default function MovieGridLoader () {
  return (
    <div className="grid grid-cols-5 gap-4 mx-auto">
      {
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-96 w-60 rounded-[32px]" />
        ))
      }
    </div>
  )
}
