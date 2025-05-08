<?php

use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\admin\VoitureController;
use App\Http\Controllers\AdminController;
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
    Route::post("inscrire", "inscrire");
    Route::post("connecter", "connecter");
    Route::post("deconnecter/{user_id}", "deconnecter");
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

    Route::get('/clients/index', [AdminController::class, 'indexClients']);
});