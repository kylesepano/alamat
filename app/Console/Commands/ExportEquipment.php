<?php

namespace App\Console\Commands;

use App\Services\EquipmentImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ExportEquipment extends Command
{
    protected $signature = 'alamat:export-equipment {--file=equipment_export.json}';
    protected $description = 'Export equipment records to storage/app.';

    public function handle(EquipmentImportService $equipment): int
    {
        $path = storage_path('app/'.$this->option('file'));
        File::put($path, json_encode($equipment->export(), JSON_PRETTY_PRINT));
        $this->info("Exported equipment to {$path}");
        return self::SUCCESS;
    }
}
