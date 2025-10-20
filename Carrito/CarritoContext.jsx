import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };
    const eliminarDelCarrito = (indiceAEliminar) => {
        setCarrito(carrito.filter((_, indice) => indice != indiceAEliminar))
    }
    const vaciarCarrito = () => {
        setCarrito([]);
    };
    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, eliminarDelCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}