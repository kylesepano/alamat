<?php

namespace App\Services;

use App\Models\Currency;

class CurrencyService
{
    public function active(): array
    {
        return Currency::query()->where('is_active', true)->orderByDesc('is_primary')->orderBy('name')->get()->toArray();
    }
}
