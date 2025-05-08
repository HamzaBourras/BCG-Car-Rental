// script pour ajouter le header et le sidebar 

fetch("../../html/client/sidebar.html")
    .then((response) => response.text())
    .then((html) => {
        document.getElementById("side").innerHTML = html;
        document.body.classList.add("loaded"); // Affiche le contenu après le chargement de la page
    })
    .catch((error) => console.error("Error loading side:", error));


fetch("../../html/client/header.html")
    .then((response) => response.text())
    .then((html) => {
        document.getElementById("header").innerHTML = html;
        document.body.classList.add("loaded"); // Affiche le contenu après le chargement de la page
    })
    .catch((error) => console.error("Error loading side:", error));
