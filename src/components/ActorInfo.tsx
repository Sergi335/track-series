import type { CastElement } from '@/types'

export function ActorInfo ({ actor }: { actor: CastElement }) {
  return (
    <div>
      <p className="transition text-sm text-center leading-normal text-white dark:text-gray-200"><span>{actor.name}</span> as <span>{actor.character}</span></p>
      <p className="transition text-sm text-center leading-normal text-white dark:text-gray-200">Rating: {actor.popularity}</p>
      <p className="transition text-sm text-center leading-normal text-white dark:text-gray-200">{actor.id}</p>
    </div>
  )
}
