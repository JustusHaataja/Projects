import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          {/* <Route path="/cart" element={<cartPage />} /> */}
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
