<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ApiFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'api-kiangola';
    }
}

