import { Link } from 'react-router-dom'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export function NavBarComponent () {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div>
          <Link className={'logo'} to='/'>AuraPeliculas</Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <GiHamburgerMenu className='text-white'/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <Link to="/movies">Peliculas</Link>
            </li>
            <li>
              <Link to="/series">Series</Link>
            </li>
            <li>
              <Link to="/actors">Actores</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}