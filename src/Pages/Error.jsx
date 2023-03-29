export function ErrorPage (props) {
  const { text } = props
  return (
        <div>
          <h1 className="textError">{text}</h1>
          <div className="m-auto fit-content">
            <img className="sombreado br-5" src="https://media.tenor.com/MYZgsN2TDJAAAAAC/this-is.gif" alt="ErrorGif" />
          </div>
        </div>
  )
}