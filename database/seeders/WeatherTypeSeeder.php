<?php

namespace Database\Seeders;

use App\Models\LibraryWeatherType;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class WeatherTypeSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'weather_types';

    protected string $modelClass = LibraryWeatherType::class;
}
