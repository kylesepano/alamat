<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Npc extends Model
{
    protected $guarded = [];

    protected $casts = [
        'availability_payload' => 'array',
        'romance_allowed' => 'boolean',
        'recruitable' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(NpcCategory::class, 'category_id');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(NpcRole::class, 'role_id');
    }

    public function profession(): BelongsTo
    {
        return $this->belongsTo(NpcProfession::class, 'profession_id');
    }

    public function faction(): BelongsTo
    {
        return $this->belongsTo(NpcFaction::class, 'faction_id');
    }

    public function personality(): BelongsTo
    {
        return $this->belongsTo(NpcPersonality::class, 'personality_id');
    }

    public function relationshipLevel(): BelongsTo
    {
        return $this->belongsTo(NpcRelationshipLevel::class, 'relationship_level_id');
    }

    public function location(): HasOne
    {
        return $this->hasOne(NpcLocation::class, 'npc_id');
    }

    public function schedule(): HasOne
    {
        return $this->hasOne(NpcSchedule::class, 'npc_id');
    }

    public function dialogue(): HasOne
    {
        return $this->hasOne(NpcDialogue::class, 'npc_id');
    }

    public function service(): HasOne
    {
        return $this->hasOne(NpcServiceModel::class, 'npc_id');
    }

    public function shop(): HasOne
    {
        return $this->hasOne(NpcShop::class, 'npc_id');
    }

    public function training(): HasMany
    {
        return $this->hasMany(NpcTraining::class, 'npc_id');
    }

    public function quests(): HasMany
    {
        return $this->hasMany(NpcQuest::class, 'npc_id');
    }

    public function portrait(): HasOne
    {
        return $this->hasOne(NpcPortrait::class, 'npc_id');
    }

    public function voiceProfile(): HasOne
    {
        return $this->hasOne(NpcVoiceProfile::class, 'npc_id');
    }

    public function assetPrompts(): HasOne
    {
        return $this->hasOne(NpcAssetPrompt::class, 'npc_id');
    }
}
