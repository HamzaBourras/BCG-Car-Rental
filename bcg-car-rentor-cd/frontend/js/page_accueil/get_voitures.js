import getData from "../functions/getData.js";
import { INDEX_VOITURES } from "../../apis/api.js";

async function getVoitures() {
  console.log("Appel à getVoitures");

  try {
    await getData.getD(INDEX_VOITURES);
    console.log(getData.returnData);
  } catch (err) {
    console.error("Erreur lors de l'appel à getVoitures :", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getVoitures();
});
