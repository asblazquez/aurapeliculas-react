import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './Pages/Home'
import { FilmsPage } from './Pages/Films'
import { Series } from './Pages/Series'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '2rem',
  // you can also just use 'scale'
  transition: transitions.FADE
}

function App () {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/movies' element={<FilmsPage />} />
        <Route path='/series' element={<Series />} />
      </Routes>
    </BrowserRouter>
    </AlertProvider>

  )
}

export default App
