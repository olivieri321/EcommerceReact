import { useAuthContext } from "../../auth/AuthContext";
import styles from "../Header/Header.module.css"
import Navegador from "../Navegador/Navegador.jsx"
import NavegadorAdmin from "../Navegador/NavegadorAdmin.jsx"

const Header = () => {
    const { usuario, logout } = useAuthContext();

    return (
        <header className={styles.header}>
            {usuario?.rol === "admin" ? (
                <NavegadorAdmin logout={logout} />
            ) : (
                <Navegador logout={logout}/>
            )}
        </header>
    );
};

export default Header;
