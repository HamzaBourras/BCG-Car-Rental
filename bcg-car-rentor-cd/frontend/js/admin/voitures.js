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
let voiture_id_S = null // l'id de la voiture à supprimer
let voiture_id_M = null // l'id de la voiture à modifier

// **** Configuration des écouteurs d'événements sur le buttons supprimer et modifier
function setupEventListeners() {
  document.querySelectorAll('#supprimerBtn').forEach(btn => {
    btn.addEventListener('click', function () {
      voiture_id_S = this.getAttribute('data-voiture-id');
      // demande la confirmation de l'admin
      const conf = confirm("voulez vous supprimer cette voiture")
      if (conf) {
        // Appeler la fonction de suppression
        supprimerVoiture(voiture_id_S)
      }
    });
  });

  document.querySelectorAll('#modifierBtn').forEach(btn => {
    btn.addEventListener('click', function () {
      voiture_id_M = this.getAttribute('data-voiture-id');
      document.getElementById("action").value = "modifier"  // change la valeur de l'input de l'action
      initialiseFormulaire(voiture_id_M)  // fct pour afficher les données de la voiture sélectionné sur les inputs
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

const formData = new FormData(); // Utilisez FormData pour les fichiers

//**** fct pour modifier une voiture ****/
async function modifierVoiture(voiture_id) {
  formData.append('modele', document.querySelector("#modele").value);
  formData.append('marque', document.querySelector("#marque").value);
  formData.append('matricule', document.querySelector("#matricule").value);
  formData.append('nombre_place', document.querySelector("#nombre_place").value);
  formData.append('prix_jour', document.querySelector("#prix_jour").value);
  formData.append('vitesse_max', document.querySelector("#vitesse_max").value);
  formData.append('couleur', document.querySelector("#couleur").value);
  formData.append('type_carburant', document.querySelector("#type_carburant").value);
  formData.append('kilometrage', document.querySelector("#kilometrage").value);
  formData.append('climat', document.querySelector("#climat").value == "oui" ? 1 : 0);

  const imageInput = document.querySelector("#image"); // votre input de type file
  const imageFile = imageInput.files[0]; // le fichier réel
  if (imageFile) formData.append('image', imageFile);  // si l'admin à choisir une nouvelle image

  try {
    await sendData.postData(ADMIN_EDIT_VOITURES, formData, "post", voiture_id, true)
    if (sendData.success === true) {
      //affichage message succès
      displayMessage(null, sendData.message);
      const voituresS = await getVoitures()  // appel à la fct pour recevoir les voitures après la modification
      displayVoituresAdmin(voituresS)

      document.getElementById("resetBtn").click()  // pour vider tous les inputs
      document.getElementById("annulerBtn").click() // pour cacher le formulaire 

    }
  } catch (error) {
    console.log(sendData.errors);

    // affichage des erreurs du message
    if (sendData.success === false)
      displayMessage(sendData.errors, sendData.message)
  }

}

//**** fct pour ajouter une voiture ****/
async function ajouterVoiture() {

  formData.append('modele', document.querySelector("#modele").value);
  formData.append('marque', document.querySelector("#marque").value);
  formData.append('matricule', document.querySelector("#matricule").value);
  formData.append('nombre_place', document.querySelector("#nombre_place").value);
  formData.append('prix_jour', document.querySelector("#prix_jour").value);
  formData.append('vitesse_max', document.querySelector("#vitesse_max").value);
  formData.append('couleur', document.querySelector("#couleur").value);
  formData.append('type_carburant', document.querySelector("#type_carburant").value);
  formData.append('kilometrage', document.querySelector("#kilometrage").value);
  formData.append('climat', document.querySelector("#climat").value == "oui" ? 1 : 0);
  const imageInput = document.querySelector("#image"); // votre input de type file
  const imageFile = imageInput.files[0]; // le fichier réel
  formData.append('image', imageFile);


  try {
    await sendData.postData(ADMIN_STORE_VOITURES, formData, "post", null, true)
    if (sendData.success === true) {
      //affichage message succès
      displayMessage(null, sendData.message);
      const voituresS = await getVoitures()  // appel à la fct pour recevoir les voitures après la modification
      displayVoituresAdmin(voituresS)

      document.getElementById("resetBtn").click()  // pour vider tous les inputs
      document.getElementById("annulerBtn").click() // pour cacher le formulaire 

    }
  } catch (error) {

    // affichage des erreurs du message
    if (sendData.success === false)
      displayMessage(sendData.errors, sendData.message)
  }

}

// **** lorsque je submit le formulaire, il est utilisé pour les deux actions modifier et ajouter
const form = document.querySelector("#vehiculeForm")
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const action = document.getElementById("action").value
  if (action == "ajouter") await ajouterVoiture()  // appeler à la fct pour ajouter une voiture
  else if (action == "modifier") await modifierVoiture(voiture_id_M)
})

// **** fonction pour initialise le formulaire lorsque je clique sur modifier
function initialiseFormulaire(voiture_id) {
  const allVoitures = JSON.parse(localStorage.getItem("voitures")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
  const voitureSelected = allVoitures.filter(vt => vt.id == voiture_id)  // sélectionner la voiture à modifier
  document.querySelector(".container_formulaire").style.display = "block"  // afficher la formulaire lorsque je clique sur le button modifier

  document.querySelector("#modele").value = voitureSelected[0].modele
  document.querySelector("#marque").value = voitureSelected[0].marque
  document.querySelector("#matricule").value = voitureSelected[0].matricule
  document.querySelector("#nombre_place").value = voitureSelected[0].nombre_place
  document.querySelector("#prix_jour").value = voitureSelected[0].prix_jour
  document.querySelector("#vitesse_max").value = voitureSelected[0].vitesse_max
  document.querySelector("#couleur").value = voitureSelected[0].couleur
  document.querySelector("#type_carburant").value = voitureSelected[0].type_carburant.toLowerCase()
  document.querySelector("#kilometrage").value = voitureSelected[0].kilometrage
  document.querySelector("#climat").value = voitureSelected[0].climat == 1 ? "oui" : "non"
  document.querySelector("#image").required = false

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
    btnC.classList.remove("danger")
    btnC.classList.add("success")
  }
  else {
    btnC.textContent = "réssayer"
    btnC.classList.remove("success")
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