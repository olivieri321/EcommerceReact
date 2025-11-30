
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <div className="container text-center py-4">

                    <h3 className={styles.titulo}>Facundo Olivieri</h3>

                    <div className={styles.socials}>
                        <a href="https://github.com/olivieri321" className={styles.icon}><i className="bi bi-github"></i></a>
                        <a href="https://www.linkedin.com/in/facundo-olivieri-510987250/" className={styles.icon}><i className="bi bi-linkedin"></i></a>
                        <a href="#" className={styles.icon}><i className="bi bi-instagram"></i></a>
                    </div>

                    <p className="mt-3 mb-0 text-muted">
                        © {new Date().getFullYear()} — Todos los derechos reservados
                    </p>

                </div>
            </footer>
        </>
    );
};

export default Footer;

