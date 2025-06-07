<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
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
                "success" => true,
                "message" => "Inscription terminée avec succès"
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Erreur lors de l'inscription",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    /****** Connexion ******/
    function connecter(AuthentificationRequest $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = $request->user();
                $token = $user->createToken($request->email)->plainTextToken;

                $userAuth = [
                    "id" => $user->id,
                    "nom" => $user->nom,
                    "prenom" => $user->prenom,
                    "email" => $user->email,
                    "telephone" => $user->telephone,
                    "adresse" => $user->adresse,
                    "image" => "storage/" . $user->image,
                    "role" => $user->role->nom
                ];

                return response()->json([
                    "success" => true,
                    "token" => $token,
                    "data" => $userAuth
                ], 201);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Identifiants incorrects",
                    "errors" => "L'email ou le mot de passe fourni est invalide"
                ], 401);
            }
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Erreur lors de la connexion",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    /***** Deconnexion *****/
    public function deconnecter(int $user_id)
    {
        try {
            PersonalAccessToken::where("tokenable_id", $user_id)->delete();
            return response()->json([
                "success" => true,
                "message" => "Vous avez deconnecté"
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Erreur lors de la deconnexion",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    /****** Modification des informations de compte ********/
    public function modifierProfile(Request $request, int $user_id)
    {
        try {
            $cheminImage = "";
            $user = User::where('id', $user_id)->first();
            $ancienImageName = $user->image;
            if ($request->file('image')) {
                // supprimer l'ancien image de la voiture du dossier storage/images_voitures si le fichier à été envoyé
                if ($ancienImageName && Storage::exists("public/" . $ancienImageName)) {
                    Storage::delete("public/" . $ancienImageName);
                }

                $cheminImage = $request->file('image')->store('images_profile', 'public');
            } else {  // si l'aidmin va laisse l'ancien image
                $cheminImage = $ancienImageName;
            }

            $user = User::find($user_id);
            $user->nom = strtolower($request->nom);
            $user->prenom = strtolower($request->prenom);
            $user->email = $request->email;
            $user->adresse = $request->adresse;
            $user->telephone = $request->telephone;
            $user->image = $cheminImage;

            if ($request->password) {
                $user->password = $request->password;
            }

            $user->save();

            $userAuth = [
                "id" => $user->id,
                "nom" => $user->nom,
                "prenom" => $user->prenom,
                "email" => $user->email,
                "telephone" => $user->telephone,
                "adresse" => $user->adresse,
                "image" => "storage/" . $user->image,
                "role" => $user->role->nom
            ];

            $token = $user->createToken($request->email)->plainTextToken;

            return response()->json([
                "data" => $userAuth,
                "token" => $token,
                "success" => true,
                "message" => "Le profile a été modifié avec succès"
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Échec de la modification du profile",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}