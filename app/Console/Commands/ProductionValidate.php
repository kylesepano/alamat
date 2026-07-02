<?php

namespace App\Console\Commands;

use App\Services\ProductionValidationService;
use Illuminate\Console\Command;

class ProductionValidate extends Command
{
    protected $signature = 'alamat:production:validate {scope=all}';
    protected $description = 'Run the Phase L validation engine and generate JSON/HTML reports.';

    public function handle(ProductionValidationService $validation): int
    {
        $report = $validation->validate((string) $this->argument('scope'));
        $this->info(json_encode($report['summary_payload'], JSON_PRETTY_PRINT));
        $this->line($report['json_report_path'] ?? '');
        $this->line($report['html_report_path'] ?? '');
        return $report['status'] === 'failed' ? self::FAILURE : self::SUCCESS;
    }
}
