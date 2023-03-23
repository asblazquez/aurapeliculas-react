// Ver la API para ver que nos trae y que endpoint usar
// Probar con algúna url de la API
// Traer algún dato con un endpoint
// Mostrar varios datos

import { API, PLACEHOLDER_SERIES } from '../Constants'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PagerComponent } from '../assets/Pager'
import { CardComponent } from '../assets/Card'
import { apiRequest } from '../Utils'
import { ErrorPage } from './Error'
import { SearchBar } from '../assets/SearchBar'

export function Series () {
  const [value, setValue] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPages] = useState(500)
  const [error, setError] = useState('')
  const [serie, setSerie] = useState([])
  const [searchedSerie, setSearchedSerie] = useState([])
  const [search, setSearch] = useState('')

  // Efecto para recuperar los datos de la API
  useEffect(() => {
    const getSeries = async () => {
      const res = await axios.get(`${API.api_url}tv/popular?api_key=${API.api_key}&language=es-ES&page=${page}`)
      setSerie(res.data.results)
    }
    getSeries()
  }, [page])

  useEffect(() => {
    const getSearch = async () => {
      await apiRequest(`${API.api_url}search/tv?api_key=${API.api_key}&language=es-ES&page=1&query=${search}&include_adult=false`, setSearchedSerie, setError)
    }
    if (search !== '') getSearch()
  }, [search])

  return (
    <div>
        <SearchBar value={value} setSearch={setSearch} setValue={setValue} placeholder={PLACEHOLDER_SERIES}/>
        <div className='cards'>
            {
              error !== ''
                ? <ErrorPage text={error}/>
                : search === ''
                  ? serie.map((item, index) => {
                    return (
                        <CardComponent item={item} overview={item.overview} rate={item.vote_average} key={index} />
                    )
                  })
                  : searchedSerie.map((item, index) => {
                    return (
                        <CardComponent item={item} overview={item.overview} rate={item.vote_average} key={index} />
                    )
                  })
            }
        </div>
        <PagerComponent value={value} page={page} setValue={setValue} setPage={setPage} totalPages={totalPages}/>
    </div>
  )
}