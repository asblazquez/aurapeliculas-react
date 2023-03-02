import axios from 'axios'

export async function apiRequest (url, setState, setError, setTotalPages) {
  try {
    const res = await axios.get(url)
    setState(res.data.results)
    setTotalPages(res.data.total_pages)
  } catch (error) {
    setError(error.message)
  }
}