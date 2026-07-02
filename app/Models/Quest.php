<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Quest extends Model
{
    protected $guarded = [];
    protected $casts = ['repeatable' => 'boolean', 'hidden' => 'boolean', 'time_limited' => 'boolean', 'start_condition_payload' => 'array', 'failure_condition_payload' => 'array', 'completion_condition_payload' => 'array', 'is_active' => 'boolean'];

    public function category(): BelongsTo { return $this->belongsTo(QuestCategory::class, 'category_id'); }
    public function location(): BelongsTo { return $this->belongsTo(NpcLocation::class, 'location_id'); }
    public function startingNpc(): BelongsTo { return $this->belongsTo(Npc::class, 'starting_npc_id'); }
    public function endingNpc(): BelongsTo { return $this->belongsTo(Npc::class, 'ending_npc_id'); }
    public function relatedMonster(): BelongsTo { return $this->belongsTo(Monster::class, 'related_monster_id'); }
    public function relatedFaction(): BelongsTo { return $this->belongsTo(NpcFaction::class, 'related_faction_id'); }
    public function requiredQuest(): BelongsTo { return $this->belongsTo(Quest::class, 'required_quest_id'); }
    public function steps(): HasMany { return $this->hasMany(QuestStep::class, 'quest_id')->orderBy('step_order'); }
    public function objectives(): HasMany { return $this->hasMany(QuestObjective::class, 'quest_id'); }
    public function rewards(): HasMany { return $this->hasMany(QuestReward::class, 'quest_id'); }
    public function requirements(): HasMany { return $this->hasMany(QuestRequirement::class, 'quest_id'); }
    public function dialogues(): HasMany { return $this->hasMany(QuestDialogue::class, 'quest_id'); }
    public function flags(): HasMany { return $this->hasMany(QuestFlag::class, 'quest_id'); }
    public function branches(): HasMany { return $this->hasMany(QuestBranch::class, 'quest_id'); }
    public function markers(): HasMany { return $this->hasMany(QuestMarker::class, 'quest_id'); }
    public function assetPrompts(): HasOne { return $this->hasOne(QuestAssetPrompt::class, 'quest_id'); }
    public function progress(): HasMany { return $this->hasMany(QuestPlayerProgress::class, 'quest_id'); }
}
