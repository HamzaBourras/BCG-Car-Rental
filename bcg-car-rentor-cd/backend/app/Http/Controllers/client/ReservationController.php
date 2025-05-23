<?php

namespace App\Http\Controllers\client;

use Exception;
use Carbon\Carbon;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;

class ReservationController extends Controller
{
    //

    public function indexReservations(int $client_id)
    {

        try {
            $reservations = Reservation::OrderBy("id", "desc")->where("user_id", $client_id)->with("user", "voiture")->get();
            $tousReservations = [];

            foreach ($reservations as $reservation) {
                // Conversion des dates au format local
                $dateDebut = Carbon::parse($reservation->date_debut)
                    ->setTimezone(config('app.timezone'))
                    ->format('d-m-Y H:i');

                $dateFin = Carbon::parse($reservation->date_fin)
                    ->setTimezone(config('app.timezone'))
                    ->format('d-m-Y H:i');

                $formReservation = [
                    "id" => $reservation->id,
                    "client_id" => $reservation->user_id,
                    "nom_client" => $reservation->user->nom,
                    "prenom_client" => $reservation->user->prenom,
                    "voiture_id" => $reservation->voiture_id,
                    "voiture_marque" => $reservation->voiture->marque,
                    "voiture_modele" => $reservation->voiture->modele,
                    "date_debut" => $dateDebut,
                    "date_fin" => $dateFin,
                    "prix_total" => $reservation->prix_total,
                    "statut_paiement" => $reservation->statut_paiement,
                    "statut" => $reservation->statut,
                    "adresse_livraison" => $reservation->adresse_livraison,
                    "timezone" => config('app.timezone')
                ];

                array_push($tousReservations, $formReservation);
            }
            return response()->json([
                "success" => true,
                "data" => $tousReservations
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec lors de la récupération des reservations",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    public function storeReservation(ReservationRequest $request, int $client_id, int $voiture_id)
    {
        try {

            Reservation::create([
                "user_id" => $client_id,
                "voiture_id" => $voiture_id,
                "date_debut" => $request->date_debut,
                "date_fin" => $request->date_fin,
                "prix_total" => $request->prix_total,
                "adresse_livraison" => $request->adresse_livraison,
                "statut" => null,
                "statut_paiement" => 0,
            ]);

            return response()->json([
                "success" => true,
                "message" => "Résrvation ajoutée avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de l'ajout de la réservation",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    public function editReservation(ReservationRequest $request, int $client_id, int $voiture_id, int $reservation_id)
    {
        try {

            Reservation::where(["id" => $reservation_id, "user_id" => $client_id, "voiture_id" => $voiture_id])->update([
                "date_debut" => $request->date_debut,
                "date_fin" => $request->date_fin,
                "prix_total" => $request->prix_total,
                "adresse_livraison" => $request->adresse_livraison,
            ]);

            return response()->json([
                "success" => true,
                "message" => "Résrvation modifiée avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de la modification de la réservation",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    public function destroyReservation(int $client_id, int $voiture_id, int $reservation_id)
    {
        try {

            Reservation::where(["id" => $reservation_id, "user_id" => $client_id, "voiture_id" => $voiture_id])->delete();

            return response()->json([
                "success" => true,
                "message" => "Résrvation supprimé avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de la suppression de la réservation",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}