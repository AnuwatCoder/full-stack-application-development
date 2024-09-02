<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;

// Route for register and login
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('refreshtoken', [AuthController::class, 'refreshToken']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource('category', CategoryController::class);
    Route::resource('expense', ExpenseController::class);
    Route::get('fetchByUserId/{userId}', [ExpenseController::class, 'fetchByUserId']);
    Route::get('chartDataByUser/{userId}', [ExpenseController::class, 'chartDataByUser']);
});
