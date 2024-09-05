const express = require('express');
const path = require('path');
const rutas = require('./routes/rutas');
const app = express();

// Configuración de la vista
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Carpeta pública para css,js e imagenes 
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas
app.use('/', rutas);

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});