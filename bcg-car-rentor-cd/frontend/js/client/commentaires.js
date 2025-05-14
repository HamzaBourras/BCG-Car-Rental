import sendData from "../functions/sendData.js";
import { CLIENT_DESTROY_COMMENTAIRES } from "../../apis/api.js";
import { CLIENT_EDIT_COMMENTAIRES } from "../../apis/api.js";
import { getCommentaires } from "../page_accueil/get_display_commentaires.js";
import { displayMessageErreurs } from "../display_message_erreurs.js"

const user_id = JSON.parse(localStorage.getItem("userAuth")).id

// **** appel à la fonction pour recevoir tous les commentaires
document.addEventListener("DOMContentLoaded", function () {
  //vérifer si les commentaires ne sont pas déja récupérer
  if (!localStorage.getItem("commentaires")) {
    getCommentaires();
  }
});

let commentaire_id_S = null // l'id de la voiture à supprimer
let commentaire_id_M = null // l'id de la voiture à modifier

// **** fonction pour ajouter les commentaires à la page ""d'accueil""
function displayCommentaires(commentaires) {
  let sectionsCommentaires = document.querySelector(".comments-cards")

  let content = ""
  let stars = ""
  let numberOfStars = 0
  // filtrer les commentaires pour sélectionner seulement les commentaires du client connectés
  const user_id = (JSON.parse(localStorage.getItem("userAuth"))).id
  const commentairesFiltree = commentaires.filter((com) => com.user_id == user_id)

  commentairesFiltree.forEach(commentaire => {
    stars = ""
    numberOfStars = 0
    while (numberOfStars < commentaire.note) {
      stars += `<i class="fa-solid fa-star"></i>`
      numberOfStars++;
    }
    content += `
        <div class="comment-card">
        <div class="comment-card-header">
          <h2>${commentaire.prenom} ${commentaire.nom}</h2>
          <div class="stars">
            ${stars}
          </div>
        </div>
        <div class="comment">
          <p>${commentaire.contenu}</p>
        </div>
        <div id="actions" >
        <button id="modifierBtn" data-commentaire-id="${commentaire.id}"><i class="fa-solid fa-pen"></i></button>
        <button id="supprimerBtn" data-commentaire-id="${commentaire.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
        `




  });

  if (content != "") sectionsCommentaires.innerHTML = content
  else sectionsCommentaires.innerHTML = `<h3 style="font-weight: 400; color:gray;">Vous n'avez des commenataires à afficher </h3>`

  // ajouter event click sur tous les buttons supprimer et modifier
  setupEventListeners();
}


// **** Configuration des écouteurs d'événements sur le buttons supprimer et modifier
function setupEventListeners() {
  document.querySelectorAll('#supprimerBtn').forEach(btn => {
    btn.addEventListener('click', function () {

      commentaire_id_S = this.getAttribute('data-commentaire-id');
      // demande la confirmation de le client
      const conf = confirm("voulez vous supprimer ce commentaire ?")
      if (conf) {
        // Appeler la fonction de suppression
        supprimerCommentaire(commentaire_id_S)
      }
    });
  });

  document.querySelectorAll('#modifierBtn').forEach(btn => {
    btn.addEventListener('click', function () {
      commentaire_id_M = this.getAttribute('data-commentaire-id');
      initialiseFormulaire(commentaire_id_M)  // fct pour afficher les données de la voiture sélectionné sur les inputs
    });
  });


}

// fonction pour supprimer un commentaire
async function supprimerCommentaire(commentaire_id) {
  try {
    await sendData.postData(CLIENT_DESTROY_COMMENTAIRES, {}, "delete", `${user_id}/${commentaire_id}`, false);
    if (sendData.success === true) {
      //affichage message succès
      displayMessageErreurs(null, sendData.message, sendData.success);
      const commenatairesS = await getCommentaires()  // appel à la fct pour recevoir les commentaires après la modification
      displayCommentaires(commenatairesS)

    }
  } catch (error) {
    // affichage des erreurs du message
    if (sendData.success === false)
      displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
  }
}


// fonction pour modifier un commentaire
async function modifierCommentaire(commentaire_id) {
  const formData = new FormData();
  try {
    formData.append("contenu", document.querySelector("#contenu").value)
    formData.append("note", document.querySelector("#note").value)


    await sendData.postData(CLIENT_EDIT_COMMENTAIRES, formData, "put", `${user_id}/${commentaire_id}`, false);
    if (sendData.success === true) {
      //affichage message succès
      displayMessageErreurs(null, sendData.message, sendData.success);
      const commenatairesM = await getCommentaires()  // appel à la fct pour recevoir les commentaires après la modification
      displayCommentaires(commenatairesM)

      document.getElementById("annulerBtnC").click() // pour cacher le formulaire 
    }
  } catch (error) {
    // affichage des erreurs du message
    if (sendData.success === false)
      displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
  }
}
// appeler la méthode pour modifier un voiture lorsque je submit la formulaire
const form = document.querySelector("#commentaire_form")
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await modifierCommentaire(commentaire_id_M)
})

// **** fonction pour initialise le formulaire lorsque je clique sur modifier
function initialiseFormulaire(commenataire_id) {
  const allCommentaires = JSON.parse(localStorage.getItem("commentaires")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
  const commenataireSelected = allCommentaires.filter(cm => cm.id == commenataire_id)  // sélectionner la voiture à modifier
  document.querySelector("#form_container").style.display = "flex"  // afficher la formulaire lorsque je clique sur le button modifier

  if (commenataireSelected) {
    document.querySelector("#contenu").value = commenataireSelected[0].contenu
    document.querySelector("#note").value = commenataireSelected[0].note
    document.querySelector("#note_span").textContent = commenataireSelected[0].note
  }

}

// **** appel à la fonction pour ajouter les commentaires à la page ""d'accueil""
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier périodiquement si les voitures sont disponibles
  const checkData = setInterval(() => {
    const commentaires = JSON.parse(localStorage.getItem("commentaires")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
    if (commentaires) {
      clearInterval(checkData);
      displayCommentaires(commentaires);
    }
  }, 10); // Vérifie toutes les 10ms
});
