<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Voiture;
use App\Models\Commentaire;
use App\Models\Reservation;
use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Mail;

class PublicController extends Controller
{

    /************ Retourne tous les voitures *************/
    public function indexVoiture()
    {
        try {
            $voitures = Voiture::OrderBy("id", "desc")->with("reservations")->get();
            $tousVoitures = [];


            foreach ($voitures as $voiture) {
                $periodes_reservee = [];
                foreach ($voiture->reservations as $reservation) {  // parcourir les resevations pour construire les periodes ou la voiture est déja réservé
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
                    "prenom" => $commentaire->user->prenom,
                    "aimee" => $commentaire->aimee,
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


    /************ Envoie un message de contact *************/
    public function sendContactMessage(Request $request)
    {
        $validated = $request->validate([
            "prenom" => "required|string|max:50",
            "nom" => "required|string|max:50",
            "email" => "required|email|max:100",
            "telephone" => "required|string|max:15",
            "message" => "required|string|max:500",
        ]);

        try {

            // Envoi du message par email
            $adminEmail = config('mail.from.address');
            $email = new ContactMessage(
                $validated['prenom'],
                $validated['nom'],
                $validated['email'],
                $validated['telephone'],
                $validated['message']
            );
            Mail::to($adminEmail)->send($email);

            return response()->json([
                "success" => true,
                "message" => "Message envoyé avec succès"
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec lors de l'envoi du message",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}