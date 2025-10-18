import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import { CarritoProvider } from './components/Carrito/CarritoContext.jsx'

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>
);
