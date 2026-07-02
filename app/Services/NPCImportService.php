<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\Item;
use App\Models\Monster;
use App\Models\NpcAmbientTemplate;
use App\Models\Npc;
use App\Models\NpcAssetPrompt;
use App\Models\NpcCategory;
use App\Models\NpcDialogue;
use App\Models\NpcDialogueCondition;
use App\Models\NpcFaction;
use App\Models\NpcInventory;
use App\Models\NpcLocation;
use App\Models\NpcPersonality;
use App\Models\NpcPortrait;
use App\Models\NpcProfession;
use App\Models\NpcQuest;
use App\Models\NpcRelationshipLevel;
use App\Models\NpcRole;
use App\Models\NpcSchedule;
use App\Models\NpcServiceModel;
use App\Models\NpcShop;
use App\Models\NpcTraining;
use App\Models\NpcVoiceProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class NPCImportService
{
    public const DATA_ROOT = 'database/data/npcs';

    public function __construct(private readonly NPCAssetPromptService $assets)
    {
    }

    public function import(bool $dryRun = false): array
    {
        $summary = ['categories' => 0, 'roles' => 0, 'professions' => 0, 'factions' => 0, 'personalities' => 0, 'relationship_levels' => 0, 'npcs_imported' => 0, 'npcs_updated' => 0, 'locations' => 0, 'schedules' => 0, 'dialogues' => 0, 'conditions' => 0, 'services' => 0, 'shops' => 0, 'inventory' => 0, 'quests' => 0, 'training' => 0, 'portraits' => 0, 'voices' => 0, 'asset_prompts' => 0, 'ambient_templates' => 0, 'errors' => [], 'dry_run' => $dryRun];

        DB::beginTransaction();
        try {
            $summary['categories'] = $this->importLookup(NpcCategory::class, 'npc_categories.json', 'category_id');
            $summary['roles'] = $this->importLookup(NpcRole::class, 'npc_roles.json', 'role_id');
            $summary['professions'] = $this->importLookup(NpcProfession::class, 'npc_professions.json', 'profession_id');
            $summary['factions'] = $this->importLookup(NpcFaction::class, 'npc_factions.json', 'faction_id');
            $summary['personalities'] = $this->importLookup(NpcPersonality::class, 'npc_personalities.json', 'personality_id');
            $summary['relationship_levels'] = $this->importLookup(NpcRelationshipLevel::class, 'npc_relationship_levels.json', 'relationship_level_id');

            foreach ($this->read('npcs.json') as $index => $row) {
                try {
                    $this->validateNpc($row);
                    $npc = Npc::query()->updateOrCreate(['npc_id' => $row['npc_id']], $this->npcPayload($row));
                    $npc->wasRecentlyCreated ? $summary['npcs_imported']++ : $summary['npcs_updated']++;
                } catch (\Throwable $exception) {
                    $summary['errors'][] = ['row' => $index + 1, 'npc_id' => $row['npc_id'] ?? null, 'reason' => $exception->getMessage()];
                }
            }

            $summary['locations'] = $this->importNpcRows(NpcLocation::class, 'npc_locations.json', 'location_id');
            $summary['schedules'] = $this->importNpcRows(NpcSchedule::class, 'npc_schedules.json', 'schedule_id');
            $summary['dialogues'] = $this->importNpcRows(NpcDialogue::class, 'npc_dialogues.json', 'dialogue_id');
            $summary['conditions'] = $this->importConditions();
            $summary['services'] = $this->importNpcRows(NpcServiceModel::class, 'npc_services.json', 'service_id');
            $summary['shops'] = $this->importNpcRows(NpcShop::class, 'npc_shops.json', 'shop_id');
            $summary['inventory'] = $this->importInventory();
            $summary['quests'] = $this->importNpcRows(NpcQuest::class, 'npc_quests.json', 'npc_quest_id');
            $summary['training'] = $this->importNpcRows(NpcTraining::class, 'npc_training.json', 'training_id');
            $summary['portraits'] = $this->importNpcRows(NpcPortrait::class, 'npc_portraits.json', 'portrait_id');
            $summary['voices'] = $this->importNpcRows(NpcVoiceProfile::class, 'npc_voice_profiles.json', 'voice_profile_id');
            $summary['asset_prompts'] = $this->importAssetPrompts();
            $summary['ambient_templates'] = $this->importLookup(NpcAmbientTemplate::class, 'npc_ambient_templates.json', 'ambient_id');

            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    public function export(): array
    {
        return Npc::query()->with(NPCService::WITH)->orderBy('npc_id')->get()->toArray();
    }

    private function importLookup(string $model, string $file, string $key): int
    {
        $rows = $this->read($file);
        foreach ($rows as $row) {
            $model::query()->updateOrCreate([$key => $row[$key]], $row);
        }

        return count($rows);
    }

    private function importNpcRows(string $model, string $file, string $key): int
    {
        $count = 0;
        foreach ($this->read($file) as $row) {
            $npcId = $this->resolveNpc($row['npc_id'] ?? null);
            if (! $npcId) {
                continue;
            }
            $payload = [...collect($row)->except(['npc_id'])->all(), 'npc_id' => $npcId];
            $model::query()->updateOrCreate([$key => $row[$key]], $payload);
            $count++;
        }

        return $count;
    }

    private function importConditions(): int
    {
        $count = 0;
        foreach ($this->read('npc_dialogue_conditions.json') as $row) {
            $npcId = $this->resolveNpc($row['npc_id'] ?? null);
            $dialogueId = NpcDialogue::query()->where('dialogue_id', $row['dialogue_id'])->value('id');
            if (! $npcId || ! $dialogueId) {
                continue;
            }
            NpcDialogueCondition::query()->updateOrCreate(['condition_id' => $row['condition_id']], [
                'dialogue_id' => $dialogueId,
                'npc_id' => $npcId,
                'condition_payload' => $row['condition_payload'],
                'priority' => $row['priority'] ?? 0,
            ]);
            $count++;
        }

        return $count;
    }

    private function importInventory(): int
    {
        $count = 0;
        foreach ($this->read('npc_inventory.json') as $row) {
            $npcId = $this->resolveNpc($row['npc_id'] ?? null);
            $shopId = blank($row['shop_id'] ?? null) ? null : NpcShop::query()->where('shop_id', $row['shop_id'])->value('id');
            if (! $npcId) {
                continue;
            }
            NpcInventory::query()->updateOrCreate(['inventory_id' => $row['inventory_id']], [
                'npc_id' => $npcId,
                'shop_id' => $shopId,
                'item_id' => blank($row['item_id'] ?? null) ? null : Item::query()->where('item_id', $row['item_id'])->value('id'),
                'equipment_id' => blank($row['equipment_id'] ?? null) ? null : Equipment::query()->where('equipment_id', $row['equipment_id'])->value('id'),
                'monster_id' => blank($row['monster_id'] ?? null) ? null : Monster::query()->where('monster_id', $row['monster_id'])->value('id'),
                'quantity' => $row['quantity'] ?? 1,
                'price_modifier' => $row['price_modifier'] ?? 1,
                'refresh_rule' => $row['refresh_rule'] ?? null,
                'is_active' => $row['is_active'] ?? true,
            ]);
            $count++;
        }

        return $count;
    }

    private function importAssetPrompts(): int
    {
        $count = 0;
        foreach ($this->read('npc_asset_prompts.json') as $row) {
            $npc = Npc::query()->where('npc_id', $row['npc_id'])->with(['role', 'profession'])->first();
            if (! $npc) {
                continue;
            }
            $generated = $this->assets->prompts([...$npc->toArray(), 'role_name' => $npc->role?->name, 'profession_name' => $npc->profession?->name]);
            NpcAssetPrompt::query()->updateOrCreate(['asset_prompt_id' => $row['asset_prompt_id']], [
                ...$generated,
                ...collect($row)->except(['npc_id'])->all(),
                'npc_id' => $npc->id,
            ]);
            $count++;
        }

        return $count;
    }

    private function npcPayload(array $row): array
    {
        return [
            ...collect($row)->except(['category_id', 'role_id', 'profession_id', 'faction_id', 'personality_id', 'relationship_level_id'])->all(),
            'category_id' => NpcCategory::query()->where('category_id', $row['category_id'])->orWhere('slug', $row['category_id'])->value('id'),
            'role_id' => NpcRole::query()->where('role_id', $row['role_id'])->orWhere('slug', $row['role_id'])->value('id'),
            'profession_id' => $this->lookup(NpcProfession::class, 'profession_id', $row['profession_id'] ?? null),
            'faction_id' => $this->lookup(NpcFaction::class, 'faction_id', $row['faction_id'] ?? null),
            'personality_id' => $this->lookup(NpcPersonality::class, 'personality_id', $row['personality_id'] ?? null),
            'relationship_level_id' => $this->lookup(NpcRelationshipLevel::class, 'relationship_level_id', $row['relationship_level_id'] ?? null),
        ];
    }

    private function validateNpc(array $row): void
    {
        foreach (['npc_id', 'slug', 'first_name', 'full_name', 'category_id', 'role_id', 'biography', 'portrait_filename', 'overworld_sprite', 'schedule_id', 'dialogue_root_id', 'location_id'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "NPC field [{$field}] is required."]);
            }
        }
    }

    private function lookup(string $model, string $key, ?string $value): ?int
    {
        return blank($value) ? null : $model::query()->where($key, $value)->orWhere('slug', $value)->orWhere('name', $value)->value('id');
    }

    private function resolveNpc(?string $npcId): ?int
    {
        return blank($npcId) ? null : Npc::query()->where('npc_id', $npcId)->value('id');
    }

    private function read(string $file): array
    {
        $path = base_path(self::DATA_ROOT.'/'.$file);
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("NPC data file [{$path}] not found.");
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
