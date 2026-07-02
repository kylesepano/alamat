<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\Item;
use App\Models\Monster;
use App\Models\Npc;
use App\Models\NpcFaction;
use App\Models\NpcLocation;
use App\Models\Quest;
use App\Models\QuestAssetPrompt;
use App\Models\QuestBranch;
use App\Models\QuestCategory;
use App\Models\QuestChain;
use App\Models\QuestDialogue;
use App\Models\QuestFlag;
use App\Models\QuestMarker;
use App\Models\QuestObjective;
use App\Models\QuestRequirement;
use App\Models\QuestReward;
use App\Models\QuestStatus;
use App\Models\QuestStep;
use App\Models\QuestType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class QuestImportService
{
    public const DATA_ROOT = 'database/data/quests';
    public const OBJECTIVE_TYPES = ['talk_to_npc', 'collect_item', 'deliver_item', 'defeat_monster', 'capture_monster', 'gain_monster_trust', 'reach_location', 'inspect_object', 'solve_puzzle', 'craft_item', 'equip_item', 'use_item', 'survive_battle', 'protect_npc', 'escort_npc', 'choose_dialogue', 'restore_shrine', 'cleanse_corruption', 'offer_item', 'wait_until_time', 'weather_condition', 'branch_choice'];
    public const REWARD_TYPES = ['gold', 'experience', 'item', 'equipment', 'skill', 'passive', 'monster_trust', 'monster_unlock', 'faction_reputation', 'npc_relationship', 'crafting_recipe', 'map_unlock', 'title', 'achievement', 'story_flag'];

    public function import(bool $dryRun = false): array
    {
        $summary = ['categories' => 0, 'types' => 0, 'statuses' => 0, 'quests_imported' => 0, 'quests_updated' => 0, 'steps' => 0, 'objectives' => 0, 'rewards' => 0, 'requirements' => 0, 'dialogues' => 0, 'flags' => 0, 'branches' => 0, 'chains' => 0, 'markers' => 0, 'asset_prompts' => 0, 'errors' => [], 'dry_run' => $dryRun];
        DB::beginTransaction();
        try {
            $summary['categories'] = $this->lookupImport(QuestCategory::class, 'quest_categories.json', 'category_id');
            $summary['types'] = $this->lookupImport(QuestType::class, 'quest_types.json', 'type_id');
            $summary['statuses'] = $this->lookupImport(QuestStatus::class, 'quest_statuses.json', 'status_id');

            foreach ($this->read('quests.json') as $index => $row) {
                try {
                    $this->validateQuest($row);
                    $quest = Quest::query()->updateOrCreate(['quest_id' => $row['quest_id']], $this->questPayload($row));
                    $quest->wasRecentlyCreated ? $summary['quests_imported']++ : $summary['quests_updated']++;
                } catch (\Throwable $exception) {
                    $summary['errors'][] = ['row' => $index + 1, 'quest_id' => $row['quest_id'] ?? null, 'reason' => $exception->getMessage()];
                }
            }

            $summary['steps'] = $this->importSteps();
            $summary['objectives'] = $this->importObjectives();
            $summary['rewards'] = $this->importRewards();
            $summary['requirements'] = $this->importQuestRows(QuestRequirement::class, 'quest_requirements.json', 'requirement_id');
            $summary['dialogues'] = $this->importDialogues();
            $summary['flags'] = $this->importQuestRows(QuestFlag::class, 'quest_flags.json', 'flag_id');
            $summary['branches'] = $this->importBranches();
            $summary['chains'] = $this->lookupImport(QuestChain::class, 'quest_chains.json', 'chain_id');
            $summary['markers'] = $this->importMarkers();
            $summary['asset_prompts'] = $this->importQuestRows(QuestAssetPrompt::class, 'quest_asset_prompts.json', 'asset_prompt_id');

            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    public function export(): array
    {
        return Quest::query()->with(QuestService::WITH)->orderBy('quest_id')->get()->toArray();
    }

    private function lookupImport(string $model, string $file, string $key): int
    {
        $rows = $this->read($file);
        foreach ($rows as $row) {
            $model::query()->updateOrCreate([$key => $row[$key]], $row);
        }
        return count($rows);
    }

    private function importQuestRows(string $model, string $file, string $key): int
    {
        $count = 0;
        foreach ($this->read($file) as $row) {
            $questId = $this->questPk($row['quest_id'] ?? null);
            if (! $questId) {
                continue;
            }
            $model::query()->updateOrCreate([$key => $row[$key]], [...collect($row)->except(['quest_id'])->all(), 'quest_id' => $questId]);
            $count++;
        }
        return $count;
    }

    private function importSteps(): int
    {
        $count = 0;
        foreach ($this->read('quest_steps.json') as $row) {
            $this->validateStep($row);
            $questId = $this->questPk($row['quest_id']);
            if (! $questId) {
                continue;
            }
            QuestStep::query()->updateOrCreate(['step_id' => $row['step_id']], [
                ...collect($row)->except(['quest_id', 'location_id', 'npc_id', 'monster_id', 'item_id'])->all(),
                'quest_id' => $questId,
                'location_id' => $this->locationPk($row['location_id'] ?? null),
                'npc_id' => $this->npcPk($row['npc_id'] ?? null),
                'monster_id' => $this->monsterPk($row['monster_id'] ?? null),
                'item_id' => $this->itemPk($row['item_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importObjectives(): int
    {
        $count = 0;
        foreach ($this->read('quest_objectives.json') as $row) {
            $questId = $this->questPk($row['quest_id']);
            $stepId = QuestStep::query()->where('step_id', $row['step_id'] ?? null)->value('id');
            if (! $questId) {
                continue;
            }
            QuestObjective::query()->updateOrCreate(['objective_id' => $row['objective_id']], [...collect($row)->except(['quest_id', 'step_id'])->all(), 'quest_id' => $questId, 'step_id' => $stepId]);
            $count++;
        }
        return $count;
    }

    private function importRewards(): int
    {
        $count = 0;
        foreach ($this->read('quest_rewards.json') as $row) {
            $this->validateReward($row);
            $questId = $this->questPk($row['quest_id']);
            if (! $questId) {
                continue;
            }
            QuestReward::query()->updateOrCreate(['reward_id' => $row['reward_id']], [
                ...collect($row)->except(['quest_id', 'item_id', 'equipment_id', 'monster_id'])->all(),
                'quest_id' => $questId,
                'item_id' => $this->itemPk($row['item_id'] ?? null),
                'equipment_id' => $this->equipmentPk($row['equipment_id'] ?? null),
                'monster_id' => $this->monsterPk($row['monster_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importDialogues(): int
    {
        $count = 0;
        foreach ($this->read('quest_dialogues.json') as $row) {
            $questId = $this->questPk($row['quest_id']);
            if (! $questId) {
                continue;
            }
            QuestDialogue::query()->updateOrCreate(['dialogue_id' => $row['dialogue_id']], [...collect($row)->except(['quest_id', 'npc_id'])->all(), 'quest_id' => $questId, 'npc_id' => $this->npcPk($row['npc_id'] ?? null)]);
            $count++;
        }
        return $count;
    }

    private function importBranches(): int
    {
        $count = 0;
        foreach ($this->read('quest_branches.json') as $row) {
            $questId = $this->questPk($row['quest_id']);
            if (! $questId) {
                continue;
            }
            QuestBranch::query()->updateOrCreate(['branch_id' => $row['branch_id']], [
                ...collect($row)->except(['quest_id', 'unlocks_quest_id', 'locks_quest_id'])->all(),
                'quest_id' => $questId,
                'unlocks_quest_id' => $this->questPk($row['unlocks_quest_id'] ?? null),
                'locks_quest_id' => $this->questPk($row['locks_quest_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importMarkers(): int
    {
        $count = 0;
        foreach ($this->read('quest_markers.json') as $row) {
            $questId = $this->questPk($row['quest_id']);
            if (! $questId) {
                continue;
            }
            QuestMarker::query()->updateOrCreate(['marker_id' => $row['marker_id']], [...collect($row)->except(['quest_id', 'location_id'])->all(), 'quest_id' => $questId, 'location_id' => $this->locationPk($row['location_id'] ?? null)]);
            $count++;
        }
        return $count;
    }

    private function questPayload(array $row): array
    {
        return [
            ...collect($row)->except(['category_id', 'location_id', 'starting_npc_id', 'ending_npc_id', 'related_monster_id', 'related_faction_id', 'required_quest_id'])->all(),
            'category_id' => QuestCategory::query()->where('category_id', $row['category_id'])->orWhere('slug', $row['category_id'])->value('id'),
            'location_id' => $this->locationPk($row['location_id'] ?? null),
            'starting_npc_id' => $this->npcPk($row['starting_npc_id'] ?? null),
            'ending_npc_id' => $this->npcPk($row['ending_npc_id'] ?? null),
            'related_monster_id' => $this->monsterPk($row['related_monster_id'] ?? null),
            'related_faction_id' => blank($row['related_faction_id'] ?? null) ? null : NpcFaction::query()->where('faction_id', $row['related_faction_id'])->orWhere('slug', $row['related_faction_id'])->value('id'),
            'required_quest_id' => $this->questPk($row['required_quest_id'] ?? null),
        ];
    }

    private function validateQuest(array $row): void
    {
        foreach (['quest_id', 'slug', 'title', 'category_id', 'quest_type', 'short_description', 'completion_condition_payload'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Quest field [{$field}] is required."]);
            }
        }
    }

    private function validateStep(array $row): void
    {
        foreach (['step_id', 'step_order', 'objective_type', 'description'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Quest step field [{$field}] is required."]);
            }
        }
        if (! in_array($row['objective_type'], self::OBJECTIVE_TYPES, true)) {
            throw ValidationException::withMessages(['objective_type' => "Unsupported objective type [{$row['objective_type']}]."]);
        }
    }

    private function validateReward(array $row): void
    {
        if (blank($row['quest_id'] ?? null) || blank($row['reward_type'] ?? null)) {
            throw ValidationException::withMessages(['reward' => 'Every reward requires quest_id and reward_type.']);
        }
        if (! in_array($row['reward_type'], self::REWARD_TYPES, true)) {
            throw ValidationException::withMessages(['reward_type' => "Unsupported reward type [{$row['reward_type']}]."]);
        }
    }

    private function questPk(?string $value): ?int { return blank($value) ? null : Quest::query()->where('quest_id', $value)->orWhere('slug', $value)->value('id'); }
    private function npcPk(?string $value): ?int { return blank($value) ? null : Npc::query()->where('npc_id', $value)->orWhere('slug', $value)->value('id'); }
    private function monsterPk(?string $value): ?int { return blank($value) ? null : Monster::query()->where('monster_id', $value)->orWhere('slug', $value)->value('id'); }
    private function itemPk(?string $value): ?int { return blank($value) ? null : Item::query()->where('item_id', $value)->orWhere('slug', $value)->value('id'); }
    private function equipmentPk(?string $value): ?int { return blank($value) ? null : Equipment::query()->where('equipment_id', $value)->orWhere('slug', $value)->value('id'); }
    private function locationPk(?string $value): ?int { return blank($value) ? null : NpcLocation::query()->where('location_id', $value)->orWhere('map_key', $value)->value('id'); }

    private function read(string $file): array
    {
        $path = base_path(self::DATA_ROOT.'/'.$file);
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("Quest data file [{$path}] not found.");
        }
        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
