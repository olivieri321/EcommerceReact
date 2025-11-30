import React, { useContext, useState, useEffect } from 'react';
import { CarritoContext } from '../Carrito/CarritoContext';
import { useParams } from 'react-router-dom';
import styles from "./Producto.module.css";

function Producto() {
    const { id: productoId } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const { agregarAlCarrito } = useContext(CarritoContext);

    useEffect(() => {
        fetch(`https://68d5d321e29051d1c0afa961.mockapi.io/producto/${productoId}`)
            .then((response) => response.json())
            .then((datos) => setProducto(datos))
            .catch(() => setError("Error al cargar producto"))
            .finally(() => setCargando(false));
    }, [productoId]);

    if (cargando) return <h3>Cargando producto...</h3>;
    if (error) return <h3>{error}</h3>;
    if (!producto) return <h3>No se encontró el producto</h3>;

    return (
        <div className={`container mt-5 mb-5 ${styles.productoWrapper}`}>
            <div className="row g-4">

                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <img src={producto.image} className={`${styles.imagenProducto} img-fluid`} alt="" />
                </div>

                <div className="col-12 col-md-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-3 border-bottom pb-2">{producto.title}</h2>

                        <p className="text-muted">{producto.description}</p>

                        <h5 className="mt-4">Categorías</h5>
                        <span className="badge bg-secondary mb-3">{producto.category}</span>

                        <h3 className="text-success">${producto.price}</h3>

                        <button 
                            className="btn btn-primary mt-3 w-100"
                            onClick={() => agregarAlCarrito(producto)}
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Producto;
