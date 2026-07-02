import { Badge } from './Badge'

export function RelationshipGraph({ graph = { edges: [] } }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {(graph.edges ?? []).slice(0, 60).map((edge) => (
        <article key={edge.relationship_id} className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-4">
          <div className="flex flex-wrap gap-2"><Badge>{edge.relationship_type}</Badge><Badge>{edge.visibility}</Badge></div>
          <p className="mt-3 text-sm text-[#d9ceb7]">{edge.source_type}:{edge.source_id} {'->'} {edge.target_type}:{edge.target_id}</p>
          <p className="mt-2 text-xs text-[#b8a986]">Trust {edge.trust_level} / Conflict {edge.conflict_level}</p>
        </article>
      ))}
    </div>
  )
}
