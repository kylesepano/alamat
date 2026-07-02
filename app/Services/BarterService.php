<?php

namespace App\Services;

use App\Models\BarterRule;

class BarterService
{
    public function simulate(?string $barterId = null): array
    {
        $rule = $barterId ? BarterRule::query()->where('barter_id', $barterId)->first() : BarterRule::query()->first();
        return ['status' => 'simulated', 'barter_rule' => $rule?->toArray()];
    }
}
