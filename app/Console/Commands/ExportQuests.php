<?php

namespace App\Console\Commands;

use App\Services\QuestImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ExportQuests extends Command
{
    protected $signature = 'alamat:export-quests {--file=quest_export.json}';
    protected $description = 'Export quest records to storage/app.';

    public function handle(QuestImportService $quests): int
    {
        $path = storage_path('app/'.$this->option('file'));
        File::put($path, json_encode($quests->export(), JSON_PRETTY_PRINT));
        $this->info("Exported quests to {$path}");
        return self::SUCCESS;
    }
}
