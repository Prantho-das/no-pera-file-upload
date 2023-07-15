<?php

use App\Models\ImageUpload;
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

Route::get('/uploads', function () {

    return ImageUpload::latest()->paginate(20);
});
Route::post('/uploads', function () {

    if (request()->has('file')) {
        $images = [];
        foreach (request()->file as $file) {
            $unique_name = uniqid() . '_' . time();
            $name = $file->getClientOriginalName();
            $path = $file->storeAs('public', $unique_name . '.' . $file->getClientOriginalExtension());
            $type = $file->getMimeType();
            $size = $file->getSize();
            $extension = $file->getClientOriginalExtension();
            $url = request()->url;

            $image = ImageUpload::create([
                'name' => $name,
                'path' => 'storage/' . $unique_name . '.' . $file->getClientOriginalExtension(), // 'storage/' . $path,
                'type' => $type,
                'size' => $size,
                'extension' => $extension,
                'url' => $url,
            ]);

            $images[] = $image;
        }

        return response()->json([
            'message' => 'File uploaded successfully',
            'image' => $images,
        ], 200);
    }
});