
export function SearchBar (props) {
  const { value, setSearch, setValue } = props
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(value)
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  return (
        <form className='search' onSubmit={handleSubmit}>
            <input className='inputSearch'
            onChange={handleChange}
            placeholder='  House, Vikings, Brooklyn 99, Last Kingdom...' />
            <button className='buttonSearch' onClick={handleSubmit}> Buscar </button>
        </form>)
}
