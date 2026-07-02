<?php

namespace Database\Seeders;

use App\Models\LibraryNilalangOrder;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class NilalangOrderSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'nilalang_orders';

    protected string $modelClass = LibraryNilalangOrder::class;
}
