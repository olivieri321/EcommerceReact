import Productos from "../Productos/Productos";

const Inicio = ({autorizado}) =>{
    return <>
        <main>
            <div className="separador"></div>
            <h2>Mas Vendidos</h2>
            <div id="listaNovedades">
                <Productos  productosPorFila={16} maxfilas={1} ordenadoPor={"sold"} size={"small"} mode={"scrollable"} autenticado={autorizado}></Productos>
            </div>
            <h2>Novedades</h2>
            <div id="listaNovedades">
                <Productos productosPorFila={16} maxfilas={1} ordenadoPor={"created"} size={"small"} mode={"scrollable"} autenticado={autorizado}></Productos>
            </div>
        </main>
    </>
}

export default Inicio;