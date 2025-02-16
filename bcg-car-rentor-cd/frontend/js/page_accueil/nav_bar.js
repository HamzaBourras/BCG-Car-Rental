let menu = document.getElementById("menu");
menu.style.maxHeight = "0px"
    
function toggleMenu() {
    if (menu.style.maxHeight == "0px") {
        menu.style.maxHeight = "300px";
        menu.style.padding = "30px 0 100px 0";
    }
    else {
        menu.style.maxHeight = "0px";
        menu.style.padding = "0px";
    }
}

