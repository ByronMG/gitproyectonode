const express = require('express');
const app = express();

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
  ];

//METODO GET
app.get('/productos', (req, res) => {
res.json(productos);
});

//METODO POST
app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

//METODO PUT
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const index = productos.findIndex(producto => producto.id === parseInt(id));
  if (index !== -1) {
      productos[index] = { id: parseInt(id), nombre, precio };
      res.json(productos[index]);
  } else {
      res.status(404).send('Producto no encontrado');
  }
});

//METODO DELETE
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  productos = productos.filter(producto => producto.id !== parseInt(id));
  res.sendStatus(204);
});

//ESCUCHAR PUERTO
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});


