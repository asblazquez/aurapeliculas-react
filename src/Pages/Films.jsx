import { useEffect, useState } from 'react'
import { API, LOCALSTORAGE_NAME_FILMS, NAVIGATE, PLACEHOLDER_PELICULAS } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { PagerComponent } from '../assets/Pager'
import { CardComponent } from '../assets/Card'
import { SearchBar } from '../assets/SearchBar'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(localStorage.getItem(LOCALSTORAGE_NAME_FILMS) === null ? 1 : parseInt(localStorage.getItem(LOCALSTORAGE_NAME_FILMS)))
  const [error, setError] = useState('')
  const [totalPages] = useState(500)
  const [valuePager, setValuePager] = useState(localStorage.getItem(LOCALSTORAGE_NAME_FILMS) === null ? 1 : parseInt(localStorage.getItem(LOCALSTORAGE_NAME_FILMS)))
  const [valueSearch, setValueSearch] = useState('')
  const [searchedMovie, setSearchedMovie] = useState([])
  const [search, setSearch] = useState('')
  const [viewMax, setViewMax] = useState(true)
  const [textViewButton, setTextViewButton] = useState('Minimizar Imagnes')

  const changeView = () => {
    setViewMax(!viewMax)
    viewMax ? setTextViewButton('Ampliar Imagnes') : setTextViewButton('Minimizar Imagnes')
  }

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
  return (
    <div>
        <button onClick={changeView}>{textViewButton}</button>
        <SearchBar value={valueSearch} setSearch={setSearch} setValue={setValueSearch} placeholder={PLACEHOLDER_PELICULAS}/>
        <div className='cards mt-3'>
                {
                    error !== ''
                      ? <ErrorPage text={error}/>
                      : search === ''
                        ? movies.map((item, index) => {
                          return (
                            <CardComponent item={item} overview={item.overview} rate={item.vote_average} route={NAVIGATE.movie} key={index} viewMax={viewMax}/>
                          )
                        })
                        : searchedMovie.map((item, index) => {
                          return (
                            <CardComponent item={item} overview={item.overview} rate={item.vote_average} route={NAVIGATE.movie} key={index} />
                          )
                        })
                }
            </div>
            {(search === '' && error === '') ? <PagerComponent value={valuePager} page={page} setValue={setValuePager} setPage={setPage} totalPages={totalPages} localStorageName={LOCALSTORAGE_NAME_FILMS} /> : null}
    </div>
  )
}