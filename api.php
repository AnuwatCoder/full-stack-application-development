<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

//  api/register
Route::post('register',[AuthController::class, 'register']);



