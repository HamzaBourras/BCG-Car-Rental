// ====== ce script est utilisé pour ajouter des restrictions sur les urls selon l'authentification 

const currentUrl = window.location.pathname;
const userAuth = JSON.parse(localStorage.getItem("userAuth"))
const userRole = userAuth?.role
const token = JSON.parse(localStorage.getItem("token"))

const authuntified = userAuth && token  // stock le status de l'utilisateur

const routes = {
    "auth": [
        "/frontend/html/admin",
        "/frontend/html/client"
    ],
    "public": [
        "/frontend/html/page_accueil",
        "/frontend/html/page_voitures",
        "/frontend/html/contact_nous",
        "/frontend/html/authentification/inscription",
        "/frontend/html/authentification/connexion",
    ]
}

let currentKey = null
for (const key in routes) {

    for (const route of routes[key]) {

        if (currentUrl.includes(route)) {
            currentKey = key
        }
    }

}

// restrections de l'authentification
if (currentKey === "auth" && !authuntified) window.location.href = "/frontend/html/authentification/connexion.html"
if (currentKey === "public" && authuntified) {
    // à changer
    if (currentUrl.includes("/frontend/html/admin/") || currentUrl.includes("/frontend/html/client/")) {
        window.history.go(-1);
    }
    else {
        if (userRole === "admin") window.location.href = "/frontend/html/admin/dashboard.html"
        else if (userRole === "client") window.location.href = "/frontend/html/client/dashboard.html"
    }
}

// restrection des roles 
const role_in_url = currentUrl.split("/")[3]
if (currentKey === "auth" && authuntified && role_in_url != userRole) window.history.go(-1)