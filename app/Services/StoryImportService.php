<?php

namespace App\Services;

use App\Models\CharacterRelationship;
use App\Models\Cinematic;
use App\Models\Cutscene;
use App\Models\DialogueChoice;
use App\Models\DialogueFlag;
use App\Models\EndingRoute;
use App\Models\Epilogue;
use App\Models\FolkTale;
use App\Models\HistoricalEvent;
use App\Models\Location;
use App\Models\LoreBook;
use App\Models\MythologyEntry;
use App\Models\Poem;
use App\Models\Song;
use App\Models\StoryAct;
use App\Models\StoryAssetPrompt;
use App\Models\StoryChapter;
use App\Models\StoryDialogue;
use App\Models\StoryScene;
use App\Models\TimelineEntry;
use App\Models\WorldHistoryEntry;
use App\Models\WorldRegion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class StoryImportService
{
    public const DATA_ROOT = 'database/data/story';

    public function import(bool $dryRun = false): array
    {
        $summary = [
            'acts' => 0, 'chapters' => 0, 'scenes' => 0, 'flags' => 0, 'dialogues' => 0, 'choices' => 0,
            'cutscenes' => 0, 'cinematics' => 0, 'lore_books' => 0, 'folk_tales' => 0, 'songs' => 0, 'poems' => 0,
            'timeline' => 0, 'historical_events' => 0, 'world_history' => 0, 'mythology' => 0,
            'relationships' => 0, 'ending_routes' => 0, 'epilogues' => 0, 'asset_prompts' => 0,
            'errors' => [], 'warnings' => [], 'dry_run' => $dryRun,
        ];

        DB::beginTransaction();
        try {
            foreach ($this->read('story_acts.json') as $index => $row) {
                $this->requireFields($row, ['act_id', 'title', 'slug'], 'story_acts', $index);
                StoryAct::query()->updateOrCreate(['act_id' => $row['act_id']], $row);
                $summary['acts']++;
            }

            foreach ($this->read('story_chapters.json') as $index => $row) {
                $this->requireFields($row, ['chapter_id', 'act_id', 'chapter_number', 'title'], 'story_chapters', $index);
                $actId = StoryAct::query()->where('act_id', $row['act_id'])->value('id');
                if (! $actId) {
                    $summary['errors'][] = ['file' => 'story_chapters.json', 'row' => $index + 1, 'reason' => "Unknown act {$row['act_id']}"];
                    continue;
                }
                StoryChapter::query()->updateOrCreate(['chapter_id' => $row['chapter_id']], [
                    ...collect($row)->except(['act_id'])->all(),
                    'act_id' => $actId,
                ]);
                $summary['chapters']++;
            }

            foreach ($this->read('story_scenes.json') as $index => $row) {
                $this->requireFields($row, ['scene_id', 'chapter_id', 'title', 'scene_type'], 'story_scenes', $index);
                $chapterId = StoryChapter::query()->where('chapter_id', $row['chapter_id'])->value('id');
                if (! $chapterId) {
                    $summary['errors'][] = ['file' => 'story_scenes.json', 'row' => $index + 1, 'reason' => "Unknown chapter {$row['chapter_id']}"];
                    continue;
                }
                StoryScene::query()->updateOrCreate(['scene_id' => $row['scene_id']], [
                    ...collect($row)->except(['chapter_id', 'location_id'])->all(),
                    'chapter_id' => $chapterId,
                    'location_id' => $this->locationPk($row['location_id'] ?? null),
                ]);
                if (($row['location_id'] ?? null) && ! $this->locationPk($row['location_id'])) {
                    $summary['warnings'][] = ['file' => 'story_scenes.json', 'row' => $index + 1, 'reason' => "Optional location not found: {$row['location_id']}"];
                }
                $summary['scenes']++;
            }

            $summary['flags'] = $this->simpleImport(DialogueFlag::class, 'dialogue_flags.json', 'flag_id');
            $summary['dialogues'] = $this->importDialogues($summary);
            $summary['choices'] = $this->importChoices($summary);
            $summary['cutscenes'] = $this->importCutscenes();
            $summary['cinematics'] = $this->simpleImport(Cinematic::class, 'cinematics.json', 'cinematic_id');
            $summary['lore_books'] = $this->importLoreBooks($summary);
            $summary['folk_tales'] = $this->simpleImport(FolkTale::class, 'folk_tales.json', 'tale_id');
            $summary['songs'] = $this->simpleImport(Song::class, 'songs.json', 'song_id');
            $summary['poems'] = $this->importPoems($summary);
            $summary['timeline'] = $this->simpleImport(TimelineEntry::class, 'timeline.json', 'timeline_id');
            $summary['historical_events'] = $this->importHistoricalEvents($summary);
            $summary['world_history'] = $this->importWorldHistory();
            $summary['mythology'] = $this->simpleImport(MythologyEntry::class, 'mythology.json', 'mythology_id');
            $summary['relationships'] = $this->simpleImport(CharacterRelationship::class, 'character_relationships.json', 'relationship_id');
            $summary['ending_routes'] = $this->simpleImport(EndingRoute::class, 'ending_routes.json', 'ending_id');
            $summary['epilogues'] = $this->importEpilogues($summary);
            $summary['asset_prompts'] = $this->simpleImport(StoryAssetPrompt::class, 'story_asset_prompts.json', 'asset_prompt_id');

            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    private function simpleImport(string $model, string $file, string $key): int
    {
        $count = 0;
        foreach ($this->read($file) as $index => $row) {
            $this->requireFields($row, [$key], $file, $index);
            $model::query()->updateOrCreate([$key => $row[$key]], $row);
            $count++;
        }
        return $count;
    }

    private function importDialogues(array &$summary): int
    {
        $count = 0;
        foreach ($this->read('dialogues.json') as $index => $row) {
            $this->requireFields($row, ['dialogue_id', 'speaker', 'text'], 'dialogues.json', $index);
            StoryDialogue::query()->updateOrCreate(['dialogue_id' => $row['dialogue_id']], [
                ...collect($row)->except(['scene_id'])->all(),
                'scene_id' => $this->scenePk($row['scene_id'] ?? null),
            ]);
            if (($row['scene_id'] ?? null) && ! $this->scenePk($row['scene_id'])) {
                $summary['warnings'][] = ['file' => 'dialogues.json', 'row' => $index + 1, 'reason' => "Optional scene not found: {$row['scene_id']}"];
            }
            $count++;
        }
        return $count;
    }

    private function importChoices(array &$summary): int
    {
        $count = 0;
        foreach ($this->read('dialogue_choices.json') as $index => $row) {
            $dialogueId = StoryDialogue::query()->where('dialogue_id', $row['dialogue_id'] ?? null)->value('id');
            if (! $dialogueId) {
                $summary['errors'][] = ['file' => 'dialogue_choices.json', 'row' => $index + 1, 'reason' => "Unknown dialogue {$row['dialogue_id']}"];
                continue;
            }
            DialogueChoice::query()->updateOrCreate(['choice_id' => $row['choice_id']], [
                ...collect($row)->except(['dialogue_id'])->all(),
                'dialogue_id' => $dialogueId,
            ]);
            $count++;
        }
        return $count;
    }

    private function importCutscenes(): int
    {
        $count = 0;
        foreach ($this->read('cutscenes.json') as $row) {
            Cutscene::query()->updateOrCreate(['cutscene_id' => $row['cutscene_id']], [
                ...collect($row)->except(['scene_id'])->all(),
                'scene_id' => $this->scenePk($row['scene_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importLoreBooks(array &$summary): int
    {
        $count = 0;
        foreach ($this->read('lore_books.json') as $index => $row) {
            LoreBook::query()->updateOrCreate(['lore_book_id' => $row['lore_book_id']], [
                ...collect($row)->except(['region_id', 'location_id'])->all(),
                'region_id' => $this->regionPk($row['region_id'] ?? null),
                'location_id' => $this->locationPk($row['location_id'] ?? null),
            ]);
            if (($row['region_id'] ?? null) && ! $this->regionPk($row['region_id'])) {
                $summary['warnings'][] = ['file' => 'lore_books.json', 'row' => $index + 1, 'reason' => "Optional region not found: {$row['region_id']}"];
            }
            $count++;
        }
        return $count;
    }

    private function importPoems(array &$summary): int
    {
        $count = 0;
        foreach ($this->read('poems.json') as $index => $row) {
            $chapterId = StoryChapter::query()->where('chapter_id', $row['related_chapter_id'] ?? null)->value('id');
            Poem::query()->updateOrCreate(['poem_id' => $row['poem_id']], [
                ...collect($row)->except(['related_chapter_id'])->all(),
                'related_chapter_id' => $chapterId,
            ]);
            if (($row['related_chapter_id'] ?? null) && ! $chapterId) {
                $summary['warnings'][] = ['file' => 'poems.json', 'row' => $index + 1, 'reason' => "Optional chapter not found: {$row['related_chapter_id']}"];
            }
            $count++;
        }
        return $count;
    }

    private function importHistoricalEvents(array &$summary): int
    {
        $count = 0;
        foreach ($this->read('historical_events.json') as $index => $row) {
            $timelineId = TimelineEntry::query()->where('timeline_id', $row['timeline_id'] ?? null)->value('id');
            HistoricalEvent::query()->updateOrCreate(['event_id' => $row['event_id']], [
                ...collect($row)->except(['timeline_id'])->all(),
                'timeline_id' => $timelineId,
            ]);
            if (($row['timeline_id'] ?? null) && ! $timelineId) {
                $summary['warnings'][] = ['file' => 'historical_events.json', 'row' => $index + 1, 'reason' => "Optional timeline entry not found: {$row['timeline_id']}"];
            }
            $count++;
        }
        return $count;
    }

    private function importWorldHistory(): int
    {
        $count = 0;
        foreach ($this->read('world_history.json') as $row) {
            WorldHistoryEntry::query()->updateOrCreate(['history_id' => $row['history_id']], [
                ...collect($row)->except(['related_timeline_id'])->all(),
                'related_timeline_id' => TimelineEntry::query()->where('timeline_id', $row['related_timeline_id'] ?? null)->value('id'),
            ]);
            $count++;
        }
        return $count;
    }

    private function importEpilogues(array &$summary): int
    {
        $count = 0;
        foreach ($this->read('epilogues.json') as $index => $row) {
            $endingId = EndingRoute::query()->where('ending_id', $row['ending_id'] ?? null)->value('id');
            if (! $endingId) {
                $summary['errors'][] = ['file' => 'epilogues.json', 'row' => $index + 1, 'reason' => "Unknown ending {$row['ending_id']}"];
                continue;
            }
            Epilogue::query()->updateOrCreate(['epilogue_id' => $row['epilogue_id']], [
                ...collect($row)->except(['ending_id'])->all(),
                'ending_id' => $endingId,
            ]);
            $count++;
        }
        return $count;
    }

    private function read(string $file): array
    {
        $path = base_path(self::DATA_ROOT.'/'.$file);
        if (! File::exists($path)) {
            throw ValidationException::withMessages([$file => "Missing story data file: {$path}"]);
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }

    private function requireFields(array $row, array $fields, string $file, int $index): void
    {
        foreach ($fields as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "{$file} row ".($index + 1)." requires {$field}."]);
            }
        }
    }

    private function scenePk(?string $sceneId): ?int
    {
        return blank($sceneId) ? null : StoryScene::query()->where('scene_id', $sceneId)->value('id');
    }

    private function locationPk(?string $locationId): ?int
    {
        return blank($locationId) ? null : Location::query()->where('location_id', $locationId)->orWhere('slug', $locationId)->value('id');
    }

    private function regionPk(?string $regionId): ?int
    {
        return blank($regionId) ? null : WorldRegion::query()->where('region_id', $regionId)->orWhere('slug', $regionId)->value('id');
    }
}
