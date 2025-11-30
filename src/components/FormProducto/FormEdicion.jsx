import { useState, useEffect, useContext } from "react";
import styles from "./Form.module.css"
import Alerta from "../Alerta/Alerta.jsx"
import { ProductoContext } from "../Producto/ProductoContext.jsx";

function FormEdicion({ productoSeleccionado, onActualizar , onCancelar }) {
  const {eliminarProducto} = useContext(ProductoContext)
  const [producto, setProducto] = useState(productoSeleccionado || {});
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  useEffect(() => {
    setProducto(productoSeleccionado);
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`https://68d5d321e29051d1c0afa961.mockapi.io/producto/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) {
        throw new Error('Error al actualizar el producto.');
      }
      const data = await respuesta.json();
      onActualizar(data);
      alert('Producto actualizado correctamente.');
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al actualizar el producto.');
    }
  };
  const handleDelete = async (id) =>{
    try{
        const resultado = await eliminarProducto(id);
        if (resultado) {
          setMensajeAlerta("Producto eliminado correctamente")
          onCancelar();
        }else{
          setMensajeAlerta("Error al eliminar producto")
        }
        setEstadoAlerta(true)
    }catch{
      setMensajeAlerta("Error al eliminar producto")
      setEstadoAlerta(true)
    }
  }
  return (
    <>
      <card class={styles.formulario}>
        <form class="card shadow-sm p-4 rounded-3" onSubmit={handleSubmit}>
          <h2>Editar Producto</h2>
          <hr className="my-2 border border-2 border-dark"/>
          <div>
            <label class="form-label">Nombre:</label>
            <input class="form-control"
              type="text"
              name="title"
              value={producto.title || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <hr class="my-2"/>
            <label class="form-label">Precio:</label>
            <input class="form-control"
              type="text"
              name="price"
              value={producto.price || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <hr class="my-2"/>
            <label class="form-label">Descripción:</label>
            <textarea class="form-control"
              type="text"
              name="description"
              value={producto.description || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <hr class="my-2"/>
            <label class="form-label">Etiquetas:</label>
            <textarea class="form-control"
              type="text"
              name="category"
              value={producto.category || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <hr class="my-2"/>
            <label class="form-label">Link imagen:</label>
            <textarea class="form-control"
              type="text"
              name="image"
              value={producto.image || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" onClick={ () => handleDelete(producto.id)} class="btn btn-secondary">Eliminar</button>
            <button type="button" onClick={onCancelar} class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar cambios</button>
          </div>
        </form>
      </card>
      <Alerta show={estadoAlerta} message={mensajeAlerta} onClose={() => setEstadoAlerta(false)} ></Alerta>
    </>
  );
}

export default FormEdicion; 