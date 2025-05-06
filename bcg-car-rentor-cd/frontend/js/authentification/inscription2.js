document.addEventListener('DOMContentLoaded', function() {
  // Récupérer les éléments du formulaire
  const form = document.querySelector('form');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  
  // Créer des éléments pour afficher les messages d'erreur
  const passwordError = document.createElement('div');
  passwordError.className = 'error-message';
  passwordError.style.display = 'none';
  passwordInput.parentNode.appendChild(passwordError);
  
  const confirmError = document.createElement('div');
  confirmError.className = 'error-message';
  confirmError.style.display = 'none';
  confirmPasswordInput.parentNode.appendChild(confirmError);
  
  // Fonction pour valider le mot de passe
  function validatePassword() {
      const isValid = passwordInput.value.length === 6;
      
      if (!isValid) {
          passwordError.textContent = 'Le mot de passe doit contenir exactement 6 caractères';
          passwordError.style.display = 'block';
          passwordInput.classList.add('input-error');
      } else {
          passwordError.style.display = 'none';
          passwordInput.classList.remove('input-error');
      }
      
      return isValid;
  }
  
  // Fonction pour valider la confirmation du mot de passe
  function validateConfirmPassword() {
      const isValid = confirmPasswordInput.value === passwordInput.value;
      
      if (!isValid) {
          confirmError.textContent = 'Les mots de passe ne correspondent pas';
          confirmError.style.display = 'block';
          confirmPasswordInput.classList.add('input-error');
      } else {
          confirmError.style.display = 'none';
          confirmPasswordInput.classList.remove('input-error');
      }
      
      return isValid;
  }
  
  // Valider le mot de passe lors de la saisie
  passwordInput.addEventListener('input', function() {
      validatePassword();
      // Si la confirmation a déjà été saisie, valider également
      if (confirmPasswordInput.value) {
          validateConfirmPassword();
      }
  });
  
  // Valider la confirmation lors de la saisie
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);
  
  // Valider tout le formulaire lors de la soumission
  form.addEventListener('submit', function(event) {
      let isValid = true;
      
      // Valider le mot de passe
      if (!validatePassword()) {
          isValid = false;
      }
      
      // Valider la confirmation
      if (!validateConfirmPassword()) {
          isValid = false;
      }
      
      // Empêcher la soumission si le formulaire n'est pas valide
      if (!isValid) {
          event.preventDefault();
      }
  });
});