import getData from "../functions/getData.js";
import { CLIENT_INDEX_RESERVATIONS } from "../../apis/api.js";

// Éléments du DOM
const reservationsContainer = document.getElementById('reservations-container');

// Variables globales
const voitures = JSON.parse(localStorage.getItem("voitures")) || [];
const userInfo = JSON.parse(localStorage.getItem("userAuth")) || null;

// Fonction principale pour charger les réservations
async function loadReservations() {

    try {
        // Afficher un message de chargement
        reservationsContainer.innerHTML = '<div class="loading">Chargement des réservations...</div>';

        // Récupérer les réservations
        await getData.getD(CLIENT_INDEX_RESERVATIONS, userInfo.id);

        if (getData.success) {
            displayReservations(getData.returnData);
        } else {
            showErrorMessage("Impossible de charger les réservations: " + (getData.message || "Erreur inconnue"));
        }
    } catch (error) {
        console.error("Erreur lors du chargement des réservations:", error);
        showErrorMessage("Une erreur est survenue lors du chargement des réservations.");
    }
}

// Afficher les réservations
function displayReservations(reservations) {
    // Vider le conteneur
    reservationsContainer.innerHTML = '';

    if (!reservations || reservations.length === 0) {
        reservationsContainer.innerHTML = '<div class="no-reservations">Vous n\'avez pas encore de réservations.</div>';
        return;
    }

    // Trier les réservations par date de début (la plus récente en premier)
    reservations.sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut));

    // HTML pour les réservations
    let reservationsHTML = '';

    // Générer le HTML pour chaque réservation
    reservations.forEach(reservation => {
        // Trouver les détails de la voiture associée à cette réservation
        const voiture = voitures.find(v => v.id === reservation.voiture_id) || {
            modele: 'Modèle inconnu',
            marque: 'Marque inconnue',
            image: '../../images/default-car.jpg'
        };

        // Calculer la durée
        const start = new Date(reservation.date_debut);
        const end = new Date(reservation.date_fin);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const duration = diffDays === 1 ? '1 jour' : `${diffDays} jours`;

        // Déterminer le statut de paiement
        const statusClass = reservation.statut_paiement === 1 ? 'status-paid' : 'status-unpaid';
        const statusText = reservation.statut_paiement === 1 ? 'Payé' : 'Non payé';

        // Ajouter le HTML de cette réservation
        reservationsHTML += `
            <div class="reservation-card">
                <div class="car-info">
                    <img class="car-image" src="${voiture.image || '../../images/default-car.jpg'}" alt="${voiture.marque} ${voiture.modele}">
                    <h3 class="car-name">${voiture.marque} ${voiture.modele}</h3>
                </div>
                <div class="reservation-details">
                    <p><span class="date-label">Début:</span> <span>${dateDebut}</span></p>
                    <p><span class="date-label">Fin:</span> <span>${dateFin}</span></p>
                    <p><span class="date-label">Durée:</span> <span>${duration}</span></p>
                </div>
                <div class="price">${reservation.prix_total} €</div>
                <div class="status ${statusClass}">${statusText}</div>
            </div>
        `;
    });

    // Insérer tout le HTML dans le conteneur
    reservationsContainer.innerHTML = reservationsHTML;
}

// Afficher un message d'erreur
function showErrorMessage(message) {
    reservationsContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button id="retry-button">Réessayer</button>
        </div>
    `;

    document.getElementById('retry-button').addEventListener('click', loadReservations);
}

// Charger les réservations au chargement de la page
document.addEventListener('DOMContentLoaded', loadReservations);