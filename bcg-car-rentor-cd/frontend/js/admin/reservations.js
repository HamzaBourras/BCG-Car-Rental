import getData from "../functions/getData.js";
import { ADMIN_INDEX_RESERVATIONS } from "../../apis/api.js";
import { displayMessageErreurs } from "../display_message_erreurs.js";

// fct pour recevoir les reservations du client
export async function getReservations() {
    try {
        await getData.getD(ADMIN_INDEX_RESERVATIONS);
        if (getData.success == true) {
            localStorage.setItem("reservations", JSON.stringify(getData.returnData)) // Enregistrer les voitures dans localStorage
            return getData.returnData
        }
    } catch (err) {
        if (getData.success == false) {
            displayMessageErreurs(getData.errors, getData.message, getData.success)
        }
    }
}


// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
    //vérifer si les voitures ne sont pas déja récupérer
    if (!localStorage.getItem("reservations")) {
        getReservations();
    }
});