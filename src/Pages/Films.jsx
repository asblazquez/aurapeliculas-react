import { useEffect, useState } from 'react'
import { API } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export function FilmsPage () {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(500)
  const [value, setValue] = useState(1)

  const nextPage = () => {
    if (page === totalPages) {
      alert('No hay mas paginas')
    } else {
      setPage(page + 1)
      setValue(page + 1)
    }
  }

  const previousPage = () => {
    if (page === 1) {
      alert('Ya estas en la primera pagina')
    } else {
      setPage(page - 1)
      setValue(page - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value <= 0 || value >= totalPages) {
      alert('No existe esa pagina')
    } else {
      setPage(parseInt(value))
    }
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
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
                              <LazyLoadImage
                                alt='poster'
                                src={API.api_image_url + item.poster_path}
                                className='movieImg'
                                placeholderSrc={'https://anatomised.com/wp-content/uploads/2016/05/spinner-test4.gif'}
                                visibleByDefault={false}
                                height={'100%'}
                                width={'100%'}
                                />
                            </div>
                        )
                      })
                }
            </div>
            <div className='grid-3 pager mt-3'>
                <button className='btnPager' type='button' onClick={previousPage} title='Pagina anterior'>
                  <AiOutlineArrowLeft className='iconPager'/>
                </button>
                <form onSubmit={handleSubmit}>
                  <input className='inputPager' type='number' onChange={handleChange} value={value} placeholder={page}/>
                </form>
                <button className='btnPager' type='button' onClick={nextPage} title='Siguiente pagina'>
                  <AiOutlineArrowRight className='iconPager'/>
                </button>
            </div>
    </div>
  )
}