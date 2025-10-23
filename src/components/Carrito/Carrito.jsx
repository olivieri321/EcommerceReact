import React, { useContext } from 'react';
import { CarritoContext } from './CarritoContext';
import styles from './Carrito.module.css'
function Carrito() {
 const { carrito, vaciarCarrito, eliminarDelCarrito } = useContext(CarritoContext);
 const total = carrito.reduce((tot, producto) => tot + producto.price * producto.cantidad, 0);
 return (
    <>
        <div className={styles.carrito}>
            <h2>Carrito</h2>
            {carrito.length > 0 ? (
                <ul className={styles.seccionCarrito}>
                    {carrito.map((producto, index) => (
                            <li key={index} className={styles.elementoCarrito}>
                                <img src={producto.image}/>
                                <h2>{producto.title} - ${producto.price} - cantidad: {producto.cantidad}</h2>
                                {carrito.length > 0 && <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>}
                            </li>
                        
                    ))}
                    <div className={styles.seccionTotal}>
                        <h1>Total: ${total.toFixed(2)}</h1>
                        <div className={styles.seccionBotones}>
                            <button  onClick={() => vaciarCarrito()} className={styles.botonVaciarCarrito}>Vaciar Carrito</button>
                            <button  className={styles.botonComprar}>Comprar</button>
                        </div>
                        
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