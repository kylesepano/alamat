<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LibraryEntryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return array_filter([
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'icon_hint' => $this->icon_hint,
            'color_hint' => $this->color_hint,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
            'theme' => $this->theme,
            'battle_role' => $this->battle_role,
            'stat_focus' => $this->stat_focus,
            'gameplay_role' => $this->gameplay_role,
            'behavior_rule' => $this->behavior_rule,
            'effect_type' => $this->effect_type,
            'default_duration' => $this->default_duration,
            'stackable' => $this->stackable,
            'example_use_case' => $this->example_use_case,
            'rank_order' => $this->rank_order,
        ], fn (mixed $value): bool => $value !== null);
    }
}
