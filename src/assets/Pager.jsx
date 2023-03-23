import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { MdFirstPage, MdLastPage } from 'react-icons/md'
import { toast } from 'react-toastify'

export function PagerComponent (props) {
  const { value, page, setValue, setPage, totalPages, localStorageName } = props

  const nextPage = () => {
    if (page === totalPages + 1) {
      toast.error(`No hay mas de ${totalPages} páginas`)
      setValue(page)
    } else {
      setPage(page + 1)
      setValue(page + 1)
      localStorage.setItem(localStorageName, page + 1)
    }
  }

  const previousPage = () => {
    if (page === 1) {
      toast.error('Ya estas en la primera página')
      setValue(page)
    } else {
      setPage(page - 1)
      setValue(page - 1)
      localStorage.setItem(localStorageName, page - 1)
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
      localStorage.setItem(localStorageName, parseInt(value))
    }
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <div>
        <div className='grid-3 pager mt-3'>
            <button className='btnPager' type='button' onClick={() => { setPage(1); setValue(1); localStorage.setItem(localStorageName, 1) }} title='Primera pagina' disabled={page === 1}>
              <MdFirstPage className='iconPager fontSize-xLarge'/>
            </button>
            <button className='btnPager' type='button' onClick={previousPage} title='Pagina anterior' disabled={page === 1}>
              <AiOutlineArrowLeft className='iconPager fontSize-xLarge'/>
            </button>
            <form onSubmit={handleSubmit}>
              <input className='inputPager' type='number' onChange={handleChange} value={value} placeholder={page}/>
            </form>
            <button className='btnPager' type='button' onClick={nextPage} title='Siguiente pagina' disabled={page === totalPages}>
              <AiOutlineArrowRight className='iconPager fontSize-xLarge'/>
            </button>
            <button className='btnPager' type='button' onClick={() => { setPage(totalPages); setValue(totalPages); localStorage.setItem(localStorageName, totalPages) }} title='Ultima pagina' disabled={page === totalPages}>
              <MdLastPage className='iconPager fontSize-xLarge'/>
            </button>
        </div>
    </div>

  )
}