import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import App from './App.tsx'
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
)
