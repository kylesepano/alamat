<?php

namespace Database\Seeders\Concerns;

use App\Data\LibraryData;
use App\Services\LibraryService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

trait SeedsLibraryFromJson
{
    public function run(): void
    {
        $sourceEntries = LibraryData::get($this->libraryKey);
        $sourceCodes = collect($sourceEntries)->pluck('code')->all();

        /** @var class-string<Model> $model */
        $model = $this->modelClass;
        $model::query()->whereNotIn('code', $sourceCodes)->delete();

        foreach ($sourceEntries as $entry) {
            $payload = $this->validated($entry);
            unset($payload['id']);

            $model::query()->updateOrCreate(
                ['code' => $payload['code']],
                $payload,
            );
        }

        app(LibraryService::class)->clearCache();
    }

    private function validated(array $entry): array
    {
        if (isset($entry['stackable'])) {
            $entry['stackable'] = match (strtolower((string) $entry['stackable'])) {
                'yes', 'true', '1' => true,
                'no', 'false', '0' => false,
                default => $entry['stackable'],
            };
        }

        $validator = Validator::make($entry, [
            'code' => ['required', 'string', 'max:64'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon_hint' => ['nullable', 'string', 'max:255'],
            'color_hint' => ['nullable', 'string', 'max:16'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
            'theme' => ['nullable', 'string'],
            'battle_role' => ['nullable', 'string', 'max:255'],
            'stat_focus' => ['nullable', 'string', 'max:255'],
            'gameplay_role' => ['nullable', 'string'],
            'behavior_rule' => ['nullable', 'string'],
            'effect_type' => ['nullable', 'string', 'max:255'],
            'default_duration' => ['nullable', 'string', 'max:255'],
            'stackable' => ['nullable', 'boolean'],
            'example_use_case' => ['nullable', 'string'],
            'rank_order' => ['nullable', 'integer'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
