import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <h1>Esta es la home😄</h1>
          <p>Esta par cabesa 😝</p>
          <Link to="/about">About Us🐶</Link>
        </div>
      )
    },
    {
      path: '/about',
      element: (
        <div>
          <h1>Este es el About😄</h1>
          <Link to="/">Home🏠</Link>
        </div>
      )
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
