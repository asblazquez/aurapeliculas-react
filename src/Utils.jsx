import axios from 'axios'

export async function apiRequest (url, setState, setError) {
  try {
    const res = await axios.get(url)
    setState(res.data.results)
  } catch (error) {
    setError(error.message)
  }
}