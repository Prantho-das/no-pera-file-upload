<?php

namespace Pranthokumar\NoPeraFileUpload;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class NoPeraProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {

        $this->mergeConfigFrom(
            __DIR__ . '/config/no-pera-file-upload.php', 'no-pera-file-upload'
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerRoutes();
        $this->registerPublishing();
        $this->registerViews();
        $this->registerFacade();
        $this->registerMigration();
    }

    protected function registerRoutes()
    {
        Route::group([
            'prefix' => config('no-pera-file-upload.route-prefix'),
        ], function () {
            $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        });
    }

    public function provides()
    {
        return [
            'no-pera-file-upload:upload',
        ];
    }

    protected function registerPublishing()
    {
        $this->publishes([
            __DIR__ . '/config/no-pera-file-upload.php' => config_path('no-pera-file-upload.php'),
        ], 'no-pera-file-upload');

    }

    protected function registerMigration()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

    }
    protected function registerViews()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'no-pera-file-upload');
    }

    protected function registerFacade()
    {
        $this->app->bind('no-pera-file-upload', function () {

        });
    }

}
