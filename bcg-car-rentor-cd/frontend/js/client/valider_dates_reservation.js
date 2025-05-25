

// Récupérer les éléments du formulaire
const dateDebutInput = document.getElementById('date_debut');
const dateFinInput = document.getElementById('date_fin');
const dateDebutError = document.getElementById('date_debut_error');
const dateFinError = document.getElementById('date_fin_error');

// Définir la date minimale (aujourd'hui) pour la date de début
const today = new Date();
const formattedToday = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
dateDebutInput.setAttribute('min', formattedToday);

// fct pour valider la date de début
export function validateDateDebut() {
    // Réinitialiser les messages d'erreur
    dateDebutError.textContent = '';
    dateDebutInput.classList.remove('input-error');
    document.querySelector("#periodes_reservee").textContent = ""

    // S'assurer que la date n'est pas dans le passé
    if (dateDebutInput.value < formattedToday) {
        dateDebutError.textContent = 'La date de début ne peut pas être dans le passé';
        dateDebutInput.classList.add('input-error');

        return false;
    }

    // Si une date de fin est déjà sélectionnée, vérifier qu'elle est après la date de début
    if (dateFinInput.value) {
        validateDateFin();
    }

    // Mettre à jour la date minimale pour la date de fin
    dateFinInput.setAttribute('min', dateDebutInput.value);

    return true;
};

// Fonction pour valider la date de fin
export function validateDateFin() {
    // Réinitialiser les messages d'erreur
    dateFinError.textContent = '';
    dateFinInput.classList.remove('input-error');
    document.querySelector("#periodes_reservee").textContent = ""

    // Vérifier que les deux dates sont remplies
    if (dateDebutInput.value && dateFinInput.value) {
        // Vérifier que la date de fin est après la date de début
        if (dateFinInput.value <= dateDebutInput.value) {
            dateFinError.textContent = 'La date de fin doit être postérieure à la date de début';
            dateFinInput.classList.add('input-error');
            return false;
        }
    }
    return true;
}

// Valider la date de fin et debut lors de la saisie
dateFinInput.addEventListener('change', validateDateFin);
dateDebutInput.addEventListener('change', validateDateDebut);


// ** fct pour vérifier la date de reservation avec les périodes de disponibilité de la voiture
export function verifierDates(periodes_reservee) {
    const reservationErreur = document.querySelector("#periodes_reservee")
    reservationErreur.textContent = ""
    const debutInput = document.getElementById("date_debut")
    const finInput = document.getElementById("date_fin")
    let isReserved = false
    let erreurDates = false

    const dateDebut = new Date(debutInput.value)
    const dateFin = new Date(finInput.value)


    // Trier les périodes réservées par date de début pour permettre une recherche binaire
    periodes_reservee.sort((a, b) => new Date(a.debut) - new Date(b.debut));

    if (validateDateDebut() && validateDateFin()) {  // ces deux fcts existe dans le fichier valider_dates_reservations.js
        isReserved = periodes_reservee.some(periode =>
            dateDebut >= new Date(periode.debut) && dateDebut <= new Date(periode.fin) ||
            dateFin >= new Date(periode.debut) && dateFin <= new Date(periode.fin) ||
            dateDebut <= new Date(periode.debut) && dateFin >= new Date(periode.fin)
        );
    }
    else {
        reservationErreur.textContent = "Choisissez des dates valides"
        isReserved = true  // pour ne pas envoyer le formulaire
        erreurDates = true
    }

    if (isReserved && !erreurDates) {
        reservationErreur.textContent = "la période que vous avez choisi est déja réservé. Choisissez une autre période"
    }


    return isReserved
}
