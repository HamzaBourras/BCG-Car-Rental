import getData from "../functions/getData.js";
import { INDEX_COMMENTAIRES } from "../../apis/api.js";

async function getCommentaires(params) {

    try {
        await getData.getD(INDEX_COMMENTAIRES)
        if (getData.success == true) {
            localStorage.setItem("commentaires", JSON.stringify(getData.returnData))  // Enregistrer les commentaires sur localStorage

        }
    } catch (error) {
        if (getData.success == false) {
            console.log(getData.errors);
        }
    }
}

// **** appel à la fonction pour recevoir tous les commentaires
document.addEventListener("DOMContentLoaded", function () {
    //vérifer si les commentaires ne sont pas déja récupérer
    if (!localStorage.getItem("commentaires")) {
        getCommentaires();
    }
});


// **** fonction pour ajouter les commentaires à la page ""d'accueil""
function displayCommentaires(commentaires) {
    let sectionsCommentaires = document.querySelector(".comments-cards")

    let content = ""
    let stars = ""
    let numberOfStars = 0
    let numberOfCommentaires = 0
    commentaires.forEach(commentaire => {
        if (numberOfCommentaires < 4) {
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
      </div>
        `
        }
        numberOfCommentaires++;
    });

    sectionsCommentaires.innerHTML = content
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