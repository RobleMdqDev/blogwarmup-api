'use strict'
require('./db');

// Pedidos de paquetes -----------------------
const express = require('express');

const cors = require('cors');

// Declaración del paquete express y recursos
const app = express();

const apiRouter = require('./routes/api')



// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Llamada especifica del paquete-----------------
app.use(cors());
app.use(express.json()); //permite el mapeo de la peticion json a object js 
app.use(express.static('public')); // permite uso de la carpeta con el nombre expresado


// rutas
app.use('/', apiRouter);

// Establecer puerto  ------------------------
const port = process.env.PORT ? process.env.PORT : 8000;
app.listen(port, () => {
    console.log('Aplicación operativa.\nEscuchando el puerto ' + port)
});



