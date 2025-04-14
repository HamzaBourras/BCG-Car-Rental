// Configuration des composants
const COMPONENTS_CONFIG = {
    accueil: {
        url: "/frontend/components/publicC/component_accueil.html",
        scripts: [
            "../js/page_accueil/get_voitures.js",
            "../js/page_accueil/display_voitures.js"
        ],
        styles: [
            "../css/page_accueil/main.css",
            "../css/page_accueil/presentation.css",
            "../css/page_accueil/best-deals.css",
            "../css/page_accueil/reviews.css",
            "../css/page_accueil/about_us.css"
        ]
    },
    voitures: {
        url: "/frontend/components/publicC/component_voitures.html",
        scripts: [
            "../js/page_voitures/display_voitures.js",
            "../js/page_accueil/get_voitures.js"
        ],
        styles: [
            "../css/page_voitures/page_voitures.css",
            "../css/page_accueil/best-deals.css"
        ]
    },
    contact: {
        url: "/frontend/components/publicC/component_contact.html",
        scripts: [],
        styles: [
            "../css/contact_nous/contact_nous.css"
        ]
    },
    about: {
        url: "/frontend/components/publicC/component_accueil.html",
        scripts: [],
        styles: []
    }
};

// Éléments DOM
const global_container = document.querySelector("#global_container");
let loadedResources = {
    scripts: new Set(),
    styles: new Set()
};

// Fonction principale pour changer de composant
function creerUrl(event) {
    const componentName = event.id;
    loadComponent(componentName);
}

// Charger un composant spécifique
function loadComponent(componentName) {
    const componentConfig = COMPONENTS_CONFIG[componentName] || COMPONENTS_CONFIG.accueil;

    // Sauvegarder l'état actuel
    localStorage.setItem('currentComponent', componentName);

    // Nettoyer les ressources précédentes
    cleanUpResources();

    // Charger le nouveau composant
    displayComponent(componentConfig.url);

    // Ajouter les nouvelles ressources
    addResources(componentConfig.scripts, componentConfig.styles);
}

// Afficher le composant
function displayComponent(url) {
    fetch(url)
        .then((response) => response.text())
        .then((html) => {
            global_container.innerHTML = html;
        })
        .catch((error) => console.error("Error loading component:", error));
}

// Ajouter les ressources (scripts et CSS)
function addResources(scripts = [], styles = []) {
    // Ajouter les CSS
    styles.forEach(src => {
        if (!loadedResources.styles.has(src)) {
            const link = document.createElement('link');
            link.href = src;
            link.rel = "stylesheet";
            link.setAttribute('data-dynamic', 'true');
            document.head.appendChild(link);
            loadedResources.styles.add(src);
        }
    });

    // Ajouter les scripts
    scripts.forEach(src => {
        if (!loadedResources.scripts.has(src)) {
            const script = document.createElement('script');
            script.src = src;
            script.type = "module";
            script.setAttribute('data-dynamic', 'true');
            document.body.appendChild(script);
            loadedResources.scripts.add(src);
        }
    });
}

// Nettoyer les ressources précédentes
function cleanUpResources() {
    // Supprimer les styles chargés dynamiquement
    document.querySelectorAll('link[data-dynamic="true"]').forEach(link => {
        link.remove();
    });

    // Supprimer les scripts chargés dynamiquement
    document.querySelectorAll('script[data-dynamic="true"]').forEach(script => {
        script.remove();
    });

    // Réinitialiser le suivi des ressources
    loadedResources.scripts.clear();
    loadedResources.styles.clear();
}

// Initialisation
function init() {
    // Récupérer le composant sauvegardé ou utiliser l'accueil par défaut
    const savedComponent = localStorage.getItem('currentComponent');
    const defaultComponent = savedComponent || "accueil";

    loadComponent(defaultComponent);
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', init);