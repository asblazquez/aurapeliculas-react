export function OverViewComponent (props) {
  const { text } = props
  return (
        <div className='overView sombreado'>
            <h2>Argumento</h2>
            <hr />
            <p>{text}</p>
        </div>
  )
}