import { getReservations } from "./get_reservations.js";
import sendData from "../functions/sendData.js";
import { ADMIN_DESTROY_RESERVATIONS, ADMIN_EDIT_PAIEMENT_RESERVATIONS, ADMIN_EDIT_STATUT_RESERVATIONS } from "../../apis/api.js";
import { displayMessageErreurs } from "../display_message_erreurs.js";

let reservation_id_S = null // l'id de la reservation à supprimer
let reservation_id_M = null // l'id de la reservation à modifier

function displayReservationsAdmin(reservations) {

    let tbodyReservations = document.querySelector(".data-table tbody")
    tbodyReservations.innerHTML = '<div class="loading">Chargement des réservations...</div>'

    if (!reservations || reservations.length === 0) {
        tbodyReservations.innerHTML = '<div class="no-reservations">Vous n\'avez pas encore de réservations.</div>';
        return;
    }

    let content2 = ""

    let content = ""
    let expiree = ""
    let index = 1
    reservations.forEach(reservation => {
        content2 = ""
        expiree = ""
        if (reservation.expiree == true) {
            expiree = `<p class="expiree">Expirée</p>`
            content2 = `
            <td class="action-buttons">
                        <button data-reservation-id="${reservation.id}" class="delete-btn" id="supprimerBtnR">Supprimer</button>
                    </td>
            `}
        else {
            // buttons pour confirmer ou annuler la reservation
            if (reservation.statut == null) {
                content2 = `
                    <td class="action-buttons">
                        <button data-reservation-id="${reservation.id}" class="confirm-btn" id="confirmerBtnR" >Confirmer</button>
                        <button data-reservation-id="${reservation.id}" class="delete-btn" id="annulerBtnR" >Annuler</button>
                    </td>
                `
            }
            // button pour marquer la réservation payé
            else if (reservation.statut == 1 && reservation.statut_paiement == 0) {
                content2 = `
                    <td class="action-buttons">
                        <button data-reservation-id="${reservation.id}" class="confirm-btn" id="payerBtnR" title="Marquer la réservation payée" >Payer</button>
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
        }



        content += `
            <tr data-id="1001">
								<td>${index++} ${expiree} </td>
								<td>${reservation.nom_client} ${reservation.prenom_client} </td>
								<td>${reservation.voiture_matricule}</td>
								<td>${reservation.adresse_livraison}</td>
								<td>${reservation.date_debut}</td>
								<td>${reservation.date_fin}</td>
								<td>${reservation.prix_total} DH</td>
								${content2}
							</tr>
        `
    });


    tbodyReservations.innerHTML = content

    setupEventListeners(); // Configuration des écouteurs d'événements sur les boutons de confirmation et d'annulation

}

// **** Configuration des écouteurs d'événements sur les boutons de confirmation et d'annulation
function setupEventListeners() {
    document.querySelectorAll('#supprimerBtnR').forEach(btn => {
        btn.addEventListener('click', function () {
            reservation_id_S = this.getAttribute('data-reservation-id');
            // demande la confirmation de l'admin
            const conf = confirm("voulez vous supprimer cette reservation ?")
            if (conf) {
                // Appeler la fonction de suppression
                supprimerReservation(reservation_id_S)
            }
        });
    });

    document.querySelectorAll('#confirmerBtnR').forEach(btn => {
        btn.addEventListener('click', function () {
            reservation_id_M = this.getAttribute('data-reservation-id');
            const conf = confirm("Voulez-vous confirmer cette réservation ?")
            if (conf) {
                // Appeler la fonction pour confirmer la réservation
                editStatutReservation(reservation_id_M, 1) // 1 pour confirmer la réservation
            }
        });
    });
    document.querySelectorAll('#annulerBtnR').forEach(btn => {
        btn.addEventListener('click', function () {
            reservation_id_M = this.getAttribute('data-reservation-id');
            const conf = confirm("Voulez-vous annuler cette réservation ?")
            if (conf) {
                // Appeler la fonction pour confirmer la réservation
                editStatutReservation(reservation_id_M, 0) // 0 pour annuler la réservation
            }
        });
    });

    document.querySelectorAll('#payerBtnR').forEach(btn => {
        btn.addEventListener('click', function () {
            reservation_id_M = this.getAttribute('data-reservation-id');
            const conf = confirm("Voulez-vous marquer cette réservation payée ?")
            if (conf) {
                // Appeler la fonction pour confirmer la réservation
                editPaiementReservation(reservation_id_M) // 1 pour confirmer la réservation
            }
        });
    });


}

// **** fct pour supprimer une reservation
async function supprimerReservation(reservation_id) {
    try {
        await sendData.postData(ADMIN_DESTROY_RESERVATIONS, null, "delete", reservation_id, false)
        if (sendData.success === true) {
            //affichage message succès
            displayMessageErreurs(null, sendData.message, sendData.success);
            const reservations = await getReservations()
            displayReservationsAdmin(reservations);

        }
    } catch (error) {

        // affichage des erreurs du message
        if (sendData.success === false)
            displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }
}

// **** fct pour modifier le statut de la reservation
async function editStatutReservation(reservation_id, statut) {
    const formData = new FormData();
    formData.append("statut", statut);
    try {
        await sendData.postData(ADMIN_EDIT_STATUT_RESERVATIONS, formData, "put", reservation_id, false)
        if (sendData.success === true) {
            //affichage message succès
            displayMessageErreurs(null, sendData.message, sendData.success);
            const reservations = await getReservations()
            displayReservationsAdmin(reservations);
        }
    } catch (error) {
        console.log(error);

        // affichage des erreurs du message
        if (sendData.success === false)
            displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }
}

// **** fct pour modifier le statut de paiement de la reservation
async function editPaiementReservation(reservation_id) {
    try {
        await sendData.postData(ADMIN_EDIT_PAIEMENT_RESERVATIONS, null, "put", reservation_id, false)
        if (sendData.success === true) {
            //affichage message succès
            displayMessageErreurs(null, sendData.message, sendData.success);
            const reservations = await getReservations()
            displayReservationsAdmin(reservations);
        }
    } catch (error) {

        // affichage des erreurs du message
        if (sendData.success === false)
            displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }
}


// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {

    //vérifer si les voitures ne sont pas déja récupérer
    if (!localStorage.getItem("reservations")) {
        getReservations();
    }

    const checkData = setInterval(() => {
        const reservations = JSON.parse(localStorage.getItem("reservations")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /admin/reservations.js
        if (reservations) {
            clearInterval(checkData);
            displayReservationsAdmin(reservations);
        }
    }, 10); // Vérifie toutes les 10ms
});




/******* fct pour recharger les réservations *****/
async function reloadReservations() {
    const reservations = await getReservations(); // Récupérer les réservations depuis le localStorage ou l'API
    if (reservations) {
        displayReservationsAdmin(reservations);
    }
}

document.querySelector("#reloadBtn").addEventListener("click", async () => {
    await reloadReservations();
})