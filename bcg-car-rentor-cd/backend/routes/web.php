<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-time', function () {
    return [
        'php_timezone' => config('app.timezone'),
        'php_now' => now()->format('Y-m-d H:i:s'),
        'db_time' => DB::select('SELECT NOW() as now')[0]->now,
        'carbon_parse' => Carbon::parse(DB::select('SELECT NOW() as now')[0]->now)
            ->timezone('Africa/Casablanca')
            ->format('Y-m-d H:i:s')
    ];
});