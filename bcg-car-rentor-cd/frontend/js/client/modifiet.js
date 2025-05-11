import { CLIENT_EDIT_COMMENTAIRES } from "../../apis/api.js";

document.addEventListener("DOMContentLoaded", function () {
    // Attendre que les commentaires soient chargés
    const checkComments = setInterval(() => {
        const commentsCards = document.querySelector(".comments-cards");
        if (commentsCards && commentsCards.children.length > 0) {
            clearInterval(checkComments);
            setupModificationListeners();
        }
    }, 100);

    // Configuration des éléments de la modal
    const modal = document.getElementById("modifierModal");
    const closeBtn = document.querySelector(".close");
    const annulerBtn = document.getElementById("annulerBtn");
    const modifierForm = document.getElementById("modifierForm");

    // Fermer la modal quand on clique sur la croix
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Fermer la modal quand on clique sur le bouton Annuler
    if (annulerBtn) {
        annulerBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Fermer la modal quand on clique en dehors de la modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Gérer la soumission du formulaire
    if (modifierForm) {
        modifierForm.addEventListener("submit", (e) => {
            e.preventDefault();
            modifierCommentaire();
        });
    }
});

// Configurer les écouteurs d'événements pour les boutons de modification
function setupModificationListeners() {
    // Mettre à jour le code pour sélectionner tous les boutons de modification
    // Utiliser querySelectorAll pour sélectionner tous les boutons
    const modifierBtns = document.querySelectorAll(".modifierBtn");
    
    modifierBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            ouvrirModalModification(btn.dataset.id);
        });
    });
}

// Fonction pour ouvrir la modal de modification avec le commentaire existant
function ouvrirModalModification(commentaireId) {
    const modal = document.getElementById("modifierModal");
    const commentaireIdInput = document.getElementById("commentaireId");
    const contenuCommentaire = document.getElementById("contenuCommentaire");
    
    // Récupérer les commentaires du localStorage
    const commentaires = JSON.parse(localStorage.getItem("commentaires"));
    
    // Trouver le commentaire correspondant à l'ID
    const commentaire = commentaires.find(c => c.id == commentaireId);
    
    if (commentaire) {
        // Remplir le formulaire avec les données existantes
        commentaireIdInput.value = commentaireId;
        contenuCommentaire.value = commentaire.contenu;
        
        // Afficher la modal
        modal.style.display = "block";
    } else {
        alert("Commentaire non trouvé.");
    }
}

// Fonction pour modifier le commentaire
async function modifierCommentaire() {
    const commentaireId = document.getElementById("commentaireId").value;
    const contenuCommentaire = document.getElementById("contenuCommentaire").value;
    const modal = document.getElementById("modifierModal");
    
    if (!contenuCommentaire.trim()) {
        alert("Le commentaire ne peut pas être vide.");
        return;
    }
    
    try {
        // Créer l'objet de données pour la requête
        const data = {
            id: commentaireId,
            contenu: contenuCommentaire
        };
        
        // Envoyer la requête au serveur
        const response = await fetch(CLIENT_EDIT_COMMENTAIRES + commentaireId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            
            if (result.success) {
                // Mettre à jour le commentaire dans le localStorage
                const commentaires = JSON.parse(localStorage.getItem("commentaires"));
                const index = commentaires.findIndex(c => c.id == commentaireId);
                
                if (index !== -1) {
                    commentaires[index].contenu = contenuCommentaire;
                    localStorage.setItem("commentaires", JSON.stringify(commentaires));
                    
                    // Mettre à jour l'affichage
                    const commentElement = document.querySelector(`.comment-card[data-id="${commentaireId}"] .comment p`);
                    if (commentElement) {
                        commentElement.textContent = contenuCommentaire;
                    } else {
                        // Si l'élément n'est pas trouvé, rafraîchir toute la page
                        location.reload();
                    }
                    
                    // Fermer la modal
                    modal.style.display = "none";
                    
                    // Afficher un message de succès
                    alert("Votre commentaire a été modifié avec succès.");
                }
            } else {
                alert("Erreur lors de la modification du commentaire: " + result.message);
            }
        } else {
            const errorData = await response.json();
            alert("Erreur lors de la modification du commentaire: " + (errorData.message || "Erreur inconnue"));
        }
    } catch (error) {
        console.error("Erreur lors de la modification du commentaire:", error);
        alert("Une erreur est survenue lors de la modification du commentaire.");
    }
}

// Modification du code pour mettre à jour le fichier commentaires.js
export function mettreAJourAffichageCommentaires(commentaires) {
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
    
    // Réinitialiser les écouteurs d'événements après mise à jour du DOM
    setupModificationListeners();
}