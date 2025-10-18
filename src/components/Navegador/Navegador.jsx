import { Link } from "react-router-dom";
import styles from './Navegador.module.css'


const Navegador = () =>{
    return <>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link to={"/"}>Inicio</Link></li>
                    <li className={styles.li}><Link to={"/Tienda"}>Tienda</Link></li>
                    <li className={styles.li}><Link to={"/Carrito"}>Carrito</Link></li>
                    <li className={styles.li}><Link to={"/Contacto"}>Contacto</Link></li>
                    <li className={styles.li}><Link to={"/login"}>Login</Link></li>
                </ul>
            </nav>
        </>
}

export default Navegador;