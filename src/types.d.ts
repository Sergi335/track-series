export interface Genre {
  id: number
  name: string
}

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface LastEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: Date
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface Season {
  air_date: Date | null
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export enum Department {
  Acting = 'Acting',
  Directing = 'Directing',
  Production = 'Production',
  Writing = 'Writing',
}

export interface CastElement {
  adult: boolean
  gender: number
  id: number
  known_for_department: Department
  name: string
  original_name: string
  popularity: number
  profile_path: null | string
  character?: string
  credit_id: string
  order?: number
  department?: Department
  job?: string
}

// Ahora el resto de interfaces pueden usarlas sin error

export interface Movies {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: Date
  name: string
  vote_average: number
  vote_count: number

  // --- CAMPOS AÑADIDOS PARA LA LÓGICA DEL FILTRO ---
  network_id?: number // Asumiendo que una serie pertenece a una network principal
  status?: 'returning' | 'ended' | 'planned' | string // Para el filtro de status
  company_ids?: number[] // Asumiendo que puede tener varias productoras
}

export interface SearchResultsType {
  page: number
  results: Movies[]
  total_pages: number
  total_results: number
  error?: boolean
}

export interface MovieInfo extends Movies {
  adult: boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[] // Cambiado de any[] a number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air: null
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Network[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  watched_season?: number
  watched_episode?: number
  complete?: boolean
}

export interface PopularMoviesInfo {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
}

export interface Credits {
  cast: CastElement[]
  crew: CastElement[]
  id: number
}

// Opciones para los campos de tipo 'select'
export interface SelectOption {
  value: string | number
  label: string
}

// Estado que contendrá los valores de nuestros filtros
export interface FilterState {
  genre: string
  language: 'en' | 'es' | '' // Limitado a los valores especificados
  country: string
  // popularity_min: number
  // popularity_max: number
  year: string // Año seleccionado (de first_air_date)
  network: string
  status: string
  company: string
}

// Props que recibirá el componente de filtro
export interface FilterProps {
  // Datos para poblar los selects y radios
  genres: SelectOption[]
  countries: SelectOption[]
  networks: SelectOption[]
  statuses: SelectOption[]
  companies: SelectOption[]

  // Función para notificar al componente padre de los cambios
  onFilterChange: (filters: Partial<FilterState>) => void
}
