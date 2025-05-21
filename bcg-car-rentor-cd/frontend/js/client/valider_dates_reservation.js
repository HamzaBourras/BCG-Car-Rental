

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



