// Ver la API para ver que nos trae y que endpoint usar
// Probar con algúna url de la API
// Traer algún dato con un endpoint
// Mostrar varios datos

import { API } from '../Constants'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function Series () {
  const [page, setPage] = useState(2)
  const [serie, setSerie] = useState([])
  const POPULAR_MOVIES_ENDPOINT = `https://api.themoviedb.org/3/tv/popular?api_key=${API.api_key}&language=es-ES&page=${page}`

  // Efecto para recuperar los datos de la API
  useEffect(() => {
    const getSeries = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API.api_key}&language=es-ES&page=${page}`)
      setSerie(res.data.results)
    }
    getSeries()
  }, [page])

  return (
        <div className='cards'>
            {
                serie.map((item, index) => {
                  return (
                        <div key={index} className='card'>
                            <img src={API.api_image_url + item.poster_path} alt={item.name} className='cardImg'/>
                        </div>
                  )
                })
            }
        </div>
  )
}