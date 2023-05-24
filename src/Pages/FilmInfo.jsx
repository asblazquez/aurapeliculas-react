import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../Constants'
import { ErrorPage } from './Error'
import { apiRequest } from '../Utils'
import { TrailerComponent } from '../assets/Trailer'
import { OverViewComponent } from '../assets/OverView'
import { HeaderComponent } from '../assets/Header'

export function FilmInfoPage () {
  const { id } = useParams()
  const [film, setFilm] = useState([])
  const [error, setError] = useState('')
  const [formatTitlte, setformatTitle] = useState('')
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getFilmData = async () => {
      await apiRequest(API.api_url + '/movie/' + id + '?api_key=' + API.api_key + '&language=es-ES', setFilm, setError)
    }

    const getVideos = async () => {
      await apiRequest(API.api_url + '/movie/' + id + '/videos?api_key=' + API.api_key + '&language=es-ES', setVideos, setError)
    }

    getFilmData()
    getVideos()
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
                      <HeaderComponent title={film.title} img={film.backdrop_path} voteAverage={film.vote_average} />
                      <OverViewComponent text={film.overview} />
                      {videos.length > 0
                        ? <TrailerComponent videos={videos} />
                        : <TrailerComponent videos={null} />}
                        {/* <a href={'https://cuevana3.mu/pelicula/' + formatTitlte} target={'_blank'} hidden={false}>Ver Online</a> */}
                    </div>
            }
        </div>
  )
}