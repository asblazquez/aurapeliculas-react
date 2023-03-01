import { Link } from 'react-router-dom'

export function HomePage () {
    return (
        <div>
        <Link to='/movies'>Ir a Peliculas</Link>
        <br />
        <Link to='/series'>Ir a Series</Link>
    </div>
    )
}

export function PatataPage () {
    return (
        <h1>🥔</h1>
    )
}