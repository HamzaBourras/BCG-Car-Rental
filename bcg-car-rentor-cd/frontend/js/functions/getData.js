// ajouter le script axios au document
function loadAxios() {
  return new Promise((resolve) => {
    if (window.axios) return resolve();

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

const getData = {
  returnData: null,
  token: null,
  success: null,
  message: null,
  errors: null,

  async getD(api, idsRequete = null) {
    await loadAxios()
    // construire l'api complet
    const apiUrl = idsRequete ? `${api}${idsRequete}` : api;

    // Réinitialisation
    this.resetChamps();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // vérifier si le token est disponible pour l'ajouter à la requete
      const token = localStorage.getItem("token");
      if (token)
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;

      // envoi de la requete
      const response = await axios.get(apiUrl, config);

      // Traitement réponse réussie
      this.token = response.data?.token;
      this.message = response.data?.message;
      this.returnData = response.data?.data;
      this.success = response.data?.success;
      return 1;
    } catch (error) {
      this.success = error.response?.data?.success || false;
      this.errors = error.response?.data?.errors || error.message;
      throw error; // Important pour le try/catch externe
    }
  },

  resetChamps() {
    this.errors = null;
    this.message = null;
    this.returnData = null;
    this.reponse = null;
    this.token = null;
    this.success = null;
  },
};

export default getData;
