<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;

class PublicController extends Controller
{

    /************ Retourne tous les voitures *************/
    public function indexVoitures()
    {
        $voitures = Voiture::OrderBy("id", "desc")->get();
        $tousVoitures = [];

        foreach ($voitures as $voiture) {
            $formatVoiture = [
                "id" => $voiture->id,
                "matricule" => $voiture->matricule,
                "marque" => $voiture->marque,
                "modele" => $voiture->modele,
                "nombre_place" => $voiture->nombre_place,
                "prix_jour" => $voiture->prix_jour,
                "vitesse_max" => $voiture->vitesse_max,
                "couleur" => $voiture->couleur,
                "type_carburant" => $voiture->type_carburant,
                "kilometrage" => $voiture->kilometrage,
                "disponibilite" => $voiture->disponibilite,
                "chemin_image" => "storage/" . $voiture->chemin_image,
            ];

            array_push($tousVoitures, $formatVoiture);
        }

        return response()->json([
            "data" => $tousVoitures
        ]);
    }
}
