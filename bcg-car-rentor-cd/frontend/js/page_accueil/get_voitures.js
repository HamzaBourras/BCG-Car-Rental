import getData from "../functions/getData.js";
import { INDEX_VOITURES } from "../../apis/api.js";

async function getVoitures() {
  try {
    await getData.getD(INDEX_VOITURES);
    if (getData.success == true) {
      localStorage.setItem("voitures",JSON.stringify(getData.returnData)) // Enregistrer les voitures dans localStorage
    }
  } catch (err) {
    if (getData.success == false) {
      console.log(getData.errors);
    }
  }
}

// **** appel à la fonction pour recevoir tous les voitures
document.addEventListener("DOMContentLoaded", function () {
  getVoitures();
});


