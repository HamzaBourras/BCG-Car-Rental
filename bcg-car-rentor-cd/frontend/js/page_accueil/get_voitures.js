import getData from "../functions/getData.js";
import { INDEX_VOITURES } from "../../apis/api.js";
import { displayMessageErreurs } from "../display_message_erreurs.js"

export async function getVoitures() {

  try {
    await getData.getD(INDEX_VOITURES,);
    if (getData.success == true) {
      localStorage.setItem("voitures", JSON.stringify(getData.returnData)) // Enregistrer les voitures dans localStorage
      return getData.returnData
    }
  } catch (err) {
    if (getData.success == false) {
      displayMessageErreurs(sendData.errors, sendData.message, sendData.success)
    }
  }
}

// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
  //vérifer si les voitures ne sont pas déja récupérer
  if (!localStorage.getItem("voitures")) {
    getVoitures();
  }
});


