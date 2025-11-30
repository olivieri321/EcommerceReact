import { useEffect, useState } from "react";
import { CarritoContext } from "../Carrito/CarritoContext";
import { useContext } from "react";
import styles from "../Productos/Productos.module.css"
import { Link } from "react-router-dom";
import FormEdicion from "../FormProducto/FormEdicion";
import { ProductoContext } from "../Producto/ProductoContext";
import FilaScrollable from "./FilaScrollable";
import RutaProtegida from "../../auth/RutaProtegida";
import { useSearch } from "./SearchContext";

const Productos = ({productosPorFila, maxfilas, ordenadoPor, size, mode, autenticado}) => {
    const { productos, cargarProductos , cargando} = useContext(ProductoContext);
    const { busqueda, setBusqueda } = useSearch();
    const [error, setError] = useState(null);
    const {editarProducto} = useContext(ProductoContext)
    const [productoEditando, setProductoEditando] = useState(null);
    const [paginaActual, setPaginaActual] = useState(0);
    let tamanioMuestra, tamanioTarjeta;
    
    if (size == "small") {
        tamanioMuestra = "col-xxl-2 col-xl-2 col-l-4 col-sm-4 col-xs-4";
        tamanioTarjeta = "tarjetaPequeña"
    }else if (size == "medium") {
        tamanioMuestra = "col-xxl-2 col-xl-2 col-l-4 col-sm-6 col-xs-6" ;
        tamanioTarjeta = "tarjetaMediana";
    }else if (size == "big") {
        tamanioMuestra = "col-xxl-2 col-xl-2 col-l-5 col-sm-5 col-xs-11 wrap";
        tamanioTarjeta = "tarjetaGrande";
    }else{
        tamanioMuestra = "col-xxl-2 col-xl-2 col-l-5 col-sm-5 col-xs-11 wrap";
        tamanioTarjeta = "tarjetaGrande";
    }

    let productosFiltrados = productos.filter((p) =>
        (p.title || p.name || "").toLowerCase().includes(busqueda.toLowerCase())
    );

    if (ordenadoPor) {
        productosFiltrados = [...productosFiltrados].sort((a, b) => {
            const valorA = a[ordenadoPor];
            const valorB = b[ordenadoPor];

            if (typeof valorA === "number") return valorB - valorA;
            if (typeof valorA === "string") return valorB.localeCompare(valorA);
            return 0;
        });
    }

    const filasDeProductos = [];
    for (let i = 0; i < productosFiltrados.length; i += productosPorFila) {
        filasDeProductos.push(productosFiltrados.slice(i, i + productosPorFila));
    }
    
    const totalFilas = filasDeProductos.length;
    const totalPaginas = Math.ceil(totalFilas / maxfilas);
    const indiceInicio = paginaActual * maxfilas;
    const indiceFin = indiceInicio + maxfilas;

    const handleEditarClick = (productoActual) => {
        if (productoEditando?.id === productoActual.id) {
            setProductoEditando(null);
        } else {
            setProductoEditando(productoActual);
        }
        };
    useEffect(() => {
        cargarProductos();
    }, []);
    

    

    const [filasEnPaginaActual, setFilasEnPaginaActual] = useState([]);
    
    useEffect(() => {
    setFilasEnPaginaActual(
        filasDeProductos.slice(indiceInicio, indiceFin)
    );
}, [paginaActual, busqueda, ordenadoPor, productos]);

    const handleAumentarPagina = () =>{
        if (paginaActual < totalPaginas - 1) { 
            setPaginaActual(paginaActual + 1);
        }
    }

    const handleBajarPagina = () =>{
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1)
        }
    }

    
    if (cargando) return <div className={styles.loader}></div>;
    if (error) return error;

    if (mode == "scrollable"){
        return(
            <>
            {productoEditando && (
                <div className={styles.modal}>
                    <FormEdicion 
                        productoSeleccionado={productoEditando}
                        onActualizar={(data) => {
                            editarProducto(data.id, data);
                            setProductoEditando(null); 
                        }}
                        onCancelar={() => setProductoEditando(null)}
                    />
                </div>
            )}
            <div className={ `${styles.seccionProductos} container` }>
            {filasDeProductos.slice(0, maxfilas).map((fila, indexFila) => (
                <FilaScrollable key={`fila-${indexFila}`}>
                    {fila.map(productoActual => (
                        <div className={`${tamanioMuestra} ${styles[tamanioTarjeta]} ${styles["tarjetaProducto"]}`} key={productoActual.id}>
                            <Link to={"/producto/" + productoActual.id}>
                                <img src={productoActual.image} className={styles.imagenProducto} />
                                <h3 className={styles.tituloProducto}>{productoActual.title}</h3>
                            </Link>
                            
                            <div className={styles.tarjetaProductoZonaBotones}>
                                <h3>{productoActual.price}$</h3>
                                <RutaProtegida isAuthenticated={autenticado} accion={"no"}>
                                    <button onClick={() => handleEditarClick(productoActual)} className={styles.botonEditar}>
                                        Editar Producto
                                    </button>
                                </RutaProtegida>
                            </div>
                        </div>
                    ))}
                </FilaScrollable>
            ))}
            </div>
            </>
        )
    }else{
        return(
            <>
            <input
                type="text"
                placeholder="Buscar productos..."
                className={`${styles["barraBusqueda"]} form-control mb-3`}
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value)
                    setPaginaActual(0)
                }}
            />
            {productoEditando && (
                <div className={styles.modal}>
                    <FormEdicion 
                        productoSeleccionado={productoEditando}
                        onActualizar={(data) => {
                            editarProducto(data.id, data);
                            setProductoEditando(null); 
                        }}
                        onCancelar={() => setProductoEditando(null)}
                    />
                </div>
            )}
            
            {filasEnPaginaActual.map((fila, indexFilasActuales) => (
                <div
                    className={`row flex-wrap g-3 ${styles["seccionProductos"]}`}
                    key={`fila-paginada-${indiceInicio + indexFilasActuales}`}
                >
                    {fila.map(productoActual => (
                        <div className={`${tamanioMuestra} ${styles[tamanioTarjeta]} ${styles["tarjetaProducto"]}`} key={productoActual.id}>
                            <Link to={"/producto/" + productoActual.id}>
                                <img src={productoActual.image} className={styles.imagenProducto} />
                                <h3 className={styles.tituloProducto}>{productoActual.title}</h3>
                            </Link>
                            <div className={styles.tarjetaProductoZonaBotones}>
                                <h3>{productoActual.price}$</h3>
                                <RutaProtegida isAuthenticated={autenticado} accion={"no"}>
                                    <button onClick={() => handleEditarClick(productoActual)} className={styles.botonEditar}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </RutaProtegida>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            {totalPaginas > 1 && (
                <div className={styles.paginador}>
                        
                        <button 
                            className={styles.pageButton}
                            onClick={handleBajarPagina}
                            disabled={paginaActual === 0}
                        >
                            <i className="bi bi-chevron-left"></i>
                            <span className={styles.textoBtn}>Anterior</span>
                        </button>

                        <span className={styles.pageInfo}>
                            Página <strong>{paginaActual + 1}</strong> / {totalPaginas}
                        </span>

                        <button 
                            className={styles.pageButton}
                            onClick={handleAumentarPagina}
                            disabled={paginaActual >= totalPaginas - 1}
                        >
                            <span className={styles.textoBtn}>Siguiente</span>
                            <i className="bi bi-chevron-right"></i>
                        </button>

                </div>
            )}
            </>
        )
    }
    
}
export default Productos;