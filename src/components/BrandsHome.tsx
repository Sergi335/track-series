import { Disney, Hulu, Netflix, Primevideo, Sky } from '@/components/icons/icons'
export default function BrandsHome () {
  return (
    <section>
      <div className="flex flex-wrap justify-center items-center max-w-2xl gap-8 mx-auto">
        <Sky className="h-20 w-20" />
        <Hulu className="h-20 w-20" />
        <Disney className="h-20 w-20" />
        <Primevideo className="h-20 w-20" />
        <Netflix className="h-20 w-20" />
      </div>
    </section>
  )
}
