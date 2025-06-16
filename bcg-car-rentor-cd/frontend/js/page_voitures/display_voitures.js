import { baseUrl } from "../../apis/api.js";
const voitures = JSON.parse(localStorage.getItem("voitures")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
// **** fonction pour initialiser l'input des marquees
function initialiseMarques(voitures) {
  let marqueesSelect = document.querySelector("#marque")
  let content = "<option>Select marque</option>"
  voitures.forEach((voiture) => {
    content += `<option> ${voiture.marque} </option>` // enregistrer tous les marquees des voitures
  })

  marqueesSelect.innerHTML = content
}



// **** fonction pour ajouter les voitures à la page ""des voitures""
let sectionsCards = document.querySelector(".cars-cards");
function displayVoitures(voitures) {

  let content = "";

  voitures.forEach((voiture) => {
    content += `
      <div class="car-card">
        <img src="${baseUrl + voiture.image}" alt="${voiture.marque} ${voiture.modele
      } " class="car-image">
        <h2>${voiture.marque} ${voiture.modele}</h2>
        <p class="price">A PARTIR DE ${voiture.prix_jour}dh/jour</p>

        <!-- Car options (Seats, Diesel, Climatiseur) -->
        <div class="car-options">
          <div class="seat-option">
            <img src="../images/Options/seat.png" alt="">
            <span>${voiture.nombre_place} Places</span>
          </div>
          <div class="diesel-option">
            <img src="../images/Options/diesel.png" alt="">
            <span>${voiture.type_carburant}</span>
          </div>
          <div class="climat-option">
            <img src="../images/Options/clim2.png" alt="">
            <span>${voiture.climat ? "oui" : "non"}</span>
          </div>
        </div>

        <!-- Reservation Button and WhatsApp (or phone) Icon -->
        <div class="reservation">
          <button onclick="window.location.href = '/frontend/html/authentification/connexion.html' " class="reservation-btn">
            <span>Reservation</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button href="https://wa.me/YOUR_NUMBER" class="whatsapp-btn" target="_blank">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
      </div>
      `;

  });

  sectionsCards.innerHTML = content;
}

// **** appel à la fonction pour ajouter les voitures à la page ""des voitures""
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier périodiquement si les voitures sont disponibles
  const checkData = setInterval(() => {
    const voitures = JSON.parse(localStorage.getItem("voitures")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
    if (voitures) {
      clearInterval(checkData);
      displayVoitures(voitures);  // ajouter les voitures à la page
      initialiseMarques(voitures);  // initialiser l'input des modules des voitures
    }
  }, 10); // Vérifie toutes les 10ms
});



const marque = document.querySelector("#marque");
const prix_min = document.querySelector("#prix_min");
const prix_max = document.querySelector("#prix_max");
const resetButton = document.querySelector("#reset-btn");

function filtrerVoitures() {
  const marqueValue = marque.value.trim().toLowerCase();
  const prixMinValue = parseFloat(prix_min.value) || 0;
  const prixMaxValue = parseFloat(prix_max.value) || Infinity;

  const voituresFiltrees = voitures.filter(voiture => {
    const matchesMarque = marqueValue == "select marque" || voiture.marque.toLowerCase().includes(marqueValue);
    const matchesPrixMin = voiture.prix_jour >= prixMinValue;
    const matchesPrixMax = voiture.prix_jour <= prixMaxValue;

    return matchesMarque && matchesPrixMin && matchesPrixMax;
  });

  if (voituresFiltrees.length > 0) {
    displayVoitures(voituresFiltrees);
  } else {
    // Afficher un message 
    sectionsCards.innerHTML = `
      <div>
        <h3 style="color:#969696; font-weight:600; font-size:20px;">Aucune voiture trouvée pour ces critères.</h3>
      </div>
    `;
  }
}


// Écouteurs d'événements pour tous les filtres
marque.addEventListener("input", filtrerVoitures);
prix_min.addEventListener("input", filtrerVoitures);
prix_max.addEventListener("input", filtrerVoitures);

// Réinitialisation des filtres
resetButton.addEventListener("click", () => {
  marque.selectedIndex = 0;
  prix_min.value = "";
  prix_max.value = "";
  voituresFiltrees = [...voitures]; // Crée une copie du tableau original
  displayVoitures(voitures);
});


