import { useEffect, useState } from 'react'
import { API } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { PagerComponent } from '../assets/Pager'
import { CardComponent } from '../assets/Card'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(500)
  const [value, setValue] = useState(1)

  useEffect(() => {
    const getFilms = async () => {
      await apiRequest(API.api_url + '/movie/popular?api_key=' + API.api_key + '&language=es-ES&page=' + page, setMovies, setError, setTotalPages)
    }

    getFilms()
  }, [page])
  return (
    <div>
        <div className='cards'>
                {
                    error !== ''
                      ? <ErrorPage text={error}/>
                      : movies.map((item, index) => {
                        return (
                            <CardComponent item={item} key={index}/>
                        )
                      })
                }
            </div>
            <PagerComponent value={value} page={page} setValue={setValue} setPage={setPage} totalPages={totalPages} />
    </div>
  )
}