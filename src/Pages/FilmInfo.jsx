import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../Constants'
import { ErrorPage } from './Error'
import { apiRequest } from '../Utils'

export function FilmInfoPage () {
  const { id } = useParams()
  const [film, setFilm] = useState([])
  const [error, setError] = useState('')
  const [formatTitlte, setformatTitle] = useState('')

  useEffect(() => {
    const getFilmData = async () => {
      await apiRequest(API.api_url + '/movie/' + id + '?api_key=' + API.api_key + '&language=es-ES', setFilm, setError)
    }

    getFilmData()
  }, [])

  useEffect(() => {
    const getFormattittle = () => {
      if (film.title !== undefined) { setformatTitle(film.original_title.replaceAll(' ', '-')) }
    }
    getFormattittle()
  }, [film])

  return (
        <div>
            {
                error !== ''
                  ? <ErrorPage text={error}/>
                  : <div>
                    <div className={'cabeceraInfo'}>
                      <div className={'imgCabeceraInfo'}>
                      <img alt={'Poster de la pelicula' + film.title} src={API.api_image_url + film.poster_path}/>
                      </div>
                      <div className={'datosCabeceraInfo'}>
                      </div>
                    </div>
                        <a href={'https://cuevana3.mu/pelicula/' + formatTitlte} target={'_blank'}>Ver Online</a>
                  </div>

            }
        </div>
  )
}