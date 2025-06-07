import { baseUrl } from "../../apis/api.js";
import sendData from "../functions/sendData.js"
import { MODIFIER_PROFILE_API } from "../../apis/api.js";
import { displayMessageErreurs } from "../display_message_erreurs.js"


// Éléments du DOM
const image = document.getElementById('profile-image');
const uploadIcon = document.getElementById('upload-icon');
const imageUpload = document.getElementById('image-upload');
const annulerBtn = document.getElementById('annuler');
const enregistrerBtn = document.getElementById('enregistrer');

// Champs de formulaire
const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const email = document.getElementById('email');
const telephone = document.getElementById('telephone');
const adresse = document.getElementById('adresse');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');


// Fonction pour obtenir les données par défaut

function getDefaultUserData() {
    let userAuthData = JSON.parse(localStorage.getItem('userAuth'));
    return {
        id: userAuthData.id,
        nom: userAuthData.nom,
        prenom: userAuthData.prenom,
        email: userAuthData.email,
        telephone: userAuthData.telephone,
        adresse: userAuthData.adresse,
        password: '********',
        image: userAuthData.image || '', // Assurez-vous que l'image est définie
    };
}

let userData = getDefaultUserData(); // Initialiser avec les données par défaut

// fct pour initialiser le profil de l'utilisateur
function initialiseProfile(userData) {

    // Remplir les champs du formulaire avec les données de l'utilisateur
    nom.value = userData.nom || '';
    prenom.value = userData.prenom || '';
    email.value = userData.email || '';
    telephone.value = userData.telephone || '';
    adresse.value = userData.adresse || '';
    password.value = '';
    confirmPassword.value = '';

    // Afficher l'image de profil si elle existe
    if (userData.image) {
        const img = document.createElement('img');
        img.src = baseUrl + userData.image;
        image.innerHTML = '';
        image.style.backgroundColor = 'inherit'; // Assurez-vous que le fond est transparent
        image.appendChild(img);
    }
}


// fct pour enregistrer les modifications
enregistrerBtn.addEventListener('click', async function () {
    // Vérifier si les mots de passe correspondent
    if (password.value !== confirmPassword.value) {
        displayMessageErreurs('Les mots de passe ne correspondent pas.', 'Erreur');
        return;
    }
    // Préparer les données à envoyer
    const formData = new FormData();
    formData.append('nom', nom.value);
    formData.append('prenom', prenom.value);
    formData.append('email', email.value);
    formData.append('telephone', telephone.value);
    formData.append('adresse', adresse.value);
    formData.append('password', password.value);
    formData.append('motpasseverif', confirmPassword.value);

    // Modifier cette partie pour envoyer le fichier image directement
    if (imageUpload.files[0]) {
        formData.append('image', imageUpload.files[0]);
    }

    // Envoyer les données au serveur
    try {
        await sendData.postData(MODIFIER_PROFILE_API, formData, "post", userData.id, true);
        if (sendData.success === true) {
            //stocker le token et le user
            localStorage.setItem("token", JSON.stringify(sendData.token))
            localStorage.setItem("userAuth", JSON.stringify(sendData.returnData))
            //affichage message succès
            displayMessageErreurs(null, sendData.message, sendData.success);

            userData = getDefaultUserData(); // Réinitialiser les données utilisateur
            initialiseProfile(userData);

        }
    }

    catch (error) {
        console.log(error);

        if (sendData.success === false)
            displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
        return;
    }
});



// Gérer le changement d'image
imageUpload.addEventListener('change', function (event) {

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            userData.image = e.target.result;

            // Créer ou mettre à jour l'image
            if (!document.querySelector('#profile-image img')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                image.innerHTML = '';
                image.appendChild(img);
            } else {
                document.querySelector('#profile-image img').src = e.target.result;
            }
        };

        reader.readAsDataURL(event.target.files[0]);
    }
});

// fct pour annuler les modifications
annulerBtn.addEventListener('click', function () {
    // Réinitialiser les données utilisateur aux valeurs par défaut
    initialiseProfile(userData);
});


// initialiser le profil de l'utilisateur
document.addEventListener('DOMContentLoaded', function () {
    initialiseProfile(userData);
})