<?php

namespace App\Services;

use App\Models\CharacterRelationship;

class RelationshipGraphService
{
    public function graph(): array
    {
        $edges = CharacterRelationship::query()->orderBy('relationship_type')->get();
        $nodes = $edges->flatMap(fn ($edge) => [
            ['type' => $edge->source_type, 'id' => $edge->source_id],
            ['type' => $edge->target_type, 'id' => $edge->target_id],
        ])->unique(fn ($node) => $node['type'].'::'.$node['id'])->values();

        return ['nodes' => $nodes, 'edges' => $edges];
    }
}
