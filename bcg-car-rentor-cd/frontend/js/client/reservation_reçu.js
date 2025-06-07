// ======= ce script est utilisé pour initialiser les informations du reçu

const I = setInterval(() => {
    const recuInfos = JSON.parse(localStorage.getItem("recuInfos")); // récupérer les informations du reçu depuis le localStorage
    if (recuInfos) {
        clearInterval(I); // arrêter l'intervalle une fois les données récupérées
        displayRecu(recuInfos); // afficher le reçu avec les informations récupérées
    }
}, 10); // vérifier toutes les 10ms


function displayRecu(recuInfos) {
    const recuContainer = document.getElementById("recuContainer");

    recuContainer.innerHTML = `
        <!-- Header avec logo -->
        <div class="header">
            <div class="logo-section">
                <div class="logo"><img src="../../images/logo2.png" style="width: 100%;" alt=""></div>
                <h1 class="agency-name">AUTO RENT MAROC</h1>
            </div>
            <div class="receipt-title">
                <h2>REÇU DE RÉSERVATION</h2>
                <div class="receipt-number">N° ${recuInfos.reservation_numero}</div>
            </div>
        </div>

        <!-- Contenu principal -->
        <div class="content">
            <!-- Date d'émission -->
            <div class="emission-date">
                <p>Date d'émission: ${recuInfos.reservation_date_emession} </p>
            </div>

            <!-- Informations client -->
            <div class="section">
                <h3 class="section-title">INFORMATIONS CLIENT</h3>
                <div class="info-grid">
                    <div>
                        <p class="info-row"><span class="label">Nom:</span> ${recuInfos.client_nom} </p>
                        <p class="info-row"><span class="label">Prénom:</span> ${recuInfos.client_prenom}</p>
                    </div>
                    <div>
                        <p class="info-row"><span class="label">Email:</span> ${recuInfos.client_email} </p>
                        <p class="info-row"><span class="label">Téléphone:</span> ${recuInfos.telephone} </p>
                    </div>
                </div>
            </div>

            <!-- Informations véhicule -->
            <div class="section">
                <h3 class="section-title">VÉHICULE RÉSERVÉ</h3>
                <div class="info-grid-3">
                    <p class="info-row"><span class="label">Marque:</span> ${recuInfos.voiture_marque} </p>
                    <p class="info-row"><span class="label">Modèle:</span> ${recuInfos.voiture_modele} </p>
                    <p class="info-row"><span class="label">Matricule:</span> ${recuInfos.voiture_matricule} </p>
                </div>
            </div>

            <!-- Détails de la réservation -->
            <div class="section">
                <h3 class="section-title">DÉTAILS DE LA RÉSERVATION</h3>
                <div class="info-grid">
                    <p class="info-row"><span class="label">Date de début:</span> ${recuInfos.reservation_date_debut} </p>
                    <p class="info-row"><span class="label">Date de fin:</span> ${recuInfos.reservation_date_fin} </p>
                </div>
                <p class="info-row"><span class="label">Adresse de livraison:</span> ${recuInfos.reservation_adresse_livraison} </p>

                <!-- Prix total en évidence -->
                <div class="total-section">
                    <p class="total-label">PRIX TOTAL</p>
                    <p class="total-amount"> ${recuInfos.reservation_prix_total}  DH</p>
                </div>
            </div>
        </div>

        <!-- Footer avec informations agence -->
        <div class="footer">
            <div class="footer-grid">
                <div>
                    <h4 class="footer-title">CONTACT AGENCE</h4>
                    <p class="footer-info">123 Boulevard Zerktouni, Casablanca 20000</p>
                    <p class="footer-info">Tél: +212 5 22 12 34 56</p>
                    <p class="footer-info">Email: contact@autorentmaroc.ma</p>
                </div>
                <div class="cachet-section">
                    <p class="footer-title">CACHET ÉLECTRONIQUE</p>
                    <div class="cachet-box">
                        ARM-2024-VERIFIED-SEAL
                    </div>
                </div>
            </div>

            <div class="footer-note">
                Ce reçu confirme votre réservation. Veuillez le présenter lors de la prise en charge du véhicule.
            </div>
        </div>
    `
}


function downloadAsPDF() {
    // Créer un iframe caché
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Écrire le contenu à imprimer dans l'iframe
    const content = document.getElementById('recuContainer').innerHTML;
    iframe.contentDocument.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reçu de réservation</title>
                <style>
                    body { font-family: Arial; margin: 0; padding: 20px; }
                    @page { size: auto; margin: 0mm; }
                </style>
            </head>
            <body>
                ${content}
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 200);
                    };
        </script>
        </body>

        </html>`);
    iframe.contentDocument.close();
}


