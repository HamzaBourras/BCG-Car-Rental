<?php

use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\PublicController;
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
});


/***************** Routes publics *******************/
Route::prefix("public")->controller(PublicController::class)->group(function () {
    Route::get("voitures/index", "indexVoitures");
});
