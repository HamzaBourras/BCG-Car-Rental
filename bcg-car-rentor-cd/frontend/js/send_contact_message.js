import sendData from './functions/sendData.js'
import { CONTACT_MESSAGE } from '../apis/api.js'
import { displayMessageErreurs } from './display_message_erreurs.js'


const form = document.getElementById('contactForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append('nom', document.getElementById('nom').value);
    formData.append('prenom', document.getElementById('prenom').value);
    formData.append('telephone', document.getElementById('telephone').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('messageE').value);


    try {
        await sendData.postData(CONTACT_MESSAGE, formData, "post", null, false);
        if (sendData.success === true) {
            displayMessageErreurs(null, sendData.message, sendData.success)
            form.reset(); // Reset the form after successful submission
        }
    } catch (error) {
        console.error('Error sending message:', error);
        displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }
});

