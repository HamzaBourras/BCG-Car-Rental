// ====== ce fichier contient les fctions de display voitures sur la page et reserver la voiture
import { baseUrl } from "../../apis/api.js";
import sendData from '/frontend/js/functions/sendData.js'
import { CLIENT_STORE_RESERVATIONS } from "../../apis/api.js";
import { getVoitures } from "../page_accueil/get_voitures.js"  // je veux l'appeler pour récupérer les voitures s'ils ne sont pas d'ja récupérer
import { verifierDates } from "./valider_dates_reservation.js"; // pour vérifier si la période de réservation est disponible
import { displayMessageErreurs } from "../display_message_erreurs.js"
import { getReservations } from "../admin/get_reservations.js";  // je veux l'appeler lorsque j'ajoute une nouvelle reservations

console.log(("script voitures client"));


const userAuth = JSON.parse(localStorage.getItem("userAuth"))

// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
  //vérifer si les commentaires ne sont pas déja récupérer
  if (!localStorage.getItem("voitures")) {
    getVoitures();
  }
});

let voiture_id_R = null // l'id du voiture à reserver

// **** fonction pour ajouter les voitures à la page ""des voitures"" du client
function displayVoituresClient(voitures) {

  let sectionsVoitures = document.querySelector("#voitures-content");

  let content = "";

  voitures.forEach((voiture) => {
    content += `
      <div class="car-card">
        <img src="${baseUrl + voiture.image}" alt="${voiture.marque} ${voiture.marque
      } " class="car-image">
        <h2>${voiture.marque} ${voiture.modele}</h2>
        <p class="price">A PARTIR DE ${voiture.prix_jour}dh/jour</p>
    
        <!-- Car options (Seats, Diesel, Climatiseur) -->
        <div class="car-options">
          <div class="seat-option">
            <img src="../../images/Options/seat.png" alt="">
            <span>${voiture.nombre_place} Places</span>
          </div>
          <div class="diesel-option">
            <img src="../../images/Options/diesel.png" alt="">
            <span>${voiture.type_carburant}</span>
          </div>
          <div class="climat-option">
            <img src="../../images/Options/clim2.png" alt="">
            <span>${voiture.climat ? "oui" : "non"}</span>
          </div>
        </div>
    
        <!-- Modification buttons -->
        <div class="actions">
            <button id="reserverBtn" data-voiture-id="${voiture.id}" style="background-color:rgb(200, 200, 200);" onmouseover="this.style.backgroundColor='rgb(255, 255, 255)'; this.style.borderRadius='10px'" onmouseout="this.style.backgroundColor='rgb(200, 200, 200)';this.style.borderRadius='30px'"  class="button" role="button">Reserver</button>
        </div>
      </div>
      `;

  });

  sectionsVoitures.innerHTML = content;
  // Ajouter les écouteurs d'événements après l'insertion dans le DOM
  setupEventListeners();


}

// **** appel à la fonction pour ajouter les voitures à la page ""des voitures"" du client
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier périodiquement si les voitures sont disponibles
  const checkData = setInterval(() => {
    const voitures = JSON.parse(localStorage.getItem("voitures")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
    if (voitures) {
      clearInterval(checkData);
      displayVoituresClient(voitures);  // ajouter les voitures à la page

    }
  }, 10); // Vérifie toutes les 10ms
});


// **** Configuration des écouteurs d'événements sur le button de resevation
function setupEventListeners() {
  document.querySelectorAll('#reserverBtn').forEach(btn => {
    btn.addEventListener('click', function () {
      voiture_id_R = this.getAttribute('data-voiture-id');
      document.querySelector("#form-container").style.display = "flex"  // afficher le formulaire

      const voitures = JSON.parse(localStorage.getItem("voitures"))
      const voitureSelected = voitures.filter(vt => vt.id == voiture_id_R)
      const image = document.querySelector("#image");
      image.src = baseUrl + voitureSelected[0].image // pour afficher l'image de la voiture

    });
  });


}


// **** fct pour reserver une voiture 
async function reserverVoiture(voiture_id) {
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
      await sendData.postData(CLIENT_STORE_RESERVATIONS, formData, "post", `${userAuth.id}/${voiture_id}`, false)
      if (sendData.success === true) {
        //affichage message succès
        getReservations()
        getVoitures() // pour mettre à jour les voitures
        displayMessageErreurs(null, sendData.message, sendData.success);

        document.querySelector(".image-container #annulerBtnR").click()  // pour cacher le formulaire

      }
    } catch (error) {

      // affichage des erreurs du message
      if (sendData.success === false)
        displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }

  }
}





// fct pour valider enregistrer la reservation on clique sur le button submit
const form = document.querySelector("#form-container #reservation-form1")
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await reserverVoiture(voiture_id_R)
})
