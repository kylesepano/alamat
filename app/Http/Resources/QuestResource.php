<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'quest_id' => $this->quest_id,
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => QuestLookupResource::make($this->whenLoaded('category')),
            'quest_type' => $this->quest_type,
            'region' => $this->region,
            'province' => $this->province,
            'location' => QuestLookupResource::make($this->whenLoaded('location')),
            'starting_npc' => NpcLookupResource::make($this->whenLoaded('startingNpc')),
            'ending_npc' => NpcLookupResource::make($this->whenLoaded('endingNpc')),
            'related_monster' => MonsterResource::make($this->whenLoaded('relatedMonster')),
            'related_faction' => NpcLookupResource::make($this->whenLoaded('relatedFaction')),
            'requirements_summary' => ['level' => $this->required_level, 'story_chapter' => $this->required_story_chapter, 'required_quest_id' => $this->requiredQuest?->quest_id],
            'flags' => ['repeatable' => $this->repeatable, 'hidden' => $this->hidden, 'time_limited' => $this->time_limited],
            'conditions' => ['start' => $this->start_condition_payload, 'failure' => $this->failure_condition_payload, 'completion' => $this->completion_condition_payload],
            'short_description' => $this->short_description,
            'full_description' => $this->full_description,
            'lore_context' => $this->lore_context,
            'player_choice_notes' => $this->player_choice_notes,
            'moral_theme' => $this->moral_theme,
            'reward_summary' => $this->reward_summary,
            'assets' => ['icon_filename' => $this->icon_filename, 'banner_filename' => $this->banner_filename, 'quest_marker_icon' => $this->quest_marker_icon, 'asset_prompt' => $this->asset_prompt],
            'steps' => QuestLookupResource::collection($this->whenLoaded('steps')),
            'objectives' => QuestLookupResource::collection($this->whenLoaded('objectives')),
            'rewards' => QuestLookupResource::collection($this->whenLoaded('rewards')),
            'requirements' => QuestLookupResource::collection($this->whenLoaded('requirements')),
            'dialogues' => QuestLookupResource::collection($this->whenLoaded('dialogues')),
            'quest_flags' => QuestLookupResource::collection($this->whenLoaded('flags')),
            'branches' => QuestLookupResource::collection($this->whenLoaded('branches')),
            'markers' => QuestLookupResource::collection($this->whenLoaded('markers')),
            'asset_prompts' => QuestLookupResource::make($this->whenLoaded('assetPrompts')),
        ];
    }
}
