import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProductoProvider } from './components/Producto/ProductoContext.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import { CarritoProvider } from './components/Carrito/CarritoContext.jsx'
import { SearchProvider } from './components/Productos/SearchContext.jsx'

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
      <SearchProvider>
        <BrowserRouter>
          <CarritoProvider>
            <ProductoProvider>
              <App />
            </ProductoProvider>
          </CarritoProvider>
        </BrowserRouter>
       </SearchProvider>
    </StrictMode>
 
);
