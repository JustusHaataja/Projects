import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import Watchlist from './pages/Watchlist'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App;
