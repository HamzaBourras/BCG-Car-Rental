<?php

namespace App\Http\Controllers;

use id;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Voiture;
use App\Models\Commentaire;
use App\Models\Reservation;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //

    /***** fct pour recevoir tous les infos des clients avec le nombre de réservation pour la page des clients de l'admin */
    public function indexClients()
    {
        try {

            $clients = User::where("role_id", 2)->with("reservations")->OrderBy("id", "desc")->get();
            $tousClients = [];

            foreach ($clients as $client) {
                $formatClient = [
                    "id" => $client->id,
                    "nom" => $client->nom,
                    "prenom" => $client->prenom,
                    "email" => $client->email,
                    "telephone" => $client->telephone,
                    "adresse" => $client->adresse,
                    "nombre_reservation" => count($client->reservations)
                ];

                array_push($tousClients, $formatClient);
            }
            return response()->json([
                "data" => $tousClients,
                "success" => true,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec lors de la récupération des clients",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    /***** fct pour supprimer un commentaire */
    public function destroyCommentaire(int $commentaire_id)
    {
        try {
            Commentaire::where(["id" => $commentaire_id])->delete();

            return response()->json([
                "success" => true,
                "message" => "commentaire supprimé avec succès",
            ], 200);
        } catch (\Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de suppression du commentaire",
                "errors" => $e->getMessage()
            ], 500);
        }
    }

    /***** fct pour afficher le dashboard de l'admin */
    public function dashboard()
    {
        try {
            $now = now();

            $nombreClients = User::where("role_id", 2)->count();
            $nombreVoitures = Voiture::count();
            $reservations = Reservation::all();
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

            return response()->json([
                "success" => true,
                "data" => [
                    "nombre_voitures" => $nombreVoitures,
                    "nombre_reservations_actives" => $nombreReservationsActives,
                    "nombre_clients" => $nombreClients,
                    "revenue_total" => $revenueTotal,
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