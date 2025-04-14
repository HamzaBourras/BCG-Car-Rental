import { baseUrl } from "../../apis/api.js";

// **** fonction pour ajouter les voitures à la page ""d'accueil""
function displayVoitures() {
  let sectionsCards = document.querySelector(".cars-cards");

  let content = "";
  let voitures = JSON.parse(localStorage.getItem("voitures")) // sélectionner les voitures enregistrer dans localStorage avec le fichier /page_accueil/get_voitures.js
  let number = 1;
  voitures.forEach((voiture) => {
    if (number <= 3) {
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
          <button class="reservation-btn">
            <span>Reservation</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button href="https://wa.me/YOUR_NUMBER" class="whatsapp-btn" target="_blank">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
      </div>
      `;
    }
    number++;
  });

  sectionsCards.innerHTML = content;
}

// **** appel à la fonction pour ajouter les voitures à la page ""d'accueil""
// document.addEventListener("DOMContentLoaded", function () {
displayVoitures();
// });

