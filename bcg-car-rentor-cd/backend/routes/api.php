<?php

use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\admin\VoitureController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\client\CommentaireController;
use App\Http\Controllers\client\ReservationController;
use App\Models\Commentaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/***************** Authentification *******************/

Route::prefix("auth/")->controller(AuthentificationController::class)->group(function () {
    Route::post("inscrire", "inscrire")->middleware("throttle:register");
    Route::post("connecter", "connecter")->middleware("throttle:login");
    Route::post("deconnecter/{user_id}", "deconnecter")->middleware("auth:sanctum");;
    Route::post("modifierProfile/{user_id}", "modifierProfile")->middleware("auth:sanctum");
});


/***************** Routes publics *******************/
Route::prefix("public")->controller(PublicController::class)->group(function () {
    Route::get("voitures/index", "indexVoiture");
    Route::get("commentaires/index", "indexCommentaires");
});


/***************** Routes admin *******************/
Route::prefix("admin")->group(function () {
    Route::prefix("voitures")->controller(VoitureController::class)->group(function () {
        Route::get("index", "indexVoiture");
        Route::post("store", "storeVoiture");
        Route::post("edit/{voiture_id}", "editVoiture");
        Route::delete("destroy/{voiture_id}", "destroyVoiture");
    });

    Route::prefix("reservations")->controller(\App\Http\Controllers\admin\ReservationController::class)->group(function () {
        Route::get("index", "indexReservations");
    });

    Route::prefix("")->controller(AdminController::class)->group(function () {
        Route::get('/clients/index', 'indexClients');
        Route::delete("/commentaires/destroy/{commentaire_id}", "destroyCommentaire");
    });
});


/***************** Routes client *******************/
Route::prefix("client")->middleware("auth:sanctum")->group(function () {
    Route::prefix("commentaires")->controller(CommentaireController::class)->group(function () {
        Route::get("index/{client_id}", "indexCommentaire");
        Route::post("store/{client_id}", "storeCommentaire");
        Route::put("edit/{client_id}/{commentaire_id}", "editCommentaire");
        Route::delete("destroy/{client_id}/{commentaire_id}", "destroyCommentaire");
    });

    Route::prefix("reservations")->controller(\App\Http\Controllers\client\ReservationController::class)->group(function () {
        Route::get("index/{client_id}", "indexReservations");
        Route::post("store/{client_id}/{voiture_id}", "storeReservation");
        Route::put("edit/{client_id}/{voiture_id}/{reservation_id}", "editReservation");
        Route::delete("destroy/{client_id}/{voiture_id}/{reservation_id}", "destroyReservation");
    });
});