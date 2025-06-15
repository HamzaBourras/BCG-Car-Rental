<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Commentaire;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    /***** fct pour afficher le dashboard du client */
    public function dashboard(int $client_id)
    {
        try {
            $now = now();
            $nombreCommentaires = Commentaire::where("user_id", $client_id)->count();
            $reservations = Reservation::where("user_id", $client_id)->get();
            $nombreReservations = count($reservations);
            // Filtrer les réservations actives
            $ReservationsActives = [];
            foreach ($reservations as $reservation) {
                if ($reservation->statut == 1 && $reservation->statut_paiement == 1 && $reservation->date_debut <= $now && $reservation->date_fin >= $now) {
                    array_push($ReservationsActives, $reservation);
                }
            }
            // On compte le nombre de réservations actives
            $nombreReservationsActives = count($ReservationsActives);
            // calcul du revenu total
            $revenueTotal = 0;
            foreach ($reservations as $reservation) {
                if ($reservation->statut == 1 && $reservation->statut_paiement == 1) {
                    // On additionne le prix total des réservations
                    $revenueTotal += $reservation->prix_total;
                }
            }

            $points = User::where("id", $client_id)->value('points');

            return response()->json([
                "success" => true,
                "data" => [
                    "nombre_reservations_actives" => $nombreReservationsActives,
                    "nombre_reservations" => $nombreReservations,
                    "nombre_commentaires" => $nombreCommentaires,
                    "points" => $points,
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec lors de la récupération des données du dashboard",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}