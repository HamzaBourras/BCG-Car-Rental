// ajouter le code html du div_message_erreurs au body et le css au head
async function init() {
    try {
        const response = await fetch("/frontend/html/div_message_erreurs.html");
        const html = await response.text();

        // Add CSS link (properly formatted as a string)
        document.head.insertAdjacentHTML(
            "beforeend",
            '<link rel="stylesheet" href="../../css/bloc_message.css">'
        );

        // Add HTML content
        document.body.insertAdjacentHTML('beforeend', html);
    } catch (error) {
        console.error("Error loading div message:", error);
        // Even in error case, resolve so calling code continues
        throw error; // Or return if you want to suppress the error
    }
}

// **** fonction pour afficher les erreurs et le message
export async function displayMessageErreurs(errors, message, success) {
    await init()  // appel pour ajouter le div

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
    if (success == true) {  // dans ce cas il n ' y a pas des erreurs on veut juste afficher un message
        btnC.textContent = "fermer"
        btnC.classList.remove("danger")
        btnC.classList.add("success")
    }
    else {
        btnC.textContent = "réssayer"
        btnC.classList.remove("success")
        btnC.classList.add("danger")
        let content = ``
        if (typeof (errors) == "array" || typeof (errors) == "object") {
            for (const key in errors) {

                if (errors.hasOwnProperty(key)) {
                    // Pour chaque message d'erreur dans le tableau de cette propriété
                    for (const errorMessage of errors[key]) {
                        content += `<li>${errorMessage}</li>`;
                    }
                }
            }
        }

        else {
            content = content += `<li>${errors}</li>`;
        }

        errorsC.innerHTML = content

    }
}