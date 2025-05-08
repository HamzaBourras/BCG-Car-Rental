// ===== ce script est utiliser pour recevoir tous les clients et 'lafficher dans la page "clients" de l'admin
import getData from "../functions/getData.js";
import { ADMIN_INDEX_CLIENTS } from "../../apis/api.js";

async function getClients() {

    try {
        await getData.getD(ADMIN_INDEX_CLIENTS);
        if (getData.success == true) {
            localStorage.setItem("clients", JSON.stringify(getData.returnData)) // Enregistrer les voitures dans localStorage
            return getData.returnData
        }
    } catch (err) {
        if (getData.success == false) {
            console.log(getData.errors);
        }
    }
}

// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
    //vérifer si les clients ne sont pas déja récupérer
    if (!localStorage.getItem("clients")) {
        getClients();
    }

});


function displayClients(clients) {
    let content = ""
    clients.forEach(client => {
        content += `
        <tr>
            <td>${client.id}</td>
            <td>${client.nom}</td>
            <td>${client.prenom}</td>
            <td>${client.telephone}</td>
            <td>${client.email}</td>
            <td>${client.adresse}</td>
            <td>${client.nombre_reservation}</td>
        </tr>
        `
    });

    document.querySelector("tbody").innerHTML = content
}



// **** appel à la fonction pour ajouter les clients à la page ""clients""
document.addEventListener("DOMContentLoaded", function () {
    // Vérifier périodiquement si les clients sont disponibles
    const checkData = setInterval(() => {
        const clients = JSON.parse(localStorage.getItem("clients")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
        if (clients) {
            clearInterval(checkData);
            displayClients(clients)
        }
    }, 10); // Vérifie toutes les 10ms
});