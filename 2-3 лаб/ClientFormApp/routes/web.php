<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;

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

Route::get('/client-form', function () {
    return view('client_form');
});
Route::post('/clients', [ClientController::class, 'store']);


Route::get('/clients', [ClientController::class, 'index'])->name('clients.index'); // Вивести всіх клієнтів
Route::get('/clients/create', [ClientController::class, 'create'])->name('clients.create'); // Форма для створення
Route::post('/clients', [ClientController::class, 'store'])->name('clients.store'); // Збереження клієнта
Route::get('/clients/{client}/edit', [ClientController::class, 'edit'])->name('clients.edit'); // Форма редагування
Route::put('/clients/{client}', [ClientController::class, 'update'])->name('clients.update'); // Оновлення клієнта
Route::delete('/clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy'); // Видалення клієнта

