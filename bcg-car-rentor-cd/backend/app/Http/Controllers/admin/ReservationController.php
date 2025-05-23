<?php

namespace App\Http\Controllers\admin;

use Exception;
use Carbon\Carbon;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReservationController extends Controller
{
    //

    public function indexReservations()
    {

        try {
            $reservations = Reservation::OrderBy("id", "desc")->with("user", "voiture")->get();
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
                    "voiture_matricule" => $reservation->voiture->matricule,
                    "voiture_id" => $reservation->voiture_id,
                    "voiture_marque" => $reservation->voiture->marque,
                    "voiture_modele" => $reservation->voiture->modele,
                    "voiture_image" => "storage/" . $reservation->voiture->image,
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
}
