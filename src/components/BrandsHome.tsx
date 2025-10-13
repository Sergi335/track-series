import { Disney, Hulu, Netflix, Primevideo, Sky } from '@/components/icons/icons'
export default function BrandsHome () {
  return (
    <section>
      <div className="flex flex-wrap justify-center items-center max-w-2xl gap-8 mx-auto mt-12">
        <Sky className="h-16 w-16" />
        <Hulu className="h-16 w-16" />
        <Disney className="h-16 w-16" />
        <Primevideo className="h-16 w-16" />
        <Netflix className="h-16 w-16" />
      </div>
    </section>
  )
}
