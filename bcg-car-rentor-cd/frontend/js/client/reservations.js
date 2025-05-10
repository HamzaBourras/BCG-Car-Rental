import getData from "../functions/getData.js";
import { CLIENT_RESERVATIONS } from "../../apis/api.js";

class ReservationsManager {
    constructor() {
        this.reservationsContainer = document.getElementById('reservations-container');
        this.voitures = JSON.parse(localStorage.getItem("voitures")) || [];
        this.userInfo = JSON.parse(localStorage.getItem("user_info")) || null;
    }

    async init() {
        try {
            if (!this.userInfo) {
                // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
                window.location.href = '/frontend/pages/auth/connecter.html';
                return;
            }
            
            await this.loadReservations();
        } catch (error) {
            console.error("Erreur lors de l'initialisation:", error);
            this.showErrorMessage("Une erreur est survenue lors du chargement des réservations.");
        }
    }

    async loadReservations() {
        try {
            await getData.getD(CLIENT_RESERVATIONS);
            
            if (getData.success) {
                const reservations = getData.returnData;
                this.displayReservations(reservations);
            } else {
                this.showErrorMessage("Impossible de charger les réservations: " + (getData.message || "Erreur inconnue"));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des réservations:", error);
            this.showErrorMessage("Une erreur est survenue lors du chargement des réservations.");
        }
    }

    displayReservations(reservations) {
        // Vider le conteneur
        this.reservationsContainer.innerHTML = '';
        
        if (!reservations || reservations.length === 0) {
            this.reservationsContainer.innerHTML = '<div class="no-reservations">Vous n\'avez pas encore de réservations.</div>';
            return;
        }

        // Trier les réservations par date de début (la plus récente en premier)
        reservations.sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut));
        
        // Afficher chaque réservation
        reservations.forEach(reservation => {
            // Trouver les détails de la voiture associée à cette réservation
            const voiture = this.voitures.find(v => v.id === reservation.voiture_id) || {
                modele: 'Modèle inconnu',
                marque: 'Marque inconnue',
                image: '../../images/default-car.jpg'
            };
            
            const card = this.createReservationCard(reservation, voiture);
            this.reservationsContainer.appendChild(card);
        });
    }

    createReservationCard(reservation, voiture) {
        const cardElement = document.createElement('div');
        cardElement.className = 'reservation-card';
        
        // Formater les dates
        const dateDebut = new Date(reservation.date_debut).toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        const dateFin = new Date(reservation.date_fin).toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        
        // Déterminer le statut de paiement
        const statusClass = reservation.statut_paiement === 1 ? 'status-paid' : 'status-unpaid';
        const statusText = reservation.statut_paiement === 1 ? 'Payé' : 'Non payé';
        
        cardElement.innerHTML = `
            <div class="car-info">
                <img class="car-image" src="${voiture.image || '../../images/default-car.jpg'}" alt="${voiture.marque} ${voiture.modele}">
                <h3 class="car-name">${voiture.marque} ${voiture.modele}</h3>
            </div>
            <div class="reservation-details">
                <p><span class="date-label">Début:</span> <span>${dateDebut}</span></p>
                <p><span class="date-label">Fin:</span> <span>${dateFin}</span></p>
                <p><span class="date-label">Durée:</span> <span>${this.calculateDuration(reservation.date_debut, reservation.date_fin)}</span></p>
            </div>
            <div class="price">${reservation.prix_total} €</div>
            <div class="status ${statusClass}">${statusText}</div>
        `;
        
        return cardElement;
    }

    calculateDuration(dateDebut, dateFin) {
        const start = new Date(dateDebut);
        const end = new Date(dateFin);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1 ? '1 jour' : `${diffDays} jours`;
    }

    showErrorMessage(message) {
        this.reservationsContainer.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <button id="retry-button">Réessayer</button>
            </div>
        `;
        
        document.getElementById('retry-button').addEventListener('click', () => {
            this.init();
        });
    }
}

// Initialiser la gestion des réservations au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const reservationsManager = new ReservationsManager();
    reservationsManager.init();
});