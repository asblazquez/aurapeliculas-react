import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, PatataPage } from './Pages/Home'

function App () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Patata' element={<PatataPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
