import { Skeleton } from './ui/skeleton'

export default function MovieGridLoader () {
  return (
    <section className="grid grid-cols-6 gap-4 mx-auto">
      {
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-72 rounded-[32px]"
            style={
              {
                gridColumn: index <= 4 ? index + 1 : (index - 4), // necesitamos que vuelva a ser 1 y empezar a contar otra vez
                gridRow: index < 5 ? 1 : 2
              }
            }
            role="loader"
          />
        ))
      }
    </section>
  )
}
