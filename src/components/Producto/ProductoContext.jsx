import React, { useContext } from 'react';
import { createContext, useState } from 'react';

export const ProductoContext = useState();
function ProductoProvider({ children }) {
 const { agregarAlCarrito } = useContext(CarritoContext);
    return (
        <ProductoContext.Provider value ={{eliminarProducto, agregarProducto, productos}}>
            {children}
        </ProductoContext.Provider>
    );
}


export default Producto;