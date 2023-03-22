
export function SearchBar (props) {
  const { value, setSearch, setValue, placeholder } = props
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(value)
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  return (
        <form className='search mt-3' onSubmit={handleSubmit}>
            <input className='inputSearch pl-1'
            onChange={handleChange}
            placeholder={placeholder} />
            <button className='buttonSearch' onClick={handleSubmit} type={'button'}> Buscar </button>
        </form>)
}
