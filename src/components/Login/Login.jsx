import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import Alerta from "../Alerta/Alerta.jsx";

const Login = ({ iniciarSesion }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const navigate = useNavigate();

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        const USUARIO_CORRECTO = import.meta.env.VITE_ADMIN_USER;
        const CONTRASENA_CORRECTA = import.meta.env.VITE_ADMIN_PASSWORD;

        if (user === USUARIO_CORRECTO && password === CONTRASENA_CORRECTA) {
            iniciarSesion();
            navigate("/admin", { replace: true });
        } else {
            setPassword("");
            setMostrarAlerta(true);
        }
    };

    return (
        <>
            <Alerta
                show={mostrarAlerta}
                message="Contraseña o usuario incorrecto"
                onClose={() => setMostrarAlerta(false)}
            />

            <div className={styles.loginBackground}>
                <form onSubmit={manejarEnvio} className={styles.formularioLogin}>
                    <h2 className={styles.titulo}>Iniciar sesión</h2>

                    <input
                        value={user}
                        type="text"
                        placeholder="Usuario"
                        onChange={e => setUser(e.target.value)}
                    />

                    <input
                        value={password}
                        type="password"
                        placeholder="Contraseña"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </>
    );
};

export default Login;
