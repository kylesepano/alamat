<?php

namespace App\Services;

use App\Models\Npc;
use Illuminate\Database\Eloquent\Collection;

class CompanionService
{
    public function companions(): Collection
    {
        return Npc::query()->where('recruitable', true)->with(NPCService::WITH)->orderBy('full_name')->get();
    }
}
