// Ver la API para ver que nos trae y que endpoint usar
// Probar con algúna url de la API
// Traer algún dato con un endpoint
// Mostrar varios datos

import { API } from '../Constants'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PagerComponent } from '../assets/Pager'
import { CardComponent } from '../assets/Card'

export function Series () {
  const [value, setValue] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(500)
  const [serie, setSerie] = useState([])

  // Efecto para recuperar los datos de la API
  useEffect(() => {
    const getSeries = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API.api_key}&language=es-ES&page=${page}`)
      setSerie(res.data.results)
    }
    getSeries()
  }, [page])

  return (
    <div>
        <div className='search'>
            <input className='inputSearch' placeholder='  House, Vikings, Last Kingdom...'/>
            <button className='buttonSearch'> Buscar </button>
        </div>
        <div className='cards'>
            {
                serie.map((item, index) => {
                  return (
                        // <div key={index} >
                        //     <img src={API.api_image_url + item.poster_path} alt={item.name} className='cardImg'/>
                        // </div>
                        <CardComponent item={item} title={item.title} key={index} />
                  )
                })
            }
        </div>
        <PagerComponent value={value} page={page} setValue={setValue} setPage={setPage} totalPages={totalPages}/>
    </div>
  )
}