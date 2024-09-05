document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const message = document.createElement('div');
        message.className = 'thank-you-message';
        message.textContent = 'Gracias, pronto nos pondremos en contacto contigo.';

        const closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        closeButton.onclick = () => overlay.remove();

        message.appendChild(closeButton);
        overlay.appendChild(message);
        document.body.appendChild(overlay);

        e.target.reset();

        setTimeout(() => overlay.remove(), 3000);
    });
});
