
// script pour rendre le navbar responsive

  let nav = document.getElementById("nav");
  let menu = document.getElementById("menu");
  menu.style.maxHeight = "0px";


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
