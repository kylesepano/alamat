import { useParams } from 'react-router-dom'
import { FastTravelPanel } from '../components/FastTravelPanel'
import { LocationMapPreview } from '../components/LocationMapPreview'
import { MapTransitionPanel } from '../components/MapTransitionPanel'
import { NPCPlacementPanel } from '../components/NPCPlacementPanel'
import { PageHeader } from '../components/PageHeader'
import { QuestMarkerPanel } from '../components/QuestMarkerPanel'
import { SpawnTable } from '../components/SpawnTable'
import { useLocation } from '../hooks/useWorld'

export function LocationDetailPage() {
  const { slug } = useParams()
  const location = useLocation(slug)

  if (!location) return <p className="text-[#f7d98b]">Loading location...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={location.location_id} title={location.name} description={location.location_type.replaceAll('_', ' ')} />
      <LocationMapPreview location={location} />
      <section className="space-y-3">
        <p className="text-[#d8c7a3]">{location.description}</p>
        <p className="text-[#b8a986]">{location.lore}</p>
      </section>
      <MapTransitionPanel transitions={location.transitions} />
      <SpawnTable spawns={location.spawn_zones} />
      <NPCPlacementPanel placements={location.npc_placements} />
      <QuestMarkerPanel markers={location.quest_markers} />
      <FastTravelPanel point={location.fast_travel} />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#fff5d6]">Map Asset Prompt</h2>
        <pre className="whitespace-pre-wrap rounded border border-[#5f4528] bg-[#110b07] p-4 text-sm text-[#d8c7a3]">{location.asset_prompts?.asset_prompt ?? location.assets?.asset_prompt}</pre>
      </section>
    </div>
  )
}
