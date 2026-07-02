<?php

namespace App\Services;

use App\Models\Recipe;

class CraftingService
{
    public function craft(Recipe $recipe): array
    {
        return ['recipe_id' => $recipe->recipe_id, 'success_rate' => $recipe->success_rate, 'output_type' => $recipe->output_type, 'output_quantity' => $recipe->output_quantity, 'status' => 'simulated'];
    }
}
