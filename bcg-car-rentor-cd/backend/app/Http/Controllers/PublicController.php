<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use App\Models\Reservation;
use App\Models\Voiture;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class PublicController extends Controller
{

    /************ Retourne tous les voitures *************/
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

    /************ Retourne tous les commentaires *************/
    public function indexCommentaires()
    {
        try {
            $commentaires = Commentaire::OrderBy("id", "desc")->with("user")->get();
            $tousCommentaires = [];

            foreach ($commentaires as $commentaire) {
                $formCommentaire = [
                    "id" => $commentaire->id,
                    "contenu" => $commentaire->contenu,
                    "note" => $commentaire->note,
                    "user_id" => $commentaire->user->id,
                    "nom" => $commentaire->user->nom,
                    "prenom" => $commentaire->user->prenom
                ];

                array_push($tousCommentaires, $formCommentaire);
            }
            return response()->json([
                "success" => true,
                "data" => $tousCommentaires
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec lors de la récupération des commentaires",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}