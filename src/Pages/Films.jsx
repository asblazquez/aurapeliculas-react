import { useEffect, useState } from 'react'
import { API } from '../Constants'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PagerComponent } from '../assets/Pager'

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
                      : movies.map((item, idex) => {
                        return (
                            <div key={idex} className='card'>
                              <LazyLoadImage
                                alt={'poster'}
                                src={API.api_image_url + item.poster_path}
                                placeholderSrc={'https://anatomised.com/wp-content/uploads/2016/05/spinner-test4.gif'}
                                height={'100%'}
                                width={'100%'}
                                loading={'lazy'}
                                className={'cardImg'}
                                />
                            </div>
                        )
                      })
                }
            </div>
            <PagerComponent value={value} page={page} setValue={setValue} setPage={setPage} totalPages={totalPages} />
    </div>
  )
}