document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const profileImage = document.getElementById('profile-image');
    const uploadIcon = document.getElementById('upload-icon');
    const imageUpload = document.getElementById('image-upload');
    const annulerBtn = document.getElementById('annuler');
    const enregistrerBtn = document.getElementById('enregistrer');
    
    // Champs de formulaire
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const telephone = document.getElementById('telephone');
    const adresse = document.getElementById('adresse');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    // Initialiser les données de l'utilisateur (d'abord depuis localStorage si disponible)
    let userData;
    
    // Vérifier si des données existent déjà dans le stockage local
    const savedData = localStorage.getItem('userProfileData');
    
    if (savedData) {
        try {
            userData = JSON.parse(savedData);
            console.log('Données chargées depuis le stockage local:', userData);
            
            // Ajouter un indicateur temporaire pour montrer que les données ont été chargées
            const loadIndicator = document.createElement('div');
            loadIndicator.className = 'load-indicator';
            loadIndicator.textContent = 'Données chargées depuis votre dernier enregistrement';
            loadIndicator.style.textAlign = 'center';
            loadIndicator.style.padding = '10px';
            loadIndicator.style.marginBottom = '15px';
            loadIndicator.style.backgroundColor = 'rgba(50, 150, 50, 0.2)';
            loadIndicator.style.borderRadius = '5px';
            
            // Insérer au début du formulaire
            const profileForm = document.querySelector('.profile-form');
            profileForm.insertBefore(loadIndicator, profileForm.firstChild);
            
            // Faire disparaître après 3 secondes
            setTimeout(() => {
                loadIndicator.style.opacity = '0';
                loadIndicator.style.transition = 'opacity 0.5s ease';
                setTimeout(() => loadIndicator.remove(), 500);
            }, 3000);
        } catch (e) {
            console.error('Erreur lors du chargement des données:', e);
            // En cas d'erreur, utiliser les données par défaut
            userData = getDefaultUserData();
        }
    } else {
        // Utiliser les données par défaut si rien n'est sauvegardé
        userData = getDefaultUserData();
    }
    
    // Sauvegarder l'état initial pour pouvoir annuler
    let initialUserData = { ...userData };
    
    // Fonction pour obtenir les données par défaut
    function getDefaultUserData() {
        return {
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean.dupont@exemple.com',
            telephone: '0612345678',
            adresse: '10 Rue de Paris, 75001 Paris',
            password: '********',
            profileImage: null
        };
    }
    
    // Fonction pour simuler une réponse serveur
    function simulateServerResponse(data) {
        // Simuler un taux de réussite de 95%
        const randomSuccess = Math.random() < 0.95;
        
        if (randomSuccess) {
            return {
                success: true,
                message: 'Données enregistrées avec succès'
            };
        } else {
            return {
                success: false,
                message: 'Erreur de connexion au serveur. Veuillez réessayer.'
            };
        }
    }
    
    // Remplir le formulaire avec les données de l'utilisateur
    function populateForm() {
        nom.value = userData.nom;
        prenom.value = userData.prenom;
        email.value = userData.email;
        telephone.value = userData.telephone;
        adresse.value = userData.adresse;
        password.value = userData.password;
        confirmPassword.value = userData.password;
        
        // Afficher l'image de profil si elle existe
        if (userData.profileImage) {
            if (!document.querySelector('#profile-image img')) {
                const img = document.createElement('img');
                img.src = userData.profileImage;
                profileImage.innerHTML = '';
                profileImage.appendChild(img);
            } else {
                document.querySelector('#profile-image img').src = userData.profileImage;
            }
        } else {
            profileImage.innerHTML = '<i class="fa-solid fa-plus" id="upload-icon"></i>';
        }
    }
    
    // Initialiser le formulaire
    populateForm();
    
    // Gérer le clic sur l'image de profil
    profileImage.addEventListener('click', function() {
        imageUpload.click();
    });
    
    // Gérer le changement d'image
    imageUpload.addEventListener('change', function(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                userData.profileImage = e.target.result;
                
                // Créer ou mettre à jour l'image
                if (!document.querySelector('#profile-image img')) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    profileImage.innerHTML = '';
                    profileImage.appendChild(img);
                } else {
                    document.querySelector('#profile-image img').src = e.target.result;
                }
            };
            
            reader.readAsDataURL(event.target.files[0]);
        }
    });
    
    // Gérer le clic sur le bouton Annuler
    annulerBtn.addEventListener('click', function() {
        // Restaurer les données initiales
        userData = { ...initialUserData };
        populateForm();
        
        // Afficher un message
        showNotification('Modifications annulées');
    });
    
    // Gérer le clic sur le bouton Enregistrer
    enregistrerBtn.addEventListener('click', function() {
        // Valider le formulaire
        if (!validateForm()) {
            return;
        }
        
        // Changer le texte du bouton pour indiquer le chargement
        enregistrerBtn.textContent = 'Sauvegarde en cours...';
        enregistrerBtn.disabled = true;
        
        // Préparer les données à envoyer
        const updatedData = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            telephone: telephone.value,
            adresse: adresse.value,
            profileImage: userData.profileImage
        };
        
        // Mettre à jour le mot de passe uniquement s'il a été modifié
        if (password.value !== '********' && password.value.trim() !== '') {
            updatedData.password = password.value;
        } else {
            updatedData.password = userData.password;
        }
        
        // Simuler un appel API à un serveur (setTimeout simule le délai réseau)
        setTimeout(() => {
            // Simuler une réponse du serveur (peut être success ou échec)
            const serverResponse = simulateServerResponse(updatedData);
            
            if (serverResponse.success) {
                // Mettre à jour les données utilisateur localement
                userData = { ...updatedData };
                initialUserData = { ...userData };
                
                // Stocker les données dans localStorage pour les conserver
                localStorage.setItem('userProfileData', JSON.stringify(userData));
                
                // Enregistrer la date et l'heure de la sauvegarde
                localStorage.setItem('lastSaveTime', new Date().toISOString());
                
                // Afficher un message de succès
                showNotification('Profil mis à jour avec succès ✓');
                
                // Pour tester, afficher les données actuelles dans la console
                console.log('Données enregistrées avec succès:', userData);
                
                // Ajouter un indicateur visuel de succès
                const successIndicator = document.createElement('div');
                successIndicator.className = 'save-indicator success';
                successIndicator.textContent = 'Modifications enregistrées ✓';
                document.querySelector('.profile-form').appendChild(successIndicator);
                
                setTimeout(() => {
                    successIndicator.remove();
                }, 3000);
            } else {
                // Afficher un message d'erreur
                showNotification('Erreur lors de la sauvegarde: ' + serverResponse.message, 'error');
                console.error('Erreur de sauvegarde:', serverResponse.message);
            }
            
            // Restaurer le bouton
            enregistrerBtn.textContent = 'Enregistrer';
            enregistrerBtn.disabled = false;
        }, 1500); // Délai simulé de 1.5 secondes
    });
    
    // Gérer le bouton de vérification des données
    document.getElementById('verify-data').addEventListener('click', function() {
        this.textContent = 'Vérification en cours...';
        this.disabled = true;
        
        // Simuler une vérification avec le serveur
        setTimeout(() => {
            const storedData = localStorage.getItem('userProfileData');
            const storageStatus = document.getElementById('storage-status');
            const dataStatus = document.getElementById('data-status');
            
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    
                    // Vérifier si les données actuelles correspondent aux données stockées
                    const currentDataStr = JSON.stringify(userData);
                    const storedDataStr = JSON.stringify(parsedData);
                    
                    if (currentDataStr === storedDataStr) {
                        dataStatus.textContent = 'Synchronisées ✓';
                        dataStatus.style.color = '#4caf50';
                        showNotification('Les données sont synchronisées avec le serveur ✓');
                    } else {
                        dataStatus.textContent = 'Modifications non enregistrées!';
                        dataStatus.style.color = '#ff9800';
                        showNotification('Des modifications non enregistrées sont détectées!', 'warning');
                    }
                    
                    storageStatus.textContent = 'Données disponibles ✓';
                    storageStatus.style.color = '#4caf50';
                } catch (e) {
                    storageStatus.textContent = 'Erreur de format';
                    storageStatus.style.color = '#f44336';
                    console.error('Erreur lors de la lecture des données:', e);
                }
            } else {
                storageStatus.textContent = 'Aucune donnée trouvée';
                storageStatus.style.color = '#f44336';
                dataStatus.textContent = 'Non sauvegardées';
                dataStatus.style.color = '#f44336';
            }
            
            this.textContent = 'Vérifier l\'état des données';
            this.disabled = false;
        }, 1000);
    });
    
    // Fonction pour mettre à jour le panneau d'état
    function updateStatusPanel() {
        const lastSaveTime = localStorage.getItem('lastSaveTime');
        const lastSaveTimeElement = document.getElementById('last-save-time');
        const dataStatusElement = document.getElementById('data-status');
        const storageStatusElement = document.getElementById('storage-status');
        
        // Mettre à jour l'heure du dernier enregistrement
        if (lastSaveTime) {
            const date = new Date(lastSaveTime);
            const formattedDate = date.toLocaleString();
            lastSaveTimeElement.textContent = formattedDate;
        } else {
            lastSaveTimeElement.textContent = 'Jamais';
        }
        
        // Vérifier si les données en mémoire correspondent aux données stockées
        const storedData = localStorage.getItem('userProfileData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                
                // Comparer les objets JSON
                const currentDataStr = JSON.stringify(userData);
                const storedDataStr = JSON.stringify(parsedData);
                
                if (currentDataStr === storedDataStr) {
                    dataStatusElement.textContent = 'Synchronisées ✓';
                    dataStatusElement.style.color = '#4caf50';
                } else {
                    dataStatusElement.textContent = 'Modifications non enregistrées';
                    dataStatusElement.style.color = '#ff9800';
                }
                
                storageStatusElement.textContent = 'Données disponibles';
                storageStatusElement.style.color = '#4caf50';
            } catch (e) {
                storageStatusElement.textContent = 'Erreur de format';
                storageStatusElement.style.color = '#f44336';
            }
        } else {
            storageStatusElement.textContent = 'Aucune donnée stockée';
            storageStatusElement.style.color = '#f44336';
            dataStatusElement.textContent = 'Non sauvegardées';
            dataStatusElement.style.color = '#f44336';
        }
    }
    
    // Fonction pour valider le formulaire
    function validateForm() {
        // Vérifier si les champs obligatoires sont remplis
        if (!nom.value.trim() || !prenom.value.trim() || !email.value.trim()) {
            showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return false;
        }
        
        // Valider l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showNotification('Adresse email invalide', 'error');
            return false;
        }
        
        // Vérifier si les mots de passe correspondent
        if (password.value !== confirmPassword.value) {
            showNotification('Les mots de passe ne correspondent pas', 'error');
            return false;
        }
        
        // Vérifier la longueur du mot de passe s'il a été modifié
        if (password.value !== '********' && password.value.trim() !== '' && password.value.length !== 8) {
            showNotification('Le mot de passe doit comporter exactement 8 caractères', 'error');
            return false;
        }
        
        return true;
    }
    
    // Fonction pour afficher une notification
    function showNotification(message, type = 'success') {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Appliquer les styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.color = '#fff';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        notification.style.transition = 'all 0.3s ease';
        
        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else {
            notification.style.backgroundColor = '#dc3545';
        }
        
        // Ajouter au DOM
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});