//===== script pour ajouter le header et le sidebar  et le script de connexion et de script des routes

// ajouter le script de restrictions des routes au document
// function loadRoutes() {
//     return new Promise((resolve) => {

//         const script = document.createElement('script')
//         script.src = "/frontend/js/routes_config.js"
//         script.onload = resolve;
//         document.body.appendChild(script)
//     });
// }



// Chargement simultané du header et du sidebar
Promise.all([
    fetch("../../html/client/header.html").then(res => res.text()),
    fetch("../../html/client/sidebar.html").then(res => res.text())
])
    .then(async ([headerHtml, sidebarHtml]) => {
        // await loadRoutes() // attender que le script des routes etre ajouté
        // Insérer le header
        const headerElement = document.getElementById("header");
        if (headerElement) {
            headerElement.innerHTML = headerHtml;
        }

        // Insérer le sidebar et ajouter le script de déconnexion
        const sidebarElement = document.getElementById("side");
        if (sidebarElement) {
            sidebarElement.innerHTML = sidebarHtml;

        }

        // Ajouter le script de déconnexion et axios
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '../../js/authentification/deconnecter.js';
        document.body.appendChild(script);

        const scriptAxios = document.createElement('script')
        scriptAxios.type = 'module'
        scriptAxios.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
        document.body.appendChild(scriptAxios)

        // Marquer la page comme chargée
        document.body.classList.add("loaded");
    })
    .catch((error) => {
        console.error("Erreur lors du chargement des éléments:", error);
    });