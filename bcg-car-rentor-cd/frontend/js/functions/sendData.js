const sendData = {
  returnData: null,
  token: null,
  success: null,
  message: null,
  errors: null,

  async postData(api, formData = null, method, idsRequete = null, hasFile = false) {
    // construire l'api complet
    const apiUrl = idsRequete ? `${api}${idsRequete}` : api;
    // Réinitialisation
    this.resetChamps();

    try {
      const config = {
        headers: {}
      }
      // s'il y a un fichier
      if (hasFile) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }

      // vérifier si le token est disponible pour l'ajouter à la requete
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      // envoi de la requete
      const response = await axios({
        method,
        url: apiUrl,
        data: formData,
        headers: config.headers
      });



      // Traitement réponse réussie
      this.message = response.data?.message;
      this.returnData = response.data?.data;
      this.token = response.data?.token;
      this.success = response.data?.success;
    } catch (error) {
      // s'il y a des erreurs de validation
      if (error.response?.status === 422) {
        this.success = false;
        this.errors = error.response.data?.errors;
        this.message = "Erreurs de validation";
      } else {
        this.success = false;
        this.message = error.response?.data?.message;
        this.errors = error.response?.data?.errors;
      }
      // this.success = error.response?.data?.success;
      throw error; // Important pour que le catch dans inscrire.js soit déclenché
    }
  },

  resetChamps() {
    this.errors = null;
    this.message = null;
    this.returnData = null;
    this.token = null;
    this.success = null;
  },
};

export default sendData;
