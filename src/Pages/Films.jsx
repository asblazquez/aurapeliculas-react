import { useEffect, useState } from 'react'
import { API, LOCALSTORAGE_NAME_FILMS, LOCALSTORAGE_VIEWMAX, NAVIGATE, PLACEHOLDER_PELICULAS } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { PagerComponent } from '../assets/Pager'
import { CardComponent } from '../assets/Card'
import { SearchBar } from '../assets/SearchBar'
import { GiExpand, GiContract } from 'react-icons/gi'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(localStorage.getItem(LOCALSTORAGE_NAME_FILMS) === null ? 1 : parseInt(localStorage.getItem(LOCALSTORAGE_NAME_FILMS)))
  const [error, setError] = useState('')
  const [totalPages] = useState(500)
  const [valuePager, setValuePager] = useState(localStorage.getItem(LOCALSTORAGE_NAME_FILMS) === null ? 1 : parseInt(localStorage.getItem(LOCALSTORAGE_NAME_FILMS)))
  const [valueSearch, setValueSearch] = useState('')
  const [searchedMovie, setSearchedMovie] = useState([])
  const [search, setSearch] = useState('')
  const [viewMax, setViewMax] = useState(localStorage.getItem(LOCALSTORAGE_VIEWMAX) === 'true')

  const changeView = () => {
    setViewMax(!viewMax)
    localStorage.setItem(LOCALSTORAGE_VIEWMAX, !viewMax)
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
      <div style={{ position: 'fixed' }}>
        <button className='btnExpand cursor-pointer' type='button' onClick={changeView}>{viewMax ? <GiContract className='iconPager fontSize-xLarge' /> : <GiExpand className='iconPager fontSize-xLarge' /> }</button>
      </div>
        <SearchBar value={valueSearch} setSearch={setSearch} setValue={setValueSearch} placeholder={PLACEHOLDER_PELICULAS}/>
        <div className='cards mt-3'>
                {
                    error !== ''
                      ? <ErrorPage text={error}/>
                      : search === ''
                        ? movies.map((item, index) => {
                          if (item.poster_path !== null) {
                            return (<CardComponent item={item} overview={item.overview} rate={item.vote_average} route={NAVIGATE.movie} key={index} viewMax={viewMax}/>)
                          } else {
                            return (null)
                          }
                        }
                        )
                        : searchedMovie.map((item, index) => {
                          if (item.poster_path !== null) {
                            return (<CardComponent item={item} overview={item.overview} rate={item.vote_average} route={NAVIGATE.movie} key={index} viewMax={viewMax}/>)
                          } else {
                            return (null)
                          }
                        })
                }
            </div>
            {(search === '' && error === '') ? <PagerComponent value={valuePager} page={page} setValue={setValuePager} setPage={setPage} totalPages={totalPages} localStorageName={LOCALSTORAGE_NAME_FILMS} /> : null}
    </div>
  )
}