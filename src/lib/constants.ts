export const FILTER_TYPES = {
  genres: [
    { value: '10759', label: 'Acción' },
    { value: '16', label: 'Animación' },
    { value: '35', label: 'Comedia' },
    { value: '80', label: 'Crimen' },
    { value: '99', label: 'Documental' },
    { value: '18', label: 'Drama' },
    { value: '10751', label: 'Familiar' },
    { value: '10762', label: 'Infantil' },
    { value: '9648', label: 'Misterio' },
    { value: '10763', label: 'Noticias' },
    { value: '10764', label: 'Reality' },
    { value: '10765', label: 'Ciencia ficción' },
    { value: '10766', label: 'Telenovela' },
    { value: '10767', label: 'Talk Show' },
    { value: '10768', label: 'Bélico/Política' },
    { value: '37', label: 'Western' }
  ],
  countries: [
    { value: 'US', label: 'Estados Unidos' },
    { value: 'GB', label: 'Reino Unido' },
    { value: 'JP', label: 'Japón' },
    { value: 'KR', label: 'Corea del Sur' },
    { value: 'CA', label: 'Canadá' },
    { value: 'DE', label: 'Alemania' },
    { value: 'FR', label: 'Francia' },
    { value: 'IT', label: 'Italia' },
    { value: 'ES', label: 'España' },
    { value: 'AU', label: 'Australia' },
    { value: 'CN', label: 'China' },
    { value: 'IN', label: 'India' },
    { value: 'RU', label: 'Rusia' },
    { value: 'MX', label: 'México' },
    { value: 'BR', label: 'Brasil' },
    { value: 'SE', label: 'Suecia' },
    { value: 'AR', label: 'Argentina' },
    { value: 'TR', label: 'Turquía' },
    { value: 'NL', label: 'Países Bajos' },
    { value: 'PL', label: 'Polonia' }
  ],
  networks: [
    { value: '8', label: 'Netflix' },
    { value: '9', label: 'Amazon Prime Video' },
    { value: '337', label: 'Disney Plus' },
    { value: '1899', label: 'HBO Max' },
    { value: '350', label: 'Apple TV+' },
    { value: '2241', label: 'Movistar Plus+' },
    { value: '63', label: 'Filmin' },
    { value: '62', label: 'Atres Player' },
    { value: '35', label: 'Rakuten TV' },
    { value: '3', label: 'Google Play Movies' },
    { value: '192', label: 'YouTube' },
    { value: '210', label: 'Sky' },
    { value: '531', label: 'Paramount Plus' },
    { value: '43', label: 'Starz' },
    { value: '80', label: 'AMC' },
    { value: '11', label: 'MUBI' },
    { value: '300', label: 'Pluto TV' },
    { value: '283', label: 'Crunchyroll' },
    { value: '541', label: 'rtve' },
    { value: '386', label: 'Peacock' }
  ],
  statuses: ['Returning', 'Ended', 'Canceled'].map(status => ({
    value: status.toLowerCase(),
    label: status
  })),
  companies: []
}

// Mapas para SearchResultsFilters (compatibilidad)
export const GENRE_MAP: Record<string, string> = {
  10759: 'Acción',
  16: 'Animación',
  35: 'Comedia',
  80: 'Crimen',
  99: 'Documental',
  18: 'Drama',
  10751: 'Familiar',
  10762: 'Infantil',
  9648: 'Misterio',
  10763: 'Noticias',
  10764: 'Reality',
  10765: 'Ciencia ficción',
  10766: 'Telenovela',
  10767: 'Talk Show',
  10768: 'Bélico/Política',
  37: 'Western'
}

export const GENRE_MAP_REVERSE = Object.fromEntries(
  Object.entries(GENRE_MAP).map(([id, name]) => [name, id])
)

export const COUNTRY_MAP: Record<string, string> = {
  AR: 'Argentina',
  US: 'Estados Unidos',
  ES: 'España',
  MX: 'México',
  GB: 'Reino Unido',
  FR: 'Francia',
  IT: 'Italia',
  JP: 'Japón',
  KR: 'Corea del Sur',
  DE: 'Alemania',
  CA: 'Canadá',
  BR: 'Brasil',
  AU: 'Australia',
  CN: 'China',
  IN: 'India',
  RU: 'Rusia'
}

export const COUNTRY_MAP_REVERSE = Object.fromEntries(
  Object.entries(COUNTRY_MAP).map(([code, name]) => [name, code])
)

export const URL_GENRE_MAP: Record<string, string> = {
  action: '10759',
  animation: '16',
  comedy: '35',
  crime: '80',
  documentary: '99',
  drama: '18',
  family: '10751',
  kids: '10762',
  mystery: '9648',
  news: '10763',
  reality: '10764',
  scifi: '10765',
  soap: '10766',
  talk: '10767',
  warPolitics: '10768',
  western: '37'
}
