<?php

namespace App\Http\Controllers\admin;

use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\VoitureRequest;
use Exception;

class VoitureController extends Controller
{
    //

    public function indexVoiture()
    {
        try {
            $voitures = Voiture::OrderBy("id", "desc")->with("reservations")->get();
            $tousVoitures = [];


            foreach ($voitures as $voiture) {
                $disponible = "disponible";
                foreach ($voiture->reservations as $reservation) {  // parcourir les resevations pour vérifier 
                    if ($reservation->date_fin > \Carbon\Carbon::now()) {      // la date_fin pour savoir la disponibilité
                        $date = \Carbon\Carbon::parse($reservation->date_fin)->addDay()->format('Y-m-d');  // ajouté un jour à la date de fin
                        $disponible = $disponible . " le " . $date;  // concatiner la variable disponible avec la date de disponibilité
                    }
                }
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
                    "climat" => $voiture->climat,
                    "disponibilite" => $disponible,
                    "image" => "storage/" . $voiture->image,
                ];

                array_push($tousVoitures, $formatVoiture);
            }

            return response()->json([
                "data" => $tousVoitures,
                "success" => true,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec lors de la récupération des voitures",
                "errors" => $e->getMessage()
            ], 500);
        }
    }

    public function storeVoiture(VoitureRequest $request)
    {
        try {
            $cheminImage = $request->file('image')->store('images_voitures', 'public');
            Voiture::create([
                "modele" => $request->modele,
                "marque" => $request->marque,
                "matricule" => $request->matricule,
                "nombre_place" => $request->nombre_place,
                "prix_jour" => $request->prix_jour,
                "vitesse_max" => $request->vitesse_max,
                "couleur" => $request->couleur,
                "type_carburant" => $request->type_carburant,
                "kilometrage" => $request->kilometrage,
                "climat" => $request->climat,
                "image" => $cheminImage
            ]);

            return response()->json([
                "success" => true,
                "message" => "Voiture ajoutée avec succès",
            ], 200);
        } catch (\Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de l'ajout de la voiture",
                "errors" => $e->getMessage()
            ], 500);
        }
    }

    // public funct
}