import { useEffect, useState } from 'react'
import { API } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  const nextPage = () => {
    page === totalPages ? alert('No hay mas paginas') : setPage(page + 1)
  }

  const previousPage = () => {
    page === 1 ? alert('Ya estas en la primera pagina') : setPage(page - 1)
  }

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
                      : movies.map((item, idex) => {
                        return (
                            <div key={idex} className='card'>
                              <img src={API.api_image_url + item.poster_path} alt='poster' className='cardImg'/>
                            </div>
                        )
                      })
                }
            </div>
            <div className='grid-3 pager mt-3'>
                <button type='button' onClick={previousPage}>Anterior</button>
                <input className='inputPager' type='number' onChange={null} placeholder={page}/>
                <button type='button' onClick={nextPage}>Siguiente</button>
            </div>
    </div>

  )
}