import { useEffect, useState } from "react";
import { CarritoContext } from "../Carrito/CarritoContext";
import { useContext } from "react";
import styles from "../Productos/Productos.module.css"
import { Link } from "react-router-dom";

const Productos = () => {
const [producto, setProducto] = useState([])
const {agregarAlCarrito} = useContext(CarritoContext)
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

    useEffect(() =>{
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
         .then(datos => setProducto(datos))
         .catch((error) => setError('Error al cargar productos'))
         .finally(()=> setCargando(false))
    },[]);
    if (cargando) return 'Cargando productos...';
    if (error) return error;
    return(
        <>
        <div className={styles.seccionProductos}>
            {producto.map(productoActual => (
                <div className={styles.tarjetaProducto} key={productoActual.id}>
                    <Link to={"/producto/"+productoActual.id}>
                        <h3 className={styles.tituloProducto}>{productoActual.title}</h3>
                        <img src={productoActual.image} className={styles.imagenProducto}></img>
                        <h3>{productoActual.price}$</h3>
                    </Link>
                    <button onClick={() => agregarAlCarrito(productoActual)} className={styles.botonProducto}> Agregar Al Carrito</button>
                </div>
        
        ))}
        </div>
        </>
    )
}
export default Productos;