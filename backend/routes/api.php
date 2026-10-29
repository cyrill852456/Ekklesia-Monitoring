<?php

use Illuminate\Support\Facades\Route;

// Connection From the Frontend
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Ekklesia Monitoring API is connected.',
    ]);
});
