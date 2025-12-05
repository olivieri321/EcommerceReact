import { useAuthContext } from "../../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Alerta from "../Alerta/Alerta";

const Login = ({accion}) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
        const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
        const CLIENT_USER = import.meta.env.VITE_CLIENT_USER;
        const CLIENT_PASS = import.meta.env.VITE_CLIENT_PASSWORD;

        if (user === ADMIN_USER && password === ADMIN_PASS) {
            login(user, "admin");
            accion();
            navigate("/admin");
            return;
        }

        if (user === CLIENT_USER && password === CLIENT_PASS) {
            login(user, "cliente");
            accion();
            navigate("/");
            return;
        }

        setPassword("");
        setMostrarAlerta(true);
    };
    return (
        <>
            <Alerta show={mostrarAlerta} message="Usuario o contraseña incorrectos" onClose={() => setMostrarAlerta(false)} />

            <div className={styles.loginBackground}>
                <form onSubmit={manejarEnvio} className={styles.formularioLogin}>
                    <h2 className={styles.titulo}>Iniciar sesión</h2>

                    <input value={user} type="text" placeholder="Usuario" onChange={e => setUser(e.target.value)} />
                    <input value={password} type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />

                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </>
    );
};

export default Login;
