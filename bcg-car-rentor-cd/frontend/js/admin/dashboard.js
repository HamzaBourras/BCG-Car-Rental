import getData from "../functions/getData.js";
import { ADMIN_STATISTIQUES_DASHBOARD } from "../../apis/api.js";
import { getReservations } from "./get_reservations.js";

// Fonction pour récupérer les statistiques du dashboard
export async function getDashboardStats() {
    try {
        await getData.getD(ADMIN_STATISTIQUES_DASHBOARD);
        localStorage.setItem("dashboardStats", JSON.stringify(getData.returnData)); // Enregistrer les statistiques dans localStorage
        return getData.returnData; // Retourner les données récupérées
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques du dashboard:", error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
}

// **** Fonction pour afficher les statistiques du dashboard ****
export function displayDashboardStats(stats, reservations) {

    document.querySelector("#nbreVoitures").textContent = stats.nombre_voitures;
    document.querySelector("#reservationsActives").textContent = stats.nombre_reservations_actives;
    document.querySelector("#nbreClients").textContent = stats.nombre_clients;
    document.querySelector("#revenueTotal").textContent = stats.revenue_total + " DH";

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
            <td>${reser.nom_client} ${reser.prenom_client}</td>
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

    displayDashboardStats(dashboardStats, reservations);
});



