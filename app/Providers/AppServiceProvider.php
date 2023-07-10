<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::directive('noPeraFileUploadCss', function (string $expression) {
            return "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.css'>";
        });
        Blade::directive('noPeraFileUploadJs', function (string $expression) {
            return "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.css'>";
        });
    }
}