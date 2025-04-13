let envoyer=document.getElementById("envoyer")
let password=document.getElementById("password")
let motpasseverif=document.getElementById("motpasseverif")
const form = document.querySelector("form");
motpasseverif.disabled = true;
password.addEventListener("input", function () {
    if (password.value.trim() !== "") {
        motpasseverif.disabled = false;
    } else {
        motpasseverif.disabled = true;
        motpasseverif.value = ""; // Vide le champ si le mot de passe est effacé
    }
  });


form.addEventListener("submit", function (e) {
  const mdp = document.getElementById("password").value;
  const mdpverif = document.getElementById("motpasseverif").value;
  if (mdp !== mdpverif) {
    e.preventDefault(); // Empêche l'envoi du formulaire
    alert("Les mots de passe ne correspondent pas !");
  }
});