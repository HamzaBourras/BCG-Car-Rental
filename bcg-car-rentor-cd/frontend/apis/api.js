export const baseUrl = "http://localhost:8000/";

/******* Authentification *******/
export const INSCRIRE_API = `${baseUrl}api/auth/inscrire`;
export const CONNEXION_API = `${baseUrl}api/auth/connecter`;
export const DECONNEXION_API = `${baseUrl}api/auth/deconnecter`;
export const MODIFIER_PROFILE_API = `${baseUrl}api/auth/modifierProfile`;

/******* api public *******/
export const INDEX_VOITURES = `${baseUrl}api/public/voitures/index`;

/******* api admin *******/
/*** api voiture ***/
export const ADMIN_INDEX_VOITURES = `${baseUrl}api/admin/voitures/index`;
export const ADMIN_STORE_VOITURES = `${baseUrl}api/admin/voitures/store`;
export const ADMIN_EDIT_VOITURES = `${baseUrl}api/admin/voitures/edit/`;
export const ADMIN_DESTROY_VOITURES = `${baseUrl}api/admin/voitures/destroy/`;
