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
  providers: [
    { value: '8', label: 'Netflix' },
    { value: '337', label: 'Disney Plus' },
    { value: '350', label: 'Apple TV+' },
    { value: '119', label: 'Amazon Prime Video' },
    { value: '2', label: 'Apple TV' },
    { value: '2241', label: 'Movistar Plus+' },
    { value: '149', label: 'Movistar Plus+ Ficción Total' },
    { value: '63', label: 'Filmin' },
    { value: '35', label: 'Rakuten TV' },
    { value: '257', label: 'fuboTV' },
    { value: '1773', label: 'SkyShowtime' },
    { value: '64', label: 'Filmin Plus' },
    { value: '62', label: 'Atres Player' },
    { value: '3', label: 'Google Play Movies' },
    { value: '393', label: 'FlixOlé' },
    { value: '1899', label: 'HBO Max' },
    { value: '11', label: 'MUBI' },
    { value: '100', label: 'GuideDoc' },
    { value: '188', label: 'YouTube Premium' },
    { value: '190', label: 'Curiosity Stream' },
    { value: '475', label: 'DOCSVILLE' },
    { value: '541', label: 'rtve' },
    { value: '538', label: 'Plex' },
    { value: '546', label: 'WOW Presents Plus' },
    { value: '551', label: 'Magellan TV' },
    { value: '554', label: 'BroadwayHD' },
    { value: '559', label: 'Filmzie' },
    { value: '567', label: 'True Story' },
    { value: '569', label: 'DocAlliance Films' },
    { value: '444', label: 'Dekkoo' },
    { value: '315', label: 'Hoichoi' },
    { value: '10', label: 'Amazon Video' },
    { value: '300', label: 'Pluto TV' },
    { value: '677', label: 'Eventive' },
    { value: '201', label: 'MUBI Amazon Channel' },
    { value: '607', label: 'OUTtv Amazon Channel' },
    { value: '196', label: 'AcornTV Amazon Channel' },
    { value: '684', label: 'FlixOlé Amazon Channel' },
    { value: '689', label: 'TVCortos Amazon Channel' },
    { value: '692', label: 'Cultpix' },
    { value: '701', label: 'FilmBox+' },
    { value: '1717', label: 'Acontra Plus' },
    { value: '1740', label: 'Planet Horror Amazon Channel' },
    { value: '1741', label: 'Dizi Amazon Channel' },
    { value: '1742', label: 'Acontra Plus Amazon Channel' },
    { value: '1743', label: 'Historia y Actualidad Amazon Channel' },
    { value: '1771', label: 'Takflix' },
    { value: '309', label: 'Sun Nxt' },
    { value: '1796', label: 'Netflix Standard with Ads' },
    { value: '1838', label: 'Tivify' },
    { value: '1875', label: 'Runtime' },
    { value: '283', label: 'Crunchyroll' },
    { value: '528', label: 'AMC+ Amazon Channel' },
    { value: '1715', label: 'Shahid VIP' },
    { value: '2034', label: 'Acorn TV Apple TV' },
    { value: '1854', label: 'AMC Plus Apple TV Channel' },
    { value: '234', label: 'Arte' },
    { value: '2141', label: 'MGM Plus Amazon Channel' },
    { value: '2237', label: '3Cat' },
    { value: '2275', label: 'Stingray Karaoke Amazon Channel' },
    { value: '2285', label: 'JustWatchTV' },
    { value: '1968', label: 'Crunchyroll Amazon Channel' },
    { value: '2358', label: 'Lionsgate+ Amazon Channels' },
    { value: '2243', label: 'Apple TV Plus Amazon Channel' },
    { value: '2393', label: 'Cocina ON Amazon Channel' },
    { value: '2330', label: 'Jolt Film' },
    { value: '464', label: 'Kocowa' },
    { value: '2472', label: 'HBO Max Amazon Channel' },
    { value: '2100', label: 'Amazon Prime Video with Ads' },
    { value: '2555', label: 'Bloodstream' },
    { value: '2563', label: 'Tentkotta' }
  ],
  statuses: ['Returning', 'Ended', 'Canceled'].map(status => ({
    value: status.toLowerCase(),
    label: status
  }))
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

export const PROVIDERS = [
  {
    id: 8,
    name: 'Netflix',
    image: '/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg'
  },
  {
    id: 337,
    name: 'Disney Plus',
    image: '/97yvRBw1GzX7fXprcF80er19ot.jpg'
  },
  {
    id: 350,
    name: 'Apple TV+',
    image: '/2E03IAZsX4ZaUqM7tXlctEPMGWS.jpg'
  },
  {
    id: 119,
    name: 'Amazon Prime Video',
    image: '/pvske1MyAoymrs5bguRfVqYiM9a.jpg'
  },
  {
    id: 2,
    name: 'Apple TV',
    image: '/9ghgSC0MA082EL6HLCW3GalykFD.jpg'
  },
  {
    id: 2241,
    name: 'Movistar Plus+',
    image: '/jse4MOi92Jgetym7nbXFZZBI6LK.jpg'
  },
  {
    id: 149,
    name: 'Movistar Plus+ Ficción Total',
    image: '/f6TRLB3H4jDpFEZ0z2kWSSvu1SB.jpg'
  },
  {
    id: 63,
    name: 'Filmin',
    image: '/kO2SWXvDCHAquaUuTJBuZkTBAuU.jpg'
  },
  {
    id: 35,
    name: 'Rakuten TV',
    image: '/bZvc9dXrXNly7cA0V4D9pR8yJwm.jpg'
  },
  {
    id: 257,
    name: 'fuboTV',
    image: '/9BgaNQRMDvVlji1JBZi6tcfxpKx.jpg'
  },
  {
    id: 1773,
    name: 'SkyShowtime',
    image: '/h0ZYcYHicKQ4Ixm5nOjqvwni5NG.jpg'
  },
  {
    id: 64,
    name: 'Filmin Plus',
    image: '/ozZU2vSlyL11rFGEkq1HE0yxIJq.jpg'
  },
  {
    id: 62,
    name: 'Atres Player',
    image: '/oN6g8QorcoYo3mx4BulU22ghKq4.jpg'
  },
  {
    id: 3,
    name: 'Google Play Movies',
    image: '/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg'
  },
  {
    id: 393,
    name: 'FlixOlé',
    image: '/ozMgkAAoi6aDI5ce8KKA2k8TGvB.jpg'
  },
  {
    id: 1899,
    name: 'HBO Max',
    image: '/jbe4gVSfRlbPTdESXhEKpornsfu.jpg'
  },
  {
    id: 11,
    name: 'MUBI',
    image: '/fj9Y8iIMFUC6952HwxbGixTQPb7.jpg'
  },
  {
    id: 100,
    name: 'GuideDoc',
    image: '/eKVmLFHW5PeNhuR7Nedd8OIxW2M.jpg'
  },
  {
    id: 188,
    name: 'YouTube Premium',
    image: '/rMb93u1tBeErSYLv79zSTR07UdO.jpg'
  },
  {
    id: 190,
    name: 'Curiosity Stream',
    image: '/oR1aNm1Qu9jQBkW4VrGPWhqbC3P.jpg'
  },
  {
    id: 475,
    name: 'DOCSVILLE',
    image: '/5zqbck5mo8PuVbGu2ngBUdn5Yga.jpg'
  },
  {
    id: 541,
    name: 'rtve',
    image: '/3QQKYFUDt13Q2Zm6JM2cOjlbd27.jpg'
  },
  {
    id: 538,
    name: 'Plex',
    image: '/vLZKlXUNDcZR7ilvfY9Wr9k80FZ.jpg'
  },
  {
    id: 546,
    name: 'WOW Presents Plus',
    image: '/6dET59jNU0ADysghEjl8Unuc7Ca.jpg'
  },
  {
    id: 551,
    name: 'Magellan TV',
    image: '/mSH24WQcRDJ2fsL5iucXqqRnSRb.jpg'
  },
  {
    id: 554,
    name: 'BroadwayHD',
    image: '/6IYZ4NjwPikxN7J9cfSmuyeHeMm.jpg'
  },
  {
    id: 559,
    name: 'Filmzie',
    image: '/eUBxtrqO26wAJfYOZJOzhQEo3mm.jpg'
  },
  {
    id: 567,
    name: 'True Story',
    image: '/aRPDQvVcpeY07sjI6lAALMCL0ti.jpg'
  },
  {
    id: 569,
    name: 'DocAlliance Films',
    image: '/vbXJBJVv3u3YWt6ml0l0ldDblXT.jpg'
  },
  {
    id: 444,
    name: 'Dekkoo',
    image: '/x6nRFzF32hCzMHaVM4RHRo7lsgS.jpg'
  },
  {
    id: 315,
    name: 'Hoichoi',
    image: '/u7dwMceEbjxd1N3TLEUBILSK2x6.jpg'
  },
  {
    id: 10,
    name: 'Amazon Video',
    image: '/seGSXajazLMCKGB5hnRCidtjay1.jpg'
  },
  {
    id: 300,
    name: 'Pluto TV',
    image: '/dB8G41Q6tSL5NBisrIeqByfepBc.jpg'
  },
  {
    id: 677,
    name: 'Eventive',
    image: '/fwx5Ed64TkfWiRH1SOSkc4781Ts.jpg'
  },
  {
    id: 201,
    name: 'MUBI Amazon Channel',
    image: '/a4IDLKjvP5gvq7tNlg2Xw5YyEkI.jpg'
  },
  {
    id: 607,
    name: 'OUTtv Amazon Channel',
    image: '/d0KmcInHpiF44ahOLrXCQATEFmD.jpg'
  },
  {
    id: 196,
    name: 'AcornTV Amazon Channel',
    image: '/1wYmvbAuVZz2JnKvYfYN8Qolnb.jpg'
  },
  {
    id: 684,
    name: 'FlixOlé Amazon Channel',
    image: '/2GQVxfaiWA4n93I7sJDJf1b6NqS.jpg'
  },
  {
    id: 689,
    name: 'TVCortos Amazon Channel',
    image: '/32R4lsqOPclNhb3qV613J8T8mdL.jpg'
  },
  {
    id: 692,
    name: 'Cultpix',
    image: '/uauVx3dGWt0GICqdMCBYJObd3Mo.jpg'
  },
  {
    id: 701,
    name: 'FilmBox+',
    image: '/fbveJTcro9Xw2KuPIIoPPePHiwy.jpg'
  },
  {
    id: 1717,
    name: 'Acontra Plus',
    image: '/8vES2nJNwOF57muvqLByDLm6snp.jpg'
  },
  {
    id: 1740,
    name: 'Planet Horror Amazon Channel',
    image: '/yISpVXhf6axqiHh6lBvJ8RRrZ8v.jpg'
  },
  {
    id: 1741,
    name: 'Dizi Amazon Channel',
    image: '/tM1HabyA45cnckBEhLS7hAVga5g.jpg'
  },
  {
    id: 1742,
    name: 'Acontra Plus Amazon Channel',
    image: '/tGvAD4O9obFP3DfOrDn8NaRQ6eT.jpg'
  },
  {
    id: 1743,
    name: 'Historia y Actualidad Amazon Channel',
    image: '/aJECXkHekrkuRZ7ABF5YR9DVDd8.jpg'
  },
  {
    id: 1771,
    name: 'Takflix',
    image: '/ed0vz5bryWIhQB5sHiuGvHKnHHn.jpg'
  },
  {
    id: 309,
    name: 'Sun Nxt',
    image: '/6KEQzITx2RrCAQt5Nw9WrL1OI8z.jpg'
  },
  {
    id: 1796,
    name: 'Netflix Standard with Ads',
    image: '/dpR8r13zWDeUR0QkzWidrdMxa56.jpg'
  },
  {
    id: 1838,
    name: 'Tivify',
    image: '/8VhN4PeHU7yfMNoWK0DnwdS1HlS.jpg'
  },
  {
    id: 1875,
    name: 'Runtime',
    image: '/xm8xr6LDdY5j2gjYf1S3yqaeRbE.jpg'
  },
  {
    id: 283,
    name: 'Crunchyroll',
    image: '/fzN5Jok5Ig1eJ7gyNGoMhnLSCfh.jpg'
  },
  {
    id: 528,
    name: 'AMC+ Amazon Channel',
    image: '/2ino0WmHA4GROB7NYKzT6PGqLcb.jpg'
  },
  {
    id: 1715,
    name: 'Shahid VIP',
    image: '/7qZED0kLBtiV8mLRNBtW4PQCAqW.jpg'
  },
  {
    id: 2034,
    name: 'Acorn TV Apple TV',
    image: '/kx8rGgFYxX6aJkG7RHx2mtijglC.jpg'
  },
  {
    id: 1854,
    name: 'AMC Plus Apple TV Channel',
    image: '/oTQdXIqM9iewlN4MC2nhKB0gHw.jpg'
  },
  {
    id: 234,
    name: 'Arte',
    image: '/vPZrjHe7wvALuwJEXT2kwYLi0gV.jpg'
  },
  {
    id: 2141,
    name: 'MGM Plus Amazon Channel',
    image: '/efu1Cqc63XrPBoreYnf2mn0Nizj.jpg'
  },
  {
    id: 2237,
    name: '3Cat',
    image: '/lDvzuBuNVgpcdzDpPmmufKvrZPb.jpg'
  },
  {
    id: 2275,
    name: 'Stingray Karaoke Amazon Channel',
    image: '/hhrxkhGheXYIxySqg4RcvO4tywc.jpg'
  },
  {
    id: 2285,
    name: 'JustWatchTV',
    image: '/uCMLyl8jGIbInVyDeCeV6kpciFm.jpg'
  },
  {
    id: 1968,
    name: 'Crunchyroll Amazon Channel',
    image: '/pgjz7bzfBq4nFDu8JJDLBoUVAX8.jpg'
  },
  {
    id: 2358,
    name: 'Lionsgate+ Amazon Channels',
    image: '/o4OqlMLb3ZjhK7OwR4qvxiZKOXf.jpg'
  },
  {
    id: 2243,
    name: 'Apple TV Plus Amazon Channel',
    image: '/yFrZVSC4UnDpeIzX2svcRPgV5P5.jpg'
  },
  {
    id: 2393,
    name: 'Cocina ON Amazon Channel',
    image: '/r2WsboLyjoNW3WgABuYwuiTGZqq.jpg'
  },
  {
    id: 2330,
    name: 'Jolt Film',
    image: '/sBTV0rN8JUhF4G3uIceinWtQ3gi.jpg'
  },
  {
    id: 464,
    name: 'Kocowa',
    image: '/hwsU65QW7A4dbMEWkDpgHyCNcfS.jpg'
  },
  {
    id: 2472,
    name: 'HBO Max Amazon Channel',
    image: '/5AkEgpCNaBP3Fbwd2m1GdQIk0vv.jpg'
  },
  {
    id: 2100,
    name: 'Amazon Prime Video with Ads',
    image: '/8aBqoNeGGr0oSA85iopgNZUOTOc.jpg'
  },
  {
    id: 2555,
    name: 'Bloodstream',
    image: '/sYxEMNfIh3F7g5FM0qH40edsmt7.jpg'
  },
  {
    id: 2563,
    name: 'Tentkotta',
    image: '/lMlpaL2sK9iExA6CWVlrw3K1dXU.jpg'
  }
]
