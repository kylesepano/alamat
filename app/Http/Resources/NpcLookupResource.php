<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NpcLookupResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return collect($this->resource->toArray())->except(['id', 'created_at', 'updated_at'])->all();
    }
}
