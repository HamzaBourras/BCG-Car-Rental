# 🚗 BCG Car Rental

Une plateforme complète de gestion de location de véhicules. L'application propose une architecture découpée entre une API backend robuste et une interface frontend modulaire, offrant des espaces dédiés pour l'administration de la flotte et la réservation par les clients.

## 🏗️ Architecture & Technologies

Le projet est divisé en deux parties principales :

### ⚙️ Backend (`/bcg-car-rentor-cd/backend`)
* **Framework :** Laravel (PHP).
* **Base de données :** Gestion via les migrations et l'ORM Eloquent (Tables : Users, Roles, Voitures, Reservations, Commentaires).
* **Sécurité & Auth :** Authentification sécurisée et gestion des rôles via des middlewares personnalisés (ex: `EnsureIsAdmin`).
* **Notifications :** Système d'envoi d'emails intégré pour les messages de contact (`ContactMessage`) et les confirmations de réservation (`NewReservationNotification`).
* **API Controllers :** Séparation claire de la logique métier avec des contrôleurs dédiés pour l'Admin (`VoitureController`, `ReservationController`), les Clients et l'accès Public.

### 💻 Frontend (`/bcg-car-rentor-cd/frontend`)
* **Interface :** HTML, JavaScript et CSS modulaire (fichiers de style dédiés par composant et par page : `dashboard.css`, `formulaire_reservation.css`, etc.).
* **Icônes :** Intégration de FontAwesome 6.7.2 pour une interface utilisateur riche et visuelle.
* **Connexion API :** Appels asynchrones centralisés via `apis/api.js`.

---

## ✨ Fonctionnalités Principales

### 🌍 Espace Public
* Découverte de la flotte de véhicules (`page_voitures`) et des meilleures offres (`best-deals`).
* Formulaire de contact et présentation de l'agence (`about_us`).
* Authentification (Connexion, Inscription) et gestion de profil.

### 👤 Espace Client
* **Tableau de bord :** Suivi des réservations actives et de l'historique.
* **Réservation :** Formulaire de réservation complet avec gestion des lieux de livraison et génération de reçus (`reservation_recu`).
* **Engagement :** Système de commentaires sur les véhicules avec système de "likes" (`aimee`) et programme de fidélité (`points`).

### 🛡️ Espace Administrateur
* **Tableau de bord centralisé :** Vue d'ensemble de l'activité.
* **Gestion de la Flotte :** Ajout, modification et retrait de véhicules (`formulaire_voiture`) avec détails techniques (ex: climatisation).
* **Gestion des Réservations :** Validation et suivi du statut des demandes clients.
* **Modération :** Gestion des clients et des commentaires.

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
