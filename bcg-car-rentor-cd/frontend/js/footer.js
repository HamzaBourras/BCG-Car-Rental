// script pour ajouter le footer1.html en bas des pages

fetch("/frontend/html/footer1.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer-container").innerHTML = html;
    // document.body.classList.add("loaded"); // Affiche le contenu après le chargement de la page
    
  })
  .catch((error) => console.error("Error loading footer:", error));
