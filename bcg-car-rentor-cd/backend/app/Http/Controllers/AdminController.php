<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
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
}