# 🚗 BCG Car Rental

Une plateforme complète de gestion de location de véhicules. L'application propose une architecture découpée entre une API backend robuste et une interface frontend modulaire, offrant des espaces dédiés pour l'administration de la flotte et la réservation par les clients.

## 🏗️ Architecture & Technologies

Le projet est divisé en deux parties principales :

### ⚙️ Backend (`/bcg-car-rentor-cd/backend`)
* **Framework :** Laravel (PHP).
* **Base de données :** Gestion via les migrations et l'ORM Eloquent (Tables : Users, Roles, Voitures, Reservations, Commentaires)[cite: 7].
* **Sécurité & Auth :** Authentification sécurisée et gestion des rôles via des middlewares personnalisés (ex: `EnsureIsAdmin`)[cite: 7].
* **Notifications :** Système d'envoi d'emails intégré pour les messages de contact (`ContactMessage`) et les confirmations de réservation (`NewReservationNotification`)[cite: 7].
* **API Controllers :** Séparation claire de la logique métier avec des contrôleurs dédiés pour l'Admin (`VoitureController`, `ReservationController`), les Clients et l'accès Public[cite: 7].

### 💻 Frontend (`/bcg-car-rentor-cd/frontend`)
* **Interface :** HTML, JavaScript et CSS modulaire (fichiers de style dédiés par composant et par page : `dashboard.css`, `formulaire_reservation.css`, etc.)[cite: 7].
* **Icônes :** Intégration de FontAwesome 6.7.2 pour une interface utilisateur riche et visuelle[cite: 7].
* **Connexion API :** Appels asynchrones centralisés via `apis/api.js`[cite: 7].

---

## ✨ Fonctionnalités Principales

### 🌍 Espace Public
* Découverte de la flotte de véhicules (`page_voitures`) et des meilleures offres (`best-deals`)[cite: 7].
* Formulaire de contact et présentation de l'agence (`about_us`)[cite: 7].
* Authentification (Connexion, Inscription) et gestion de profil[cite: 7].

### 👤 Espace Client
* **Tableau de bord :** Suivi des réservations actives et de l'historique[cite: 7].
* **Réservation :** Formulaire de réservation complet avec gestion des lieux de livraison et génération de reçus (`reservation_recu`)[cite: 7].
* **Engagement :** Système de commentaires sur les véhicules avec système de "likes" (`aimee`) et programme de fidélité (`points`)[cite: 7].

### 🛡️ Espace Administrateur
* **Tableau de bord centralisé :** Vue d'ensemble de l'activité[cite: 7].
* **Gestion de la Flotte :** Ajout, modification et retrait de véhicules (`formulaire_voiture`) avec détails techniques (ex: climatisation)[cite: 7].
* **Gestion des Réservations :** Validation et suivi du statut des demandes clients[cite: 7].
* **Modération :** Gestion des clients et des commentaires[cite: 7].

---

## 🚀 Instructions d'Installation

### Prérequis
* [PHP](https://www.php.net/) & [Composer](https://getcomposer.org/)
* Un serveur de base de données local (MySQL, MariaDB, etc.)
* Un serveur web local (Apache, Nginx, ou Live Server pour le frontend)

### 1. Configuration du Backend (Laravel)
Ouvrez un terminal et naviguez dans le dossier backend :
```bash
cd bcg-car-rentor-cd/backend

# Installer les dépendances PHP
composer install

# Configurer l'environnement
cp .env.example .env
