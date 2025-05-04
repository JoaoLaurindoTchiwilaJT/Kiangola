<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CreateController;
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

Route::get('/', CreateController::class);

// Rota para busca (opcional - para expansão futura com busca server-side)
Route::get('/search', [CreateController::class, 'search'])->name('jobs.search');


// Rota para exibir o formulário de login
Route::get('/login', function () {
    return view('login');
})->name('login');

// Rota para processar o login
Route::post('/login', [CreateController::class, 'login'])->name('login.post');

Route::middleware(['web'])->group(function () {
    Route::get('/admin', [CreateController::class, 'admin'])
        ->name('admin');
});


