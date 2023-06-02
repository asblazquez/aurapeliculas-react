import { API } from '../Constants'

export function OverViewComponent (props) {
  const { text, date, generos, producers } = props
  return (
        <div className='overView sombreado'>
            <h2>Argumento</h2>
            <hr />
            <p>{text}</p>
            <br />
            <h2>Fecha de Lnazamiento</h2>
            <hr />
            <p>{date}</p>
            <h2>Generos</h2>
            <hr />
            <div className="space-nowrap">
              {Array.isArray(generos) && generos.map((genero, index) => {
                return (
                  <p id={genero.id} className="textGeneros" key={index}>{genero.name}</p>
                )
              })}
            </div>
            <h2>Productores</h2>
            <hr />
            <div className="space-nowrap">
              {Array.isArray(producers) && producers.map((producer, index) => {
                return producer.logo_path !== null
                  ? <img key={index} alt={producer.name} src={API.api_image_url + producer.logo_path} className='imgProducers'></img>
                  : null
              })}
            </div>
        </div>
  )
}