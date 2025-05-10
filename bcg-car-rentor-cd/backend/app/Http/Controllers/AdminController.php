<?php

namespace App\Http\Controllers;

use id;
use Exception;
use App\Models\User;
use App\Models\Commentaire;
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
}