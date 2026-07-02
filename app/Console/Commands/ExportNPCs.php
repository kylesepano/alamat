<?php

namespace App\Console\Commands;

use App\Services\NPCImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ExportNPCs extends Command
{
    protected $signature = 'alamat:export-npcs {--file=npc_export.json}';
    protected $description = 'Export NPC records to storage/app.';

    public function handle(NPCImportService $npcs): int
    {
        $path = storage_path('app/'.$this->option('file'));
        File::put($path, json_encode($npcs->export(), JSON_PRETTY_PRINT));
        $this->info("Exported NPCs to {$path}");
        return self::SUCCESS;
    }
}
