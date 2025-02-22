<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthentificationRequest;

class AuthentificationController extends Controller
{
    /****** Inscription ******/
    function inscrire(AuthentificationRequest $request)
    {
        try {
            $user = User::create([
                "nom" => $request->nom,
                "prenom" => $request->prenom,
                "email" => $request->email,
                "telephone" => $request->telephone,
                "adresse" => $request->adresse,
                "password" => $request->password,
                "role_id" => 2
            ]);

            return response()->json([
                "message" => "Inscription terminée avec succès"
            ]);
        } catch (Exception $e) {
            return response()->json([
                "errorAction" => "Échec de l\'inscription + $e"
            ]);
        }
    }
}
