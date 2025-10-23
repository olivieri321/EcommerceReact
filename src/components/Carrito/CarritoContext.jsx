import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const agregarAlCarrito = (producto) => {
        setCarrito(antCarrito => {
            const productoExistente = antCarrito.find(item => item.id === producto.id);
            if (productoExistente) {
                return antCarrito.map(item => item.id === producto.id
                    ? {...item, cantidad:item.cantidad + 1}
                    :item
                );
            }else{
                return [...antCarrito, {...producto, cantidad: 1}]
            }
        });
    };
    const eliminarDelCarrito = (id) => {
        setCarrito(prevCarrito => prevCarrito .map(item => item.id === id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
            .filter(item => item.cantidad > 0)
        );
        };
    const vaciarCarrito = () => {
        setCarrito([]);
    };
    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, eliminarDelCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}