import { baseUrl } from "../../apis/api.js";
import { getReservations } from "../admin/reservations.js"

const userAuth = JSON.parse(localStorage.getItem("userAuth"))

// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
    // vérifer si les commentaires ne sont pas déja récupérer
    if (!localStorage.getItem("reservations")) {
        getReservations();
    }
});


// **** fct pour afficher les réservations du client
function displayReservationsClient(reservations) {
    let sectionsReservations = document.querySelector("#reservations-container");
    sectionsReservations.innerHTML = '<div class="loading">Chargement des réservations...</div>'

    if (!reservations || reservations.length === 0) {
        sectionsReservations.innerHTML = '<div class="no-reservations">Vous n\'avez pas encore de réservations.</div>';
        return;
    }

    let content = ""

    reservations.forEach(reservation => {
        // Calculer la durée
        const start = new Date(reservation.date_debut);
        const end = new Date(reservation.date_fin);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const duration = diffDays === 1 ? '1 jour' : `${diffDays} jours`;

        // gérer l'affichage des buttons de modifier et supprimer
        let content2 = ""  // pour affichage des buttons ou bien statut de paiement
        if (reservation.statut == null) {
            content2 = `
                <!-- Modification buttons -->
                <div class="actions">
                    <button id="modifierBtnR" data-reservation-id="${reservation.id}" style="background-color:rgb(0, 92, 0);" onmouseover="this.style.backgroundColor='rgb(1, 139, 1)'" onmouseout="this.style.backgroundColor='rgb(0, 92, 0)'"  class="button" role="button">Modifier</button>
                    <button id="supprimerBtnR" data-reservation-id="${reservation.id}" style="background-color:rgb(159, 0, 0);" onmouseover="this.style.backgroundColor='rgb(206, 1, 1)'" onmouseout="this.style.backgroundColor='rgb(159, 0, 0)'"  class="button" role="button">Supprimer</button>
                </div>
            `
        }

        // gérer l'affichage de statut du paiement
        if (reservation.statut == 1) {
            const statusClass = reservation.statut_paiement === 1 ? 'status-paid' : 'status-unpaid';
            const statusText = reservation.statut_paiement === 1 ? 'Payée' : 'Non payée';

            content2 = `<div class="paiement" >
                <div class="statusPaiement ${statusClass}">${statusText}</div>
            </div>`
        }
        else if (reservation.statut == 0) {
            content2 = `
                <div class="reservation-status refused">
                    <div class="status-text">Refusée</div>
                </div>
            `
        }

        content += `
        <div class="reservation-card">
                <div class="car-info">
                    <img class="car-image" src="${baseUrl + reservation.voiture_image}" alt="${reservation.voiture_marque} ${reservation.voiture_modele}">
                    <h3 class="car-name">${reservation.voiture_marque} ${reservation.voiture_modele}</h3>
                </div>
                <div class="reservation-details">
                    <p><span class="date-label">Début:</span> <span>${reservation.date_debut}</span></p>
                    <p><span class="date-label">Fin:</span> <span>${reservation.date_fin}</span></p>
                    <p><span class="date-label">Durée:</span> <span>${duration}</span></p>
                </div>
                <div class="price">${reservation.prix_total} DH</div>

                <!-- pour affichage des buttons ou bien statut de paiement -->
                ${content2}
                
            </div>
        `
    });

    sectionsReservations.innerHTML = content
}


// **** appel à la fonction pour ajouter les reservations à la page 
document.addEventListener("DOMContentLoaded", function () {
    // Vérifier périodiquement si les voitures sont disponibles
    const checkData = setInterval(() => {
        const reservations = JSON.parse(localStorage.getItem("reservations")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /admin/reservations.js
        if (reservations) {
            const reservationsClient = reservations.filter(reser => reser.client_id == userAuth.id)
            clearInterval(checkData);
            displayReservationsClient(reservationsClient);
        }
    }, 10); // Vérifie toutes les 10ms
});