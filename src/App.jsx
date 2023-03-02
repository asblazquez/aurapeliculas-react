import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, PatataPage } from './Pages/Home'
import { FilmsPage } from './Pages/Films'
import { Series } from './Pages/Series'

function App () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Patata' element={<PatataPage/>} />
      <Route path='/movies' element={<FilmsPage />} />
      <Route path='/series' element={<Series />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
