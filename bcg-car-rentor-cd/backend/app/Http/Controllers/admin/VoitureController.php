<?php

namespace App\Http\Controllers\admin;

use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\VoitureRequest;
use Illuminate\Support\Facades\Storage;
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
                $periodes_reservee = [];
                foreach ($voiture->reservations as $reservation) {  // parcourir les resevations pour construire les intervales ou la voiture est déja réservé
                    $periode = [
                        "debut" => $reservation->date_debut,
                        "fin" => $reservation->date_fin
                    ];

                    array_push($periodes_reservee, $periode);
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
                    "periodes_reservee" => $periodes_reservee,  // il contient les intérvales de date où la voiture est déja resérvé
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
                "image" => $cheminImage,
            ]);


            return response()->json([
                "success" => true,
                "message" => "Voiture ajoutée avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de l'ajout de la voiture",
                "errors" => $e->getMessage()
            ], 500);
        }
    }

    public function editVoiture(VoitureRequest $request, int $voiture_id)
    {
        try {
            $cheminImage = "";
            $voiture = Voiture::where('id', $voiture_id)->first();
            $ancienImageName = $voiture->image;
            if ($request->file('image')) {
                // supprimer l'ancien image de la voiture du dossier storage/images_voitures si le fichier à été envoyé
                if ($ancienImageName && Storage::exists("public/" . $ancienImageName)) {
                    Storage::delete("public/" . $ancienImageName);
                }

                $cheminImage = $request->file('image')->store('images_voitures', 'public');
            } else {  // si l'aidmin va laisse l'ancien image
                $cheminImage = $ancienImageName;
            }

            Voiture::where(["id" => $voiture_id])->update([
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
                "message" => "Voiture modifiée avec succès",
            ], 200);
        } catch (\Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de modification de la voiture",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    public function destroyVoiture(int $voiture_id)
    {
        try {
            // supprimer l'ancien image de la voiture du dossier storage/images_voitures
            $ancienImage = Voiture::where('id', $voiture_id)->first();
            $ancienImageName = $ancienImage->image;
            if ($ancienImageName && Storage::exists("public/" . $ancienImageName)) {
                // Storage::delete("public/" . $ancienImageName);
            }



            Voiture::where(["id" => $voiture_id])->delete();

            return response()->json([
                "success" => true,
                "message" => "Voiture supprimé avec succès",
            ], 200);
        } catch (\Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de suppression de la voiture",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}
