<?php

namespace App\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class ApiProvider extends ServiceProvider
{
 
    public function register()
    {
       $this->app->bind('api-kiangola', function () {
    return Http::withOptions([
        'verify' => false,
        'base_uri' => env('API_URL', 'http://localhost:3000/kiangola/'),
    ])->withHeaders([
        'Authorization' => 'Bearer ' . env('API_TOKEN', ''),
    ]);
});
    }
   
}


   


