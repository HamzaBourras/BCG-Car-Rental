<?php

namespace App\Http\Controllers\client;

use Exception;
use App\Models\Commentaire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CommentaireRequest;

class CommentaireController extends Controller
{
    /******************* fonctions des commentaires */
    public function indexCommentaire(int $client_id)
    {

        try {
            $commentaires = Commentaire::OrderBy("id", "desc")->where("user_id", $client_id)->with("user")->get();
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


    public function storeCommentaire(CommentaireRequest $request, int $client_id)
    {
        try {

            Commentaire::create([
                "contenu" => $request->contenu,
                "note" => $request->note,
                "user_id" => $client_id
            ]);

            return response()->json([
                "success" => true,
                "message" => "Commentaire ajoutée avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de l'ajout du commentaire",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    public function editCommentaire(CommentaireRequest $request, int $client_id, int $commentaire_id)
    {
        try {

            Commentaire::where(["id" => $commentaire_id, "user_id" => $client_id])->update([
                "contenu" => $request->contenu,
                "note" => $request->note,
            ]);

            return response()->json([
                "success" => true,
                "message" => "Commentaire modifié avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de la modification du commentaire",
                "errors" => $e->getMessage()
            ], 500);
        }
    }


    public function destroyCommentaire(int $client_id, int $commentaire_id)
    {
        try {

            Commentaire::where(["id" => $commentaire_id, "user_id" => $client_id])->delete();

            return response()->json([
                "success" => true,
                "message" => "Commentaire supprimé avec succès",
            ], 200);
        } catch (Exception $e) {
            // Erreur générale
            return response()->json([
                "success" => false,
                "massage" => "Erreur lors de la suppression du commentaire",
                "errors" => $e->getMessage()
            ], 500);
        }
    }
}
