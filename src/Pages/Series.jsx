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
  const [totalPages] = useState(500)
  const [serie, setSerie] = useState([])
  const [search, setSearch] = useState('')

  // Efecto para recuperar los datos de la API
  useEffect(() => {
    const getSeries = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API.api_key}&language=es-ES&page=${page}`)
      setSerie(res.data.results)
    }
    getSeries()
  }, [page])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Efecto para la busqueda en la API

    useEffect(() => {
      const searchAPI = async () => {
        const res = axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API.api_key}&language=es-ES&page=1&query=${search}&include_adult=false`)
        setSearch(res.data.results)
        console.log(res.data.results)
      }
      searchAPI()
    }, [])
  }

  const handleChange = ({ target }) => {
    setSearch(target.value)
    // console.log(target.value)
  }

  return (
    <div>
        <form className='search'>
            <input className='inputSearch'
            onChange={handleChange}
            placeholder='  House, Vikings, Brooklyn 99, Last Kingdom...' />
            <button className='buttonSearch' onClick={handleSubmit}> Buscar </button>
        </form>
        <div className='cards'>
            {
                serie.map((item, index) => {
                  return (
                        <CardComponent item={item} title={item.name} rate={item.vote_average} key={index} />
                  )
                })
            }
        </div>
        <PagerComponent value={value} page={page} setValue={setValue} setPage={setPage} totalPages={totalPages}/>
    </div>
  )
}