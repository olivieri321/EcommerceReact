import styles from './Header.module.css'
import Navegador from '../Navegador/Navegador';
import NavegadorAdmin from '../Navegador/NavegadorAdmin';

const Header = ({autorizado, login, logout}) => {
    return <>
        <header className={styles.header}>
            {
                autorizado ?
                <NavegadorAdmin logout={logout}></NavegadorAdmin> :
                <Navegador login={login}></Navegador>
            }
        </header>
    </>
}

export default Header;