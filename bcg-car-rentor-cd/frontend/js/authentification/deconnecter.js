import sendData from '../functions/sendData.js'
import { DECONNEXION_API } from "../../apis/api.js"

async function deconnecter() {
    try {
        const user_id = (JSON.parse(localStorage.getItem("userAuth"))).id

        await sendData.postData(DECONNEXION_API, null, "post", user_id, false)

        if (sendData.success == true) {
            // localStorage.removeItem("userAuth");
            // localStorage.removeItem("token");
            localStorage.clear();
            window.history.replaceState(null, null, "/frontend/html/page_accueil.html");
            window.location.href = "/frontend/html/page_accueil.html";
        }


    } catch (error) {
        console.log(error);

    }
}

const deconnecterButton = document.querySelector("#deconnecterBtn")
deconnecterButton.addEventListener("click", async () => {

    await deconnecter()

})

