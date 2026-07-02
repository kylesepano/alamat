<?php

namespace App\Services;

use App\Data\LibraryData;
use App\Repositories\LibraryRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class LibraryService
{
    public const CACHE_SECONDS = 86400;

    public function __construct(private readonly LibraryRepository $repository)
    {
    }

    public function all(): array
    {
        return [
            'meta' => [
                'phase' => 'Phase B: Core Libraries',
                'description' => 'Reusable master data for future Nilalang, skills, items, quests, and battles.',
                'source' => LibraryData::SOURCE_PATH,
            ],
            'categories' => LibraryData::categories(),
            'labels' => LibraryData::labels(),
            'libraries' => collect($this->repository->keys())
                ->mapWithKeys(fn (string $key): array => [$key => $this->get($key)])
                ->all(),
        ];
    }

    public function get(string $library): array
    {
        return Cache::remember(
            $this->cacheKey($library),
            self::CACHE_SECONDS,
            fn (): array => $this->repository->all($library)->map->toArray()->all(),
        );
    }

    public function lookup(string $library, int|string $value, string $field = 'id'): ?Model
    {
        abort_unless(in_array($field, ['id', 'code', 'slug', 'name'], true), 422, 'Unsupported lookup field.');

        return Cache::remember(
            "{$this->cacheKey($library)}.lookup.{$field}.{$value}",
            self::CACHE_SECONDS,
            fn (): ?Model => $this->repository->find($library, $value, $field),
        );
    }

    public function clearCache(): void
    {
        foreach ($this->repository->keys() as $library) {
            Cache::forget($this->cacheKey($library));
        }
    }

    private function cacheKey(string $library): string
    {
        return "libraries.{$library}";
    }
}
