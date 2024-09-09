const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuración del transporter para enviar correos
let transporter;
try {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "isai.trauco69@gmail.com", 
            pass: "jjtx nktj nqgw chho" 
        }
    });
} catch (error) {
    console.error('Error al crear el transporter:', error);
}

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('index', { view: 'inicio' });
});

// Rutas para las demás páginas
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

// Ruta para manejar el envío del formulario
router.post('/enviar-contacto', async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).send('Faltan campos requeridos');
        }

        const fechaHora = new Date();
        const fecha = fechaHora.toLocaleDateString('es-ES');
        const hora = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        const mailOptions = {
            from: '"Acme Zapatería" <isai.trauco69@gmail.com>',
            to: "isai.valqui@tecsup.edu.pe",
            // cc: "ravalosr@gmail.com", 
            replyTo: email, 
            subject: "Nueva solicitud de contacto",
            text: `
                Nombre: ${nombre}
                Email: ${email}
                Fecha: ${fecha}
                Hora: ${hora}
                Mensaje: ${mensaje}

            `                
        };

        await transporter.sendMail(mailOptions);

        // Imprimir en consola el formato JSON
        console.log(JSON.stringify({
            desde: mailOptions.from,
            para: mailOptions.to,
            cc: mailOptions.cc || "No especificado",
            cuerpo: mailOptions.text
                .replace(/\s+/g, ' ') // Reemplaza múltiples espacios por un solo espacio
                .trim() // Elimina los espacios al inicio y final
        }, null, 2));
                

        res.status(200).send('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
});

module.exports = router;