import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { toast } from 'react-toastify'

export function PagerComponent (props) {
  const { value, page, setValue, setPage, totalPages } = props

  const nextPage = () => {
    if (page === totalPages + 1) {
      toast.error(`No hay mas de ${totalPages} páginas`)
      setValue(page)
    } else {
      setPage(page + 1)
      setValue(page + 1)
    }
  }

  const previousPage = () => {
    if (page === 1) {
      toast.error('Ya estas en la primera página')
      setValue(page)
    } else {
      setPage(page - 1)
      setValue(page - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value <= 0) {
      toast.error('El numero de página debe ser superior o igual a 1')
      setValue(page)
    } else if (value > totalPages) {
      toast.error('El numero de página debe ser inferior a ' + totalPages)
      setValue(page)
    } else {
      setPage(parseInt(value))
    }
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <div>
        <div className='grid-3 pager mt-3'>
            <button className='btnPager' type='button' onClick={previousPage} title='Pagina anterior' disabled={page === 1}>
            <AiOutlineArrowLeft className='iconPager'/>
            </button>
            <form onSubmit={handleSubmit}>
            <input className='inputPager' type='number' onChange={handleChange} value={value} placeholder={page}/>
            </form>
            <button className='btnPager' type='button' onClick={nextPage} title='Siguiente pagina' disabled={page === totalPages}>
            <AiOutlineArrowRight className='iconPager'/>
            </button>
        </div>
    </div>

  )
}