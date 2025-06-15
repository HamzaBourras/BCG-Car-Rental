import getData from "../functions/getData.js";
import { CLIENT_STATISTIQUES_DASHBOARD } from "../../apis/api.js";
import { getReservations } from "../admin/get_reservations.js"

const user_id = JSON.parse(localStorage.getItem("userAuth")).id;

// Fonction pour récupérer les statistiques du dashboard
async function getDashboardStats() {
    try {
        await getData.getD(CLIENT_STATISTIQUES_DASHBOARD, `${user_id}`);
        localStorage.setItem("dashboardStats", JSON.stringify(getData.returnData)); // Enregistrer les statistiques dans localStorage
        return getData.returnData; // Retourner les données récupérées
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques du dashboard:", error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
}

// **** Fonction pour afficher les statistiques du dashboard ****
function displayDashboardStats(stats, reservations) {

    document.querySelector("#reservationsTotales").textContent = stats.nombre_reservations;
    document.querySelector("#reservationsActives").textContent = stats.nombre_reservations_actives;
    document.querySelector("#nbreCommentaires").textContent = stats.nombre_commentaires;
    document.querySelector("#points").textContent = stats.points;

    // Afficher les trois reservations les plus récentes
    const recentReservationsContainer = document.querySelector("#recent-bookings-table");
    recentReservationsContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les nouvelles lignes
    let content = ""
    let nbr = 0;
    let statut = "en cours";
    // let classStatut = "";
    let paiement = "non payée";
    reservations.forEach(reser => {
        if (reser.statut == 1) {
            // classStatut = "confirmee";
            statut = "confirmée";
        } else if (reser.statut == 0) {
            // classStatut = "refusee";
            statut = "refusée";
        }

        if (reser.statut_paiement == 1) paiement = + reser.prix_total + " DH";
        if (nbr < 4) {
            content += `
        <tr>
            <td>${reser.id}</td>
            <td>${reser.voiture_marque} ${reser.voiture_modele}</td>
            <td>${reser.date_debut}</td>
            <td>${reser.date_fin}</td>
            <td>${statut}</td>
            <td>${paiement}</td> `
        }
        nbr++;
    });

    recentReservationsContainer.innerHTML = content;

}

// **** appel à la fonction pour recevoir tous les statistiques du dashboard et les afficher ****
document.addEventListener("DOMContentLoaded", async function () {
    let dashboardStats = JSON.parse(localStorage.getItem("dashboardStats"));
    if (!dashboardStats) {
        dashboardStats = await getDashboardStats();
    }
    let reservations = JSON.parse(localStorage.getItem("reservations"));
    if (!reservations) {
        reservations = await getReservations();
    }

    const reservationsClient = reservations.filter(reser => reser.client_id == user_id)
    displayDashboardStats(dashboardStats, reservationsClient);
});



