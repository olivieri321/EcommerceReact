import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login.jsx";
import Carrito from "../Carrito/Carrito.jsx";
import styles from "./Navegador.module.css";

const Navegador = ({ login }) => {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false); 
    const toggleCarrito = () => {
        setMostrarCarrito(prev => !prev);
        if (mostrarLogin) {
            setMostrarLogin(false)
        }
    }
    const toggleLogin   = () => {
        setMostrarLogin(prev => !prev);
        if (mostrarCarrito) {
            setMostrarCarrito(false)
        }
    }
    const toggleMenu    = () => setMenuAbierto(prev => !prev);

    return (
        <>
            <nav className={styles.nav}>
                
                <button 
                    className={`${styles.hamburger} ${menuAbierto ? styles.hamburgerOpen : ""}`} 
                    onClick={toggleMenu}
                >
                    <i className="bi bi-list"></i>
                </button>
                <ul className={`${styles.ul} ${menuAbierto ? styles.menuOpen : ""}`}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.activo : ""}>Inicio</NavLink></li>
                    <li><NavLink to="/Tienda" className={({ isActive }) => isActive ? styles.activo : ""}>Tienda</NavLink></li>
                    <li><NavLink to="/Contacto" className={({ isActive }) => isActive ? styles.activo : ""}>Contacto</NavLink></li>

                    <li style={{ position: "relative" }}>
                        <div className={styles.botonCarrito} onClick={toggleCarrito}>
                            <i className="bi bi-cart"></i>
                        </div>

                        {mostrarCarrito && (
                            <div className={styles.carritoFlotante}>
                                <Carrito />
                            </div>
                        )}
                    </li>

                    <li style={{ position: "relative" }}>
                        <div className={styles.botonLogin} onClick={toggleLogin}>
                            <button className={styles.botonIngresar}>
                                Ingresar <i className="bi bi-box-arrow-in-right"></i>
                            </button>
                        </div>

                        {mostrarLogin && (
                            <div className={styles.loginFlotante}>
                                <Login iniciarSesion={login}></Login>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navegador;
