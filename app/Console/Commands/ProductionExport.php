<?php

namespace App\Console\Commands;

use App\Services\ProductionExportService;
use Illuminate\Console\Command;

class ProductionExport extends Command
{
    protected $signature = 'alamat:production:export {codex} {--format=json} {--limit=1000}';
    protected $description = 'Export codex content as JSON, CSV, SQL placeholder, or Markdown.';

    public function handle(ProductionExportService $exports): int
    {
        $job = $exports->export((string) $this->argument('codex'), (string) $this->option('format'), ['limit' => (int) $this->option('limit')]);
        $this->info(json_encode($job['summary_payload'], JSON_PRETTY_PRINT));
        $this->line($job['output_path'] ?? '');
        return self::SUCCESS;
    }
}
