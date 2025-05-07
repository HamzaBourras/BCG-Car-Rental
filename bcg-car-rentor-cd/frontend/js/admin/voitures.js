// ====== ce fichier contient les fctions de display voitures sur la page, modifier,supprimer et ajouter une voiture
import { baseUrl } from "../../apis/api.js";
import { ADMIN_STORE_VOITURES } from "../../apis/api.js";
import { ADMIN_EDIT_VOITURES } from "../../apis/api.js";
import { ADMIN_DESTROY_VOITURES } from "../../apis/api.js";
import sendData from '/frontend/js/functions/sendData.js'
import { getVoitures } from "../page_accueil/get_voitures.js"  // je veux l'appeler après chaque modification

// **** fonction pour ajouter les voitures à la page ""des voitures"" de l'admin
function displayVoituresAdmin(voitures) {
  let sectionsVoitures = document.querySelector("#main-content");

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
    <div class="modification">
        <button id="modifierBtn" data-voiture-id="${voiture.id}" style="background-color:rgb(0, 92, 0);"  class="button" role="button">Modifier</button>
        <button id="supprimerBtn" data-voiture-id="${voiture.id}" style="background-color:rgb(159, 0, 0);"  class="button" role="button">Supprimer</button>
    </div>
  </div>
  `;

  });

  sectionsVoitures.innerHTML = content;
  // Ajouter les écouteurs d'événements après l'insertion dans le DOM
  setupEventListeners();
}

// **** appel à la fonction pour ajouter les voitures à la page ""des voitures"" de l'admin
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier périodiquement si les voitures sont disponibles
  const checkData = setInterval(() => {
    const voitures = JSON.parse(localStorage.getItem("voitures")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
    if (voitures) {
      clearInterval(checkData);
      displayVoituresAdmin(voitures);  // ajouter les voitures à la page

    }
  }, 10); // Vérifie toutes les 10ms
});

// ***************************************************************

// **** Configuration des écouteurs d'événements sur le buttons supprimer et modifier
function setupEventListeners() {
  document.querySelectorAll('#supprimerBtn').forEach(btn => {
    btn.addEventListener('click', function () {
      const voiture_id = this.getAttribute('data-voiture-id');
      // demande la confirmation de l'admin
      const conf = confirm("voulez vous supprimer cette voiture")
      if (conf) {
        // Appeler la fonction de suppression
        supprimerVoiture(voiture_id)
      }
    });
  });

  document.querySelectorAll('#modifierBtn').forEach(btn => {
    btn.addEventListener('click', function () {

    });
  });
}


// ************* fcts crud

//**** fct pour supprimer une voiture ****/
async function supprimerVoiture(voiture_id) {
  try {
    await sendData.postData(ADMIN_DESTROY_VOITURES, {}, "delete", voiture_id, false);
    if (sendData.success === true) {
      //affichage message succès
      displayMessage(null, sendData.message);
      const voituresS = await getVoitures()  // appel à la fct pour recevoir les voitures après la modification

      displayVoituresAdmin(voituresS)
    }
  } catch (error) {
    // affichage des erreurs du message
    if (sendData.success === false)
      displayMessage(sendData.errors, sendData.message)
  }
}


//**** fct pour modifier une voiture ****/
function modifierVoiture(voiture_id) {

}


//**** fct pour ajouter une voiture ****/
function ajouterVoiture() {

}

// **** fonction pour afficher les erreurs et le message
function displayMessage(errors, message) {
  let globC = document.querySelector("#glob")
  let messageC = document.querySelector("#message")
  let errorsC = document.querySelector("#errors")
  let btnC = document.querySelector("#btn button")

  btnC.addEventListener("click", () => {  // ajouter un event au button pour fermer le div global
    globC.style.display = "none";
  });

  globC.style.display = "flex"
  errorsC.innerHTML = ""
  messageC.textContent = message
  if (sendData.success == true) {  // dans ce cas il n ' y a pas des erreurs on veut juste afficher un message
    btnC.textContent = "fermer"
    btnC.classList.add("success")
  }
  else {
    console.log(errors);
    btnC.textContent = "réssayer"
    btnC.classList.add("danger")
    let content = ``
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        // Pour chaque message d'erreur dans le tableau de cette propriété
        for (const errorMessage of errors[key]) {
          content += `<li>${errorMessage}</li>`;
        }
      }
    }

    errorsC.innerHTML = content

  }
}