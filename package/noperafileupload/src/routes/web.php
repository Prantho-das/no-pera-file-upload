<?php

use Illuminate\Support\Facades\Route;
use Pranthokumar\NoPeraFileUpload\App\Controllers\NoPeraController;

Route::get("/", [NoPeraController::class, 'index']);
