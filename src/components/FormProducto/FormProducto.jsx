import React, { useState } from 'react';

function FormProducto({ onAgregar }) {
  const [errores, setErrores] = useState({});
  const [producto, setProducto] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
    sol: '', 
    created: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarForm = () => {
    const nuevosErrores = {};
    if (!producto.title.trim()) {
      nuevosErrores.title = "El nombre (title) es obligatorio";
    }
    if (!producto.price || parseFloat(producto.price) <= 0) {
      nuevosErrores.price = "El precio debe ser un número mayor a 0";
    }
    if (!producto.image.trim()) {
      nuevosErrores.image = "La URL de la imagen (image) es obligatoria";
    }
    if (!producto.description.trim()) {
      nuevosErrores.description = "La descripción (description) es obligatoria";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarForm()) {
      return;
    }
    onAgregar(producto);
    setProducto({ 
      title: '', 
      price: '', 
      description: '',
      category: '',
      sol: '', 
      image: '',
      created: Date.now() 
    }); 
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm"> 
      <h2 className="mb-4 text-primary">Agregar Producto</h2> 
      
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Nombre:</label>
        <input
          type="text"
          className={`form-control ${errores.title ? 'is-invalid' : ''}`}
          id="title"
          name="title" 
          value={producto.title} 
          onChange={handleChange} 
          required
        />
        {errores.title && <div className="invalid-feedback">{errores.title}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio:</label>
        <input 
          type="number" 
          className={`form-control ${errores.price ? 'is-invalid' : ''}`}
          id="price"
          name="price" 
          value={producto.price} 
          onChange={handleChange} 
          min="0" 
          step="any" 
          required
        />
        {errores.price && <div className="invalid-feedback">{errores.price}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción:</label>
        <textarea
          className={`form-control ${errores.description ? 'is-invalid' : ''}`}
          id="description"
          name="description"
          value={producto.description} 
          onChange={handleChange}
          rows="3" 
          required
        />
        {errores.description && <div className="invalid-feedback">{errores.description}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Etiquetas (Categoría):</label>
        <input 
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={producto.category} 
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="image" className="form-label">URL Imagen:</label>
        <input
          type="url" 
          className={`form-control ${errores.image ? 'is-invalid' : ''}`}
          id="image"
          name="image" 
          value={producto.image} 
          onChange={handleChange}
          required
        />
        {errores.image && <div className="invalid-feedback">{errores.image}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Agregar Producto
      </button>
    </form>
  );
}

export default FormProducto;