import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../Constants'
import { ErrorPage } from './Error'
import { apiRequest } from '../Utils'
import { AiFillStar } from 'react-icons/ai'

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
                      <div>
                        <img className={'imgCabeceraInfo'} alt={'Poster de la pelicula' + film.title} src={API.api_image_url + film.backdrop_path}/>
                      </div>
                      <div className={'textTitle grid-2'}>
                        <div className='w-maxContent'>
                          {film.title}
                        </div>
                        <div className='w-maxContent voteAverage'>
                        <span><AiFillStar className={'alignIcon-bottom'} /> {film.vote_average !== undefined ? (film.vote_average.toFixed(1)) : null}</span>
                        </div>
                      </div>
                      <div className='overView sombreado'>
                        <h2>Argumento</h2>
                        <hr />
                        <p>{film.overview}</p>
                      </div>
                      {videos.length > 0
                        ? <div className='centerVideo'>
                          <iframe
                          className='trailerVideo sombreado'
                          src={API.youtube_render_video + videos.filter(x => x.type === 'Trailer')[0].key}
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          title='Trailer'/>
                      </div>
                        : <div>
                          <h3>No hay trailer disponible</h3>
                      </div>}
                        <a href={'https://cuevana3.mu/pelicula/' + formatTitlte} target={'_blank'} hidden={true}>Ver Online</a>
                    </div>
            }
        </div>
  )
}