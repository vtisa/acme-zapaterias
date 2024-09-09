document.addEventListener('DOMContentLoaded', () => {
    // Buscar el formulario en el documento
    const form = document.querySelector('form');
    if (form) {
        // Agregar un event listener para el evento de envío del formulario
        form.addEventListener('submit', async (e) => {
            // Prevenir el comportamiento por defecto del formulario
            e.preventDefault();

            // Crear un objeto FormData con los datos del formulario
            const formData = new FormData(e.target);
            // Convertir FormData a un objeto simple
            const formProps = Object.fromEntries(formData);

            try {
                // Enviar los datos del formulario al servidor
                const response = await fetch('/enviar-contacto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formProps),
                });

                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                // Mostrar mensaje de agradecimiento
                showThankYouMessage();
                // Reiniciar el formulario
                e.target.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
            }
        });
    }
});

// Función para mostrar el mensaje de agradecimiento
function showThankYouMessage() {
    // Crear un elemento div para el overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    // Insertar el HTML del mensaje de agradecimiento
    overlay.innerHTML = `
        <div class="thank-you-message">
            Gracias por contactar a Acme Zapatería. Pronto nos pondremos en contacto contigo.
            <span class="close-button">X</span>
        </div>
    `;
    // Agregar el overlay al body
    document.body.appendChild(overlay);

    // Agregar funcionalidad para cerrar el mensaje
    overlay.querySelector('.close-button').onclick = () => overlay.remove();
    // Remover automáticamente el mensaje después de 3 segundos
    setTimeout(() => overlay.remove(), 2000);
}