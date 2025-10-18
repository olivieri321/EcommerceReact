import React, { useContext } from 'react';
import { CarritoContext } from '../Carrito/CarritoContext';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from "./Producto.module.css"

function Producto() {
    const productoId = useParams().id;
    const [producto, setProducto] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
        useEffect(() =>{
            fetch('https://fakestoreapi.com/products/'+productoId)
            .then(response => response.json())
             .then(datos => setProducto(datos))
             .catch((error) => setError('Error al cargar productos'))
             .finally(()=> setCargando(false))
        },[]);
    const { agregarAlCarrito } = useContext(CarritoContext);
    return (
        <div className={styles.seccionProducto}>
            <img src={producto.image}></img>
            <div key={producto.id}>
                <h2>{producto.title}</h2>
                <p>{producto.description}</p>
                <h3>Categorias</h3>
                <p>{producto.category}</p>
                <h3>Precio</h3>
                <p>${producto.price}</p>
                <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
            </div>
        </div>
    );
}


export default Producto;