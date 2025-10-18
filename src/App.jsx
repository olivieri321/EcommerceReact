import { useState } from 'react'
import './App.css'
import Navegador from "./components/Navegador/Navegador.jsx"
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
import Login from './components/Login/Login.jsx'
import NavegadorAdmin from './components/Navegador/NavegadorAdmin.jsx'
import Logout from './components/Login/Logout.jsx'
import Producto from './components/Producto/Producto.jsx'

function App() {
  const [autenticado, setAutenticado] = useState(false)
  const iniciarSesion = () => setAutenticado(true)
  const cerrarSesion = () => setAutenticado(false)

  return (
    <>
      <Header autorizado={autenticado}></Header>
      <Routes>
        <Route path={"/"} element={<Inicio></Inicio>}/>
        <Route path={"/Contacto"} element={<Contacto/>}/>
        <Route path={"/Tienda"} element={<Productos></Productos>}/>
        <Route path={"/producto/:id"} element={<Producto></Producto>}/>
        <Route path={"/Carrito"} element={<Carrito></Carrito>}/>
        <Route path={"/Logout"} element={<Logout onLogout={cerrarSesion}/>}/>
        <Route 
          path={"/Login"} 
          element={<Login iniciarSesion={iniciarSesion} />}
        />
        <Route path={'/admin'} element={
          <RutaProtegida isAuthenticated={autenticado}>
            <Admin></Admin>
          </RutaProtegida>
        }/>
      </Routes>
      <div className='separadorOrden'></div>
      <Footer></Footer>
    </>
  )
}

export default App
