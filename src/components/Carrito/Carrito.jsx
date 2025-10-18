import React, { useContext } from 'react';
import { CarritoContext } from './CarritoContext';
import styles from './Carrito.module.css'
function Carrito() {
 const { carrito, vaciarCarrito, eliminarDelCarrito } = useContext(CarritoContext);
 return (
    <>
        <div className={styles.carrito}>
            <h2>Carrito</h2>
            {carrito.length > 0 ? (
                <ul className={styles.seccionCarrito}>
                    {carrito.map((producto, index) => (
                            <li key={index} className={styles.elementoCarrito}>
                                <img src={producto.image}/>
                                <h2>{producto.title} - ${producto.price}</h2>
                                {carrito.length > 0 && <button onClick={() => eliminarDelCarrito(index)}>Eliminar</button>}
                            </li>
                        
                    ))}
                    <div className={styles.seccionTotal}>
                        <h1>Total: </h1>
                        <button onClick={() => vaciarCarrito} className={styles.botonVaciarCarrito}>Vaciar Carrito</button>
                    </div>
                </ul>
                
            ) : (
                <p>El carrito está vacío.</p>
            )}
            
            
        </div>
        
    </>
    );
}
export default Carrito;