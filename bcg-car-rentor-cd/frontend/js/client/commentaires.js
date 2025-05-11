import getData from "../functions/getData.js";
import { INDEX_COMMENTAIRES } from "../../apis/api.js";
import { getCommentaires } from "../page_accueil/get_display_commentaires.js";
import { mettreAJourAffichageCommentaires } from "./modifier.js";

// **** appel à la fonction pour recevoir tous les commentaires
document.addEventListener("DOMContentLoaded", function () {
  //vérifer si les commentaires ne sont pas déja récupérer
  if (!localStorage.getItem("commentaires")) {
    getCommentaires();
  }
});

// **** fonction pour ajouter les commentaires à la page ""d'accueil""
function displayCommentaires(commentaires) {
  let sectionsCommentaires = document.querySelector(".comments-cards");

  if (!sectionsCommentaires) {
    console.error("Section des commentaires non trouvée");
    return;
  }

  let content = "";
  commentaires.forEach(commentaire => {
    let stars = "";
    let numberOfStars = 0;
    while (numberOfStars < commentaire.note) {
      stars += `<i class="fa-solid fa-star"></i>`;
      numberOfStars++;
    }
    
    content += `
    <div class="comment-card" data-id="${commentaire.id}">
        <div class="comment-card-header">
            <h2>${commentaire.prenom} ${commentaire.nom}</h2>
            <div class="stars">
                ${stars}
            </div>
        </div>
        <div class="comment">
            <p>${commentaire.contenu}</p>
        </div>
        <div id="actions">
            <button class="modifierBtn" data-id="${commentaire.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="supprimerBtn" data-id="${commentaire.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    `;
  });

  sectionsCommentaires.innerHTML = content;
  
  // Ajouter les écouteurs d'événements après l'ajout des commentaires au DOM
  setupCommentaireListeners();
}

// Fonction pour configurer les écouteurs d'événements pour les boutons
function setupCommentaireListeners() {
  // Pour les boutons de suppression
  const supprimerBtns = document.querySelectorAll(".supprimerBtn");
  supprimerBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Fonction de suppression à implémenter
      const commentaireId = btn.dataset.id;
      if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
        // Appel à l'API de suppression (à implémenter)
        console.log("Suppression du commentaire ID:", commentaireId);
      }
    });
  });
  
  // Pour les boutons de modification
  const modifierBtns = document.querySelectorAll(".modifierBtn");
  modifierBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const commentaireId = btn.dataset.id;
      // La fonction ouvrirModalModification est définie dans modifier.js
      // et sera appelée via l'événement déclenché sur ce bouton
    });
  });
}

// **** appel à la fonction pour ajouter les commentaires à la page ""d'accueil""
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier périodiquement si les commentaires sont disponibles
  const checkData = setInterval(() => {
    const commentaires = JSON.parse(localStorage.getItem("commentaires")) // sélectionner les commentaires enregistrés dans localStorage
    if (commentaires) {
      clearInterval(checkData);
      displayCommentaires(commentaires);
    }
  }, 10); // Vérifie toutes les 10ms
});