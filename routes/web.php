<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [GameController::class, 'GameScreen']);
Route::get('/results', [ResultController::class, 'index'])->name('index.results');
Route::post('/results', [ResultController::class, 'store'])->name('store.results');
