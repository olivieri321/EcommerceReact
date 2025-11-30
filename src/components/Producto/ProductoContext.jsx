import React, { createContext, useState } from 'react';

export const ProductoContext = createContext(null);

export const ProductoProvider = ({ children }) => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarProductos = async () => {
        try {
            const resp = await fetch(
                'https://68d5d321e29051d1c0afa961.mockapi.io/producto'
            );
            const data = await resp.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar productos", error);
        } finally{
            setCargando(false);
        }
    };

    const cargarProducto = async (id) => {
        try {
            const resp = await fetch(
                "https://68d5d321e29051d1c0afa961.mockapi.io/producto/"+id
            );
            const data = await resp.json();
            return data;
        } catch (error) {
            console.error("Error al cargar productos", error);
            return null
        } finally{
            setCargando(false);
        }
    };


    const postProducto = async (producto) => {
        try {
            const respuesta = await fetch(
                'https://68d5d321e29051d1c0afa961.mockapi.io/producto',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(producto),
                }
            );

            if (!respuesta.ok) throw new Error('Error al agregar el producto.');

            const data = await respuesta.json();
            alert('Producto agregado correctamente');
            cargarProductos();
            return data;

        } catch (error) {
            console.error(error);
            alert('Hubo un problema al agregar el producto.');
            throw error;
        }
    };

    const editarProducto = async (id, productoActualizado) => {
        try {
            const respuesta = await fetch(
                `https://68d5d321e29051d1c0afa961.mockapi.io/producto/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productoActualizado),
                }
            );

            if (!respuesta.ok)
                throw new Error(`Error al editar producto ${id}`);

            const data = await respuesta.json();
            alert('Producto editado correctamente');
            cargarProductos();
            return data;

        } catch (error) {
            console.error(error);
            alert('Hubo un problema al editar el producto.');
            throw error;
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const respuesta = await fetch(
                `https://68d5d321e29051d1c0afa961.mockapi.io/producto/${id}`,
                { method: 'DELETE' }
            );

            if (!respuesta.ok) throw new Error('Error al eliminar');

            cargarProductos();
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const contextValue = {
        productos,
        cargando,
        cargarProductos,
        agregarProducto: postProducto,
        editarProducto,
        eliminarProducto,
        cargarProducto,
    };

    return (
        <ProductoContext.Provider value={contextValue}>
            {children}
        </ProductoContext.Provider>
    );
};
