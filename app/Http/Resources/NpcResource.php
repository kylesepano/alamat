<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NpcResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'npc_id' => $this->npc_id,
            'slug' => $this->slug,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'nickname' => $this->nickname,
            'title' => $this->title,
            'category' => NpcLookupResource::make($this->whenLoaded('category')),
            'role' => NpcLookupResource::make($this->whenLoaded('role')),
            'profession' => NpcLookupResource::make($this->whenLoaded('profession')),
            'faction' => NpcLookupResource::make($this->whenLoaded('faction')),
            'origin' => ['region' => $this->region, 'province' => $this->province, 'hometown' => $this->hometown, 'language' => $this->language, 'faith_tradition' => $this->faith_tradition],
            'identity' => ['age_group' => $this->age_group, 'gender' => $this->gender, 'cultural_background' => $this->cultural_background],
            'personality' => NpcLookupResource::make($this->whenLoaded('personality')),
            'relationship_level' => NpcLookupResource::make($this->whenLoaded('relationshipLevel')),
            'reputation' => $this->reputation,
            'friendship_points' => $this->friendship_points,
            'trust_points' => $this->trust_points,
            'romance_allowed' => $this->romance_allowed,
            'recruitable' => $this->recruitable,
            'companion_unlock' => $this->companion_unlock,
            'biography' => $this->biography,
            'availability_payload' => $this->availability_payload,
            'assets' => ['portrait_filename' => $this->portrait_filename, 'overworld_sprite' => $this->overworld_sprite, 'battle_sprite' => $this->battle_sprite],
            'location' => NpcLookupResource::make($this->whenLoaded('location')),
            'schedule' => NpcLookupResource::make($this->whenLoaded('schedule')),
            'dialogue' => NpcLookupResource::make($this->whenLoaded('dialogue')),
            'service' => NpcLookupResource::make($this->whenLoaded('service')),
            'shop' => NpcLookupResource::make($this->whenLoaded('shop')),
            'training' => NpcLookupResource::collection($this->whenLoaded('training')),
            'quests' => NpcLookupResource::collection($this->whenLoaded('quests')),
            'portrait' => NpcLookupResource::make($this->whenLoaded('portrait')),
            'voice_profile' => NpcLookupResource::make($this->whenLoaded('voiceProfile')),
            'asset_prompts' => NpcLookupResource::make($this->whenLoaded('assetPrompts')),
            'notes' => $this->notes,
        ];
    }
}
