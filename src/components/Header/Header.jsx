import styles from './Header.module.css'
import Navegador from '../Navegador/Navegador';
import NavegadorAdmin from '../Navegador/NavegadorAdmin';

const Header = ({autorizado}) => {
    return <>
        <header className={styles.header}>
            <div className={styles.logo}>logo</div>
            {
                autorizado ?
                <NavegadorAdmin></NavegadorAdmin> :
                <Navegador></Navegador>
            }
        </header>
    </>
}

export default Header;