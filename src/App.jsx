import './App.css'
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Productos from './components/Productos/Productos.jsx'
import { Routes, Route } from 'react-router-dom'
import Inicio from "./components/Inicio/Inicio.jsx"
import Contacto from "./components/Contacto/Contacto.jsx"
import RutaProtegida from "./auth/RutaProtegida.jsx"
import Admin from './auth/Admin.jsx'
import Carrito from './components/Carrito/Carrito.jsx'
import Logout from './components/Login/Logout.jsx'
import Producto from './components/Producto/Producto.jsx'
import FormProducto from './components/FormProducto/FormProducto.jsx'
import { useContext } from 'react'
import { ProductoContext } from './components/Producto/ProductoContext.jsx'
import { Helmet } from "react-helmet-async";
import { useAuthContext } from "./auth/AuthContext"
import { useSearch } from './components/Productos/SearchContext.jsx'

function App() {

  const { rol, logout } = useAuthContext();
  const { agregarProducto } = useContext(ProductoContext);
  return (
    <>
      <div className='container'>
        <Helmet>
          <title>Ecommerce</title>
          <meta name="description" content="Explora nuestros productos." />
        </Helmet>
      </div>

      <Header logout={logout} />


      <Routes>

        <Route path="/" element={
          <Inicio autorizado={rol && rol === "admin"} />
          } />
        <Route path="/Contacto" element={<Contacto />} />

        <Route 
          path="/Tienda" 
          element={<Productos productosPorFila={4} maxfilas={4} ordenadoPor={null} autenticado={rol && (rol === "admin")} />} 
        />

        <Route 
          path="/producto/:id" 
          element={<Producto autenticado={rol && rol === "admin"} />} 
        />

        <Route path="/Carrito" element={<Carrito />} />

        <Route 
          path="/Logout" 
          element={<Logout onLogout={logout} />} 
        />

        <Route 
          path="/admin"
          element={
            <RutaProtegida isAuthenticated={rol && rol === "admin"}>
              <Admin />
              <FormProducto onAgregar={agregarProducto} />
            </RutaProtegida>
          }
        />
      </Routes>

      <div className='separadorOrden'></div>
      <Footer />

    </>
  );
}

export default App;
