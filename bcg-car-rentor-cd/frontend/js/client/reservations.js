import sendData from '/frontend/js/functions/sendData.js'
import { baseUrl } from "../../apis/api.js";
import { getReservations } from "../admin/get_reservation.js"
import { verifierDates } from "./valider_dates_reservation.js";
import { calculateDaysBetweenDates } from "./valider_dates_reservation.js";
import { CLIENT_EDIT_RESERVATIONS } from "../../apis/api.js";
import { CLIENT_DESTROY_RESERVATIONS } from '../../apis/api.js';
import { displayMessageErreurs } from '../display_message_erreurs.js';


const userAuth = JSON.parse(localStorage.getItem("userAuth"))

// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", async function () {
    // vérifer si les commentaires ne sont pas déja récupérer
    // if (!localStorage.getItem("reservations")) {
    await getReservations();
    // }
});



// ***************************************************************
let reservation_id_S = null // l'id de la voiture à supprimer
let reservation_id_M = null // l'id de la voiture à modifier

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
        let diffDays = calculateDaysBetweenDates(reservation.date_debut, reservation.date_fin);
        const duration = diffDays === 1 ? "1 jour" : `${diffDays} jours`;

        // gérer l'affichage des buttons de modifier et supprimer
        let content2 = ""  // pour affichage des buttons ou bien statut de paiement
        let expiree = ""   // pour vérifier si la réservation est expirée
        let recuBtn = "" // pour afficher le button reçu
        if (reservation.statut == 1 && reservation.statut_paiement == 0 && reservation.expiree == 0) {
            recuBtn += `
            <button id="recuBtnR" data-reservation-id="${reservation.id}" role="button"> <span>Reçu</span> <i class="fa-solid fa-circle-down"></i></button>
            
            `

        }
        if (reservation.expiree == true) {
            expiree = `
                <p class="expiree">Expirée</p>
            `}
        if (reservation.statut == null && reservation.expiree == 0) {
            content2 += `
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

            content2 += `<div class="paiement" >
                    <div class="statusPaiement ${statusClass}">${statusText}</div>
                </div>`
        }
        else if (reservation.statut == 0) {
            content2 += `
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
                <div class="price" >${expiree} ${reservation.prix_total} DH</div>

                <!-- pour affichage des buttons ou bien statut de paiement -->
                ${content2} ${recuBtn}
                
            </div>
        `
    });

    sectionsReservations.innerHTML = content

    // Ajouter les écouteurs d'événements après l'insertion dans le DOM
    setupEventListeners();
}


// **** Configuration des écouteurs d'événements sur le buttons supprimer et modifier
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

    document.querySelectorAll('#modifierBtnR').forEach(btn => {
        btn.addEventListener('click', function () {
            reservation_id_M = this.getAttribute('data-reservation-id');
            initialiseFormulaire(reservation_id_M)  // fct pour afficher les données de la voiture sélectionné sur les inputs
        });
    });

    document.querySelector('#recuBtnR').addEventListener("click", function () {
        const reservation_id = this.getAttribute('data-reservation-id');
        recuReservation(reservation_id);

    });

}

// **** fct pour initialiser la formulaire
function initialiseFormulaire(reservation_id) {
    const reservations = JSON.parse(localStorage.getItem("reservations"))
    const reservationSelected = reservations.filter(resr => resr.id == reservation_id)

    document.querySelector("#form-container").style.display = "flex"  // afficher la formulaire
    document.querySelector("#adresse_livraison_U").setAttribute("hidden", "")  // cacher l'input de l'adresse de livraison autre
    document.querySelector("#adresse_livraison_U").removeAttribute("reqiured")

    const dateStrD = reservationSelected[0].date_debut; // "22-05-2025 19:59"
    const [dD, mD, yD] = dateStrD.split(' ')[0].split('-');
    const [HD, MD] = dateStrD.split(' ')[1].split(':');
    document.querySelector("#date_debut").value = `${yD}-${mD}-${dD}T${HD}:${MD}`;

    const dateStrF = reservationSelected[0].date_fin; // "22-05-2025 19:59"
    const [dF, mF, yF] = dateStrF.split(' ')[0].split('-');
    const [HF, MF] = dateStrF.split(' ')[1].split(':');
    document.querySelector("#date_fin").value = `${yF}-${mF}-${dF}T${HF}:${MF}`;

    document.querySelector("#image").src = baseUrl + reservationSelected[0].voiture_image

    const adresse_livraison = reservationSelected[0].adresse_livraison
    const adresseLivraisonSelect = document.querySelector("#adresse_livraison")
    const adresseLivraisonAutreInput = document.querySelector("#adresse_livraison_U")
    const adresse_user = userAuth.adresse

    if (adresse_livraison == "agence") adresseLivraisonSelect.value = "agence"
    else if (adresse_livraison == adresse_user) adresseLivraisonSelect.value = "client_adresse"
    else {
        adresseLivraisonSelect.value = "autre"
        adresseLivraisonAutreInput.value = adresse_livraison

        document.querySelector("#adresse_livraison_U").removeAttribute("hidden")
        document.querySelector("#adresse_livraison_U").setAttribute("reqiured", "")
    }


}


// **** fct pour modifier la réservation
async function modifierReservation(reservation_id) {

    const reservations = JSON.parse(localStorage.getItem("reservations"))
    const reservationSelected = reservations.filter(resr => resr.id == reservation_id)
    const voiture_id = reservationSelected[0].voiture_id

    const formData = new FormData()
    const dateDebut = document.querySelector("#date_debut").value
    const dateFin = document.querySelector("#date_fin").value
    const adresseLivraisonSelect = document.querySelector("#adresse_livraison")
    const adresseLivraisonAutreInput = document.querySelector("#adresse_livraison_U")

    const allVoitures = JSON.parse(localStorage.getItem("voitures"))
    const voitureSelected = allVoitures.filter(vt => vt.id == voiture_id)

    const isReserved = verifierDates(voitureSelected[0].periodes_reservee) // vérifer si la période sélectionné est disponible

    if (!isReserved) {
        // calculer le prix total
        let nombre_jours = ((new Date(dateFin) - new Date(dateDebut)) / (1000 * 60 * 60 * 24))
        const prix_total = nombre_jours * voitureSelected[0].prix_jour

        // crée l'adresse de livraison selon le choix del'utilisateur
        let adresse_livraison = ""
        if (adresseLivraisonSelect.value == "autre") adresse_livraison = adresseLivraisonAutreInput.value
        else if (adresseLivraisonSelect.value == "client_adresse") adresse_livraison = userAuth.adresse
        else adresse_livraison = adresseLivraisonSelect.value

        // formater les deux dates pour etre compatible avec la validation PHP
        // const dateDebutToSend = formatDateForBackend(dateDebut, timezone);
        // const dateFinToSend = formatDateForBackend(dateFin, timezone);
        const dateDebutToSend = dateDebut.replace("T", " ");
        const dateFinToSend = dateFin.replace("T", " ");

        formData.append("date_debut", dateDebutToSend)
        formData.append("date_fin", dateFinToSend)
        formData.append("prix_total", Number.parseFloat(prix_total))
        formData.append("adresse_livraison", adresse_livraison)


        // const formDataObj = Object.fromEntries(formData.entries());
        // console.log("FormData complet:", formDataObj);

        // envoyer la réservation
        try {
            await sendData.postData(CLIENT_EDIT_RESERVATIONS, formData, "put", `${userAuth.id}/${voiture_id}/${reservation_id}`, false)
            if (sendData.success === true) {

                //affichage message succès
                displayMessageErreurs(null, sendData.message, sendData.success);
                const reservations = await getReservations()
                const reservationsClient = reservations.filter(reser => reser.client_id == userAuth.id)
                displayReservationsClient(reservationsClient);

                document.querySelector(".image-container #annulerBtnR").click()  // pour cacher le formulaire

            }
        } catch (error) {

            // affichage des erreurs du message
            if (sendData.success === false)
                displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
        }

    }

}

// **** fct pour supprimer la réservation
async function supprimerReservation(reservation_id) {
    const reservations = JSON.parse(localStorage.getItem("reservations"))
    const reservationSelected = reservations.filter(resr => resr.id == reservation_id)
    const voiture_id = reservationSelected[0].voiture_id

    try {
        await sendData.postData(CLIENT_DESTROY_RESERVATIONS, null, "delete", `${userAuth.id}/${voiture_id}/${reservation_id}`, false)
        if (sendData.success === true) {
            //affichage message succès
            displayMessageErreurs(null, sendData.message, sendData.success);
            const reservations = await getReservations()
            const reservationsClient = reservations.filter(reser => reser.client_id == userAuth.id)
            displayReservationsClient(reservationsClient);

        }
    } catch (error) {

        // affichage des erreurs du message
        if (sendData.success === false)
            displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }
}

// fct pour valider enregistrer la reservation on clique sur le button submit
const form = document.querySelector("#form-container #reservation-form2")
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await modifierReservation(reservation_id_M)
})

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



// **** fct pour enregistrer les informations et le redirige vers la page du reçu de la réservation
function recuReservation(reservation_id) {
    const reservations = JSON.parse(localStorage.getItem("reservations"))
    const reservationSelected = reservations.filter(resr => resr.id == reservation_id)

    if (reservationSelected.length > 0) {
        const recuInfos = {
            reservation_numero: reservationSelected[0].id,
            reservation_date_emession: reservationSelected[0].date_emession,
            client_nom: userAuth.nom,
            client_prenom: userAuth.prenom,
            client_email: userAuth.email,
            telephone: userAuth.telephone,
            voiture_marque: reservationSelected[0].voiture_marque,
            voiture_modele: reservationSelected[0].voiture_modele,
            voiture_matricule: reservationSelected[0].voiture_matricule,
            reservation_date_debut: reservationSelected[0].date_debut,
            reservation_date_fin: reservationSelected[0].date_fin,
            reservation_adresse_livraison: reservationSelected[0].adresse_livraison,
            reservation_prix_total: reservationSelected[0].prix_total
        };

        localStorage.setItem("recuInfos", JSON.stringify(recuInfos));
        window.location.href = "/frontend/html/client/reservation_recu"; // Rediriger vers la page de reçu
    }
}