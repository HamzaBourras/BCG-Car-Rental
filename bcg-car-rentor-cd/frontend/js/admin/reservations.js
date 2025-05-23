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


function displayReservationsAdmin(reservations) {
    let tbodyReservations = document.querySelector(".data-table tbody")
    tbodyReservations.innerHTML = '<div class="loading">Chargement des réservations...</div>'

    if (!reservations || reservations.length === 0) {
        tbodyReservations.innerHTML = '<div class="no-reservations">Vous n\'avez pas encore de réservations.</div>';
        return;
    }

    let content2 = ""

    let content = ""
    let index = 1
    reservations.forEach(reservation => {
        content2 = ""

        // buttons pour confirmer ou annuler la reservation
        if (reservation.statut == null) {
            content2 = `
                <td class="action-buttons">
                    <button class="confirm-btn">Confirmer</button>
                    <button class="delete-btn">Annuler</button>
                </td>
            `
        }
        // button pour marquer la réservation payé
        else if (reservation.statut == 1 && reservation.statut_paiement == 0) {
            content2 = `
                <td class="action-buttons">
                    <button class="confirm-btn" title="Marquer la réservation payée" >Payer</button>
                </td>
            `
        }
        else if (reservation.statut == 0) {
            content2 = `
                <td class="reservation-status refused">
                    <div class="status-text" title="La réservation est refusée">Refusée</div>
                </td>
            `
        }
        if (reservation.statut_paiement == 1) {
            content2 = `<td class="paiement" >
                <span class="statusPaiement status-paid" title="La réservation est payée" >Payée</span>
            </td>`
        }


        content += `
            <tr data-id="1001">
								<td>${index++}</td>
								<td>${reservation.nom_client} ${reservation.prenom_client} </td>
								<td>${reservation.voiture_matricule}</td>
								<td>${reservation.date_debut}</td>
								<td>${reservation.date_fin}</td>
								<td>${reservation.prix_total} DH</td>
								${content2}
							</tr>
        `
    });


    tbodyReservations.innerHTML = content

}


// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
    //vérifer si les voitures ne sont pas déja récupérer
    // if (!localStorage.getItem("reservations")) {
    getReservations();
    // }

    const checkData = setInterval(() => {
        const reservations = JSON.parse(localStorage.getItem("reservations")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /admin/reservations.js
        if (reservations) {
            clearInterval(checkData);
            displayReservationsAdmin(reservations);
        }
    }, 10); // Vérifie toutes les 10ms
});