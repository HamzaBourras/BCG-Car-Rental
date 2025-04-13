const sendData = {
  returnData: null,
  token: null,
  reponse: null,
  success: null,
  message: null,
  errors: null,

  async postData(api, formData, method, idsRequete = null, hasFile = false) {
    // construire l'api complet
    const apiUrl = idsRequete ? `${api}${idsRequete}` : api;
    // Réinitialisation
    this.resetChamps();

    try {
      // s'il y a un fichier
      if (hasFile) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }

      // envoi de la requete
      const response = await axios[method](apiUrl, formData, config);

      // Traitement réponse réussie
      this.reponse = response;
      this.message = response.data?.message;
      this.returnData = response.data?.data;
      this.success = response.data?.success;
    } catch (error) {
      this.success = error.response?.data?.success || false;
      this.errors = error.response?.data?.errors || "Erreur lors de la requête";
      throw error;
    }
  },

  resetChamps() {
    this.errors = null;
    this.message = null;
    this.returnData = null;
    this.response = null;
    this.token = null;
    this.success = null;
  },
};

export default apiHandler;
