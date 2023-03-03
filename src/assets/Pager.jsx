import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { useAlert } from 'react-alert'

export function PagerComponent (props) {
  const alert = useAlert()

  const nextPage = () => {
    if (page === totalPages) {
      alert.error('No hay mas paginas')
    } else {
      setPage(page + 1)
      setValue(page + 1)
    }
  }

  const previousPage = () => {
    if (page === 1) {
      alert.error('Ya estas en la primera pagina')
    } else {
      setPage(page - 1)
      setValue(page - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value <= 0 || value >= totalPages) {
      alert.error('No existe esa pagina')
    } else {
      setPage(parseInt(value))
    }
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const { value, page, setValue, setPage, totalPages } = props

  return (
    <div>
        <div className='grid-3 pager mt-3'>
            <button className='btnPager' type='button' onClick={previousPage} title='Pagina anterior'>
            <AiOutlineArrowLeft className='iconPager'/>
            </button>
            <form onSubmit={handleSubmit}>
            <input className='inputPager' type='number' onChange={handleChange} value={value} placeholder={page}/>
            </form>
            <button className='btnPager' type='button' onClick={nextPage} title='Siguiente pagina'>
            <AiOutlineArrowRight className='iconPager'/>
            </button>
        </div>
    </div>

  )
}