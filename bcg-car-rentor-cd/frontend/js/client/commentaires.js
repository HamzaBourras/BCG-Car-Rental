import getData from "../functions/getData.js";
import { INDEX_COMMENTAIRES } from "../../apis/api.js";
import { getCommentaires } from "../page_accueil/get_display_commentaires.js";

// **** appel à la fonction pour recevoir tous les commentaires
document.addEventListener("DOMContentLoaded", function () {
  //vérifer si les commentaires ne sont pas déja récupérer
  if (!localStorage.getItem("commentaires")) {
    getCommentaires();
  }
  
  // Initialisation des écouteurs pour la modale
  initModalEvents();
});

// **** fonction pour ajouter les commentaires à la page ""d'accueil""
function displayCommentaires(commentaires) {
  let sectionsCommentaires = document.querySelector(".comments-cards");

  let content = "";
  let stars = "";
  let numberOfStars = 0;
  
  commentaires.forEach((commentaire, index) => {
    stars = "";
    numberOfStars = 0;
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
          <button class="modifierBtn" data-index="${index}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="supprimerBtn" data-id="${commentaire.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  sectionsCommentaires.innerHTML = content;
  
  // Ajout des écouteurs d'événements pour les boutons de modification
  document.querySelectorAll('.modifierBtn').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      openEditModal(commentaires[index]);
    });
  });
}

// Fonctions pour la modale de modification
function initModalEvents() {
  // Gérer la soumission du formulaire de modification
  document.getElementById('editCommentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const commentId = this.getAttribute('data-id');
    const newContent = document.getElementById('editCommentText').value;
    
    // Simulation de mise à jour avant l'intégration avec l'API
    const commentaires = JSON.parse(localStorage.getItem("commentaires"));
    const updatedCommentaires = commentaires.map(comment => {
      if(comment.id == commentId) {
        return {...comment, contenu: newContent};
      }
      return comment;
    });
    
    localStorage.setItem("commentaires", JSON.stringify(updatedCommentaires));
    displayCommentaires(updatedCommentaires);
    closeEditModal();
  });

  // Gérer le bouton Annuler
  document.getElementById('cancelEdit')?.addEventListener('click', closeEditModal);

  // Fermer la modale si on clique en dehors
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
      closeEditModal();
    }
  });
}

function openEditModal(comment) {
  const modal = document.getElementById('editModal');
  const textarea = document.getElementById('editCommentText');
  
  if (modal && textarea) {
    textarea.value = comment.contenu;
    modal.style.display = 'block';
    document.getElementById('editCommentForm').setAttribute('data-id', comment.id);
  } else {
    console.error("La modale ou le textarea n'a pas été trouvé dans le DOM");
  }
}

function closeEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// **** appel à la fonction pour ajouter les commentaires à la page ""d'accueil""
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier périodiquement si les commentaires sont disponibles
  const checkData = setInterval(() => {
    const commentaires = JSON.parse(localStorage.getItem("commentaires"));
    if (commentaires) {
      clearInterval(checkData);
      displayCommentaires(commentaires);
    }
  }, 10);
});