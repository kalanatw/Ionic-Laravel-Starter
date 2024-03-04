<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

//protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/viewProfile', [AuthController::class, 'viewProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/editUser', [AuthController::class, 'editUser']);
    Route::put('/changePassword', [AuthController::class, 'changePassword']);
});
