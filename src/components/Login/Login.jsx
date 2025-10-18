import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "../Login/Login.module.css"

const Login = ({ iniciarSesion }) =>{
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        const USUARIO_CORRECTO = "admin";
        const CONTRASENA_CORRECTA = "1234";
        if (user === USUARIO_CORRECTO && password === CONTRASENA_CORRECTA) {
            iniciarSesion(); 
             navigate("/admin", { replace: true });
        }else {
            alert("Usuario o contraseña incorrectos");
            setPassword("");
             }
    };

    return (
        <div className={styles.seccionLogin}>
        <form onSubmit={manejarEnvio} className={styles.formularioLogin}>
            <h3>Usuario</h3>
            <input
                value={user}
                type="text"
                onChange={evento => setUser(evento.target.value)}
            />
            <h3>Contraseña</h3>
            <input
                value={password}
                type="text"
                onChange={evento => setPassword(evento.target.value)}
            />
            <br></br>
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;