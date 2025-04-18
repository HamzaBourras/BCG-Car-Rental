let envoyer = document.getElementById("envoyer")
let password = document.getElementById("password")
let motpasseverif = document.getElementById("motpasseverif")
motpasseverif.disabled = true;
password.addEventListener("input", function () {
  if (password.value.trim() !== "") {
    motpasseverif.disabled = false;
  } else {
    motpasseverif.disabled = true;
    motpasseverif.value = ""; // Vide le champ si le mot de passe est effacé
  }
});

