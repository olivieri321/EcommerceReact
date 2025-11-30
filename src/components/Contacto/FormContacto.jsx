import { useState } from "react";
import styles from "./Form.module.css"
import Alerta from "../Alerta/Alerta";

const FormContacto = () => {

    const [formularioCompleto, setFormularioCompleto] = useState({
        title: '',
        email: '',
        description: '', 
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormularioCompleto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch(`https://68d5d321e29051d1c0afa961.mockapi.io/ContactForms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formularioCompleto),
            });
            
            if (!respuesta.ok) {
                throw new Error('Error al enviar el formulario de contacto.');
            }
            
            setFormularioCompleto({
                title: '',
                email: '',
                description: '',
            });
            
            alert('Formulario de contacto enviado correctamente.');
            
        } catch (error) {
            console.error("Error en el POST:", error.message);
            alert('Hubo un problema al enviar el formulario. Intenta de nuevo.');
        }
    };
    

return (
    <>
        <Alerta></Alerta>
        <card className={styles.formulario}>
            <form className="card shadow-sm p-4 rounded-3" onSubmit={handleSubmit}>
                <h2>Formulario de Contacto</h2>
                <hr className="my-2 border border-2 border-dark"/>
                
                <div>
                    <label className="form-label">Nombre:</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="title" 
                        value={formularioCompleto.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <hr className="my-2"/>
                    <label className="form-label">Email:</label>
                    <input 
                        className="form-control"
                        type="email" 
                        name="email" 
                        value={formularioCompleto.email} 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div>
                    <hr className="my-2"/>
                    <label className="form-label">Mensaje:</label>
                    <textarea 
                        className="form-control"
                        name="description" 
                        value={formularioCompleto.description} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
                </div>
            </form>
        </card>
    </>
)}

export default FormContacto