import { useState } from "react";

const Formulario = () => {
    const [nombre, setNombre] = useState("");

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        alert("Enviaste el form");
    };

    return (
        <form onSubmit={manejarEnvio}>
            <input
                value={nombre}
                type="text"
                onChange={evento => setNombre(evento.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;