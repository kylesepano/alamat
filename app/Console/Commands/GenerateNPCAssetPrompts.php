<?php

namespace App\Console\Commands;

use App\Models\Npc;
use App\Models\NpcAssetPrompt;
use App\Services\NPCAssetPromptService;
use Illuminate\Console\Command;

class GenerateNPCAssetPrompts extends Command
{
    protected $signature = 'alamat:generate-npc-asset-prompts {--only-active}';
    protected $description = 'Generate or verify NPC asset prompts.';

    public function handle(NPCAssetPromptService $assets): int
    {
        $query = Npc::query()->with(['role', 'profession']);
        if ($this->option('only-active')) {
            $query->where('is_active', true);
        }
        $count = 0;
        $query->chunkById(200, function ($npcs) use ($assets, &$count): void {
            foreach ($npcs as $npc) {
                $fields = $assets->prompts([...$npc->toArray(), 'role_name' => $npc->role?->name, 'profession_name' => $npc->profession?->name]);
                NpcAssetPrompt::query()->updateOrCreate(['asset_prompt_id' => 'NPCASSET'.substr($npc->npc_id, 3)], ['npc_id' => $npc->id, ...$fields]);
                $count++;
            }
        });
        $this->info("Generated or verified prompts for {$count} NPC record(s).");
        return self::SUCCESS;
    }
}
