const express = require('express');
const router = express.Router();

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('index', { view: 'inicio' });
});

// Rutas para las demas paginas
router.get('/nosotros', (req, res) => {
    res.render('index', { view: 'nosotros' });
});

router.get('/servicios', (req, res) => {
    res.render('index', { view: 'servicios' });
});

router.get('/catalogo', (req, res) => {
    res.render('index', { view: 'catalogo' });
});

router.get('/contacto', (req, res) => {
    res.render('index', { view: 'contacto' });
});

module.exports = router;