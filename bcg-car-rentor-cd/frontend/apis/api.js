export const baseUrl = "http://localhost:8000/";

/******* Authentification *******/
export const INSCRIRE_API = `${baseUrl}api/auth/inscrire/`;
export const CONNEXION_API = `${baseUrl}api/auth/connecter/`;
export const DECONNEXION_API = `${baseUrl}api/auth/deconnecter/`;
export const MODIFIER_PROFILE_API = `${baseUrl}api/auth/modifierProfile/`;

/******* api public *******/
export const INDEX_VOITURES = `${baseUrl}api/public/voitures/index/`;
export const INDEX_COMMENTAIRES = `${baseUrl}api/public/commentaires/index/`

/******* apis admin *******/
/*** api voiture ***/
export const ADMIN_INDEX_VOITURES = `${baseUrl}api/admin/voitures/index/`;
export const ADMIN_STORE_VOITURES = `${baseUrl}api/admin/voitures/store/`;
export const ADMIN_EDIT_VOITURES = `${baseUrl}api/admin/voitures/edit/`;
export const ADMIN_DESTROY_VOITURES = `${baseUrl}api/admin/voitures/destroy/`;
/*** api recevoir tous client ***/
export const ADMIN_INDEX_CLIENTS = `${baseUrl}api/admin/clients/index/`;
/*** api supprimer commentaires ***/
export const ADMIN_DESTROY_COMMENTAIRES = `${baseUrl}api/admin/commentaires/destroy/`;


/******* apis client *******/
/*** api reservations ***/
export const CLIENT_INDEX_RESERVATIONS = `${baseUrl}api/client/reservations/index/`;
export const CLIENT_STORE_RESERVATIONS = `${baseUrl}api/client/reservations/store/`;
export const CLIENT_EDIT_RESERVATIONS = `${baseUrl}api/client/reservations/edit/`;
export const CLIENT_DESTROY_RESERVATIONS = `${baseUrl}api/client/reservations/destroy/`;
/*** api commentaires ***/
export const CLIENT_INDEX_COMMENTAIRES = `${baseUrl}api/client/commentaires/index/`;
export const CLIENT_STORE_COMMENTAIRES = `${baseUrl}api/client/commentaires/store/`;
export const CLIENT_EDIT_COMMENTAIRES = `${baseUrl}api/client/commentaires/edit/`;
export const CLIENT_DESTROY_COMMENTAIRES = `${baseUrl}api/client/commentaires/destroy/`;
