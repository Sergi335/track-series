'use server'
export const fetchMovieInfo = async (id: number) => {
  const dataurl = `https://api.themoviedb.org/3/tv/${id}?language=es-ES`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const res = await fetch(dataurl, options)
  const json = await res.json()
  console.log(json)
  return json
}

export const searchMovies = async (query: string, page: string) => {
  const dataurl = `https://api.themoviedb.org/3/search/tv?query=${query}&page=${page}&language=es-ES`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH ?? ''
    }
  }
  const res = await fetch(dataurl, options)
  const json = await res.json()
  return json.results
}
