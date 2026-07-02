<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Http\Resources\MonsterCollectionResource;
use App\Http\Resources\MonsterResource;
use App\Models\Monster;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class MonsterController extends Controller
{
    private array $with = [
        'rarity',
        'nilalangOrder',
        'combatClass',
        'temperament',
        'aiBehavior',
        'affiliations',
        'personalityTraits',
        'habitats',
        'weatherTypes',
        'activeTimes',
        'trustMethod',
        'uniqueSkills.category',
        'uniqueSkills.damageType',
        'uniqueSkills.targetType',
        'uniqueSkills.statusEffect',
        'commonSkills.category',
        'commonSkills.damageType',
    ];

    public function index(Request $request): MonsterCollectionResource
    {
        $monsters = $this->filteredQuery($request)
            ->orderBy('filipino_name')
            ->paginate((int) $request->query('per_page', 24));

        return new MonsterCollectionResource($monsters);
    }

    public function show(string $monsterId): MonsterResource
    {
        return MonsterResource::make(
            Monster::query()->with($this->with)->where('monster_id', $monsterId)->firstOrFail()
        );
    }

    public function showBySlug(string $slug): MonsterResource
    {
        return MonsterResource::make(
            Monster::query()->with($this->with)->where('slug', $slug)->firstOrFail()
        );
    }

    public function filter(Request $request): MonsterCollectionResource
    {
        return $this->index($request);
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'total' => Monster::query()->count(),
            'active' => Monster::query()->where('is_active', true)->count(),
            'recruitable' => Monster::query()->where('is_recruitable', true)->count(),
            'bosses' => Monster::query()->where('is_boss', true)->count(),
            'regions' => Monster::query()->select('region_of_origin')->distinct()->orderBy('region_of_origin')->pluck('region_of_origin'),
        ]);
    }

    private function filteredQuery(Request $request): Builder
    {
        return Monster::query()
            ->with($this->with)
            ->where('is_active', true)
            ->when($request->query('search'), function (Builder $query, string $search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query->where('filipino_name', 'like', "%{$search}%")
                        ->orWhere('english_name', 'like', "%{$search}%")
                        ->orWhere('monster_id', 'like', "%{$search}%")
                        ->orWhere('region_of_origin', 'like', "%{$search}%")
                        ->orWhere('mythological_category', 'like', "%{$search}%");
                });
            })
            ->when($request->query('region'), fn (Builder $query, string $region) => $query->where('region_of_origin', $region))
            ->when($request->query('class'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'combatClass', $value))
            ->when($request->query('rarity'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'rarity', $value))
            ->when($request->query('order'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'nilalangOrder', $value))
            ->when($request->query('temperament'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'temperament', $value))
            ->when($request->query('affiliation'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'affiliations', $value))
            ->when($request->query('habitat'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'habitats', $value))
            ->when($request->query('active_time'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'activeTimes', $value))
            ->when($request->query('weather'), fn (Builder $query, string $value) => $this->whereLibrary($query, 'weatherTypes', $value));
    }

    private function whereLibrary(Builder $query, string $relationship, string $value): Builder
    {
        return $query->whereHas($relationship, function (Builder $query) use ($value): void {
            $query->where('code', $value)->orWhere('slug', $value)->orWhere('name', $value);
        });
    }
}
