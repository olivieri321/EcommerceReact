import { useState } from 'react'
import './App.css'

import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Productos from './components/Productos/Productos.jsx'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Inicio from "./components/Inicio/Inicio.jsx"
import Contacto from "./components/Contacto/Contacto.jsx"
import RutaProtegida from "./auth/RutaProtegida.jsx"
import Admin from './auth/Admin.jsx'
import Carrito from './components/Carrito/Carrito.jsx'
import Logout from './components/Login/Logout.jsx'
import Producto from './components/Producto/Producto.jsx'
import useDocumentTitle from './components/Title/useDocumentTitle.jsx'
import FormProducto from './components/FormProducto/FormProducto.jsx'
import { useContext } from 'react'
import { ProductoContext } from './components/Producto/ProductoContext.jsx'
import { Helmet } from "react-helmet-async";

function App() {
  const [autenticado, setAutenticado] = useState(false)
  const iniciarSesion = () => setAutenticado(true)
  const cerrarSesion = () => setAutenticado(false)
  const { agregarProducto } = useContext(ProductoContext);
  useDocumentTitle("Ecommerce")
  return (
    <>
      <div className='container'>
        <Helmet>
        <title>Ecommerce</title>
        <meta name="description" content="Explora nuestra variedad de productos con la mejor calidad-precio." />
        </Helmet>
      </div>
      <Header autorizado={autenticado} login={iniciarSesion} logout={cerrarSesion}></Header>
      <Routes>
        <Route path={"/"} element={<Inicio autorizado={autenticado} ></Inicio>}/>
        <Route path={"/Contacto"} element={<Contacto/>}/>
        <Route path={"/Tienda"} element={
          <>
          <Productos productosPorFila={4} maxfilas={4} ordenadoPor={null} autenticado={autenticado}></Productos>
        </>}/>
        <Route path={"/producto/:id"} element={<Producto></Producto>}/>
        <Route path={"/Carrito"} element={<Carrito></Carrito>}/>
        <Route path={"/Logout"} element={<Logout onLogout={cerrarSesion}/>}/>
        <Route path={'/admin'} element={
          <RutaProtegida isAuthenticated={autenticado}>
            <Admin></Admin>
            <FormProducto onAgregar={agregarProducto}></FormProducto>
          </RutaProtegida>
        }/>
      </Routes>
      <div className='separadorOrden'></div>
      <Footer></Footer>
      
    </>
  )
}

export default App
