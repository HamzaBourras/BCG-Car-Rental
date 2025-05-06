const form = document.querySelector("form");
import { INSCRIRE_API } from "../../apis/api.js";
import sendData from '/frontend/js/functions/sendData.js'

const formData = {
    "nom": "",
    "prenom": "",
    "email": "",
    "telephone": "",
    "adresse": "",
    "password": "",
    "motpasseverif": ""
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    formData.nom = document.querySelector("#nom").value
    formData.prenom = document.querySelector("#prenom").value
    formData.email = document.querySelector("#email").value
    formData.telephone = document.querySelector("#telephone").value
    formData.adresse = document.querySelector("#adresse").value
    formData.password = document.querySelector("#password").value
    formData.motpasseverif = document.querySelector("#confirm-password").value

    try {
        await sendData.postData(INSCRIRE_API, formData, "post", null, false);
        if (sendData.success === true) {
            //affichage message succès
            displayMessage(null, sendData.message);

        }
    } catch (error) {
        // affichage des erreurs du message
        if (sendData.success === false)
            displayMessage(sendData.errors, sendData.message)
    }


});

// **** fonction pour afficher les erreurs et le message
function displayMessage(errors, message) {
    let globC = document.querySelector("#glob")
    let messageC = document.querySelector("#message")
    let errorsC = document.querySelector("#errors")
    let btnC = document.querySelector("#btn button")

    btnC.addEventListener("click", () => {  // ajouter un event au button pour fermer le div global
        globC.style.display = "none";
        if (sendData.success == true) {  // redirection vers la page de connextion s'il n' y a pes d'erreurs
            window.location.href = "../../html/authentification/connexion.html"
        }
    });

    globC.style.display = "flex"
    errorsC.innerHTML = ""
    messageC.textContent = message
    if (sendData.success == true) {  // dans ce cas il n ' y a pas des erreurs on veut juste afficher un message
        btnC.textContent = "continuer"
        btnC.classList.add("success")
    }
    else {
        btnC.textContent = "réssayer"
        btnC.classList.add("danger")
        let content = ``
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                // Pour chaque message d'erreur dans le tableau de cette propriété
                for (const errorMessage of errors[key]) {
                    content += `<li>${errorMessage}</li>`;
                }
            }
        }

        errorsC.innerHTML = content
    }
}
