<?php

namespace App\Console\Commands;

use App\Services\ItemImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ExportItems extends Command
{
    protected $signature = 'alamat:export-items {--file=items_export.json}';

    protected $description = 'Export item records to storage/app.';

    public function handle(ItemImportService $items): int
    {
        $path = storage_path('app/'.$this->option('file'));
        File::put($path, json_encode($items->export(), JSON_PRETTY_PRINT));
        $this->info("Exported items to {$path}");

        return self::SUCCESS;
    }
}
