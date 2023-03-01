import { useEffect, useState } from 'react'
import { API } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    const getFilms = async () => {
      await apiRequest(API.api_url + '/movie/popular?api_key=' + API.api_key + '&language=es-ES&page=' + page, setMovies, setError)
    }

    getFilms()
  }, [page])
  return (
      <div className='gridMovies'>
            {
                error !== ''
                  ? <ErrorPage text={error}/>
                  : Array.isArray(movies) && movies.map((item, idex) => {
                    return (
                      <div key={idex} className='cardMovie'>
                        <img src={API.api_image_url + item.poster_path} alt='poster' className='movieImg'/>
                          <p className='text-white'>{item.title}</p>
                      </div>
                    )
                  })
            }

        </div>

  )
}