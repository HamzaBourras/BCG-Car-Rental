// script pour ajouter le navbar1.html en haut des pages

fetch("/frontend/html/navbar1.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("navbar_container").innerHTML = html;
    // document.body.classList.add("loaded"); // Affiche le contenu après le chargement de la page
    initResponsiveNavbar(); // appeler le script de responsive
  })
  .catch((error) => console.error("Error loading navbar:", error));

// script pour rendre le navbar responsive
function initResponsiveNavbar() {
  let nav = document.getElementById("nav");
  let menu = document.getElementById("menu");
  menu.style.maxHeight = "0px";
}

function toggleMenu() {
  if (menu.style.maxHeight == "0px") {
    menu.style.maxHeight = "300px";
    menu.style.padding = "30px 0 100px 0";
    menu.style.borderBottom = "2px solid white";
    // nav.style.borderBottom = "none";
    nav.style.backgroundColor = "black";
  } else {
    menu.style.maxHeight = "0px";
    menu.style.padding = "0px";
    menu.style.borderBottom = "none";
    nav.style.transition = "0.5s";
    nav.style.backgroundColor = "inherit";
    setTimeout(() => {
      nav.style.borderBottom = "2px solid white";
    }, 500);
  }
}
