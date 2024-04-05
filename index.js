const express = require('express');
const bodyParser = require('body-parser'); // Importa el body-parser
const app = express();
app.use(bodyParser.json()); // Usa body-parser para analizar el cuerpo de la solicitud como JSON

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

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

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(producto => producto.id !== parseInt(id));
    res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
