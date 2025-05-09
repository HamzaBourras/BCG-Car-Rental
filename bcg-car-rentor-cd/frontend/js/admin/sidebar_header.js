// script pour ajouter le header et le sidebar  et le script de connexion et le script axios

// Chargement simultané du header et du sidebar
Promise.all([
    fetch("../../html/admin/header.html").then(res => res.text()),
    fetch("../../html/admin/sidebar.html").then(res => res.text())
])
    .then(([headerHtml, sidebarHtml]) => {
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