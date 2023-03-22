import { useEffect, useState } from 'react'
import { API, PLACEHOLDER_PELICULAS } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { PagerComponent } from '../assets/Pager'
import { CardComponent } from '../assets/Card'
import { SearchBar } from '../assets/SearchBar'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [totalPages] = useState(500)
  const [valuePager, setValuePager] = useState(1)
  const [valueSearch, setValueSearch] = useState('')
  const [searchedMovie, setSearchedMovie] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getFilms = async () => {
      await apiRequest(API.api_url + '/movie/popular?api_key=' + API.api_key + '&language=es-ES&page=' + page, setMovies, setError)
    }

    getFilms()
  }, [page])

  useEffect(() => {
    const getSearch = async () => {
      await apiRequest(`${API.api_url}search/movie?api_key=${API.api_key}&language=es-ES&page=1&query=${search}&include_adult=false`, setSearchedMovie, setError)
    }
    if (search !== '') getSearch()
  }, [search])
  console.log(movies)
  return (
    <div>
        <SearchBar value={valueSearch} setSearch={setSearch} setValue={setValueSearch} placeholder={PLACEHOLDER_PELICULAS}/>
        <div className='cards mt-3'>
                {
                    error !== ''
                      ? <ErrorPage text={error}/>
                      : search === ''
                        ? movies.map((item, index) => {
                          return (
                            <CardComponent item={item} overview={item.overview} rate={item.vote_average} key={index} />
                          )
                        })
                        : searchedMovie.map((item, index) => {
                          return (
                            <CardComponent item={item} overview={item.overview} rate={item.vote_average} key={index} />
                          )
                        })
                }
            </div>
            <PagerComponent value={valuePager} page={page} setValue={setValuePager} setPage={setPage} totalPages={totalPages} />
    </div>
  )
}