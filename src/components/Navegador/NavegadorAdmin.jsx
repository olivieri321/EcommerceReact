import { NavLink } from "react-router-dom";
import styles from './Navegador.module.css'


const NavegadorAdmin = () =>{
    return <>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}><NavLink to={"/"} className={({ isActive }) => (isActive ? styles.activo : "inactivo")}>Inicio</NavLink></li>
                    <li className={styles.li}><NavLink to={"/Tienda"} className={({ isActive }) => (isActive ? styles.activo : "inactivo")}>Tienda</NavLink></li>
                    <li className={styles.li}><NavLink to={"/Carrito"} className={({ isActive }) => (isActive ? styles.activo : "inactivo")}>Carrito</NavLink></li>
                    <li className={styles.li}><NavLink to={"/Contacto"} className={({ isActive }) => (isActive ? styles.activo : "inactivo")}>Contacto</NavLink></li>
                    <li className={styles.li}><NavLink to={"/Admin"} className={({ isActive }) => (isActive ? styles.activo : "inactivo")}>Admin</NavLink></li>
                    <li className={styles.li}><NavLink to={"/Logout"} className={({ isActive }) => (isActive ? styles.activo : "inactivo")}>Logout</NavLink></li>
                </ul>
            </nav>
        </>
}

export default NavegadorAdmin;