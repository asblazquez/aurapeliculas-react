import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './Pages/Home'
import { FilmsPage } from './Pages/Films'
import { Series } from './Pages/Series'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ALERT_STYLES } from './Constants'
import { NavBarComponent } from './assets/NavBar'
import { FilmInfoPage } from './Pages/FilmInfo'

function App () {
  return (
    <BrowserRouter>
    <ToastContainer {...ALERT_STYLES}/>
    <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/movies' element={<FilmsPage />} />
        <Route path='/series' element={<Series />} />
        <Route path='/movie/:id' element={<FilmInfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
