const form = document.querySelector("form");
import { CONNEXION_API } from "../../apis/api.js";
import sendData from '/frontend/js/functions/sendData.js'


const formData = {
    "email": "",
    "password": "",
}


form.addEventListener("submit", async function (e) {
    e.preventDefault();

    formData.email = document.querySelector("#email").value
    formData.password = document.querySelector("#password").value

    try {
        await sendData.postData(CONNEXION_API, formData, "post", null, false);
        if (sendData.success === true) {
            //affichage message succès
            // displayMessage(null, sendData.message);

            //stocker le token et le user
            localStorage.setItem("token", JSON.stringify(sendData.token))
            localStorage.setItem("userAuth", JSON.stringify(sendData.returnData))

            //rediriger vers le dashboard selen le role de l'utilisateur
            const userRole = sendData.returnData.role
            if (userRole == "admin") {
                window.location.href = "../../html/admin/dashboard.html"
            } else if (userRole == "client") {
                window.location.href = "../../html/client/dashboard.html"
            }

        }

    } catch (error) {
        // affichage des erreurs du message
        if (sendData.success === false) displayMessage(sendData.errors, sendData.message)

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
        if (typeof errors === 'string') {
            content += `<li>${errors}</li>`;  // dans ce cas il y a un seule erreur le mot de passe ou email est incorrect
        }
        else {
            // dans le cas des errerus de validation
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    // Pour chaque message d'erreur dans le tableau de cette propriété
                    for (const errorMessage of errors[key]) {
                        content += `<li>${errorMessage}</li>`;
                    }
                }
            }
        }

        errorsC.innerHTML = content
    }
}