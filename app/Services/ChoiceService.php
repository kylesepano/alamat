<?php

namespace App\Services;

use App\Models\DialogueChoice;

class ChoiceService
{
    public function evaluate(?string $choiceId): array
    {
        $choice = DialogueChoice::query()->where('choice_id', $choiceId)->first();
        return [
            'choice_id' => $choiceId,
            'available' => (bool) $choice,
            'value_axis' => $choice?->value_axis,
            'conditions' => $choice?->condition_payload ?? [],
            'consequences' => $choice?->consequence_payload ?? [],
        ];
    }
}
