// ====== Configuration des routes et restrictions d'accès ======

// Récupération des informations utilisateur
const currentUrl = window.location.pathname;
const userAuth = JSON.parse(localStorage.getItem("userAuth")) || null;
const userRole = userAuth?.role || null;
const token = JSON.parse(localStorage.getItem("token")) || null;
const isAuthenticated = !!userAuth && !!token;

// Définition des routes
const routes = {
    auth: {
        admin: [
            "/frontend/html/admin",
            "/frontend/html/admin/dashboard",
            "/frontend/html/admin/reservations",
            "/frontend/html/admin/clients",
            "/frontend/html/admin/voitures",
            "/frontend/html/admin/commentaires",
            "/frontend/html/admin/profile",
        ],
        client: [
            "/frontend/html/client",
            "/frontend/html/client/dashboard",
            "/frontend/html/client/voitures",
            "/frontend/html/client/commentaires",
            "/frontend/html/client/reservations",
            "/frontend/html/client/profile",
        ]
    },
    public: [
        "/frontend/html/page_accueil",
        "/frontend/html/page_voitures",
        "/frontend/html/contact_nous",
        "/frontend/html/authentification/inscription",
        "/frontend/html/authentification/connexion"
    ]
};

// Fonction pour déterminer le type de route actuelle
function getCurrentRouteType() {
    // Vérifie d'abord les routes auth
    for (const role in routes.auth) {
        if (routes.auth[role].some(route => currentUrl.includes(route))) {
            return { type: "auth", role };
        }
    }

    // Vérifie les routes publiques
    if (routes.public.some(route => currentUrl.includes(route))) {
        return { type: "public" };
    }

    return { type: "unknown" };
}

// Fonction pour rediriger selon le rôle
function redirectByRole() {
    if (userRole === "admin") {
        window.location.href = "/frontend/html/admin/dashboard.html";
    } else if (userRole === "client") {
        window.location.href = "/frontend/html/client/dashboard.html";
    }
}

// Fonction pour bloquer la navigation arrière/avant
function blockNavigation() {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
        window.history.pushState(null, null, window.location.href);
        redirectByRole();
    });
}

// ====== Application des restrictions ======
const currentRoute = getCurrentRouteType();

// 1. Si non authentifié et essaye d'accéder à une page protégée
if (currentRoute.type === "auth" && !isAuthenticated) {
    window.location.href = "/frontend/html/authentification/connexion.html";
}

// 2. Si authentifié et essaye d'accéder à une page publique
else if (currentRoute.type === "public" && isAuthenticated) {
    redirectByRole();
}

// 3. Si authentifié mais mauvais rôle
else if (currentRoute.type === "auth" && isAuthenticated && currentRoute.role !== userRole) {
    redirectByRole()
}

// 4. Si sur une page auth (après vérifications), bloquer la navigation
if (currentRoute.type === "auth" && isAuthenticated) {
    blockNavigation();
}
if (currentRoute.type === "public" && !isAuthenticated) {
    blockNavigation();
}

// 5. Gestion spéciale pour les pages de connexion/déconnexion
if (currentUrl.includes("/authentification/connexion") && isAuthenticated) {
    redirectByRole();
}

// if (currentUrl.includes("/deconnexion")) {
//     // Nettoyage avant déconnexion
//     localStorage.removeItem("userAuth");
//     localStorage.removeItem("token");
//     window.history.replaceState(null, null, "/frontend/html/page_accueil.html");
//     window.location.href = "/frontend/html/page_accueil.html";
// }