import sendData from "../functions/sendData.js";
import { ADMIN_DESTROY_COMMENTAIRES } from "../../apis/api.js";
import { getCommentaires } from "../page_accueil/get_display_commentaires.js";
import { displayMessageErreurs } from "../display_message_erreurs.js"

// **** appel à la fonction pour recevoir tous les commentaires
document.addEventListener("DOMContentLoaded", function () {
    //vérifer si les commentaires ne sont pas déja récupérer
    if (!localStorage.getItem("commentaires")) {
        getCommentaires();
    }
});

let commentaire_id_S = null  // l'id du commentaire à supprimer

// **** fonction pour ajouter les commentaires à la page ""d'accueil""
function displayCommentairesAdmin(commentaires) {

    let sectionsCommentaires = document.querySelector(".comments-cards")

    let content = ""
    let stars = ""
    let numberOfStars = 0
    commentaires.forEach(commentaire => {

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
        <div id="actions">
        <button id="supprimerBtn" data-commentaire-id="${commentaire.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
        `

    });

    sectionsCommentaires.innerHTML = content

    // ajouter event click sur tous les buttons supprimer
    document.querySelectorAll('#supprimerBtn').forEach(btn => {
        btn.addEventListener('click', function () {
            commentaire_id_S = this.getAttribute('data-commentaire-id');

            const conf = confirm("voulez vous supprimer ce commentaire ?")
            if (conf) {
                // Appeler la fonction de suppression
                supprimerCommentaire(commentaire_id_S)
            }
        });
    });
}


// **** appel à la fonction pour ajouter les commentaires à la page ""d'accueil""
document.addEventListener("DOMContentLoaded", function () {
    // Vérifier périodiquement si les voitures sont disponibles
    const checkData = setInterval(() => {
        const commentaires = JSON.parse(localStorage.getItem("commentaires")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
        if (commentaires) {
            clearInterval(checkData);
            displayCommentairesAdmin(commentaires);
        }
    }, 10); // Vérifie toutes les 10ms
});


/***** fct pour supprimer un commentaire */
async function supprimerCommentaire(commentaire_id) {

    try {
        await sendData.postData(ADMIN_DESTROY_COMMENTAIRES, {}, "delete", commentaire_id, false);
        if (sendData.success === true) {
            //affichage message succès
            displayMessageErreurs(null, sendData.message, sendData.success);
            const commentairesS = await getCommentaires()  // appel à la fct pour recevoir les commentaires après la modification
            displayCommentairesAdmin(commentairesS)


        }
    } catch (error) {
        // affichage des erreurs du message
        if (sendData.success === false)
            displayMessageErreurs(sendData.errors, sendData.message, sendData.success)

    }
}